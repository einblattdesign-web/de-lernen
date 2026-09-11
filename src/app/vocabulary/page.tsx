import { prisma } from "@/lib/prisma";
import VocabularyClient from "./VocabularyClient";

export const dynamic = "force-dynamic";

export default async function VocabularyPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">単語帳</h1>
      <VocabularyClient categories={categories} />
    </div>
  );
}
