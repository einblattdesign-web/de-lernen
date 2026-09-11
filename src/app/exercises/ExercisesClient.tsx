"use client";

import { useEffect, useState } from "react";
import type { Category } from "@prisma/client";
import SpeakButton from "@/components/SpeakButton";

type ExerciseItem = { id: string; english: string; hint: string | null };

export default function ExercisesClient({ categories }: { categories: Category[] }) {
  const [categoryId, setCategoryId] = useState("");
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "10" });
    if (categoryId) params.set("categoryId", categoryId);
    const res = await fetch(`/api/exercises?${params.toString()}`);
    const data = await res.json();
    setExercises(data.exercises ?? []);
    setIndex(0);
    setAnswer("");
    setFeedback(null);
    setCorrectCount(0);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const current = exercises[index];

  const submit = async () => {
    if (!current || !answer.trim() || feedback) return;
    const res = await fetch("/api/exercises/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exerciseId: current.id, answer }),
    });
    const data = await res.json();
    setFeedback({ isCorrect: data.isCorrect, correctAnswer: data.correctAnswer });
    setStreak(data.streak?.currentStreak ?? null);
    if (data.isCorrect) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    setFeedback(null);
    setAnswer("");
    setIndex((i) => i + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input max-w-xs">
          <option value="">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {streak !== null && <p className="text-sm text-gray-500">🔥 連続 {streak}日</p>}
      </div>

      {loading ? (
        <p className="text-gray-500">読み込み中...</p>
      ) : exercises.length === 0 ? (
        <p className="text-gray-500">このカテゴリにはまだ作文問題がありません。</p>
      ) : !current ? (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-8 text-center">
          <p className="text-lg font-medium">🎉 セット完了！</p>
          <p className="text-gray-500 mt-1">
            {exercises.length}問中 {correctCount}問正解
          </p>
          <button onClick={load} className="mt-4 text-sm text-emerald-700 hover:underline">
            次のセットを始める
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 space-y-4">
          <p className="text-sm text-gray-400">
            {index + 1} / {exercises.length}
          </p>
          <p className="text-lg font-medium">{current.english}</p>
          {current.hint && <p className="text-sm text-gray-400">ヒント: {current.hint}</p>}

          <input
            className="input"
            placeholder="ドイツ語で入力..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (feedback) {
                  next();
                } else {
                  submit();
                }
              }
            }}
            disabled={!!feedback}
            autoFocus
          />

          {feedback && (
            <div
              className={`rounded-lg p-3 text-sm ${
                feedback.isCorrect
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300"
              }`}
            >
              <p className="font-medium">{feedback.isCorrect ? "正解！" : "不正解"}</p>
              <p className="flex items-center gap-1 mt-1">
                正解: {feedback.correctAnswer}
                <SpeakButton text={feedback.correctAnswer} />
              </p>
            </div>
          )}

          <div className="flex gap-2">
            {feedback ? (
              <button
                onClick={next}
                className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700"
              >
                次へ
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!answer.trim()}
                className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
              >
                答え合わせ
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
