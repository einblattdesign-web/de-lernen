"use client";

import { useEffect, useState } from "react";
import type { Category } from "@prisma/client";
import SpeakButton from "@/components/SpeakButton";

type Example = { id: string; german: string; englishGloss: string | null };
type Word = {
  id: string;
  german: string;
  englishGloss: string | null;
  japaneseGloss: string | null;
  partOfSpeech: string | null;
  gender: string | null;
  definition: string | null;
  examples: Example[];
};

const GRADES: Array<{ value: 0 | 1 | 2 | 3; label: string; color: string }> = [
  { value: 0, label: "もう一度", color: "bg-red-100 hover:bg-red-200 text-red-700" },
  { value: 1, label: "難しい", color: "bg-amber-100 hover:bg-amber-200 text-amber-700" },
  { value: 2, label: "普通", color: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700" },
  { value: 3, label: "簡単", color: "bg-sky-100 hover:bg-sky-200 text-sky-700" },
];

export default function FlashcardsClient({ categories }: { categories: Category[] }) {
  const [categoryId, setCategoryId] = useState("");
  const [words, setWords] = useState<Word[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewedCount, setReviewedCount] = useState(0);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryId) params.set("categoryId", categoryId);
    const res = await fetch(`/api/flashcards?${params.toString()}`);
    const data = await res.json();
    setWords(data.words ?? []);
    setDueCount(data.dueCount ?? 0);
    setIndex(0);
    setFlipped(false);
    setReviewedCount(0);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const current = words[index];

  const grade = async (value: 0 | 1 | 2 | 3) => {
    if (!current) return;
    await fetch("/api/flashcards/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wordId: current.id, grade: value }),
    });
    setReviewedCount((c) => c + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="input max-w-xs"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500">復習待ち: {dueCount}枚</p>
      </div>

      {loading ? (
        <p className="text-gray-500">読み込み中...</p>
      ) : !current ? (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-8 text-center">
          <p className="text-lg font-medium">🎉 今日の復習分はすべて完了しました！</p>
          {reviewedCount > 0 && <p className="text-gray-500 mt-1">{reviewedCount}枚を復習しました。</p>}
          <button onClick={load} className="mt-4 text-sm text-emerald-700 hover:underline">
            もう一度確認する
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            {index + 1} / {words.length}
          </p>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
            }}
            className="w-full text-left rounded-2xl border border-black/10 dark:border-white/10 p-10 min-h-[220px] flex flex-col items-center justify-center gap-3 hover:shadow-sm transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {current.gender ? `${current.gender} ` : ""}
                {current.german}
              </span>
              <span onClick={(e) => e.stopPropagation()}>
                <SpeakButton text={current.german} />
              </span>
            </div>
            {current.partOfSpeech && <span className="text-sm text-gray-400">{current.partOfSpeech}</span>}

            {flipped ? (
              <div className="mt-4 text-center space-y-2">
                <p className="text-lg">
                  {[current.englishGloss, current.japaneseGloss].filter(Boolean).join(" / ") || "訳語未登録"}
                </p>
                {current.definition && <p className="text-sm text-gray-500">{current.definition}</p>}
                {current.examples[0] && (
                  <p className="text-sm text-gray-500 italic">&quot;{current.examples[0].german}&quot;</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-4">タップして意味を表示</p>
            )}
          </div>

          {flipped && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  onClick={() => grade(g.value)}
                  className={`rounded-lg py-2 font-medium ${g.color}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
