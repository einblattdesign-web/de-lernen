import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.appSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  return NextResponse.json({ settings });
}

const schema = z.object({
  dailyNewWordLimit: z.number().int().min(1).max(200),
});

export async function PUT(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const settings = await prisma.appSettings.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: { id: 1, ...parsed.data },
  });
  return NextResponse.json({ settings });
}
