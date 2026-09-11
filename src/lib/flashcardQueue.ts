import { prisma } from "./prisma";
import { endOfToday, today } from "./date";

const DEFAULT_DAILY_NEW_LIMIT = 12;

export async function getDailyNewWordLimit(): Promise<number> {
  const settings = await prisma.appSettings.findUnique({ where: { id: 1 } });
  return settings?.dailyNewWordLimit ?? DEFAULT_DAILY_NEW_LIMIT;
}

// Which words are actually servable in today's review queue, respecting the
// daily cap on brand-new (never-reviewed) cards. Cards already in progress
// (repetitions > 0) that are due are never capped — only the introduction of
// fresh vocabulary is paced, so a big content batch doesn't dump everything
// on the learner at once.
export async function getPacedDueWordIds(categoryId?: string): Promise<string[]> {
  const cutoff = endOfToday();
  const dailyLimit = await getDailyNewWordLimit();

  const introducedToday = await prisma.reviewCard.count({
    where: {
      repetitions: 1,
      lastReviewedAt: { gte: today(), lt: cutoff },
    },
  });
  const newBudgetRemaining = Math.max(0, dailyLimit - introducedToday);

  const dueOld = await prisma.word.findMany({
    where: {
      categoryId: categoryId || undefined,
      reviewCard: { dueDate: { lt: cutoff }, repetitions: { gt: 0 } },
    },
    select: { id: true },
    orderBy: { reviewCard: { dueDate: "asc" } },
  });

  const dueNew =
    newBudgetRemaining > 0
      ? await prisma.word.findMany({
          where: {
            categoryId: categoryId || undefined,
            reviewCard: { dueDate: { lt: cutoff }, repetitions: 0 },
          },
          select: { id: true },
          orderBy: { createdAt: "asc" },
          take: newBudgetRemaining,
        })
      : [];

  return [...dueOld.map((w) => w.id), ...dueNew.map((w) => w.id)];
}
