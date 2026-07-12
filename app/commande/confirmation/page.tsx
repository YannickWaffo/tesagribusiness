import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { fmtPrice } from "@/lib/format";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const order = ref ? await prisma.order.findUnique({ where: { id: ref } }) : null;

  return (
    <div className="flex min-h-screen flex-col bg-tes-bg">
      <div className="flex items-center gap-2.5 px-6 py-[18px] md:px-11">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tes-ink text-xs font-extrabold text-white">
          TES
        </span>
        <span className="text-[17px] font-extrabold text-tes-ink">{COMPANY.name}</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-[22px] pt-5 pb-[60px]">
        <div className="animate-reveal-up w-full max-w-[520px] rounded-3xl border border-tes-border bg-white p-10 text-center">
          <div className="mx-auto mb-[22px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-tes-chip">
            <span className="text-[34px] text-tes-green">✓</span>
          </div>
          <h1 className="mb-2.5 text-2xl font-extrabold text-tes-ink">Commande confirmée</h1>
          <p className="mb-[22px] text-sm leading-relaxed text-tes-muted">
            {order
              ? "Votre commande a été enregistrée. Un conseiller vous contacte sous peu pour confirmer les modalités de paiement."
              : "Nous n'avons pas retrouvé les détails de cette commande, mais un conseiller reste disponible pour vous aider."}
          </p>

          {order && (
            <div className="mb-6 rounded-2xl bg-tes-bg p-[18px] text-left">
              <Row label="Référence" value={order.id} />
              <Row label="Montant" value={fmtPrice(order.totalFcfa)} />
              <Row
                label="Réception"
                value={
                  order.deliveryMode === "delivery"
                    ? "Livraison à domicile"
                    : `Retrait en boutique${order.storeCity ? " — " + order.storeCity : ""}`
                }
                last
              />
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <a
              href={COMPANY.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-tes-whatsapp py-3.5 text-sm font-bold text-white"
            >
              Suivre ma commande sur WhatsApp
            </a>
            <Link href="/" className="p-2 text-sm font-bold text-tes-green">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between text-[13px] text-tes-muted-3 ${last ? "" : "mb-2"}`}>
      <span>{label}</span>
      <span className="font-bold text-tes-ink">{value}</span>
    </div>
  );
}
