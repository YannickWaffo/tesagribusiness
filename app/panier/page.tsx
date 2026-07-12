"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ProductImage } from "@/components/ProductImage";
import { fmtPrice } from "@/lib/format";
import { COMPANY } from "@/lib/constants";

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 flex items-center justify-between gap-5 border-b border-tes-border bg-white/[0.92] px-6 py-[18px] backdrop-blur-sm md:px-11">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-tes-ink text-sm font-extrabold text-white shadow-[0_4px_14px_-5px_rgba(20,40,26,.5)]">
            TES
          </span>
          <span className="text-lg font-extrabold whitespace-nowrap text-tes-ink">
            {COMPANY.name}
          </span>
        </Link>
        <Link
          href="/panier"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tes-chip text-lg text-tes-green"
        >
          🛒
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-tes-green text-[10px] font-extrabold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>

      <div className="px-6 pt-11 pb-2.5 md:px-11">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">Panier</span>
          </div>
          <h1 className="text-4xl font-extrabold text-tes-ink">Votre panier</h1>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="px-6 pt-[26px] pb-[70px] md:px-11">
          <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-3.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-4 rounded-[18px] border border-tes-border bg-tes-bg p-4"
                >
                  <div className="flex h-20 w-20 flex-none items-center justify-center rounded-xl bg-white p-2">
                    <ProductImage src={it.img} alt={it.name} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-[11px] font-bold text-tes-green">{it.cat}</div>
                    <div className="mb-1.5 text-[15px] font-bold text-tes-ink">{it.name}</div>
                    <div className="text-sm font-extrabold text-tes-ink">{fmtPrice(it.price)}</div>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-full border border-tes-border-soft bg-white">
                    <button
                      onClick={() => updateQty(it.id, it.qty - 1)}
                      className="h-[34px] w-[34px] text-[15px] font-extrabold text-tes-ink"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-tes-ink">{it.qty}</span>
                    <button
                      onClick={() => updateQty(it.id, it.qty + 1)}
                      className="h-[34px] w-[34px] text-[15px] font-extrabold text-tes-ink"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-[110px] text-right text-[15px] font-extrabold text-tes-ink">
                    {fmtPrice(it.price * it.qty)}
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-[13px] font-bold text-[#b04a3f]"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-[20px] bg-tes-ink p-[26px] lg:sticky lg:top-[100px]">
              <div className="mb-[18px] text-lg font-extrabold text-white">Résumé de la commande</div>
              <div className="mb-2.5 flex justify-between text-sm text-[#9fb6a6]">
                <span>
                  Sous-total ({count} article{count > 1 ? "s" : ""})
                </span>
                <span className="font-bold text-white">{fmtPrice(subtotal)}</span>
              </div>
              <div className="mb-[18px] text-xs text-[#7e9186]">
                Frais de livraison calculés à l&apos;étape suivante.
              </div>
              <Link
                href="/commande"
                className="block rounded-full bg-tes-green py-4 text-center text-[15px] font-bold text-white"
              >
                Passer à la caisse →
              </Link>
              <Link
                href="/catalogue"
                className="mt-3.5 block text-center text-[13px] font-semibold text-[#9fb6a6]"
              >
                ← Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 pt-[60px] pb-[100px] text-center md:px-11">
          <div className="mx-auto max-w-[420px]">
            <div className="mb-[18px] text-5xl">🛒</div>
            <div className="mb-2.5 text-xl font-extrabold text-tes-ink">
              Votre panier est vide
            </div>
            <p className="mb-6 text-sm text-tes-muted">
              Parcourez notre catalogue pour trouver le matériel qu&apos;il vous faut.
            </p>
            <Link
              href="/catalogue"
              className="inline-block rounded-full bg-tes-green px-7 py-3.5 text-[15px] font-bold text-white"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
