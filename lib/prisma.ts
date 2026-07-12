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
    // The database lives on a separate server from the app container, and
    // its first handshake can stall well past the driver defaults (1s
    // connect, 10s pool acquire) while the server resolves the client.
    connectTimeout: 25000,
    acquireTimeout: 30000,
    // Hostinger caps max_connections_per_hour at 500 per DB user, so the
    // pool must not hold idle connections that the server kills and the
    // pool then endlessly recreates: keep at most 2, recycle them
    // ourselves after 60s idle, and skip the reset roundtrip on release.
    connectionLimit: 2,
    minimumIdle: 0,
    idleTimeout: 60,
    resetAfterUse: false,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
