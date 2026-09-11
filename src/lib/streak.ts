import { prisma } from "./prisma";
import { addDays, diffInDays, today } from "./date";
import type { StreakState } from "@prisma/client";

// Yearly streak-freeze allotment: 6 freezes, topped back up to 6 (not
// stacked) once 365 days have passed since the last top-up.
export const MAX_FREEZES = 6;
const FREEZE_RENEWAL_DAYS = 365;

export async function getOrCreateStreak() {
  const existing = await prisma.streakState.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return prisma.streakState.create({
    data: { id: 1, currentStreak: 0, longestStreak: 0, freezesAvailable: MAX_FREEZES, freezesRenewedAt: today() },
  });
}

export interface ReconcileResult {
  state: StreakState;
  freezesUsed: number;
  streakBroken: boolean;
}

// Brings the streak state up to date with "today" without requiring a new
// activity: tops up streak freezes on their yearly anniversary, and — if a
// freeze is available — automatically spends it to bridge any day(s) the
// user missed so the streak survives untouched. If there aren't enough
// freezes to cover the gap, the streak resets to 0. Safe to call anytime
// (dashboard load, settings, before recording a new activity, ...).
export async function reconcileStreak(): Promise<ReconcileResult> {
  const state = await getOrCreateStreak();
  const t = today();

  let freezesAvailable = state.freezesAvailable;
  let freezesRenewedAt = state.freezesRenewedAt ?? state.streakStartDate ?? t;
  let currentStreak = state.currentStreak;
  let lastActiveDate = state.lastActiveDate;
  let changed = false;
  let freezesUsed = 0;
  let streakBroken = false;

  // Yearly renewal: reset (not add) back to the full allotment.
  while (diffInDays(t, freezesRenewedAt) >= FREEZE_RENEWAL_DAYS) {
    freezesAvailable = MAX_FREEZES;
    freezesRenewedAt = addDays(freezesRenewedAt, FREEZE_RENEWAL_DAYS);
    changed = true;
  }

  if (lastActiveDate) {
    const daysSinceLastActive = diffInDays(t, lastActiveDate);
    if (daysSinceLastActive > 1) {
      const missedDays = daysSinceLastActive - 1;
      if (freezesAvailable >= missedDays) {
        freezesAvailable -= missedDays;
        lastActiveDate = addDays(lastActiveDate, missedDays); // bridge the gap to "yesterday"
        freezesUsed = missedDays;
      } else if (currentStreak !== 0) {
        currentStreak = 0;
        streakBroken = true;
      }
      changed = true;
    }
  }

  if (!changed) {
    return { state, freezesUsed: 0, streakBroken: false };
  }

  const updated = await prisma.streakState.update({
    where: { id: 1 },
    data: { currentStreak, lastActiveDate, freezesAvailable, freezesRenewedAt },
  });

  return { state: updated, freezesUsed, streakBroken };
}

// Convenience for callers that only need the reconciled state.
export async function getStreakState(): Promise<StreakState> {
  const { state } = await reconcileStreak();
  return state;
}

// Call this once whenever the user completes any learning activity
// (a flashcard review or a translation exercise). It is idempotent per day.
export async function recordActivityToday() {
  const t = today();
  const { state } = await reconcileStreak();

  await prisma.activityDay.upsert({
    where: { date: t },
    update: { count: { increment: 1 } },
    create: { date: t, count: 1 },
  });

  const daysSinceLastActive = state.lastActiveDate ? diffInDays(t, state.lastActiveDate) : null;
  if (daysSinceLastActive === 0) {
    // Already counted today, nothing to change about the streak itself.
    return state;
  }

  // After reconciliation, a gap is either already bridged (diff === 1) or
  // the streak was reset to 0 (in which case today simply starts a new one).
  const nextStreak = daysSinceLastActive === 1 ? state.currentStreak + 1 : 1;

  return prisma.streakState.update({
    where: { id: 1 },
    data: {
      currentStreak: nextStreak,
      longestStreak: Math.max(nextStreak, state.longestStreak),
      lastActiveDate: t,
      streakStartDate: state.streakStartDate ?? t,
    },
  });
}
