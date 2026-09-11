import { prisma } from "@/lib/prisma";
import ImportClient from "./ImportClient";

export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">単語帳をインポート</h1>
      <p className="text-gray-500 mb-4">
        既存のExcel(.xlsx)またはCSVの単語帳を読み込みます。列の対応を確認してから取り込みます。
      </p>
      <ImportClient categories={categories} />
    </div>
  );
}
