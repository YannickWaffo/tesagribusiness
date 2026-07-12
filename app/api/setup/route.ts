import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SCHEMA_STATEMENTS } from "@/lib/setup/schema-sql";
import { seedDatabase } from "@/lib/setup/seed";

export const dynamic = "force-dynamic";

// One-time database initialization for hosts without shell access:
// creates the schema (idempotent) then seeds reference data (upserts).
// GET /api/setup?key=<AUTH_SECRET>
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applied: string[] = [];
  const skipped: string[] = [];

  try {
    for (const statement of SCHEMA_STATEMENTS) {
      const label = statement.slice(0, 60).replace(/\s+/g, " ");
      try {
        await prisma.$executeRawUnsafe(statement);
        applied.push(label);
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        // Constraint/index already in place from a previous run
        if (/already exists|Duplicate/i.test(message)) {
          skipped.push(label);
        } else {
          throw e;
        }
      }
    }

    const counts = await seedDatabase(prisma);

    return NextResponse.json({ ok: true, applied, skipped, seeded: counts });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, applied, skipped, error: message }, { status: 500 });
  }
}
