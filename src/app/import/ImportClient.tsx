"use client";

import { useState } from "react";
import type { Category } from "@prisma/client";

type PreviewData = {
  headers: string[];
  rows: string[][];
  totalRows: number;
  truncated: boolean;
  suggestedMapping: Record<string, number | null>;
};

const FIELD_LABELS: Record<string, string> = {
  german: "ドイツ語 (必須)",
  englishGloss: "英語訳",
  japaneseGloss: "日本語訳",
  partOfSpeech: "品詞",
  gender: "性 (der/die/das)",
  pluralForm: "複数形",
  ipa: "発音 (IPA)",
  definition: "辞書的な説明",
  notes: "メモ",
  exampleGerman: "例文 (ドイツ語)",
  exampleEnglish: "例文の訳 (英語)",
};

export default function ImportClient({ categories }: { categories: Category[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [mapping, setMapping] = useState<Record<string, number | null>>({});
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number; skipped: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/import/preview", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "読み込みに失敗しました");
        return;
      }
      setPreview(data);
      setMapping(data.suggestedMapping);
    } finally {
      setLoading(false);
    }
  };

  const commit = async () => {
    if (!preview) return;
    let targetCategoryId = categoryId;

    if (!targetCategoryId && newCategoryName.trim()) {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const data = await res.json();
      targetCategoryId = data.category.id;
    }

    if (!targetCategoryId) {
      setError("インポート先のカテゴリを選択するか、新しいカテゴリ名を入力してください。");
      return;
    }

    const get = (row: string[], field: string) => {
      const idx = mapping[field];
      return idx === null || idx === undefined ? "" : (row[idx] ?? "").trim();
    };

    const words = preview.rows
      .map((row, i) => ({
        german: get(row, "german"),
        englishGloss: get(row, "englishGloss") || undefined,
        japaneseGloss: get(row, "japaneseGloss") || undefined,
        partOfSpeech: get(row, "partOfSpeech") || undefined,
        gender: get(row, "gender") || undefined,
        pluralForm: get(row, "pluralForm") || undefined,
        ipa: get(row, "ipa") || undefined,
        definition: get(row, "definition") || undefined,
        notes: get(row, "notes") || undefined,
        exampleGerman: get(row, "exampleGerman") || undefined,
        exampleEnglish: get(row, "exampleEnglish") || undefined,
        sourceRow: i + 2, // +1 for header row, +1 for 1-indexing
      }))
      .filter((w) => w.german);

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/import/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId: targetCategoryId, words }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ? JSON.stringify(data.error) : "インポートに失敗しました");
        return;
      }
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-gray-500">ファイルを選択 (.xlsx / .csv)</span>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block mt-1"
          />
        </label>
        <button
          onClick={upload}
          disabled={!file || loading}
          className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "読み込み中..." : "読み込む"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {preview && (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 space-y-4">
          <p className="text-sm text-gray-500">
            {preview.totalRows} 行検出{preview.truncated ? "（プレビューは先頭500行まで）" : ""}
          </p>

          <div>
            <h3 className="font-medium mb-2">列の対応付け</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(FIELD_LABELS).map(([field, label]) => (
                <label key={field} className="block text-sm">
                  <span className="text-gray-500">{label}</span>
                  <select
                    className="input mt-1"
                    value={mapping[field] ?? ""}
                    onChange={(e) =>
                      setMapping({
                        ...mapping,
                        [field]: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                  >
                    <option value="">（使用しない）</option>
                    {preview.headers.map((h, i) => (
                      <option key={i} value={i}>
                        列{i + 1}: {h || "(無題)"}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">プレビュー (先頭5行)</h3>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse">
                <thead>
                  <tr>
                    {preview.headers.map((h, i) => (
                      <th key={i} className="border border-black/10 dark:border-white/10 px-2 py-1 text-left">
                        {h || `列${i + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border border-black/10 dark:border-white/10 px-2 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="text-gray-500">インポート先カテゴリ</span>
              <select
                className="input mt-1"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">（新しく作成）</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            {!categoryId && (
              <label className="block text-sm">
                <span className="text-gray-500">新しいカテゴリ名</span>
                <input
                  className="input mt-1"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="例: 旅行の語彙"
                />
              </label>
            )}
          </div>

          <button
            onClick={commit}
            disabled={loading || mapping.german === null || mapping.german === undefined}
            className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "インポート中..." : `${preview.totalRows}件をインポート`}
          </button>
          {mapping.german === null && (
            <p className="text-sm text-amber-600">「ドイツ語」列の対応付けが必要です。</p>
          )}
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-emerald-300 dark:border-emerald-800 p-4 bg-emerald-50/40 dark:bg-emerald-950/20">
          <p>
            ✅ {result.created}件を追加しました（{result.skipped}件は重複または空のためスキップ）。
          </p>
        </div>
      )}
    </div>
  );
}
