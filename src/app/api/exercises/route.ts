import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Returns a random batch of translation exercises for a session.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? 10), 50);

  const all = await prisma.exercise.findMany({
    where: { categoryId: categoryId || undefined },
    select: { id: true, english: true, german: true, hint: true },
  });

  // Shuffle then slice, rather than ORDER BY RANDOM() (fine for the small
  // personal-scale datasets this app is built for).
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  const picked = all.slice(0, limit).map(({ id, english, hint }) => ({ id, english, hint }));

  return NextResponse.json({ exercises: picked, total: all.length });
}
