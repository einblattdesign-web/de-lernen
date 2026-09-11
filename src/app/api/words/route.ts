import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const search = searchParams.get("q")?.trim();

  const words = await prisma.word.findMany({
    where: {
      categoryId: categoryId || undefined,
      ...(search
        ? {
            OR: [
              { german: { contains: search } },
              { englishGloss: { contains: search } },
              { japaneseGloss: { contains: search } },
            ],
          }
        : {}),
    },
    include: { examples: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ words });
}

const wordSchema = z.object({
  german: z.string().min(1),
  englishGloss: z.string().optional(),
  japaneseGloss: z.string().optional(),
  partOfSpeech: z.string().optional(),
  gender: z.string().optional(),
  pluralForm: z.string().optional(),
  ipa: z.string().optional(),
  definition: z.string().optional(),
  notes: z.string().optional(),
  categoryId: z.string().optional(),
  examples: z
    .array(
      z.object({
        german: z.string().min(1),
        englishGloss: z.string().optional(),
        japaneseGloss: z.string().optional(),
      })
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = wordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { examples, ...data } = parsed.data;

  const word = await prisma.word.create({
    data: {
      ...data,
      examples: examples?.length ? { create: examples } : undefined,
      reviewCard: { create: {} },
    },
    include: { examples: true, category: true },
  });

  return NextResponse.json({ word }, { status: 201 });
}
