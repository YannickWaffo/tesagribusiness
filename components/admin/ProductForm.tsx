"use client";

import { useActionState } from "react";
import { createProduct, updateProduct, type AdminActionState } from "@/lib/actions/admin";

type CategoryOption = { id: string; name: string };

export type ProductFormValues = {
  id: string;
  name: string;
  categoryId: string;
  priceFcfa: number;
  description: string;
  tag: string | null;
  imageUrl: string;
};

const initialState: AdminActionState = null;

export function ProductForm({
  categories,
  product,
}: {
  categories: CategoryOption[];
  product?: ProductFormValues;
}) {
  const action = product ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-[640px] rounded-2xl border border-tes-border bg-white p-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <Field label="Nom du produit">
        <input
          name="name"
          defaultValue={product?.name}
          required
          placeholder="Ex : Tronçonneuse STIHL 070"
          className="w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Catégorie">
          <select
            name="categoryId"
            defaultValue={product?.categoryId ?? ""}
            required
            className="w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
          >
            <option value="" disabled>
              Choisir…
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prix (FCFA)">
          <input
            name="priceFcfa"
            type="number"
            min={1}
            step={1}
            defaultValue={product?.priceFcfa}
            required
            placeholder="Ex : 485000"
            className="w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
          />
        </Field>
      </div>

      <Field label="Badge (optionnel)">
        <select
          name="tag"
          defaultValue={product?.tag ?? ""}
          className="w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
        >
          <option value="">Aucun</option>
          <option value="Nouveau">Nouveau</option>
          <option value="Promo">Promo</option>
          <option value="Best-seller">Best-seller</option>
        </select>
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          required
          placeholder="Description du produit…"
          className="w-full resize-none rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
        />
      </Field>

      <Field
        label={
          product
            ? "Nouvelle photo (optionnel — laisser vide pour garder l'actuelle)"
            : "Photo du produit"
        }
      >
        <input
          name="image"
          type="file"
          accept="image/*"
          required={!product}
          className="w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-2.5 text-sm text-tes-ink outline-none file:mr-3 file:rounded-full file:border-0 file:bg-tes-green file:px-4 file:py-2 file:text-xs file:font-bold file:text-white"
        />
        <p className="mt-1.5 text-xs text-tes-muted-4">
          L&apos;image sera automatiquement redimensionnée (800px max) et compressée en WebP.
        </p>
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-full bg-tes-green py-3.5 text-[15px] font-bold text-white disabled:opacity-70"
      >
        {pending ? "Enregistrement…" : product ? "Enregistrer les modifications" : "Créer le produit"}
      </button>

      {state && (
        <p className={`mt-3 text-sm font-semibold ${state.ok ? "text-tes-green" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-bold text-tes-muted-3">{label}</label>
      {children}
    </div>
  );
}
