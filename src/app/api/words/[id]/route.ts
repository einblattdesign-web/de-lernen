import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  german: z.string().min(1).optional(),
  englishGloss: z.string().optional().nullable(),
  japaneseGloss: z.string().optional().nullable(),
  partOfSpeech: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  pluralForm: z.string().optional().nullable(),
  ipa: z.string().optional().nullable(),
  definition: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = await prisma.word.findUnique({
    where: { id },
    include: { examples: true, category: true, reviewCard: true },
  });
  if (!word) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ word });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const word = await prisma.word.update({
    where: { id },
    data: parsed.data,
    include: { examples: true, category: true },
  });
  return NextResponse.json({ word });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.word.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
