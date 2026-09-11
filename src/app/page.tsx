import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MAX_FREEZES, reconcileStreak } from "@/lib/streak";
import { getPacedDueWordIds } from "@/lib/flashcardQueue";
import { diffInDays, today } from "@/lib/date";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [{ state: streak, freezesUsed, streakBroken }, wordCount, dueWordIds, categories] = await Promise.all([
    reconcileStreak(),
    prisma.word.count(),
    getPacedDueWordIds(),
    prisma.category.findMany({
      include: { _count: { select: { words: true, exercises: true } } },
      orderBy: { name: "asc" },
    }),
  ]);
  const dueCount = dueWordIds.length;

  const isActiveToday = streak.lastActiveDate ? diffInDays(today(), streak.lastActiveDate) === 0 : false;

  return (
    <div className="space-y-8">
      {freezesUsed > 0 && (
        <div className="rounded-xl bg-sky-50 border border-sky-200 text-sky-800 dark:bg-sky-950/30 dark:border-sky-900 dark:text-sky-300 px-4 py-3 text-sm">
          🧊 ストリークフリーズを{freezesUsed}個使って、連続記録を守りました！(残り{streak.freezesAvailable}個)
        </div>
      )}
      {streakBroken && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300 px-4 py-3 text-sm">
          ストリークフリーズが足りず、連続記録が途切れてしまいました。今日からまた積み上げましょう！
        </div>
      )}

      <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-emerald-100 text-sm">連続学習日数</p>
            <p className="text-5xl font-extrabold tracking-tight">
              🔥 {streak.currentStreak}
              <span className="text-xl font-medium ml-1">日</span>
            </p>
            <p className="text-emerald-100 text-sm mt-1">
              {isActiveToday
                ? "今日の分は達成済みです、お疲れ様でした！"
                : "今日はまだ学習していません。続けましょう！"}
            </p>
          </div>
          <div className="text-right text-emerald-100 text-sm">
            <p>最長記録: {streak.longestStreak}日</p>
            {streak.streakStartDate && (
              <p>開始日: {new Date(streak.streakStartDate).toISOString().slice(0, 10)}</p>
            )}
            <p>
              🧊 フリーズ: {streak.freezesAvailable} / {MAX_FREEZES}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="登録単語数" value={wordCount} />
        <StatCard label="復習待ちカード" value={dueCount} />
        <StatCard label="カテゴリ数" value={categories.length} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          href="/flashcards"
          title="フラッシュカードで復習"
          description={`Anki風の単語カード。今日は ${dueCount} 枚が復習待ちです。`}
          emoji="🗂️"
        />
        <ActionCard
          href="/exercises"
          title="作文問題を解く"
          description="英語の一文をドイツ語に書き換える練習。"
          emoji="✍️"
        />
        <ActionCard href="/vocabulary" title="単語帳を見る" description="単語・例文・意味を確認、追加。" emoji="📖" />
        <ActionCard
          href="/import"
          title="Excelから単語をインポート"
          description="既存の単語帳(Excel/CSV)を取り込む。"
          emoji="📥"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">カテゴリ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              <p className="font-medium">{c.name}</p>
              {c.description && <p className="text-sm text-gray-500 mt-0.5">{c.description}</p>}
              <p className="text-sm text-gray-500 mt-2">
                単語 {c._count.words} 件 ・ 作文問題 {c._count.exercises} 件
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
  emoji,
}: {
  href: string;
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-black/10 dark:border-white/10 p-4 flex items-start gap-3 hover:border-emerald-500 hover:shadow-sm transition"
    >
      <span className="text-2xl">{emoji}</span>
      <span>
        <span className="block font-medium">{title}</span>
        <span className="block text-sm text-gray-500">{description}</span>
      </span>
    </Link>
  );
}
