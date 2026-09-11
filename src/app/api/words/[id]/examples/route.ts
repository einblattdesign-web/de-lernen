import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  german: z.string().min(1),
  englishGloss: z.string().optional(),
  japaneseGloss: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const example = await prisma.exampleSentence.create({
    data: { ...parsed.data, wordId: id },
  });
  return NextResponse.json({ example }, { status: 201 });
}
