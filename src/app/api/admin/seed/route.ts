import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runSeed } from "@/lib/seedData";

// One-off utility to seed a deployed database whose connection string isn't
// directly copyable (e.g. a masked Vercel env var). Relies on the app-wide
// Basic Auth proxy (src/proxy.ts) for protection in production. Safe to
// call more than once: every insert is skip-if-exists / upsert.
export async function GET() {
  const result = await runSeed(prisma);
  return NextResponse.json({ ok: true, ...result });
}

export async function POST() {
  return GET();
}
