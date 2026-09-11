import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getOrCreateStreak } from "@/lib/streak";
import { diffInDays, today } from "@/lib/date";

export async function GET() {
  const state = await getOrCreateStreak();
  const isActiveToday = state.lastActiveDate ? diffInDays(today(), state.lastActiveDate) === 0 : false;
  const isAtRisk =
    !isActiveToday &&
    state.lastActiveDate !== null &&
    diffInDays(today(), state.lastActiveDate) === 1;
  return NextResponse.json({ streak: state, isActiveToday, isAtRisk });
}

// Manual override, e.g. to (re)set the streak inherited from Duolingo.
const schema = z.object({
  currentStreak: z.number().int().min(0),
  longestStreak: z.number().int().min(0).optional(),
  lastActiveDate: z.string().optional(), // ISO date string
  freezesAvailable: z.number().int().min(0).optional(),
});

export async function PUT(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { currentStreak, longestStreak, lastActiveDate, freezesAvailable } = parsed.data;

  const existing = await getOrCreateStreak();
  const lastActive = lastActiveDate ? new Date(lastActiveDate) : existing.lastActiveDate;

  const updated = await prisma.streakState.update({
    where: { id: 1 },
    data: {
      currentStreak,
      longestStreak: Math.max(longestStreak ?? 0, currentStreak, existing.longestStreak),
      lastActiveDate: lastActive,
      freezesAvailable: freezesAvailable ?? existing.freezesAvailable,
      streakStartDate: existing.streakStartDate ?? lastActive,
    },
  });

  return NextResponse.json({ streak: updated });
}
