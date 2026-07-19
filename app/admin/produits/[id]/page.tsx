import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductImage } from "@/components/ProductImage";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/produits" className="text-sm font-bold text-tes-green">
          ← Retour aux produits
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-tes-ink">Modifier « {product.name} »</h1>
      </div>
      <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-2xl border border-tes-border bg-white p-3">
        <ProductImage src={product.imageUrl} alt={product.name} className="h-full w-full" />
      </div>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        product={{
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          priceFcfa: product.priceFcfa,
          description: product.description,
          tag: product.tag,
          imageUrl: product.imageUrl,
        }}
      />
    </div>
  );
}
