import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/produits" className="text-sm font-bold text-tes-green">
          ← Retour aux produits
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-tes-ink">Nouveau produit</h1>
      </div>
      <ProductForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
    </div>
  );
}
