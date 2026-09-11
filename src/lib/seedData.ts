import type { PrismaClient } from "@prisma/client";

const CATEGORIES = [
  {
    key: "b1b2_general",
    name: "B1-B2 一般語彙",
    description: "B1〜B2レベルの一般的な単語・語彙",
  },
  {
    key: "art_design",
    name: "美術・デザイン語彙",
    description: "美術・デザイン関係の語彙",
  },
];

const WORDS: Array<{
  category: string;
  german: string;
  englishGloss: string;
  japaneseGloss: string;
  partOfSpeech: string;
  gender?: string;
  pluralForm?: string;
  definition: string;
  examples: Array<{ german: string; englishGloss: string }>;
}> = [
  {
    category: "b1b2_general",
    german: "Erfahrung",
    englishGloss: "experience",
    japaneseGloss: "経験",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Erfahrungen",
    definition: "etwas, das man selbst erlebt oder getan hat und dadurch gelernt hat",
    examples: [
      {
        german: "Sie hat viel Erfahrung in ihrem Beruf.",
        englishGloss: "She has a lot of experience in her profession.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "beeinflussen",
    englishGloss: "to influence",
    japaneseGloss: "影響を与える",
    partOfSpeech: "Verb",
    definition: "eine Wirkung auf jemanden oder etwas haben",
    examples: [
      {
        german: "Das Wetter beeinflusst unsere Stimmung.",
        englishGloss: "The weather influences our mood.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Entscheidung",
    englishGloss: "decision",
    japaneseGloss: "決断、決定",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Entscheidungen",
    definition: "das Ergebnis, wenn man sich zwischen mehreren Möglichkeiten festlegt",
    examples: [
      {
        german: "Das war eine schwierige Entscheidung.",
        englishGloss: "That was a difficult decision.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich vorstellen",
    englishGloss: "to imagine / to introduce oneself",
    japaneseGloss: "想像する／自己紹介する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich ein Bild von etwas machen, oder sich einer Person bekannt machen",
    examples: [
      {
        german: "Ich kann mir das nicht vorstellen.",
        englishGloss: "I can't imagine that.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Umwelt",
    englishGloss: "environment",
    japaneseGloss: "環境",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Natur und alles, was uns umgibt",
    examples: [
      {
        german: "Wir müssen die Umwelt schützen.",
        englishGloss: "We have to protect the environment.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "vermeiden",
    englishGloss: "to avoid",
    japaneseGloss: "避ける",
    partOfSpeech: "Verb",
    definition: "dafür sorgen, dass etwas nicht passiert",
    examples: [
      {
        german: "Ich versuche, Stress zu vermeiden.",
        englishGloss: "I try to avoid stress.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Entwurf",
    englishGloss: "draft / design",
    japaneseGloss: "下書き、デザイン案",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Entwürfe",
    definition: "eine erste, meist noch nicht fertige Version eines Werkes oder Plans",
    examples: [
      {
        german: "Der Designer zeigte uns seinen ersten Entwurf.",
        englishGloss: "The designer showed us his first draft.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Ausstellung",
    englishGloss: "exhibition",
    japaneseGloss: "展覧会",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Ausstellungen",
    definition: "eine öffentliche Präsentation von Kunstwerken oder Objekten",
    examples: [
      {
        german: "Die Ausstellung zeigt moderne Kunst.",
        englishGloss: "The exhibition shows modern art.",
      },
    ],
  },
  {
    category: "art_design",
    german: "gestalten",
    englishGloss: "to design / to shape",
    japaneseGloss: "デザインする、形作る",
    partOfSpeech: "Verb",
    definition: "etwas nach einem bestimmten Plan formen oder kreativ entwickeln",
    examples: [
      {
        german: "Sie gestaltet das Plakat für die Ausstellung.",
        englishGloss: "She is designing the poster for the exhibition.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Farbgebung",
    englishGloss: "coloring / color scheme",
    japaneseGloss: "配色",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Art und Weise, wie Farben in einem Werk verwendet werden",
    examples: [
      {
        german: "Die Farbgebung des Gemäldes ist sehr kontrastreich.",
        englishGloss: "The painting's color scheme is very high-contrast.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Kunstwerk",
    englishGloss: "artwork",
    japaneseGloss: "美術作品",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Kunstwerke",
    definition: "ein Werk der bildenden Kunst",
    examples: [
      {
        german: "Dieses Kunstwerk stammt aus dem 19. Jahrhundert.",
        englishGloss: "This artwork is from the 19th century.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Schriftart",
    englishGloss: "typeface / font",
    japaneseGloss: "書体、フォント",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Schriftarten",
    definition: "die einheitliche gestalterische Form von Buchstaben",
    examples: [
      {
        german: "Welche Schriftart passt am besten zu diesem Logo?",
        englishGloss: "Which typeface fits this logo best?",
      },
    ],
  },
];

const EXERCISES: Array<{ category: string; english: string; german: string; hint?: string }> = [
  {
    category: "b1b2_general",
    english: "She has a lot of experience in her profession.",
    german: "Sie hat viel Erfahrung in ihrem Beruf.",
  },
  {
    category: "b1b2_general",
    english: "The weather influences our mood.",
    german: "Das Wetter beeinflusst unsere Stimmung.",
  },
  {
    category: "b1b2_general",
    english: "That was a difficult decision.",
    german: "Das war eine schwierige Entscheidung.",
  },
  {
    category: "b1b2_general",
    english: "We have to protect the environment.",
    german: "Wir müssen die Umwelt schützen.",
  },
  {
    category: "b1b2_general",
    english: "I try to avoid stress.",
    german: "Ich versuche, Stress zu vermeiden.",
  },
  {
    category: "b1b2_general",
    english: "I can't imagine that.",
    german: "Ich kann mir das nicht vorstellen.",
    hint: "sich vorstellen",
  },
  {
    category: "art_design",
    english: "The designer showed us his first draft.",
    german: "Der Designer zeigte uns seinen ersten Entwurf.",
  },
  {
    category: "art_design",
    english: "The exhibition shows modern art.",
    german: "Die Ausstellung zeigt moderne Kunst.",
  },
  {
    category: "art_design",
    english: "She is designing the poster for the exhibition.",
    german: "Sie gestaltet das Plakat für die Ausstellung.",
  },
  {
    category: "art_design",
    english: "The painting's color scheme is very high-contrast.",
    german: "Die Farbgebung des Gemäldes ist sehr kontrastreich.",
  },
  {
    category: "art_design",
    english: "This artwork is from the 19th century.",
    german: "Dieses Kunstwerk stammt aus dem 19. Jahrhundert.",
  },
  {
    category: "art_design",
    english: "Which typeface fits this logo best?",
    german: "Welche Schriftart passt am besten zu diesem Logo?",
  },
];

// Shared by `prisma/seed.ts` (local CLI) and the `/api/admin/seed` route
// (used to seed a deployed database whose connection string isn't directly
// accessible, e.g. a masked Vercel env var). Idempotent: safe to run more
// than once against the same database.
export async function runSeed(prisma: PrismaClient) {
  const categoryIdByKey = new Map<string, string>();
  for (const c of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { key: c.key },
      update: { name: c.name, description: c.description },
      create: c,
    });
    categoryIdByKey.set(c.key, created.id);
  }

  let wordsCreated = 0;
  for (const w of WORDS) {
    const existing = await prisma.word.findFirst({ where: { german: w.german } });
    if (existing) continue;
    await prisma.word.create({
      data: {
        german: w.german,
        englishGloss: w.englishGloss,
        japaneseGloss: w.japaneseGloss,
        partOfSpeech: w.partOfSpeech,
        gender: w.gender,
        pluralForm: w.pluralForm,
        definition: w.definition,
        categoryId: categoryIdByKey.get(w.category),
        examples: {
          create: w.examples.map((e) => ({
            german: e.german,
            englishGloss: e.englishGloss,
          })),
        },
        reviewCard: { create: {} },
      },
    });
    wordsCreated++;
  }

  let exercisesCreated = 0;
  for (const ex of EXERCISES) {
    const existing = await prisma.exercise.findFirst({
      where: { english: ex.english, german: ex.german },
    });
    if (existing) continue;
    await prisma.exercise.create({
      data: {
        english: ex.english,
        german: ex.german,
        hint: ex.hint,
        categoryId: categoryIdByKey.get(ex.category)!,
      },
    });
    exercisesCreated++;
  }

  // Carry over the Duolingo streak: 1258 consecutive days as of 2026-09-11.
  const streakEndDate = new Date(Date.UTC(2026, 8, 11)); // month is 0-indexed
  const streakDays = 1258;
  const streakStartDate = new Date(streakEndDate);
  streakStartDate.setUTCDate(streakStartDate.getUTCDate() - (streakDays - 1));

  await prisma.streakState.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      currentStreak: streakDays,
      longestStreak: streakDays,
      lastActiveDate: streakEndDate,
      streakStartDate,
      freezesAvailable: 6,
      freezesRenewedAt: streakEndDate,
    },
  });

  return { categories: CATEGORIES.length, wordsCreated, exercisesCreated };
}
