import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { words: true, exercises: true } } },
  });
  return NextResponse.json({ categories });
}

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

function slugify(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9぀-ヿ㐀-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `category-${Date.now()}`;
}

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { name, description } = parsed.data;
  let key = slugify(name);
  let suffix = 1;
  while (await prisma.category.findUnique({ where: { key } })) {
    key = `${slugify(name)}-${++suffix}`;
  }
  const category = await prisma.category.create({ data: { key, name, description } });
  return NextResponse.json({ category }, { status: 201 });
}
