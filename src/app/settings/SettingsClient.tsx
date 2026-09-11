"use client";

import { useState } from "react";

type StreakInfo = {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  freezesAvailable: number;
};

export default function SettingsClient({ streak }: { streak: StreakInfo }) {
  const [form, setForm] = useState(streak);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/streak", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentStreak: form.currentStreak,
        longestStreak: form.longestStreak,
        lastActiveDate: form.lastActiveDate || undefined,
        freezesAvailable: form.freezesAvailable,
      }),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="space-y-6 max-w-md">
      <section className="rounded-xl border border-black/10 dark:border-white/10 p-4 space-y-3">
        <h2 className="font-medium">連続学習日数 (ストリーク)</h2>
        <p className="text-sm text-gray-500">
          Duolingoなど他アプリからの連続記録を引き継ぐ場合はここで手動設定できます。
        </p>
        <label className="block text-sm">
          <span className="text-gray-500">現在の連続日数</span>
          <input
            type="number"
            min={0}
            className="input mt-1"
            value={form.currentStreak}
            onChange={(e) => setForm({ ...form, currentStreak: Number(e.target.value) })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-500">最終学習日</span>
          <input
            type="date"
            className="input mt-1"
            value={form.lastActiveDate}
            onChange={(e) => setForm({ ...form, lastActiveDate: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-500">最長記録</span>
          <input
            type="number"
            min={0}
            className="input mt-1"
            value={form.longestStreak}
            onChange={(e) => setForm({ ...form, longestStreak: Number(e.target.value) })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-500">ストリークフリーズ (お休みできる日数)</span>
          <input
            type="number"
            min={0}
            className="input mt-1"
            value={form.freezesAvailable}
            onChange={(e) => setForm({ ...form, freezesAvailable: Number(e.target.value) })}
          />
        </label>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "保存中..." : "保存"}
        </button>
        {saved && <p className="text-sm text-emerald-700">保存しました。</p>}
      </section>
    </div>
  );
}
