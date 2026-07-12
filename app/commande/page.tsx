"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/actions/orders";
import { fmtPrice } from "@/lib/format";
import { COMPANY, DELIVERY_FEE, STORES } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [storeCity, setStoreCity] = useState(STORES[0].city);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const deliveryFee = mode === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  function submit() {
    setError("");
    startTransition(async () => {
      const result = await createOrder({
        items: items.map((it) => ({ id: it.id, qty: it.qty })),
        customerName: name,
        phone,
        deliveryMode: mode,
        storeCity: mode === "pickup" ? storeCity : undefined,
        address: mode === "delivery" ? address : undefined,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      clearCart();
      router.push(`/commande/confirmation?ref=${result.orderId}`);
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-tes-border px-6 py-[18px] md:px-11">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-tes-ink text-sm font-extrabold text-white shadow-[0_4px_14px_-5px_rgba(20,40,26,.5)]">
            TES
          </span>
          <span className="text-lg font-extrabold whitespace-nowrap text-tes-ink">
            {COMPANY.name}
          </span>
        </Link>
        <div className="text-sm font-semibold text-tes-muted-4">
          Panier → <span className="text-tes-ink">Paiement</span> → Confirmation
        </div>
        <Link href="/panier" className="text-sm font-bold text-tes-green">
          ← Retour au panier
        </Link>
      </div>

      <div className="px-6 pt-10 pb-20 md:px-11">
        <h1 className="mx-auto mb-7 max-w-[1100px] text-[32px] font-extrabold text-tes-ink">
          Finaliser la commande
        </h1>

        {items.length === 0 ? (
          <div className="mx-auto max-w-[1100px] rounded-2xl border border-tes-border bg-tes-bg p-8 text-center text-tes-muted">
            Votre panier est vide.{" "}
            <Link href="/catalogue" className="font-bold text-tes-green">
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-9 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-[22px]">
              <div className="rounded-[20px] border border-tes-border bg-tes-bg p-[26px]">
                <div className="mb-[18px] text-[17px] font-extrabold text-tes-ink">Vos coordonnées</div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-tes-muted-3">Nom complet</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-white px-3.5 py-3 text-sm text-tes-ink outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-tes-muted-3">
                      Téléphone (Mobile Money)
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+237 6…"
                      className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-white px-3.5 py-3 text-sm text-tes-ink outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-tes-border bg-tes-bg p-[26px]">
                <div className="mb-[18px] text-[17px] font-extrabold text-tes-ink">
                  Mode de réception
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] bg-white px-4 py-3.5 ${
                      mode === "pickup" ? "border-tes-green" : "border-tes-border-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={mode === "pickup"}
                      onChange={() => setMode("pickup")}
                      className="h-[18px] w-[18px] accent-tes-green"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-tes-ink">Retrait en boutique</div>
                      <div className="text-xs text-tes-muted-4">Gratuit · disponible sous 24h</div>
                    </div>
                    <div className="text-sm font-extrabold text-tes-green">0 FCFA</div>
                  </label>
                  {mode === "pickup" && (
                    <select
                      value={storeCity}
                      onChange={(e) => setStoreCity(e.target.value)}
                      className="rounded-xl border border-tes-border-soft bg-white px-3.5 py-3 text-sm text-tes-ink outline-none"
                    >
                      {STORES.map((s) => (
                        <option key={s.city} value={s.city}>
                          {s.city} — {s.address}
                        </option>
                      ))}
                    </select>
                  )}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] bg-white px-4 py-3.5 ${
                      mode === "delivery" ? "border-tes-green" : "border-tes-border-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={mode === "delivery"}
                      onChange={() => setMode("delivery")}
                      className="h-[18px] w-[18px] accent-tes-green"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-tes-ink">Livraison à domicile</div>
                      <div className="text-xs text-tes-muted-4">Sous 48h · zones urbaines</div>
                    </div>
                    <div className="text-sm font-extrabold text-tes-green">
                      {fmtPrice(DELIVERY_FEE)}
                    </div>
                  </label>
                  {mode === "delivery" && (
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Adresse complète de livraison…"
                      className="resize-none rounded-xl border border-tes-border-soft bg-white px-3.5 py-3 text-sm text-tes-ink outline-none"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[20px] bg-tes-ink p-[26px] lg:sticky lg:top-[24px]">
              <div className="mb-4 text-[17px] font-extrabold text-white">Votre commande</div>
              <div className="mb-4 flex max-h-[220px] flex-col gap-2.5 overflow-y-auto">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between text-[13px] text-[#cfe0d1]">
                    <span>
                      {it.qty}× {it.name}
                    </span>
                    <span className="font-semibold text-white">
                      {fmtPrice(it.price * it.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-white/10 pt-3.5">
                <div className="flex justify-between text-sm text-[#9fb6a6]">
                  <span>Sous-total</span>
                  <span className="text-white">{fmtPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#9fb6a6]">
                  <span>Livraison</span>
                  <span className="text-white">{fmtPrice(deliveryFee)}</span>
                </div>
                <div className="mt-1.5 flex justify-between text-[17px] font-extrabold text-white">
                  <span>Total</span>
                  <span>{fmtPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={submit}
                disabled={pending}
                className="mt-[22px] w-full rounded-full bg-tes-green py-4 text-[15px] font-bold text-white transition-opacity disabled:opacity-70"
              >
                {pending ? "Traitement en cours…" : "Confirmer la commande"}
              </button>
              <div className="mt-3.5 text-center text-[11px] text-[#7e9186]">
                Paiement Mobile Money ou espèces à la livraison / en boutique.
              </div>
              {error && (
                <div className="mt-3.5 rounded-[10px] border border-[rgba(214,90,73,.4)] bg-[rgba(214,90,73,.15)] px-3 py-2.5 text-xs text-[#f2b8ae]">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
