import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { schedule } from "@/lib/srs";
import { recordActivityToday } from "@/lib/streak";

const schema = z.object({
  wordId: z.string(),
  grade: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { wordId, grade } = parsed.data;

  const card = await prisma.reviewCard.upsert({
    where: { wordId },
    update: {},
    create: { wordId },
  });

  const result = schedule(card, grade);

  const updated = await prisma.reviewCard.update({
    where: { wordId },
    data: {
      easeFactor: result.easeFactor,
      intervalDays: result.intervalDays,
      repetitions: result.repetitions,
      dueDate: result.dueDate,
      lastReviewedAt: new Date(),
      lastGrade: grade,
    },
  });

  const streak = await recordActivityToday();

  return NextResponse.json({ card: updated, streak: { currentStreak: streak.currentStreak } });
}
