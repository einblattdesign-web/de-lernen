// Vercel's Postgres/Neon storage integration injects connection strings
// under its own env var names (POSTGRES_URL, POSTGRES_PRISMA_URL, ...)
// rather than DATABASE_URL. Prisma only reads DATABASE_URL (per
// prisma/schema.prisma), so if it isn't set explicitly, fall back to
// whichever Vercel-provided var exists and write it into .env before the
// build runs `prisma migrate deploy` / `next build`.
import { appendFileSync, existsSync, readFileSync } from "node:fs";

const envFileHasDatabaseUrl =
  existsSync(".env") && /^DATABASE_URL=/m.test(readFileSync(".env", "utf-8"));

if (process.env.DATABASE_URL || envFileHasDatabaseUrl) {
  process.exit(0);
}

const fallback =
  process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!fallback) {
  console.warn(
    "[resolve-database-url] No DATABASE_URL (or POSTGRES_URL / POSTGRES_PRISMA_URL) env var found. " +
      "Set DATABASE_URL in your deployment environment."
  );
  process.exit(0);
}

appendFileSync(".env", `DATABASE_URL="${fallback}"\n`);
console.log("[resolve-database-url] DATABASE_URL was not set; using Vercel Postgres connection string instead.");
