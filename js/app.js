import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  off,
  runTransaction,
  serverTimestamp,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { firebaseConfig } from "./config.js";
import { buildMatchDeck } from "./dataset.js";
import { isTitleMatch } from "./matcher.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Global State
const state = {
  uid: null,
  nickname: "",
  flow: "online",       // 'online' | 'host' | 'join'
  format: "all",        // 'all' | 'movie' | 'tv' | 'anime'
  lang: "random",       // 'random' | 'en' | 'ml' | 'ta' | 'te' | 'hi' | 'ja' | 'ko'
  rounds: 10,
  scoring: "escalating",
  sessionLocked: false,

  // Active Room State
  roomCode: null,
  role: null,           // 'p1' | 'p2'
  roomRef: null,
  roomData: null,
  queueRef: null,
  pendingInviteRoom: null,

  // Local Timers & Flags
  uiTickInterval: null,
  lastSabotageSeen: 0,
  lastBuzzRound: -1
};

// Check if opened via ?room=XXXX invite link
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("room")) {
  state.pendingInviteRoom = urlParams.get("room").toUpperCase().slice(0, 4);
}

// Authenticate anonymously on load
signInAnonymously(auth).catch(err => {
  console.error("Auth error:", err);
});

onAuthStateChanged(auth, user => {
  if (user) {
    state.uid = user.uid;
  }
});

// ================= NAVIGATION & HEADER LOCK =================
function goStep(stepId) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(stepId).classList.add("active");

  const header = document.getElementById("topHeader");
  const badge = document.getElementById("headerBadge");

  if (stepId === "step-name") {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  // Lock username editing once in Queue, Host Room, or Active Gameplay
  state.sessionLocked = (stepId === "step-waiting" || stepId === "step-game");
  if (state.sessionLocked) {
    badge.classList.add("locked");
    badge.removeAttribute("title");
  } else {
    badge.classList.remove("locked");
    badge.setAttribute("title", "Edit Nickname");
  }
}

function confirmNickname() {
  const input = document.getElementById("aliasInput");
  const name = input.value.trim();
  if (!name) {
    input.focus();
    input.style.borderColor = "#ffffff";
    return;
  }
  state.nickname = name;
  document.getElementById("headerAlias").textContent = name;
  document.getElementById("hudMyName").textContent = name;

  // If user arrived via ?room=CODE invite link, jump straight to join
  if (state.pendingInviteRoom) {
    const code = state.pendingInviteRoom;
    state.pendingInviteRoom = null;
    window.history.replaceState({}, document.title, window.location.pathname);
    joinPrivateRoom(code);
    return;
  }

  goStep("step-mode");
}

// ================= MATCHMAKING & ROOMS =================
function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function startOnlineQueue() {
  if (!state.uid) return;
  document.getElementById("waitingTag").textContent = "Public Queue";
  document.getElementById("queueSummary").textContent = `${state.format.toUpperCase()} • ${state.lang.toUpperCase()}`;
  document.getElementById("radarView").classList.remove("hidden");
  document.getElementById("hostShareView").classList.add("hidden");
  goStep("step-waiting");

  const bucketKey = `${state.format}_${state.lang}`;
  const bucketRef = ref(db, `queue/${bucketKey}`);
  const myQueueRef = ref(db, `queue/${bucketKey}/${state.uid}`);
  state.queueRef = myQueueRef;

  // Check if another player is already waiting in this bucket
  const snap = await get(bucketRef);
  let matchedOpponent = null;

  if (snap.exists()) {
    const entries = snap.val();
    for (const [oppUid, oppData] of Object.entries(entries)) {
      if (oppUid !== state.uid && oppData && oppData.roomCode) {
        matchedOpponent = { uid: oppUid, ...oppData };
        break;
      }
    }
  }

  if (matchedOpponent) {
    // Join the waiting player's room and remove their queue entry
    await remove(ref(db, `queue/${bucketKey}/${matchedOpponent.uid}`));
    await joinPrivateRoom(matchedOpponent.roomCode);
  } else {
    // Create a room and advertise it in the public queue
    const code = generateRoomCode();
    await createRoomInFirebase(code, true);
    await set(myQueueRef, {
      uid: state.uid,
      nickname: state.nickname,
      roomCode: code,
      createdAt: serverTimestamp()
    });
    onDisconnect(myQueueRef).remove();
  }
}

async function createPrivateRoom() {
  if (!state.uid) return;
  const code = generateRoomCode();
  document.getElementById("waitingTag").textContent = "Private Room";
  document.getElementById("displayRoomCode").textContent = code;
  document.getElementById("radarView").classList.add("hidden");
  document.getElementById("hostShareView").classList.remove("hidden");
  goStep("step-waiting");

  await createRoomInFirebase(code, false);
}

async function createRoomInFirebase(code, isPublic) {
  const deck = await buildMatchDeck(state.format, state.lang, state.rounds);
  const roomRef = ref(db, `rooms/${code}`);

  const initialRoom = {
    code,
    isPublic,
    status: "waiting",
    settings: {
      format: state.format,
      lang: state.lang,
      rounds: state.rounds,
      scoring: state.scoring
    },
    p1: {
      uid: state.uid,
      name: state.nickname,
      score: 0,
      sabotageUsed: false
    },
    p2: null,
    deck,
    roundIndex: 0,
    roundStartTime: 0,
    buzzedBy: null,
    buzzDeadline: 0,
    p1Exhausted: false,
    p2Exhausted: false,
    sabotageAt: 0,
    isSuddenDeath: false,
    roundResult: null,
    history: []
  };

  await set(roomRef, initialRoom);
  onDisconnect(roomRef).remove();
  attachRoomListener(code, "p1");
}

async function joinPrivateRoom(rawCode) {
  const code = rawCode.trim().toUpperCase();
  const errEl = document.getElementById("joinErrorMsg");
  errEl.textContent = "";

  if (code.length !== 4) {
    errEl.textContent = "Enter a valid 4-character room code.";
    return;
  }

  const roomRef = ref(db, `rooms/${code}`);
  const snap = await get(roomRef);

  if (!snap.exists()) {
    errEl.textContent = "Room not found. Check the code and try again.";
    return;
  }

  const data = snap.val();
  if (data.status !== "waiting" || data.p2) {
    errEl.textContent = "This room is already full or in progress.";
    return;
  }

  await update(roomRef, {
    p2: {
      uid: state.uid,
      name: state.nickname,
      score: 0,
      sabotageUsed: false
    },
    status: "playing",
    roundIndex: 0,
    roundStartTime: Date.now()
  });

  attachRoomListener(code, "p2");
}

async function cancelWaiting() {
  if (state.queueRef) {
    await remove(state.queueRef).catch(() => {});
    state.queueRef = null;
  }
  if (state.roomRef && state.role === "p1") {
    off(state.roomRef);
    await remove(state.roomRef).catch(() => {});
    state.roomRef = null;
  }
  goStep("step-language");
}

// ================= REAL-TIME ROOM SYNC & GAMEPLAY =================
function attachRoomListener(code, role) {
  if (state.roomRef) off(state.roomRef);
  state.roomCode = code;
  state.role = role;
  state.roomRef = ref(db, `rooms/${code}`);

  onValue(state.roomRef, snapshot => {
    if (!snapshot.exists()) {
      stopTimers();
      alert("Opponent disconnected or room closed.");
      goStep("step-mode");
      return;
    }

    const room = snapshot.val();
    state.roomData = room;

    if (room.status === "playing") {
      if (!document.getElementById("step-game").classList.contains("active")) {
        goStep("step-game");
        startUiTicker();
      }
      renderGameState(room);
    } else if (room.status === "finished") {
      stopTimers();
      renderSummary(room);
      goStep("step-summary");
    }
  });
}

function getRevealedClueCount(room) {
  if (room.isSuddenDeath) return 1;
  if (room.roundResult) return 4;
  const elapsedSec = Math.max(0, (Date.now() - room.roundStartTime) / 1000);
  return Math.min(4, Math.floor(elapsedSec / 8) + 1);
}

function getCurrentRoundPoints(room, revealedCount) {
  if (room.isSuddenDeath) return 10;
  if (room.settings.scoring === "flat") return 10;
  const table = [20, 15, 10, 5];
  return table[Math.min(3, Math.max(0, revealedCount - 1))];
}

function renderGameState(room) {
  const me = room[state.role];
  const oppRole = state.role === "p1" ? "p2" : "p1";
  const opp = room[oppRole] || { name: "OPPONENT", score: 0 };

  document.getElementById("hudMyName").textContent = me.name;
  document.getElementById("hudMyScore").textContent = me.score;
  document.getElementById("hudOppName").textContent = opp.name;
  document.getElementById("hudOppScore").textContent = opp.score;

  const totalRounds = room.settings.rounds;
  if (room.isSuddenDeath) {
    document.getElementById("hudRoundLabel").textContent = "SUDDEN DEATH";
  } else {
    document.getElementById("hudRoundLabel").textContent = `ROUND ${String(room.roundIndex + 1).padStart(2, "0")} / ${totalRounds}`;
  }

  // Trigger sabotage visual shake if opponent triggered it within last 2.5s
  if (room.sabotageAt && room.sabotageAt !== state.lastSabotageSeen && room.buzzedBy === state.uid) {
    state.lastSabotageSeen = room.sabotageAt;
    const stack = document.getElementById("clueStack");
    stack.classList.add("sabotaged");
    setTimeout(() => stack.classList.remove("sabotaged"), 2500);
  }

  // Round Result Banner
  const banner = document.getElementById("roundBanner");
  if (room.roundResult) {
    banner.classList.remove("hidden");
    document.getElementById("bannerTag").textContent = room.roundResult.winnerName
      ? `SOLVED BY ${room.roundResult.winnerName.toUpperCase()}`
      : "TIME EXPIRED";
    document.getElementById("bannerTitle").textContent = room.roundResult.title;
    document.getElementById("bannerSub").textContent = room.roundResult.deltaText || "";
  } else {
    banner.classList.add("hidden");
  }

  // Render Clues (Newest on top)
  const currentCard = room.deck[room.roundIndex];
  if (!currentCard) return;

  const revealedCount = getRevealedClueCount(room);
  const stackEl = document.getElementById("clueStack");
  stackEl.innerHTML = "";

  const maxSlots = room.isSuddenDeath ? 1 : 4;
  for (let i = maxSlots - 1; i >= 0; i--) {
    const div = document.createElement("div");
    if (i < revealedCount) {
      const pts = getCurrentRoundPoints(room, i + 1);
      div.className = "clue-item";
      div.innerHTML = `
        <div class="clue-tag"><span>CLUE 0${i + 1}</span><span>+${pts} PTS</span></div>
        <div class="clue-body">${currentCard.clues[i]}</div>
      `;
    } else {
      div.className = "clue-item locked";
      div.textContent = `[ CLUE 0${i + 1} ]`;
    }
    stackEl.appendChild(div);
  }

  // Bottom Thumb Dock State
  const myExhausted = state.role === "p1" ? room.p1Exhausted : room.p2Exhausted;

  if (room.roundResult) {
    showDock("dock-exhausted");
    document.querySelector(".exhausted-msg").textContent = "Next round starting shortly...";
  } else if (room.isSuddenDeath) {
    // Both players can type immediately in Sudden Death
    showDock("dock-typing");
    document.getElementById("typingPromptLabel").textContent = "SUDDEN DEATH — FIRST TO SOLVE WINS!";
    if (state.lastBuzzRound !== room.roundIndex) {
      state.lastBuzzRound = room.roundIndex;
      const ansInput = document.getElementById("answerInput");
      ansInput.value = "";
      renderHangmanBoxes("", currentCard.displayTitle);
      setTimeout(() => ansInput.focus(), 50);
    }
  } else if (room.buzzedBy === state.uid) {
    showDock("dock-typing");
    document.getElementById("typingPromptLabel").textContent = "TYPE TITLE";
    if (state.lastBuzzRound !== room.roundIndex) {
      state.lastBuzzRound = room.roundIndex;
      const ansInput = document.getElementById("answerInput");
      ansInput.value = "";
      renderHangmanBoxes("", currentCard.displayTitle);
      setTimeout(() => ansInput.focus(), 50);
    }
  } else if (room.buzzedBy && room.buzzedBy !== state.uid) {
    showDock("dock-locked");
    document.getElementById("lockedByLabel").textContent = `${opp.name.toUpperCase()} BUZZED IN!`;
    const sabBtn = document.getElementById("sabotageBtn");
    sabBtn.disabled = me.sabotageUsed;
    sabBtn.textContent = me.sabotageUsed ? "SABOTAGE USED" : "⚡ SABOTAGE";
  } else if (myExhausted) {
    showDock("dock-exhausted");
    document.querySelector(".exhausted-msg").textContent = "Missed! Waiting for opponent...";
  } else {
    state.lastBuzzRound = -1;
    showDock("dock-open");
  }
}

function showDock(dockId) {
  document.querySelectorAll(".dock-view").forEach(d => d.classList.remove("active"));
  document.getElementById(dockId).classList.add("active");
}

function renderHangmanBoxes(typedVal, displayTitle) {
  const container = document.getElementById("wordBoxes");
  container.innerHTML = "";
  const cleanTyped = typedVal.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  let charIdx = 0;

  displayTitle.split(" ").forEach(word => {
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
    if (!cleanWord) return;
    const grp = document.createElement("div");
    grp.className = "word-group";
    for (let i = 0; i < cleanWord.length; i++) {
      const box = document.createElement("div");
      box.className = "char-box";
      box.textContent = cleanTyped[charIdx++] || "";
      grp.appendChild(box);
    }
    container.appendChild(grp);
  });
}

// ================= PLAYER ACTIONS =================
async function handleBuzzIn() {
  const room = state.roomData;
  if (!room || room.buzzedBy || room.roundResult) return;

  const myExhausted = state.role === "p1" ? room.p1Exhausted : room.p2Exhausted;
  if (myExhausted) return;

  const currentCard = room.deck[room.roundIndex];
  const titleLen = currentCard.displayTitle.replace(/[^a-zA-Z0-9]/g, "").length;
  const initialDurationMs = Math.min(22000, (10 + titleLen * 0.4) * 1000);

  await runTransaction(state.roomRef, current => {
    if (!current || current.buzzedBy || current.roundResult) return;
    current.buzzedBy = state.uid;
    current.buzzStartTime = Date.now();
    current.buzzDeadline = Date.now() + initialDurationMs;
    return current;
  });
}

function handleTypingInput(e) {
  const room = state.roomData;
  if (!room) return;
  const currentCard = room.deck[room.roundIndex];
  renderHangmanBoxes(e.target.value, currentCard.displayTitle);

  // Add +1s per keystroke up to 22s total cap from buzz start
  if (room.buzzedBy === state.uid && room.buzzDeadline && room.buzzStartTime) {
    const maxDeadline = room.buzzStartTime + 22000;
    const newDeadline = Math.min(maxDeadline, room.buzzDeadline + 1000);
    if (newDeadline > room.buzzDeadline) {
      update(state.roomRef, { buzzDeadline: newDeadline }).catch(() => {});
    }
  }
}

async function handleSubmitGuess() {
  const room = state.roomData;
  if (!room || room.roundResult) return;
  if (!room.isSuddenDeath && room.buzzedBy !== state.uid) return;

  const input = document.getElementById("answerInput");
  const guess = input.value.trim();
  if (!guess) return;

  const currentCard = room.deck[room.roundIndex];
  const correct = isTitleMatch(guess, currentCard.titles);

  if (correct) {
    const revealedCount = getRevealedClueCount(room);
    const pts = getCurrentRoundPoints(room, revealedCount);
    const me = room[state.role];
    const newScore = me.score + pts;

    const historyEntry = {
      title: currentCard.displayTitle,
      year: currentCard.year,
      lang: currentCard.lang.toUpperCase(),
      winnerUid: state.uid,
      winnerName: me.name,
      pts
    };

    const updatedHistory = [...(room.history || []), historyEntry];

    await update(state.roomRef, {
      [`${state.role}/score`]: newScore,
      buzzedBy: null,
      roundResult: {
        winnerName: me.name,
        title: currentCard.displayTitle,
        deltaText: `+${pts} PTS`
      },
      history: updatedHistory
    });

    scheduleNextRound();
  } else {
    // Wrong guess
    if (room.isSuddenDeath) {
      input.value = "";
      input.style.borderColor = "#f87171";
      setTimeout(() => (input.style.borderColor = "#ffffff"), 400);
      return;
    }

    const penalty = room.settings.scoring === "flat" ? 10 : 0;
    const me = room[state.role];
    const exhaustedField = state.role === "p1" ? "p1Exhausted" : "p2Exhausted";
    const oppExhausted = state.role === "p1" ? room.p2Exhausted : room.p1Exhausted;

    if (oppExhausted) {
      // Both players missed—reveal answer and move to next round
      const updatedHistory = [
        ...(room.history || []),
        {
          title: currentCard.displayTitle,
          year: currentCard.year,
          lang: currentCard.lang.toUpperCase(),
          winnerUid: null,
          winnerName: "No one",
          pts: 0
        }
      ];

      await update(state.roomRef, {
        [`${state.role}/score`]: me.score - penalty,
        [exhaustedField]: true,
        buzzedBy: null,
        roundResult: {
          winnerName: null,
          title: currentCard.displayTitle,
          deltaText: penalty ? `Wrong (-${penalty} PTS)` : "Both missed!"
        },
        history: updatedHistory
      });

      scheduleNextRound();
    } else {
      // Unlock buzzer for the opponent
      await update(state.roomRef, {
        [`${state.role}/score`]: me.score - penalty,
        [exhaustedField]: true,
        buzzedBy: null,
        buzzDeadline: 0
      });
    }
  }
}

async function handleSabotage() {
  const room = state.roomData;
  if (!room || room.buzzedBy === state.uid || !room.buzzedBy) return;
  const me = room[state.role];
  if (me.sabotageUsed) return;

  await update(state.roomRef, {
    [`${state.role}/sabotageUsed`]: true,
    sabotageAt: Date.now()
  });
}

// ================= ROUND ADVANCEMENT & TIMERS =================
function scheduleNextRound() {
  setTimeout(async () => {
    const room = state.roomData;
    if (!room || room.status !== "playing") return;

    // Only p1 advances the round to avoid double increments
    if (state.role !== "p1") return;

    const nextIdx = room.roundIndex + 1;
    const totalRounds = room.settings.rounds;

    if (room.isSuddenDeath || nextIdx >= totalRounds) {
      // Check for tie after regulation rounds
      if (!room.isSuddenDeath && room.p1.score === room.p2.score && room.deck[nextIdx]) {
        await update(state.roomRef, {
          roundIndex: nextIdx,
          isSuddenDeath: true,
          buzzedBy: null,
          p1Exhausted: false,
          p2Exhausted: false,
          roundResult: null,
          roundStartTime: Date.now()
        });
      } else {
        await update(state.roomRef, { status: "finished" });
      }
    } else {
      await update(state.roomRef, {
        roundIndex: nextIdx,
        buzzedBy: null,
        buzzDeadline: 0,
        p1Exhausted: false,
        p2Exhausted: false,
        roundResult: null,
        roundStartTime: Date.now()
      });
    }
  }, 2800);
}

function startUiTicker() {
  stopTimers();
  state.uiTickInterval = setInterval(async () => {
    const room = state.roomData;
    if (!room || room.status !== "playing") return;

    const now = Date.now();

    // Update Clue Countdown
    if (!room.roundResult && !room.isSuddenDeath) {
      const elapsedSec = (now - room.roundStartTime) / 1000;
      const clueNum = Math.min(4, Math.floor(elapsedSec / 8) + 1);
      if (clueNum < 4) {
        const nextIn = Math.max(1, Math.ceil(clueNum * 8 - elapsedSec));
        document.getElementById("hudClueTimer").textContent = `NEXT CLUE: ${nextIn}s`;
      } else {
        const roundTimeLeft = Math.max(0, Math.ceil(40 - elapsedSec));
        document.getElementById("hudClueTimer").textContent = `ROUND ENDS: ${roundTimeLeft}s`;

        // Auto-expire round at 40s if nobody buzzed
        if (roundTimeLeft === 0 && !room.buzzedBy && state.role === "p1") {
          const currentCard = room.deck[room.roundIndex];
          const updatedHistory = [
            ...(room.history || []),
            {
              title: currentCard.displayTitle,
              year: currentCard.year,
              lang: currentCard.lang.toUpperCase(),
              winnerUid: null,
              winnerName: "Time Out",
              pts: 0
            }
          ];
          await update(state.roomRef, {
            roundResult: {
              winnerName: null,
              title: currentCard.displayTitle,
              deltaText: "No one answered in time"
            },
            history: updatedHistory
          });
          scheduleNextRound();
        }
      }
      renderGameState(room);
    } else if (room.isSuddenDeath) {
      document.getElementById("hudClueTimer").textContent = "FIRST CORRECT WINS";
    }

    // Update Buzzer Countdown
    if (room.buzzedBy && room.buzzDeadline && !room.roundResult) {
      const rem = Math.max(0, (room.buzzDeadline - now) / 1000);
      if (room.buzzedBy === state.uid) {
        document.getElementById("buzzCountdown").textContent = `${rem.toFixed(1)}s`;
      } else {
        document.getElementById("oppCountdownLabel").textContent = `${rem.toFixed(1)}s remaining...`;
      }

      // If active buzzer runs out of time
      if (rem === 0 && room.buzzedBy === state.uid) {
        const exhaustedField = state.role === "p1" ? "p1Exhausted" : "p2Exhausted";
        const oppExhausted = state.role === "p1" ? room.p2Exhausted : room.p1Exhausted;
        const currentCard = room.deck[room.roundIndex];

        if (oppExhausted) {
          await update(state.roomRef, {
            [exhaustedField]: true,
            buzzedBy: null,
            roundResult: {
              winnerName: null,
              title: currentCard.displayTitle,
              deltaText: "Time ran out!"
            }
          });
          scheduleNextRound();
        } else {
          await update(state.roomRef, {
            [exhaustedField]: true,
            buzzedBy: null,
            buzzDeadline: 0
          });
        }
      }
    }
  }, 200);
}

function stopTimers() {
  if (state.uiTickInterval) {
    clearInterval(state.uiTickInterval);
    state.uiTickInterval = null;
  }
}

// ================= SUMMARY & REMATCH =================
function renderSummary(room) {
  const me = room[state.role];
  const oppRole = state.role === "p1" ? "p2" : "p1";
  const opp = room[oppRole] || { name: "OPPONENT", score: 0 };

  document.getElementById("summaryScoreText").textContent = `${me.score} – ${opp.score}`;
  const tag = document.getElementById("summaryWinnerTag");
  if (me.score > opp.score) {
    tag.textContent = "VICTORY";
  } else if (me.score < opp.score) {
    tag.textContent = "DEFEAT";
  } else {
    tag.textContent = "DRAW";
  }

  const list = document.getElementById("summaryHistoryList");
  list.innerHTML = "";
  for (const item of room.history || []) {
    const row = document.createElement("div");
    row.className = "clue-item";
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center;";
    const badgeText = item.winnerUid === state.uid ? `+${item.pts}` : item.winnerName;
    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div style="font-size:12px; color:var(--text-grey);">${item.year} • ${item.lang}</div>
      </div>
      <span style="font-weight:800; color:${item.winnerUid === state.uid ? "#fff" : "var(--text-grey)"};">${badgeText}</span>
    `;
    list.appendChild(row);
  }
}

async function handleRematch() {
  if (!state.roomRef || !state.roomData) return;
  const newDeck = await buildMatchDeck(state.format, state.lang, state.roomData.settings.rounds);

  await update(state.roomRef, {
    status: "playing",
    "p1/score": 0,
    "p1/sabotageUsed": false,
    "p2/score": 0,
    "p2/sabotageUsed": false,
    deck: newDeck,
    roundIndex: 0,
    roundStartTime: Date.now(),
    buzzedBy: null,
    buzzDeadline: 0,
    p1Exhausted: false,
    p2Exhausted: false,
    sabotageAt: 0,
    isSuddenDeath: false,
    roundResult: null,
    history: []
  });
}

// ================= DOM EVENT BINDINGS =================
document.getElementById("enterNameBtn").addEventListener("click", confirmNickname);
document.getElementById("aliasInput").addEventListener("keydown", e => {
  if (e.key === "Enter") confirmNickname();
});

document.getElementById("headerBadge").addEventListener("click", () => {
  if (state.sessionLocked) return;
  goStep("step-name");
  setTimeout(() => document.getElementById("aliasInput").focus(), 50);
});

document.getElementById("brandBtn").addEventListener("click", () => {
  if (state.sessionLocked) return;
  goStep("step-mode");
});

document.getElementById("modeOnlineBtn").addEventListener("click", () => {
  state.flow = "online";
  goStep("step-format");
});

document.getElementById("modeFriendBtn").addEventListener("click", () => {
  goStep("step-friend-menu");
});

document.getElementById("backToModeBtn").addEventListener("click", () => goStep("step-mode"));

document.getElementById("createRoomMenuBtn").addEventListener("click", () => {
  state.flow = "host";
  goStep("step-format");
});

document.getElementById("joinRoomMenuBtn").addEventListener("click", () => {
  document.getElementById("joinErrorMsg").textContent = "";
  document.getElementById("joinCodeInput").value = "";
  goStep("step-join-code");
  setTimeout(() => document.getElementById("joinCodeInput").focus(), 50);
});

document.getElementById("backToFriendMenuBtn").addEventListener("click", () => goStep("step-friend-menu"));

document.getElementById("joinCodeInput").addEventListener("input", e => {
  if (e.target.value.trim().length === 4) {
    joinPrivateRoom(e.target.value);
  }
});
document.getElementById("submitJoinBtn").addEventListener("click", () => {
  joinPrivateRoom(document.getElementById("joinCodeInput").value);
});

document.getElementById("backFromFormatBtn").addEventListener("click", () => {
  goStep(state.flow === "host" ? "step-friend-menu" : "step-mode");
});

document.querySelectorAll("#step-format .tile-btn").forEach(tile => {
  tile.addEventListener("click", () => {
    state.format = tile.dataset.format;
    document.getElementById("selectedFormatLabel").textContent = tile.querySelector(".tile-name").textContent;
    const hostBox = document.getElementById("hostOptionsBox");
    const proceedBtn = document.getElementById("proceedMatchBtn");

    if (state.flow === "host") {
      hostBox.classList.remove("hidden");
      proceedBtn.textContent = "CREATE ROOM";
    } else {
      hostBox.classList.add("hidden");
      proceedBtn.textContent = "FIND OPPONENT";
    }
    goStep("step-language");
  });
});

document.getElementById("backToFormatBtn").addEventListener("click", () => goStep("step-format"));

document.querySelectorAll("#langGrid .lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#langGrid .lang-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.lang = btn.dataset.lang;
  });
});

document.getElementById("roundsStrip").addEventListener("click", e => {
  if (!e.target.classList.contains("mini-pill")) return;
  document.querySelectorAll("#roundsStrip .mini-pill").forEach(p => p.classList.remove("selected"));
  e.target.classList.add("selected");
  state.rounds = Number(e.target.dataset.rounds);
});

document.getElementById("scoringStrip").addEventListener("click", e => {
  if (!e.target.classList.contains("mini-pill")) return;
  document.querySelectorAll("#scoringStrip .mini-pill").forEach(p => p.classList.remove("selected"));
  e.target.classList.add("selected");
  state.scoring = e.target.dataset.scoring;
});

document.getElementById("proceedMatchBtn").addEventListener("click", () => {
  if (state.flow === "host") {
    createPrivateRoom();
  } else {
    startOnlineQueue();
  }
});

document.getElementById("cancelWaitBtn").addEventListener("click", cancelWaiting);

document.getElementById("copyInviteBtn").addEventListener("click", () => {
  const inviteUrl = `${window.location.origin}${window.location.pathname}?room=${state.roomCode}`;
  navigator.clipboard.writeText(inviteUrl).then(() => {
    const btn = document.getElementById("copyInviteBtn");
    btn.textContent = "LINK COPIED!";
    setTimeout(() => (btn.textContent = "COPY INVITE LINK"), 2000);
  });
});

document.getElementById("buzzInBtn").addEventListener("click", handleBuzzIn);
document.getElementById("answerInput").addEventListener("input", handleTypingInput);
document.getElementById("answerInput").addEventListener("keydown", e => {
  if (e.key === "Enter") handleSubmitGuess();
});
document.getElementById("submitGuessBtn").addEventListener("click", handleSubmitGuess);
document.getElementById("sabotageBtn").addEventListener("click", handleSabotage);

document.getElementById("rematchBtn").addEventListener("click", handleRematch);
document.getElementById("summaryHomeBtn").addEventListener("click", () => {
  if (state.roomRef) {
    off(state.roomRef);
    state.roomRef = null;
  }
  goStep("step-mode");
});