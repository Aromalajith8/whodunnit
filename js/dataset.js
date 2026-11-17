import { TMDB_API_KEY, TMDB_BASE_URL, JIKAN_BASE_URL } from "./config.js";

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

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Fetch extra live titles from TMDB (via unblocked api.tmdb.org) or Jikan to keep decks fresh
async function fetchLiveAdditions(format, lang, neededCount) {
  const results = [];
  if (neededCount <= 0) return results;

  try {
    if (format === "anime" || lang === "ja") {
      const page = Math.floor(Math.random() * 4) + 1;
      const res = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=10`);
      const json = await res.json();
      for (const item of json.data || []) {
        if (!item.synopsis || item.synopsis.length < 60) continue;
        const cleanSynopsis = item.synopsis.replace(/\[Written by MAL Rewrite\]/gi, "").trim();
        const sentences = cleanSynopsis.split(". ").filter(s => s.length > 20);
        const titles = [item.title_english, item.title].filter(Boolean);
        const studio = item.studios?.[0]?.name || "a renowned Japanese studio";
        const year = item.year || item.aired?.prop?.from?.year || "the 2010s";
        const genres = (item.genres || []).map(g => g.name).slice(0, 3).join(", ") || "anime";

        results.push({
          titles: [...new Set(titles)],
          displayTitle: item.title_english || item.title,
          format: "anime",
          lang: "ja",
          year,
          clues: shuffleArray([
            sentences[0] ? `${sentences[0]}.` : `A critically acclaimed ${genres} anime series.`,
            `Animated by ${studio} and first released in ${year}.`,
            sentences[1] ? `${sentences[1]}.` : `Features ${item.episodes || "multiple"} episodes blending ${genres.toLowerCase()}.`,
            `Known under its Japanese title "${item.title}" with a fan rating of ${item.score || "8+"}/10.`
          ])
        });
      }
    } else if (TMDB_API_KEY && TMDB_API_KEY !== "YOUR_TMDB_API_KEY") {
      const mediaType = format === "tv" ? "tv" : "movie";
      const langParam = lang === "random" ? "en|ml|ta|te|hi|ko" : lang;
      const page = Math.floor(Math.random() * 3) + 1;
      const url = `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_original_language=${langParam}&sort_by=vote_count.desc&page=${page}`;
      const res = await fetch(url);
      const json = await res.json();

      for (const item of (json.results || []).slice(0, 8)) {
        const title = item.title || item.name;
        const origTitle = item.original_title || item.original_name;
        if (!title || !item.overview || item.overview.length < 40) continue;

        const year = (item.release_date || item.first_air_date || "").slice(0, 4) || "recent years";
        const sentences = item.overview.split(". ").filter(s => s.length > 15);
        const langMap = { en: "English", ml: "Malayalam", ta: "Tamil", te: "Telugu", hi: "Hindi", ko: "Korean", ja: "Japanese" };
        const langName = langMap[item.original_language] || "international";

        results.push({
          titles: [...new Set([title, origTitle].filter(Boolean))],
          displayTitle: title,
          format: mediaType,
          lang: item.original_language,
          year,
          clues: shuffleArray([
            sentences[0] ? `${sentences[0]}.` : item.overview,
            `A popular ${langName} ${mediaType === "tv" ? "series" : "film"} released in ${year}.`,
            sentences[1] ? `${sentences[1]}.` : `Rated ${item.vote_average?.toFixed(1) || "8.0"}/10 by global audiences.`,
            `Starts with the letter "${title[0].toUpperCase()}" and contains ${title.replace(/[^a-zA-Z0-9]/g, "").length} letters.`
          ])
        });
      }
    }
  } catch (err) {
    console.warn("Live API fallback skipped, using curated deck:", err);
  }

  return shuffleArray(results).slice(0, neededCount);
}

export async function buildMatchDeck(format = "all", lang = "random", totalRounds = 10) {
  // 1. Filter curated deck by format
  let pool = CURATED_DECK.filter(item => {
    if (format === "all") return true;
    return item.format === format;
  });

  // 2. Filter or Round-Robin Balance by language
  if (lang !== "random") {
    pool = pool.filter(item => item.lang === lang || (lang === "en" && item.lang === "de"));
  } else {
    // Round-robin pick across all language buckets so no single industry dominates
    const buckets = {};
    for (const item of pool) {
      if (!buckets[item.lang]) buckets[item.lang] = [];
      buckets[item.lang].push(item);
    }
    Object.keys(buckets).forEach(k => {
      buckets[k] = shuffleArray(buckets[k]);
    });

    const balanced = [];
    const keys = shuffleArray(Object.keys(buckets));
    let added = true;
    while (added && balanced.length < totalRounds + 2) {
      added = false;
      for (const k of keys) {
        if (buckets[k].length > 0) {
          balanced.push(buckets[k].pop());
          added = true;
        }
      }
    }
    pool = balanced;
  }

  // Shuffle clues inside each item so every match feels fresh
  let finalDeck = shuffleArray(pool).map(item => ({
    ...item,
    clues: shuffleArray(item.clues)
  }));

  // Top up with live API items if we need more rounds (plus 1 sudden-death tie-breaker card)
  const targetCount = totalRounds + 1;
  if (finalDeck.length < targetCount) {
    const liveExtras = await fetchLiveAdditions(format, lang, targetCount - finalDeck.length);
    finalDeck = [...finalDeck, ...liveExtras];
  }

  // Fallback safety if a super narrow filter had fewer items
  if (finalDeck.length < targetCount) {
    const fallback = shuffleArray(CURATED_DECK).map(item => ({
      ...item,
      clues: shuffleArray(item.clues)
    }));
    finalDeck = [...finalDeck, ...fallback].slice(0, targetCount);
  }

  return finalDeck.slice(0, targetCount);
}