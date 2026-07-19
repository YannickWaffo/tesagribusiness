import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { fmtPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";
import { deleteProduct } from "@/lib/actions/admin";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-tes-ink">
          Produits <span className="text-base font-semibold text-tes-muted-4">({products.length})</span>
        </h1>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-full bg-tes-green px-5 py-3 text-sm font-bold text-white"
        >
          + Ajouter un produit
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-tes-border bg-white p-4"
          >
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-tes-bg p-1.5">
              <ProductImage src={p.imageUrl} alt={p.name} className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-tes-green">{p.category.name}</div>
              <div className="font-bold text-tes-ink">
                {p.name}
                {p.tag && (
                  <span className="ml-2 rounded-full bg-tes-gold px-2 py-0.5 text-[10px] font-extrabold text-tes-ink">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="text-sm font-extrabold text-tes-ink">{fmtPrice(p.priceFcfa)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/produits/${p.id}`}
                className="rounded-full border border-tes-border-soft px-4 py-2 text-sm font-bold text-tes-ink"
              >
                Modifier
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
