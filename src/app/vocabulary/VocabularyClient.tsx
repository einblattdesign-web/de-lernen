"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@prisma/client";
import SpeakButton from "@/components/SpeakButton";

type Example = { id: string; german: string; englishGloss: string | null; japaneseGloss: string | null };
type Word = {
  id: string;
  german: string;
  englishGloss: string | null;
  japaneseGloss: string | null;
  partOfSpeech: string | null;
  gender: string | null;
  pluralForm: string | null;
  ipa: string | null;
  definition: string | null;
  notes: string | null;
  categoryId: string | null;
  category: Category | null;
  examples: Example[];
};

const emptyForm = {
  german: "",
  englishGloss: "",
  japaneseGloss: "",
  partOfSpeech: "",
  gender: "",
  pluralForm: "",
  ipa: "",
  definition: "",
  notes: "",
  categoryId: "",
  exampleGerman: "",
  exampleEnglish: "",
};

export default function VocabularyClient({ categories }: { categories: Category[] }) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (categoryId) params.set("categoryId", categoryId);
    const res = await fetch(`/api/words?${params.toString()}`);
    const data = await res.json();
    setWords(data.words ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(load, 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryId]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (w: Word) => {
    setForm({
      german: w.german,
      englishGloss: w.englishGloss ?? "",
      japaneseGloss: w.japaneseGloss ?? "",
      partOfSpeech: w.partOfSpeech ?? "",
      gender: w.gender ?? "",
      pluralForm: w.pluralForm ?? "",
      ipa: w.ipa ?? "",
      definition: w.definition ?? "",
      notes: w.notes ?? "",
      categoryId: w.categoryId ?? "",
      exampleGerman: "",
      exampleEnglish: "",
    });
    setEditingId(w.id);
    setShowForm(true);
  };

  const submitForm = async () => {
    if (!form.german.trim()) return;
    const payload = {
      german: form.german,
      englishGloss: form.englishGloss || undefined,
      japaneseGloss: form.japaneseGloss || undefined,
      partOfSpeech: form.partOfSpeech || undefined,
      gender: form.gender || undefined,
      pluralForm: form.pluralForm || undefined,
      ipa: form.ipa || undefined,
      definition: form.definition || undefined,
      notes: form.notes || undefined,
      categoryId: form.categoryId || undefined,
    };

    if (editingId) {
      await fetch(`/api/words/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (form.exampleGerman.trim()) {
        await fetch(`/api/words/${editingId}/examples`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ german: form.exampleGerman, englishGloss: form.exampleEnglish || undefined }),
        });
      }
    } else {
      await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          examples: form.exampleGerman.trim()
            ? [{ german: form.exampleGerman, englishGloss: form.exampleEnglish || undefined }]
            : undefined,
        }),
      });
    }
    resetForm();
    load();
  };

  const deleteWord = async (id: string) => {
    if (!confirm("この単語を削除しますか？")) return;
    await fetch(`/api/words/${id}`, { method: "DELETE" });
    load();
  };

  const deleteExample = async (id: string) => {
    await fetch(`/api/examples/${id}`, { method: "DELETE" });
    load();
  };

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="単語を検索..."
          className="border border-black/10 dark:border-white/20 rounded-lg px-3 py-2 flex-1 min-w-[180px] bg-transparent"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-black/10 dark:border-white/20 rounded-lg px-3 py-2 bg-transparent"
        >
          <option value="">すべてのカテゴリ</option>
          {categoryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700"
        >
          ＋ 単語を追加
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-emerald-300 dark:border-emerald-800 p-4 space-y-3 bg-emerald-50/40 dark:bg-emerald-950/20">
          <h3 className="font-medium">{editingId ? "単語を編集" : "新しい単語を追加"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="ドイツ語 *">
              <input
                className="input"
                value={form.german}
                onChange={(e) => setForm({ ...form, german: e.target.value })}
              />
            </Field>
            <Field label="カテゴリ">
              <select
                className="input"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">未分類</option>
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="英語訳">
              <input
                className="input"
                value={form.englishGloss}
                onChange={(e) => setForm({ ...form, englishGloss: e.target.value })}
              />
            </Field>
            <Field label="日本語訳">
              <input
                className="input"
                value={form.japaneseGloss}
                onChange={(e) => setForm({ ...form, japaneseGloss: e.target.value })}
              />
            </Field>
            <Field label="品詞">
              <input
                className="input"
                placeholder="Nomen / Verb / Adjektiv..."
                value={form.partOfSpeech}
                onChange={(e) => setForm({ ...form, partOfSpeech: e.target.value })}
              />
            </Field>
            <Field label="性 (der/die/das)">
              <input
                className="input"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
            </Field>
            <Field label="複数形">
              <input
                className="input"
                value={form.pluralForm}
                onChange={(e) => setForm({ ...form, pluralForm: e.target.value })}
              />
            </Field>
            <Field label="発音 (IPA、任意)">
              <input
                className="input"
                value={form.ipa}
                onChange={(e) => setForm({ ...form, ipa: e.target.value })}
              />
            </Field>
          </div>
          <Field label="辞書的な説明・定義">
            <textarea
              className="input"
              rows={2}
              value={form.definition}
              onChange={(e) => setForm({ ...form, definition: e.target.value })}
            />
          </Field>
          <Field label="メモ">
            <textarea
              className="input"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="例文 (ドイツ語)">
              <input
                className="input"
                value={form.exampleGerman}
                onChange={(e) => setForm({ ...form, exampleGerman: e.target.value })}
              />
            </Field>
            <Field label="例文の訳 (英語)">
              <input
                className="input"
                value={form.exampleEnglish}
                onChange={(e) => setForm({ ...form, exampleEnglish: e.target.value })}
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <button
              onClick={submitForm}
              className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700"
            >
              保存
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg border border-black/10 dark:border-white/20 px-4 py-2"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">読み込み中...</p>
      ) : words.length === 0 ? (
        <p className="text-gray-500">まだ単語がありません。「＋ 単語を追加」またはインポートで追加しましょう。</p>
      ) : (
        <ul className="space-y-2">
          {words.map((w) => (
            <li key={w.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-lg">
                      {w.gender ? `${w.gender} ` : ""}
                      {w.german}
                    </span>
                    <SpeakButton text={w.german} />
                    {w.partOfSpeech && (
                      <span className="text-xs rounded-full bg-gray-100 dark:bg-white/10 px-2 py-0.5 text-gray-500">
                        {w.partOfSpeech}
                      </span>
                    )}
                    {w.category && (
                      <span className="text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">
                        {w.category.name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {[w.englishGloss, w.japaneseGloss].filter(Boolean).join(" / ") || "訳語未登録"}
                    {w.pluralForm ? ` ・ 複数形: ${w.pluralForm}` : ""}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
                    className="text-sm text-gray-500 hover:text-emerald-700 px-2 py-1"
                  >
                    {expandedId === w.id ? "閉じる" : "詳細"}
                  </button>
                  <button
                    onClick={() => startEdit(w)}
                    className="text-sm text-gray-500 hover:text-emerald-700 px-2 py-1"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => deleteWord(w.id)}
                    className="text-sm text-gray-500 hover:text-red-600 px-2 py-1"
                  >
                    削除
                  </button>
                </div>
              </div>

              {expandedId === w.id && (
                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/10 space-y-2 text-sm">
                  {w.definition && (
                    <p>
                      <span className="text-gray-400">定義: </span>
                      {w.definition}
                    </p>
                  )}
                  {w.notes && (
                    <p>
                      <span className="text-gray-400">メモ: </span>
                      {w.notes}
                    </p>
                  )}
                  {w.examples.length > 0 && (
                    <div>
                      <p className="text-gray-400 mb-1">例文:</p>
                      <ul className="space-y-1">
                        {w.examples.map((ex) => (
                          <li key={ex.id} className="flex items-start justify-between gap-2">
                            <span>
                              <SpeakButton text={ex.german} className="mr-1 inline" />
                              {ex.german}
                              {ex.englishGloss && (
                                <span className="text-gray-400"> — {ex.englishGloss}</span>
                              )}
                            </span>
                            <button
                              onClick={() => deleteExample(ex.id)}
                              className="text-gray-400 hover:text-red-600 text-xs shrink-0"
                            >
                              削除
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-gray-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
