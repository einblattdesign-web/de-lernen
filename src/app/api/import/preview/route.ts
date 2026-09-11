import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

const MAX_PREVIEW_ROWS = 500;

// Header names we recognize when auto-suggesting a column mapping. Matched
// case-insensitively against the header cell text.
const FIELD_HINTS: Record<string, string[]> = {
  german: ["german", "deutsch", "独語", "ドイツ語", "単語", "word"],
  englishGloss: ["english", "englisch", "英語", "英訳", "meaning"],
  japaneseGloss: ["japanese", "japanisch", "日本語", "和訳", "意味"],
  partOfSpeech: ["part of speech", "wortart", "品詞", "pos"],
  gender: ["gender", "genus", "artikel", "性", "冠詞"],
  pluralForm: ["plural", "plural form", "複数形"],
  ipa: ["ipa", "pronunciation", "発音", "発音記号"],
  definition: ["definition", "erklärung", "説明", "定義", "dictionary"],
  notes: ["notes", "memo", "備考", "メモ"],
  exampleGerman: ["example", "beispiel", "例文", "例文（独）", "例文(独)"],
  exampleEnglish: ["example english", "beispiel englisch", "例文（英）", "例文(英)", "例文訳"],
};

function guessMapping(headers: string[]): Record<string, number | null> {
  const mapping: Record<string, number | null> = {};
  for (const field of Object.keys(FIELD_HINTS)) {
    mapping[field] = null;
  }
  headers.forEach((header, index) => {
    const lower = header.trim().toLowerCase();
    for (const [field, hints] of Object.entries(FIELD_HINTS)) {
      if (mapping[field] !== null) continue;
      if (hints.some((hint) => lower.includes(hint.toLowerCase()))) {
        mapping[field] = index;
      }
    }
  });
  return mapping;
}

async function parseCsvBuffer(buffer: Buffer): Promise<string[][]> {
  const text = buffer.toString("utf-8").replace(/^﻿/, "");
  const lines = text.split(/\r\n|\n|\r/).filter((line) => line.length > 0);
  return lines.map((line) => {
    // Minimal CSV parsing: supports quoted fields containing commas.
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          current += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          current += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        cells.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current);
    return cells.map((c) => c.trim());
  });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const isCsv = file.name.toLowerCase().endsWith(".csv");

  let rows: string[][];

  if (isCsv) {
    rows = await parseCsvBuffer(buffer);
  } else {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as unknown as ArrayBuffer);
    const sheet = workbook.worksheets[0];
    if (!sheet) {
      return NextResponse.json({ error: "シートが見つかりません" }, { status: 400 });
    }
    rows = [];
    sheet.eachRow({ includeEmpty: false }, (row) => {
      const values = (row.values as ExcelJS.CellValue[]).slice(1); // index 0 is unused by ExcelJS
      rows.push(
        values.map((v) => {
          if (v === null || v === undefined) return "";
          if (typeof v === "object" && "text" in (v as object)) return String((v as { text: unknown }).text);
          if (typeof v === "object" && "result" in (v as object)) return String((v as { result: unknown }).result);
          return String(v);
        })
      );
    });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: "データが見つかりません" }, { status: 400 });
  }

  const headers = rows[0];
  const dataRows = rows.slice(1, 1 + MAX_PREVIEW_ROWS);
  const truncated = rows.length - 1 > MAX_PREVIEW_ROWS;

  return NextResponse.json({
    headers,
    rows: dataRows,
    totalRows: rows.length - 1,
    truncated,
    suggestedMapping: guessMapping(headers),
  });
}
