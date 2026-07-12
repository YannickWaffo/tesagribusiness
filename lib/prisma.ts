import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const url = new URL(process.env.DATABASE_URL!);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    // The database lives on a separate server from the app container;
    // the driver's 1s connect default is too short for that first hop.
    connectTimeout: 20000,
    acquireTimeout: 20000,
    // Hostinger caps max_connections_per_hour at 500 per DB user, so keep
    // the pool tiny and recycle idle connections every 5 min (~24 new
    // connections/hour at rest). Do NOT set minimumIdle: with it the pool
    // never creates any connection at all (verified via /api/setup probes).
    connectionLimit: 2,
    idleTimeout: 300,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
