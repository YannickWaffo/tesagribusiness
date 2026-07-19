import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { fmtPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="bg-white">
      <div className="px-6 pt-5 md:px-11">
        <div className="mx-auto max-w-[1240px] text-[13px] font-semibold text-tes-muted">
          <Link href="/" className="text-tes-muted">
            Accueil
          </Link>{" "}
          /{" "}
          <Link href="/catalogue" className="text-tes-muted">
            Catalogue
          </Link>{" "}
          / <span className="text-tes-ink">{product.name}</span>
        </div>
      </div>

      <div className="px-6 pt-[30px] pb-[60px] md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-[50px] lg:grid-cols-2">
          <div className="relative flex h-[420px] items-center justify-center rounded-3xl border border-tes-border bg-tes-bg p-9">
            <ProductImage src={product.imageUrl} alt={product.name} eager className="h-full w-full" />
            {product.tag && (
              <span className="absolute top-5 left-5 rounded-full bg-tes-gold px-3.5 py-1.5 text-xs font-extrabold text-tes-ink">
                {product.tag}
              </span>
            )}
          </div>
          <div>
            <div className="mb-2.5 text-[13px] font-bold text-tes-green">
              {product.category.name}
            </div>
            <h1 className="mb-3.5 text-[34px] leading-tight font-extrabold text-tes-ink">
              {product.name}
            </h1>
            <div className="mb-[18px] text-[15px] tracking-[2px] text-tes-gold">
              ★★★★★{" "}
              <span className="ml-1.5 text-[13px] tracking-normal text-tes-muted-4">
                (4.9/5 · avis clients)
              </span>
            </div>
            <div className="mb-[22px] text-[30px] font-extrabold text-tes-ink">
              {fmtPrice(product.priceFcfa)}
            </div>
            <p className="mb-[26px] text-[15px] leading-relaxed text-tes-muted">
              {product.description}
            </p>
            <div className="mb-[26px] flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#2b3a2c]">
                <span className="h-2 w-2 rounded-full bg-tes-green" />
                Livraison en boutique sous 48h
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#2b3a2c]">
                <span className="h-2 w-2 rounded-full bg-tes-gold" />
                Garantie constructeur &amp; SAV inclus
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#2b3a2c]">
                <span className="h-2 w-2 rounded-full bg-tes-green" />
                Installation et formation disponibles
              </div>
            </div>
            <ProductActions
              product={{
                id: product.id,
                name: product.name,
                category: product.category.name,
                priceFcfa: product.priceFcfa,
                imageUrl: product.imageUrl,
              }}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-tes-bg px-6 pt-[50px] pb-[70px] md:px-11">
          <div className="mx-auto max-w-[1240px]">
            <h2 className="mb-[22px] text-2xl font-extrabold text-tes-ink">
              Dans la même catégorie
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
