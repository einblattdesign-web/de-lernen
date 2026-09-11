import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const wordInput = z.object({
  german: z.string().min(1),
  englishGloss: z.string().optional(),
  japaneseGloss: z.string().optional(),
  partOfSpeech: z.string().optional(),
  gender: z.string().optional(),
  pluralForm: z.string().optional(),
  ipa: z.string().optional(),
  definition: z.string().optional(),
  notes: z.string().optional(),
  exampleGerman: z.string().optional(),
  exampleEnglish: z.string().optional(),
  sourceRow: z.number().optional(),
});

const schema = z.object({
  categoryId: z.string().min(1),
  words: z.array(wordInput).min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { categoryId, words } = parsed.data;

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return NextResponse.json({ error: "category not found" }, { status: 404 });
  }

  let created = 0;
  let skipped = 0;

  for (const w of words) {
    if (!w.german.trim()) {
      skipped++;
      continue;
    }
    const existing = await prisma.word.findFirst({
      where: { german: w.german, categoryId },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.word.create({
      data: {
        german: w.german,
        englishGloss: w.englishGloss || undefined,
        japaneseGloss: w.japaneseGloss || undefined,
        partOfSpeech: w.partOfSpeech || undefined,
        gender: w.gender || undefined,
        pluralForm: w.pluralForm || undefined,
        ipa: w.ipa || undefined,
        definition: w.definition || undefined,
        notes: w.notes || undefined,
        sourceRow: w.sourceRow,
        categoryId,
        examples:
          w.exampleGerman && w.exampleGerman.trim()
            ? { create: [{ german: w.exampleGerman, englishGloss: w.exampleEnglish || undefined }] }
            : undefined,
        reviewCard: { create: {} },
      },
    });
    created++;
  }

  return NextResponse.json({ created, skipped });
}
