import { prisma } from "./prisma";
import { diffInDays, today } from "./date";

export async function getOrCreateStreak() {
  const existing = await prisma.streakState.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return prisma.streakState.create({
    data: { id: 1, currentStreak: 0, longestStreak: 0 },
  });
}

// Call this once whenever the user completes any learning activity
// (a flashcard review or a translation exercise). It is idempotent per day.
export async function recordActivityToday() {
  const t = today();
  const state = await getOrCreateStreak();

  await prisma.activityDay.upsert({
    where: { date: t },
    update: { count: { increment: 1 } },
    create: { date: t, count: 1 },
  });

  if (state.lastActiveDate && diffInDays(t, state.lastActiveDate) === 0) {
    // Already counted today, nothing to change about the streak itself.
    return state;
  }

  const daysSinceLastActive = state.lastActiveDate ? diffInDays(t, state.lastActiveDate) : null;
  // Consecutive day (or very first activity ever) -> extend the streak.
  // A gap of more than 1 day breaks it, unless a freeze absorbs the gap.
  let nextStreak: number;
  let freezesAvailable = state.freezesAvailable;

  if (daysSinceLastActive === null || daysSinceLastActive === 1) {
    nextStreak = state.currentStreak + 1;
  } else if (daysSinceLastActive > 1 && freezesAvailable >= daysSinceLastActive - 1) {
    freezesAvailable -= daysSinceLastActive - 1;
    nextStreak = state.currentStreak + 1;
  } else {
    nextStreak = 1;
  }

  return prisma.streakState.update({
    where: { id: 1 },
    data: {
      currentStreak: nextStreak,
      longestStreak: Math.max(nextStreak, state.longestStreak),
      lastActiveDate: t,
      freezesAvailable,
      streakStartDate: state.streakStartDate ?? t,
    },
  });
}
