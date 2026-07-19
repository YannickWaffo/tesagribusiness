import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { fmtPrice } from "@/lib/format";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, pendingCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-tes-ink">Tableau de bord</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Produits au catalogue" value={String(productCount)} href="/admin/produits" />
        <StatCard label="Commandes au total" value={String(orderCount)} href="/admin/commandes" />
        <StatCard label="Commandes en attente" value={String(pendingCount)} href="/admin/commandes" />
      </div>

      <div className="rounded-2xl border border-tes-border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-extrabold text-tes-ink">Dernières commandes</h2>
          <Link href="/admin/commandes" className="text-sm font-bold text-tes-green">
            Tout voir →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-tes-muted">Aucune commande pour le moment.</p>
        ) : (
          <div className="flex flex-col divide-y divide-tes-border">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <div>
                  <span className="font-bold text-tes-ink">{o.customerName}</span>{" "}
                  <span className="text-tes-muted-4">· {o.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-tes-muted-3">
                    {o.items.length} article{o.items.length > 1 ? "s" : ""}
                  </span>
                  <span className="font-extrabold text-tes-ink">{fmtPrice(o.totalFcfa)}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-tes-border bg-white p-6">
      <div className="text-3xl font-extrabold text-tes-green">{value}</div>
      <div className="mt-1 text-sm font-semibold text-tes-muted-3">{label}</div>
    </Link>
  );
}
