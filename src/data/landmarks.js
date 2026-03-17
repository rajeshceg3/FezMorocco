export const landmarks = [
  {
    id: 1,
    title: "Al-Attarine Madrasa",
    lat: 34.0645,
    lng: -4.9734,
    category: "Sacred",
    intro: "A masterpiece of Marinid architecture, where zellige tilework whispers the divine geometry of the cosmos.",
    localTip: "Look up. The cedar canopy seems to float above the courtyard, a testament to masters who understood light as a building material.",
    facts: [
      "Completed in 1325 by Sultan Uthman II Abu Said",
      "Functioned as a school for Islamic and scientific studies",
      "Renowned for its flawless cedar wood carving and stucco work"
    ],
    info: {
      hours: "9:00 AM - 5:00 PM",
      bestTime: "Early morning for soft light",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg"
    },
    detailLens: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Medersa_Attarine_Fes_Morocco.jpg/1280px-Medersa_Attarine_Fes_Morocco.jpg",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Medersa_Attarine_Fes_Morocco.jpg/640px-Medersa_Attarine_Fes_Morocco.jpg",
    timeline: [
      { year: "1323", event: "Commissioned by Sultan Uthman II Abu Said." },
      { year: "1325", event: "Construction completed, becoming a premier educational institution." }
    ]
  },
  {
    id: 2,
    title: "Blue Gate (Bab Bou Jeloud)",
    lat: 34.0608,
    lng: -4.9863,
    category: "Architecture",
    intro: "The grand entrance to the Medina, shimmering with Fassi blue on the outside and Islamic green on the inside.",
    localTip: "Stand precisely at the center arch; it neatly frames the minaret of the Bou Inania Madrasa down the street.",
    facts: [
      "Constructed in 1913 during the French protectorate",
      "Marks the transition from the modern Ville Nouvelle to the medieval city",
      "Its true beauty reveals itself when illuminated at dusk"
    ],
    info: {
      hours: "Open 24 Hours",
      bestTime: "Sunset for the glow",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bab_Bou_Jeloud.jpg/640px-Bab_Bou_Jeloud.jpg",
    timeline: [
      { year: "12th c.", event: "Original modest gate built by the Almohads." },
      { year: "1913", event: "Current monumental Moorish gate constructed by the French administration." }
    ]
  },
  {
    id: 3,
    title: "Chouara Tannery",
    lat: 34.0667,
    lng: -4.9708,
    category: "Craft",
    intro: "A vibrant patchwork of stone vessels filled with natural dyes, unchanged since the 11th century.",
    localTip: "Accept the sprig of mint offered at the terrace entrances—you will need it to cut through the pungent scent of history.",
    facts: [
      "The largest and oldest tannery in the city",
      "Uses natural dyes like poppy (red), indigo (blue), and henna (orange)",
      "Best viewed from the surrounding leather shop terraces"
    ],
    process: [
      { step: "1. Cleansing", description: "Hides are soaked in white stone vats containing a mixture of cow urine, pigeon feces, quicklime, and water to break down tough proteins." },
      { step: "2. Softening", description: "Artisans tread the hides barefoot for hours in the acidic mixture until they become supple enough to absorb dye." },
      { step: "3. Dyeing", description: "The softened leather is moved to brown vats filled with natural colorants like poppy flower (red), indigo (blue), henna (orange), and cedar wood (brown)." },
      { step: "4. Drying", description: "Dyed hides are laid out across the surrounding terraces and roofs to bake in the Moroccan sun before being crafted into goods." }
    ],
    info: {
      hours: "8:00 AM - 7:00 PM",
      bestTime: "Morning when dyes are fresh and active",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Fes_Tanneries.jpg/640px-Fes_Tanneries.jpg",
    timeline: [
      { year: "11th c.", event: "Tannery established, shaping the economic heart of the city." },
      { year: "2016", event: "Underwent significant restoration to preserve the historic structure and working conditions." }
    ]
  },
  {
    id: 4,
    title: "University of Al-Qarawiyyin",
    lat: 34.0642,
    lng: -4.9731,
    category: "Sacred",
    intro: "The oldest continuously operating educational institution in the world, the quiet heartbeat of Fes.",
    localTip: "Though non-Muslims cannot enter the prayer hall, linger by the brass doors to hear the acoustic resonance of the courtyard.",
    facts: [
      "Founded in 859 by Fatima al-Fihri",
      "Its historic library houses over 4,000 ancient manuscripts",
      "Recognized by UNESCO and Guinness World Records"
    ],
    info: {
      hours: "Muslims only (mosque access)",
      bestTime: "During the call to prayer",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Al_Qarawiyyin_Mosque.jpg/640px-Al_Qarawiyyin_Mosque.jpg",
    timeline: [
      { year: "859", event: "Founded as a mosque by Fatima al-Fihri." },
      { year: "12th c.", event: "Expanded significantly by the Almoravids." },
      { year: "1963", event: "Incorporated into Morocco's modern state university system." }
    ]
  },
  {
    id: 5,
    title: "Nejjarine Museum of Wood Arts",
    lat: 34.0633,
    lng: -4.9742,
    category: "Craft",
    intro: "A restored funduq (inn) showcasing the exquisite wood carving traditions of Fes.",
    localTip: "Take tea on the rooftop café. The view offers a rare, serene panorama of the sprawling Medina roofscape.",
    facts: [
      "Formerly a caravanserai for traveling merchants in the 18th century",
      "Features a stunningly symmetrical central courtyard",
      "Houses intricate antique instruments, prayer beads, and palanquins"
    ],
    info: {
      hours: "10:00 AM - 5:00 PM",
      bestTime: "Mid-day for cool interior retreat",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fondouk_Nejjarine.jpg/640px-Fondouk_Nejjarine.jpg",
    timeline: [
      { year: "1711", event: "Built as a caravanserai for traveling merchants." },
      { year: "1998", event: "Restored and reopened as the Museum of Wood Arts and Crafts." }
    ]
  },
  {
    id: 6,
    title: "Bou Inania Madrasa",
    lat: 34.0619,
    lng: -4.9828,
    category: "Sacred",
    intro: "A Marinid masterpiece where the spiritual and the scholarly intertwine.",
    localTip: "Trace the Arabic calligraphy carved into the stucco; it reads like a woven ribbon binding the architecture together.",
    facts: [
      "Built between 1350 and 1355 by Sultan Abu Inan Faris",
      "Functions as both an educational madrasa and a congregational mosque",
      "Features the remnants of a famous, complex hydraulic water clock"
    ],
    info: {
      hours: "9:00 AM - 5:00 PM",
      bestTime: "Early morning to avoid crowds",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg"
    },
    detailLens: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bou_Inania_Madrasa_courtyard.jpg/1280px-Bou_Inania_Madrasa_courtyard.jpg",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bou_Inania_Madrasa_courtyard.jpg/640px-Bou_Inania_Madrasa_courtyard.jpg",
    timeline: [
      { year: "1351", event: "Founded by the Marinid sultan Abu Inan Faris." },
      { year: "1356", event: "Construction completed. The famous water clock was installed." }
    ]
  },
  {
    id: 7,
    title: "Cafe Clock",
    lat: 34.0629,
    lng: -4.9850,
    category: "Taste",
    intro: "A cultural crossroads in a restored townhouse, blending modern energy with ancient storytelling.",
    localTip: "Time your visit for Thursday evenings when traditional Hakawati (storytellers) spin ancient myths in dual languages.",
    facts: [
      "Famous for introducing the camel burger",
      "A hub for cross-cultural exchange and local arts",
      "Spread across a labyrinthine 250-year-old courtyard house"
    ],
    info: {
      hours: "9:00 AM - 11:00 PM",
      bestTime: "Lunch or evening jam session",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bab_Bou_Jeloud.jpg/640px-Bab_Bou_Jeloud.jpg",
    timeline: [
      { year: "18th c.", event: "Original courtyard house constructed." },
      { year: "2006", event: "Restored and established as a cross-cultural cafe." }
    ]
  },
  {
    id: 8,
    title: "Riad Fes",
    lat: 34.0615,
    lng: -4.9799,
    category: "Stay",
    intro: "Andalusian grandeur meets modern luxury in this Relais & Châteaux sanctuary.",
    localTip: "Seek out the interior Moorish patio at dusk; the reflection pool mirrors the sky in a moment of absolute stillness.",
    facts: [
      "Offers panoramic rooftop views of the Medina and Atlas Mountains",
      "Features four distinctly themed, harmonized patios",
      "A living museum of traditional zellige and cedar craftsmanship"
    ],
    info: {
      hours: "Open 24 Hours",
      bestTime: "Sunset drinks on the roof",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fondouk_Nejjarine.jpg/640px-Fondouk_Nejjarine.jpg",
    timeline: [
      { year: "1900", event: "Main building constructed by a prominent Fassi judge." },
      { year: "1999", event: "Opened as one of the first luxury riad hotels in Fez." }
    ]
  },
  {
    id: 9,
    title: "Zawiya of Moulay Idris II",
    lat: 34.0648,
    lng: -4.9750,
    category: "Sacred",
    intro: "The spiritual heart of Fez, housing the tomb of the city's founder and patron saint.",
    localTip: "Observe the intricately carved wooden bars where locals tie threads and leave offerings, a quiet testament to living faith.",
    facts: [
      "The tomb of Moulay Idris II, who ruled Morocco from 807 to 828",
      "Features a remarkable complex of arches, courtyards, and ablution fountains",
      "The surrounding streets mark the sacred precinct (horm) where asylum was historically granted"
    ],
    info: {
      hours: "Muslims only (interior)",
      bestTime: "Early morning for quiet reverence",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Muezzin_call_to_prayer_from_Blue_Mosque_Istanbul.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fondouk_Nejjarine.jpg/640px-Fondouk_Nejjarine.jpg",
    timeline: [
      { year: "1308", event: "A new Zawiya was built around the rediscovered uncorrupted body of Moulay Idris II." },
      { year: "1717", event: "Major reconstruction by Sultan Moulay Ismail." }
    ]
  },
  {
    id: 10,
    title: "Dar Batha Museum",
    lat: 34.0600,
    lng: -4.9815,
    category: "Craft",
    intro: "A former royal palace turned museum, celebrating the diverse artisan traditions of Fez.",
    localTip: "Don't miss the Andalusian garden in the center, a perfectly proportioned oasis of calm away from the Medina's hum.",
    facts: [
      "Built by Sultan Hassan I and completed by his successor Abdelaziz",
      "Houses an exceptional collection of Fassi blue pottery",
      "The garden frequently hosts concerts during the Sacred Music Festival"
    ],
    info: {
      hours: "9:00 AM - 5:00 PM (Closed Tuesdays)",
      bestTime: "Mid-day to escape the sun in the gardens",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Fes_Tanneries.jpg/640px-Fes_Tanneries.jpg",
    timeline: [
      { year: "1897", event: "Palace construction completed by Sultan Abdelaziz." },
      { year: "1915", event: "Transformed into a museum of arts and traditions." }
    ]
  },
  {
    id: 11,
    title: "Merenid Tombs",
    lat: 34.0700,
    lng: -4.9830,
    category: "Architecture",
    intro: "The skeletal remains of monumental tombs perched on the northern hills, watching over the city below.",
    localTip: "Bring a wide-angle lens and wait for the sunset to turn the entire Medina golden beneath you.",
    facts: [
      "Built during the 14th-century Marinid dynasty",
      "Though heavily ruined, they offer the most comprehensive panoramic view of Fez el-Bali",
      "The site is a popular gathering spot for locals at dusk"
    ],
    info: {
      hours: "Open 24 Hours",
      bestTime: "Late afternoon leading into sunset",
      audioSnippet: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Souq_in_Marrakesh.ogg"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bab_Bou_Jeloud.jpg/640px-Bab_Bou_Jeloud.jpg",
    timeline: [
      { year: "14th c.", event: "Constructed as a royal necropolis for the Marinid sultans." },
      { year: "16th c.", event: "Fell into ruin following the decline of the Marinid dynasty." }
    ]
  }
];
