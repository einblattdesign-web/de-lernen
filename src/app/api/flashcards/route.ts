import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { endOfToday } from "@/lib/date";

// Returns cards due for review today (or never reviewed) for a category.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);
  const cutoff = endOfToday();

  const words = await prisma.word.findMany({
    where: {
      categoryId: categoryId || undefined,
      reviewCard: { dueDate: { lt: cutoff } },
    },
    include: { examples: true, reviewCard: true, category: true },
    orderBy: { reviewCard: { dueDate: "asc" } },
    take: limit,
  });

  const dueCount = await prisma.reviewCard.count({
    where: {
      dueDate: { lt: cutoff },
      ...(categoryId ? { word: { categoryId } } : {}),
    },
  });

  return NextResponse.json({ words, dueCount });
}
