import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPacedDueWordIds } from "@/lib/flashcardQueue";

// Returns cards due for review today, capped so brand-new vocabulary is
// introduced gradually (see src/lib/flashcardQueue.ts) rather than all at
// once whenever a large batch of words is added.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const dueWordIds = await getPacedDueWordIds(categoryId);
  const idsToLoad = dueWordIds.slice(0, limit);

  const unordered = await prisma.word.findMany({
    where: { id: { in: idsToLoad } },
    include: { examples: true, reviewCard: true, category: true },
  });
  const byId = new Map(unordered.map((w) => [w.id, w]));
  const words = idsToLoad.map((id) => byId.get(id)!).filter(Boolean);

  return NextResponse.json({ words, dueCount: dueWordIds.length });
}
