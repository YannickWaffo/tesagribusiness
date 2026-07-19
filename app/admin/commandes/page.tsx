import { prisma } from "@/lib/prisma";
import { fmtPrice } from "@/lib/format";
import { ORDER_STATUSES, StatusBadge } from "@/components/admin/StatusBadge";
import { updateOrderStatus } from "@/lib/actions/admin";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-tes-ink">
        Commandes <span className="text-base font-semibold text-tes-muted-4">({orders.length})</span>
      </h1>

      {orders.length === 0 ? (
        <p className="text-sm text-tes-muted">Aucune commande pour le moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-tes-border bg-white p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-tes-ink">{o.customerName}</div>
                  <div className="text-sm text-tes-muted-3">
                    {o.phone} ·{" "}
                    {o.deliveryMode === "delivery"
                      ? `Livraison — ${o.address ?? ""}`
                      : `Retrait — ${o.storeCity ?? ""}`}
                  </div>
                  <div className="mt-0.5 text-xs text-tes-muted-4">
                    Réf. {o.id} ·{" "}
                    {o.createdAt.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-extrabold text-tes-ink">{fmtPrice(o.totalFcfa)}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>

              <div className="mb-4 rounded-xl bg-tes-bg p-3 text-sm">
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between py-0.5">
                    <span className="text-tes-muted-2">
                      {it.quantity}× {it.product.name}
                    </span>
                    <span className="font-semibold text-tes-ink">
                      {fmtPrice(it.priceFcfa * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <form action={updateOrderStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={o.id} />
                <select
                  name="status"
                  defaultValue={o.status}
                  className="rounded-xl border border-tes-border-soft bg-white px-3 py-2 text-sm text-tes-ink outline-none"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button className="rounded-full bg-tes-ink px-4 py-2 text-sm font-bold text-white">
                  Mettre à jour
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
