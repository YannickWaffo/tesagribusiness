import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fmtPrice } from "@/lib/format";
import { SignOutButton } from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-tes-bg px-6 py-[60px] md:px-11">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-tes-ink">Mon espace client</h1>
            <p className="text-sm text-tes-muted">
              {session.user.name ?? session.user.email}
            </p>
          </div>
          <SignOutButton />
        </div>

        <h2 className="mb-3.5 text-lg font-extrabold text-tes-ink">Mes commandes</h2>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-tes-border bg-white p-[26px] text-center text-sm text-tes-muted">
            Vous n&apos;avez pas encore passé de commande.
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-tes-border bg-white p-[22px]">
                <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-bold text-tes-ink">{order.id}</div>
                  <div className="text-xs text-tes-muted-4">
                    {dateFmt.format(order.createdAt)}
                  </div>
                </div>
                <div className="mb-2.5 text-xs text-tes-muted">
                  {order.items.map((it) => `${it.quantity}× ${it.product.name}`).join(", ")}
                </div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-tes-chip px-3 py-1 text-xs font-bold text-tes-green">
                    {order.status}
                  </span>
                  <span className="text-sm font-extrabold text-tes-ink">
                    {fmtPrice(order.totalFcfa)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
