import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { fmtPrice } from "@/lib/format";

export type ProductCardData = {
  slug: string;
  name: string;
  priceFcfa: number;
  imageUrl: string;
  tag?: string | null;
  category: { name: string };
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-tes-border bg-white transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(20,40,26,.45)]"
    >
      <div className="relative flex h-[200px] items-center justify-center border-b border-tes-border/80 bg-white p-[18px]">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full"
        />
        {product.tag && (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-tes-gold px-3 py-1.5 text-[11px] font-extrabold text-tes-ink">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1.5 text-xs font-bold text-tes-green">{product.category.name}</div>
        <div className="mb-3.5 text-lg font-extrabold text-tes-ink">{product.name}</div>
        <div className="flex items-center justify-between">
          <div className="text-[17px] font-extrabold text-tes-ink">
            {fmtPrice(product.priceFcfa)}
          </div>
          <span className="rounded-full bg-tes-green px-[18px] py-2.5 text-[13px] font-bold text-white">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}
