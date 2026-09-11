import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns a batch of translation exercises for a session, prioritizing ones
// never attempted (shuffled among themselves), then the least-recently
// attempted. This way a large or growing exercise bank surfaces gradually —
// new material first, then a spaced-repetition-like return to older ones —
// instead of every exercise having equal odds from day one.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? 10), 50);

  const all = await prisma.exercise.findMany({
    where: { categoryId: categoryId || undefined },
    select: {
      id: true,
      english: true,
      hint: true,
      attempts: { orderBy: { createdAt: "desc" }, take: 1, select: { createdAt: true } },
    },
  });

  const neverAttempted = shuffle(all.filter((e) => e.attempts.length === 0));
  const previouslyAttempted = all
    .filter((e) => e.attempts.length > 0)
    .sort((a, b) => a.attempts[0].createdAt.getTime() - b.attempts[0].createdAt.getTime());

  const ordered = [...neverAttempted, ...previouslyAttempted];
  const picked = ordered.slice(0, limit).map(({ id, english, hint }) => ({ id, english, hint }));

  return NextResponse.json({ exercises: picked, total: all.length });
}
