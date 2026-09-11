import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isCloseEnough } from "@/lib/answer";
import { recordActivityToday } from "@/lib/streak";

const schema = z.object({
  exerciseId: z.string(),
  answer: z.string(),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { exerciseId, answer } = parsed.data;

  const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
  if (!exercise) return NextResponse.json({ error: "not found" }, { status: 404 });

  const isCorrect = isCloseEnough(answer, exercise.german);

  await prisma.attempt.create({
    data: { exerciseId, userAnswer: answer, isCorrect },
  });

  const streak = await recordActivityToday();

  return NextResponse.json({
    isCorrect,
    correctAnswer: exercise.german,
    streak: { currentStreak: streak.currentStreak },
  });
}
