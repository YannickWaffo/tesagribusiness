import { createConnection } from "node:net";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SCHEMA_STATEMENTS } from "@/lib/setup/schema-sql";
import { seedDatabase } from "@/lib/setup/seed";

export const dynamic = "force-dynamic";

function tcpProbe(host: string, port: number): Promise<string> {
  return new Promise((resolve) => {
    const started = Date.now();
    let connectedAt = 0;
    const socket = createConnection({ host, port, timeout: 5000 });
    socket.on("connect", () => {
      connectedAt = Date.now() - started;
      // A MySQL server sends its handshake greeting immediately on
      // connect; if it never arrives the protocol is being filtered.
    });
    socket.on("data", (chunk) => {
      socket.destroy();
      resolve(
        `connected in ${connectedAt}ms, greeting received in ${Date.now() - started}ms (${chunk.length} bytes)`
      );
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(
        connectedAt
          ? `connected in ${connectedAt}ms but NO greeting within 5000ms (protocol filtered)`
          : "timeout after 5000ms"
      );
    });
    socket.on("error", (e) => resolve(`error: ${e.message}`));
  });
}

// One-time database initialization for hosts without shell access:
// creates the schema (idempotent) then seeds reference data (upserts).
// GET /api/setup?key=<AUTH_SECRET>
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUrl = new URL(process.env.DATABASE_URL!);
  const target = {
    host: dbUrl.hostname,
    port: dbUrl.port ? Number(dbUrl.port) : 3306,
    database: dbUrl.pathname.replace(/^\//, ""),
    user: dbUrl.username,
  };
  const tcp = await tcpProbe(target.host, target.port);

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

    return NextResponse.json({ ok: true, target, tcp, applied, skipped, seeded: counts });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, target, tcp, applied, skipped, error: message },
      { status: 500 }
    );
  }
}
