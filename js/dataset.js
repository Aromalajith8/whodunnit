import { TMDB_API_KEY, TMDB_BASE_URL, JIKAN_BASE_URL } from "./config.js";

const SEEN_STORAGE_KEY = "whodunnit_seen_titles_v1";
const MAX_SEEN_HISTORY = 400;

export const CURATED_DECK = [
  // ================= MALAYALAM =================
  {
    titles: ["Kumbalangi Nights"],
    displayTitle: "Kumbalangi Nights",
    format: "movie",
    lang: "ml",
    year: 2019,
    clues: [
      "Four estranged brothers living in a half-built house by the backwaters—and a brother-in-law who smiles a little too politely.",
      "Anchored by a chilling performance from Fahadh Faasil, elevated by a haunting score from Sushin Shyam.",
      "\"Shammi hero aada hero...\" — A seemingly polite family man slowly unravels inside a house with no doors.",
      "A 2019 Malayalam ensemble drama set in a coastal fishing village that redefined modern family storytelling."
    ]
  },
  {
    titles: ["Manichitrathazhu"],
    displayTitle: "Manichitrathazhu",
    format: "movie",
    lang: "ml",
    year: 1993,
    clues: [
      "An ancestral mansion's locked room hides an old Thanjavur dancer's vendetta—until a psychiatrist arrives from Calcutta.",
      "Directed by Fazil with legendary performances by Mohanlal, Shobana, and Suresh Gopi.",
      "\"Vidamaatte...\" — A classical dance performance turns terrifying during Durgashtami night.",
      "A 1993 Malayalam psychological thriller later remade into Chandramukhi and Bhool Bhulaiyaa."
    ]
  },
  {
    titles: ["Premam"],
    displayTitle: "Premam",
    format: "movie",
    lang: "ml",
    year: 2015,
    clues: [
      "Three chapters of heartbreak, black shirts, mundu swag, and red velvet cake.",
      "Directed by Alphonse Puthren starring Nivin Pauly and Sai Pallavi, with viral music by Rajesh Murugesan.",
      "A college lecturer who loves red velvet cake and cannot speak fluent Malayalam steals everyone's heart.",
      "A 2015 Malayalam coming-of-age romance that became a cultural phenomenon across South India."
    ]
  },
  {
    titles: ["Drishyam"],
    displayTitle: "Drishyam",
    format: "movie",
    lang: "ml",
    year: 2013,
    clues: [
      "A fourth-grade dropout cable TV operator uses everything he learned from watching movies to outsmart the police force.",
      "Written and directed by Jeethu Joseph, starring Mohanlal and Meena.",
      "\"October 2nd, we went to Dhyanam in Thodupuzha, ate at a hotel, and watched a movie.\"",
      "A 2013 Malayalam crime thriller whose airtight alibi spawned remakes across India and China."
    ]
  },
  {
    titles: ["Aavesham"],
    displayTitle: "Aavesham",
    format: "movie",
    lang: "ml",
    year: 2024,
    clues: [
      "Three bullied engineering freshers in Bengaluru befriend an eccentric, white-clad local gangster who loves reels and warm embraces.",
      "Directed by Jithu Madhavan starring Fahadh Faasil, with an electrifying soundtrack by Sushin Shyam.",
      "\"Eda Mone!\" — A volatile don throws a lavish birthday bash where loyalty is tested with a machete.",
      "A 2024 Malayalam action-comedy blockbuster about hostelers getting way over their heads."
    ]
  },

  // ================= TAMIL =================
  {
    titles: ["Vikram"],
    displayTitle: "Vikram",
    format: "movie",
    lang: "ta",
    year: 2022,
    clues: [
      "A masked vigilante squad targets corrupt narcotics officers, uncovering a retired black-ops commander's ghost.",
      "Directed by Lokesh Kanagaraj starring Kamal Haasan, Vijay Sethupathi, and Fahadh Faasil, with an electric Anirudh score.",
      "\"Once upon a time, there lived a ghost...\" — A grandfather protects his infant grandson amid a cartel war.",
      "A 2022 Tamil action thriller that officially launched the Lokesh Cinematic Universe (LCU)."
    ]
  },
  {
    titles: ["Vada Chennai"],
    displayTitle: "Vada Chennai",
    format: "movie",
    lang: "ta",
    year: 2018,
    clues: [
      "A skilled carrom player gets pulled into a decades-long turf war between rival gangsters in North Madras.",
      "Directed by Vetrimaaran and starring Dhanush, Ameer, and Andrea Jeremiah.",
      "Spanning over 30 years of coastal politics, prison alliances, and the murder of a beloved local leader.",
      "A 2018 Tamil gangster saga widely regarded as one of Indian cinema's finest crime epics."
    ]
  },
  {
    titles: ["Kaithi"],
    displayTitle: "Kaithi",
    format: "movie",
    lang: "ta",
    year: 2019,
    clues: [
      "One night, a lorry full of poisoned cops, a biryani bucket, and an ex-convict just trying to meet his daughter.",
      "Directed by Lokesh Kanagaraj starring Karthi, with zero songs and relentless nighttime tension.",
      "A Gatling gun mounted on the back of a truck turns a police station siege into pure chaos.",
      "A 2019 Tamil action thriller set entirely over a single night."
    ]
  },
  {
    titles: ["Super Deluxe"],
    displayTitle: "Super Deluxe",
    format: "movie",
    lang: "ta",
    year: 2019,
    clues: [
      "Four wildly different stories collide over one bizarre day in Chennai involving a dead body, a missing TV, and a returning father.",
      "Directed by Thiagarajan Kumararaja starring Vijay Sethupathi, Fahadh Faasil, Samantha, and Ramya Krishnan.",
      "A teenager discovers his mother used to star in B-grade films—the exact same afternoon his friends break their TV.",
      "A 2019 Tamil hyper-link anthology drama praised for its dark humor and philosophy."
    ]
  },

  // ================= TELUGU =================
  {
    titles: ["RRR"],
    displayTitle: "RRR",
    format: "movie",
    lang: "te",
    year: 2022,
    clues: [
      "A fictional friendship between two real-life 1920s revolutionaries—one fire, one water—before they realize they are on opposite sides.",
      "Directed by S. S. Rajamouli starring N. T. Rama Rao Jr. and Ram Charan, featuring Oscar-winning music by M. M. Keeravani.",
      "Two friends rescue a boy from a burning train wreck under a bridge using a motorcycle, a horse, and a rope.",
      "A 2022 Telugu period action blockbuster famous worldwide for the high-energy dance number 'Naatu Naatu'."
    ]
  },
  {
    titles: ["Eega", "Makkhi"],
    displayTitle: "Eega",
    format: "movie",
    lang: "te",
    year: 2012,
    clues: [
      "A murdered young man is reincarnated as a tiny housefly and wages psychological and physical warfare on his killer.",
      "Directed by S. S. Rajamouli starring Nani, Samantha, and Sudeep.",
      "A tiny insect uses a sewing needle, a magnifying glass, and sheer obsession to ruin a billionaire's life.",
      "A 2012 Telugu fantasy revenge film whose title literally translates to 'The Fly'."
    ]
  },
  {
    titles: ["Baahubali: The Beginning", "Baahubali", "Bahubali"],
    displayTitle: "Baahubali: The Beginning",
    format: "movie",
    lang: "te",
    year: 2015,
    clues: [
      "A young man raised near a massive waterfall climbs to the top and discovers his royal heritage in the kingdom of Mahishmati.",
      "Directed by S. S. Rajamouli starring Prabhas, Rana Daggubati, and Anushka Shetty.",
      "Ends on a legendary cliffhanger asking why a loyal warrior killed his own king.",
      "A 2015 Telugu epic fantasy that shattered Indian box-office records."
    ]
  },

  // ================= HINDI =================
  {
    titles: ["Andhadhun"],
    displayTitle: "Andhadhun",
    format: "movie",
    lang: "hi",
    year: 2018,
    clues: [
      "A pianist pretending to be blind accidentally witnesses a murder while playing a private anniversary concert.",
      "Directed by Sriram Raghavan starring Ayushmann Khurrana, Tabu, and Radhika Apte.",
      "\"What is life? It depends on the liver.\" — A blindfolded rabbit hops across a lonely road in the final shot.",
      "A 2018 Hindi dark comedy thriller full of hairpin plot twists."
    ]
  },
  {
    titles: ["Tumbbad"],
    displayTitle: "Tumbbad",
    format: "movie",
    lang: "hi",
    year: 2018,
    clues: [
      "In a perpetually rain-soaked Maharashtra village, a family's greed leads them down into the womb of a cursed fallen god.",
      "Starring Sohum Shah, shot over six years during real monsoon seasons.",
      "\"So ja warna Hastar aa jayega...\" — A greedy man brings multiple dough dolls into an underground vault.",
      "A 2018 Hindi folk-horror masterpiece about generational greed and mythology."
    ]
  },
  {
    titles: ["Sacred Games"],
    displayTitle: "Sacred Games",
    format: "tv",
    lang: "hi",
    year: 2018,
    clues: [
      "A troubled Mumbai police inspector receives an anonymous phone call from a fugitive crime lord warning that the city will be destroyed in 25 days.",
      "Starring Saif Ali Khan and Nawazuddin Siddiqui, co-directed by Anurag Kashyap and Vikramaditya Motwane.",
      "\"Kabhi kabhi lagta hai apun hi bhagwan hai.\" — A gangster narrates his rise from behind bulletproof glass.",
      "Netflix's first Indian original crime thriller series, based on Vikram Chandra's novel."
    ]
  },
  {
    titles: ["3 Idiots", "Three Idiots"],
    displayTitle: "3 Idiots",
    format: "movie",
    lang: "hi",
    year: 2009,
    clues: [
      "Two friends embark on a road trip across India to find their vanished college roommate who taught them to chase excellence, not grades.",
      "Directed by Rajkumar Hirani starring Aamir Khan, R. Madhavan, Sharman Joshi, and Boman Irani.",
      "\"All Izz Well\" — A strict engineering dean keeps an astronaut's space pen as a trophy for the best student.",
      "A 2009 Hindi coming-of-age comedy-drama set at the Imperial College of Engineering."
    ]
  },

  // ================= ENGLISH =================
  {
    titles: ["Inception"],
    displayTitle: "Inception",
    format: "movie",
    lang: "en",
    year: 2010,
    clues: [
      "Instead of stealing an idea from a subconscious mind, a team of extractors must plant one deep inside three layers of shared dreams.",
      "Written and directed by Christopher Nolan starring Leonardo DiCaprio, with a booming brass score by Hans Zimmer.",
      "A spinning pewter top on a wooden table cuts to black before anyone sees if it falls.",
      "A 2010 sci-fi heist thriller where time slows down in every deeper dream level."
    ]
  },
  {
    titles: ["Breaking Bad"],
    displayTitle: "Breaking Bad",
    format: "tv",
    lang: "en",
    year: 2008,
    clues: [
      "Diagnosed with terminal lung cancer, an underpaid high school chemistry teacher teams up with a former student in an RV.",
      "Created by Vince Gilligan starring Bryan Cranston and Aaron Paul.",
      "\"I am not in danger, Skyler. I am the danger. I am the one who knocks.\"",
      "An iconic crime drama series following Walter White's transformation into the drug kingpin Heisenberg."
    ]
  },
  {
    titles: ["The Prestige"],
    displayTitle: "The Prestige",
    format: "movie",
    lang: "en",
    year: 2006,
    clues: [
      "Two rival stage magicians in 1890s London become obsessed with creating the ultimate teleportation illusion.",
      "Directed by Christopher Nolan starring Hugh Jackman, Christian Bale, and David Bowie as Nikola Tesla.",
      "\"Are you watching closely?\" — Every magic trick has three parts: the Pledge, the Turn, and the final reveal.",
      "A 2006 psychological mystery thriller about sacrifice, twins, and obsession."
    ]
  },
  {
    titles: ["Dark"],
    displayTitle: "Dark",
    format: "tv",
    lang: "de",
    year: 2017,
    clues: [
      "When two children vanish in a small German town near a nuclear power plant, four interconnected families uncover a 33-year time loop.",
      "Created by Baran bo Odar and Jantje Friese, featuring a hauntingly tangled family tree.",
      "\"The beginning is the end, and the end is the beginning.\" — Yellow raincoats and a cave passage.",
      "A critically acclaimed German sci-fi thriller series spanning three seasons on Netflix."
    ]
  },

  // ================= ANIME (JAPANESE) =================
  {
    titles: ["Attack on Titan", "Shingeki no Kyojin"],
    displayTitle: "Attack on Titan",
    format: "anime",
    lang: "ja",
    year: 2013,
    clues: [
      "Humanity survives inside three concentric walls until a 60-meter giant kicks a hole through the outer gate.",
      "Created by Hajime Isayama, animated by Wit Studio and MAPPA, with music by Hiroyuki Sawano.",
      "\"Shinzou wo Sasageyo!\" — Soldiers swing through cities using ODM gear and dual blades.",
      "A dark fantasy anime following Eren Yeager, Mikasa Ackerman, and the Survey Corps."
    ]
  },
  {
    titles: ["Death Note"],
    displayTitle: "Death Note",
    format: "anime",
    lang: "ja",
    year: 2006,
    clues: [
      "A bored genius high school student picks up a black notebook dropped by a Shinigami—anyone whose name is written inside dies.",
      "Animated by Madhouse, pitting Light Yagami against an eccentric, sweet-eating detective named L.",
      "\"I'll take a potato chip... AND EAT IT!\" — A dramatic cat-and-mouse duel of intellects.",
      "A 2006 psychological supernatural thriller anime about the vigilante killer 'Kira'."
    ]
  },
  {
    titles: ["Steins;Gate", "Steins Gate"],
    displayTitle: "Steins;Gate",
    format: "anime",
    lang: "ja",
    year: 2011,
    clues: [
      "A self-proclaimed mad scientist accidentally modifies a microwave so it can send text messages into the past.",
      "Animated by White Fox, set in Akihabara around the Future Gadget Laboratory.",
      "\"El Psy Kongroo.\" — Green gel-bananas and a desperate race to save Mayuri across world lines.",
      "A 2011 sci-fi time-travel anime considered one of the highest-rated series of all time."
    ]
  },
  {
    titles: ["Your Name", "Kimi no Na wa"],
    displayTitle: "Your Name",
    format: "anime",
    lang: "ja",
    year: 2016,
    clues: [
      "A high school boy in Tokyo and a girl in a rural mountain town mysteriously begin swapping bodies when they sleep.",
      "Written and directed by Makoto Shinkai, with a sweeping soundtrack by RADWIMPS.",
      "A red braided cord, twilight on a crater rim, and two strangers writing their names on each other's palms.",
      "A 2016 Japanese animated romantic fantasy film that became a global box-office sensation."
    ]
  },

  // ================= KOREAN =================
  {
    titles: ["Parasite", "Gisaengchung"],
    displayTitle: "Parasite",
    format: "movie",
    lang: "ko",
    year: 2019,
    clues: [
      "A struggling family living in a semi-basement apartment schemes their way one by one into working for a wealthy household.",
      "Directed by Bong Joon-ho starring Song Kang-ho, winning four Academy Awards including Best Picture.",
      "A peach allergy, a scholar's rock, and a hidden bunker beneath the kitchen refrigerator.",
      "A 2019 South Korean dark comedy thriller about class divide."
    ]
  },
  {
    titles: ["Oldboy"],
    displayTitle: "Oldboy",
    format: "movie",
    lang: "ko",
    year: 2003,
    clues: [
      "A man is kidnapped and locked inside a hotel-style room for 15 years without explanation, then suddenly released with money and a phone.",
      "Directed by Park Chan-wook starring Choi Min-sik, famous for its single-take corridor hammer fight.",
      "Fried dumplings, a live octopus, and five days to figure out who imprisoned him and why.",
      "A 2003 South Korean neo-noir revenge thriller and Cannes Grand Prix winner."
    ]
  },
  {
    titles: ["Squid Game"],
    displayTitle: "Squid Game",
    format: "tv",
    lang: "ko",
    year: 2021,
    clues: [
      "456 debt-ridden contestants accept an invitation to play traditional children's games on a secret island for 45.6 billion won.",
      "Created by Hwang Dong-hyuk starring Lee Jung-jae, featuring pink masked guards and green tracksuits.",
      "A giant animatronic doll turns its head during 'Red Light, Green Light'—and moving means instant elimination.",
      "A 2021 South Korean survival thriller series that became Netflix's most-watched show ever."
    ]
  }
];

// ================= SEEN-TITLE MEMORY (LOCALSTORAGE) =================
function getSeenTitles() {
  try {
    const raw = localStorage.getItem(SEEN_STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveSeenTitles(newTitles) {
  try {
    const seen = Array.from(getSeenTitles());
    for (const t of newTitles) {
      const key = String(t).toLowerCase().trim();
      if (key && !seen.includes(key)) {
        seen.push(key);
      }
    }
    const trimmed = seen.slice(-MAX_SEEN_HISTORY);
    localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota errors on private browsing
  }
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Mask accidental title mentions inside API synopses so answers aren't given away
function sanitizeClueText(text, titles) {
  let clean = text;
  for (const title of titles) {
    if (!title || title.length < 4) continue;
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    clean = clean.replace(new RegExp(escaped, "gi"), "the title work");
  }
  return clean;
}

// Fetch cast & director/creator credits for a TMDB item to build human-style clues
async function fetchTmdbCreditsClue(mediaType, id, langName, year) {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/${mediaType}/${id}/credits?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    const cast = (data.cast || []).slice(0, 3).map(c => c.name);
    const directors = (data.crew || [])
      .filter(c => c.job === "Director" || c.job === "Executive Producer")
      .slice(0, 2)
      .map(c => c.name);

    if (directors.length > 0 && cast.length >= 2) {
      return `Directed by ${directors[0]} and featuring performances from ${cast.join(", ")}.`;
    }
    if (cast.length >= 2) {
      return `Stars ${cast.join(", ")} in this acclaimed ${year} ${langName} release.`;
    }
  } catch {
    // Fallback below if credits call times out
  }
  return `A standout ${langName} ${mediaType === "tv" ? "series" : "feature"} that premiered in ${year}.`;
}

// Live API Fetcher (Pages 1–20 across TMDB & Jikan for 500+ titles per category)
async function fetchLiveAdditions(format, lang, neededCount, seenSet) {
  const results = [];
  if (neededCount <= 0) return results;

  const langMap = {
    en: "English",
    ml: "Malayalam",
    ta: "Tamil",
    te: "Telugu",
    hi: "Hindi",
    ko: "Korean",
    ja: "Japanese"
  };

  try {
    // Determine whether to pull Anime (Jikan) or Movies/TV (TMDB)
    const shouldFetchAnime = format === "anime" || (format === "all" && lang === "ja");

    if (shouldFetchAnime) {
      const page = Math.floor(Math.random() * 18) + 1;
      const res = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=15`);
      const json = await res.json();

      for (const item of shuffleArray(json.data || [])) {
        if (results.length >= neededCount) break;
        const primaryTitle = item.title_english || item.title;
        if (!primaryTitle || seenSet.has(primaryTitle.toLowerCase())) continue;
        if (!item.synopsis || item.synopsis.length < 60) continue;

        const titles = [...new Set([item.title_english, item.title].filter(Boolean))];
        const cleanSynopsis = sanitizeClueText(
          item.synopsis.replace(/\[Written by MAL Rewrite\]/gi, "").trim(),
          titles
        );
        const sentences = cleanSynopsis.split(". ").filter(s => s.length > 25);
        const studio = item.studios?.[0]?.name || "a major Japanese animation studio";
        const year = item.year || item.aired?.prop?.from?.year || "the 2010s";
        const genres = (item.genres || []).map(g => g.name).slice(0, 3).join(", ") || "anime";

        results.push({
          titles,
          displayTitle: primaryTitle,
          format: "anime",
          lang: "ja",
          year,
          clues: shuffleArray([
            sentences[0] ? `${sentences[0]}.` : `A celebrated ${genres.toLowerCase()} anime series.`,
            `Animated by ${studio} and first broadcast in ${year}.`,
            sentences[1] ? `${sentences[1]}.` : `Blends ${genres.toLowerCase()} across ${item.episodes || "multiple"} episodes.`,
            `Known in Japan as "${item.title}" and holds a ${item.score || "8+"}/10 rating among anime fans.`
          ])
        });
      }
    } else if (TMDB_API_KEY && TMDB_API_KEY !== "YOUR_TMDB_API_KEY") {
      // Pick media type ('movie' or 'tv')
      const mediaType = format === "tv" ? "tv" : format === "movie" ? "movie" : (Math.random() < 0.75 ? "movie" : "tv");

      // Pick a specific language if 'random' so regional Indian & Korean cinema get equal weight
      const allLangs = ["en", "ml", "ta", "te", "hi", "ko"];
      const targetLang = lang === "random"
        ? allLangs[Math.floor(Math.random() * allLangs.length)]
        : lang;

      // Regional industries have ~8 deep pages of well-known hits; English has 20+
      const maxPage = targetLang === "en" ? 20 : 8;
      const page = Math.floor(Math.random() * maxPage) + 1;

      const url = `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_original_language=${targetLang}&sort_by=vote_count.desc&page=${page}`;
      const res = await fetch(url);
      const json = await res.json();

      const candidates = shuffleArray(json.results || []).filter(item => {
        const title = item.title || item.name;
        return title && !seenSet.has(title.toLowerCase()) && item.overview && item.overview.length >= 45;
      }).slice(0, neededCount);

      // Enrich selected candidates with real cast & director credits in parallel
      const enriched = await Promise.all(
        candidates.map(async item => {
          const title = item.title || item.name;
          const origTitle = item.original_title || item.original_name;
          const titles = [...new Set([title, origTitle].filter(Boolean))];
          const year = (item.release_date || item.first_air_date || "").slice(0, 4) || "recent years";
          const langName = langMap[item.original_language] || "international";

          const cleanOverview = sanitizeClueText(item.overview, titles);
          const sentences = cleanOverview.split(". ").filter(s => s.length > 20);
          const creditsClue = await fetchTmdbCreditsClue(mediaType, item.id, langName, year);

          return {
            titles,
            displayTitle: title,
            format: mediaType,
            lang: item.original_language,
            year,
            clues: shuffleArray([
              sentences[0] ? `${sentences[0]}.` : cleanOverview,
              creditsClue,
              sentences[1] ? `${sentences[1]}.` : `A ${year} ${langName} ${mediaType === "tv" ? "show" : "film"} with strong audience acclaim.`,
              `The English title has ${title.replace(/[^a-zA-Z0-9]/g, "").length} letters and starts with "${title[0].toUpperCase()}".`
            ])
          };
        })
      );

      results.push(...enriched);
    }
  } catch (err) {
    console.warn("Live API fetch fallback triggered:", err);
  }

  return results;
}

export async function buildMatchDeck(format = "all", lang = "random", totalRounds = 10) {
  const seenSet = getSeenTitles();
  const targetCount = totalRounds + 1; // +1 reserved for Sudden Death tie-breaker

  // 1. Filter curated deck by format & language
  let curatedPool = CURATED_DECK.filter(item => {
    if (format !== "all" && item.format !== format) return false;
    if (lang !== "random" && item.lang !== lang && !(lang === "en" && item.lang === "de")) return false;
    return true;
  });

  // Prefer unseen curated titles first; recycle if player has already seen all curated titles in this filter
  const unseenCurated = curatedPool.filter(item => !seenSet.has(item.displayTitle.toLowerCase()));
  if (unseenCurated.length > 0) {
    curatedPool = unseenCurated;
  }

  // Round-robin balance curated pool across languages if Random Mix is chosen
  if (lang === "random") {
    const buckets = {};
    for (const item of curatedPool) {
      if (!buckets[item.lang]) buckets[item.lang] = [];
      buckets[item.lang].push(item);
    }
    Object.keys(buckets).forEach(k => (buckets[k] = shuffleArray(buckets[k])));

    const balanced = [];
    const keys = shuffleArray(Object.keys(buckets));
    let added = true;
    while (added && balanced.length < targetCount) {
      added = false;
      for (const k of keys) {
        if (buckets[k].length > 0) {
          balanced.push(buckets[k].pop());
          added = true;
        }
      }
    }
    curatedPool = balanced;
  } else {
    curatedPool = shuffleArray(curatedPool);
  }

  // 2. Blend 50% Curated + 50% Live API titles so every single match has brand-new questions
  const curatedQuota = Math.min(curatedPool.length, Math.ceil(targetCount / 2));
  const selectedCurated = curatedPool.slice(0, curatedQuota).map(item => ({
    ...item,
    clues: shuffleArray(item.clues)
  }));

  const liveNeeded = targetCount - selectedCurated.length;
  let liveItems = await fetchLiveAdditions(format, lang, liveNeeded, seenSet);

  // If live API returned fewer than needed (e.g., offline), top up with remaining curated items
  if (selectedCurated.length + liveItems.length < targetCount) {
    const remainingCurated = curatedPool
      .slice(curatedQuota)
      .map(item => ({ ...item, clues: shuffleArray(item.clues) }));
    liveItems = [...liveItems, ...remainingCurated];
  }

  // Final safety fallback across entire deck if narrow filter still came up short
  let combined = shuffleArray([...selectedCurated, ...liveItems]);
  if (combined.length < targetCount) {
    const emergencyPool = shuffleArray(CURATED_DECK).map(item => ({
      ...item,
      clues: shuffleArray(item.clues)
    }));
    combined = [...combined, ...emergencyPool];
  }

  const finalDeck = combined.slice(0, targetCount);

  // Record chosen titles in localStorage so future matches skip them
  saveSeenTitles(finalDeck.map(card => card.displayTitle));

  return finalDeck;
}
