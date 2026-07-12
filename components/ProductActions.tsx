"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { COMPANY } from "@/lib/constants";

export function ProductActions({
  product,
}: {
  product: { id: string; name: string; category: string; priceFcfa: number; imageUrl: string };
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        id: product.id,
        name: product.name,
        cat: product.category,
        price: product.priceFcfa,
        img: product.imageUrl,
      },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <div className="flex items-center overflow-hidden rounded-full border border-tes-border-soft">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-lg font-extrabold text-tes-ink"
        >
          −
        </button>
        <span className="w-10 text-center font-bold text-tes-ink">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="h-11 w-11 text-lg font-extrabold text-tes-ink"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`min-w-[200px] flex-1 rounded-full px-7 py-4 text-[15px] font-bold text-white transition-colors ${
          justAdded ? "bg-tes-ink" : "bg-tes-green"
        }`}
      >
        {justAdded ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
      <a
        href={COMPANY.wa}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-tes-border-soft px-[22px] py-4 text-[15px] font-bold text-tes-ink"
      >
        Commander par WhatsApp
      </a>
    </div>
  );
}
