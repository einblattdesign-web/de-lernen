import { prisma } from "@/lib/prisma";
import FlashcardsClient from "./FlashcardsClient";

export const dynamic = "force-dynamic";

export default async function FlashcardsPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">フラッシュカード</h1>
      <p className="text-gray-500 mb-4">Anki風の間隔反復で単語を復習します。</p>
      <FlashcardsClient categories={categories} />
    </div>
  );
}
