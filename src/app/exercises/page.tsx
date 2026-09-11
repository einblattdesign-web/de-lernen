import { prisma } from "@/lib/prisma";
import ExercisesClient from "./ExercisesClient";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">作文問題</h1>
      <p className="text-gray-500 mb-4">英語の一文をドイツ語に書き換えましょう。</p>
      <ExercisesClient categories={categories} />
    </div>
  );
}
