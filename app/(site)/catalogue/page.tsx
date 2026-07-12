import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ cat?: string; search?: string; sort?: string }>;

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat, search, sort } = await searchParams;
  const active = cat && cat !== "Tous" ? cat : "Tous";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category: active, search }),
  ]);

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.priceFcfa - b.priceFcfa;
    if (sort === "price-desc") return b.priceFcfa - a.priceFcfa;
    return 0;
  });

  const chips = ["Tous", ...categories.map((c) => c.name)];

  return (
    <div className="bg-white">
      {/* TITLE */}
      <div className="bg-tes-bg px-6 pt-[52px] pb-[30px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">Catalogue</span>
          </div>
          <h1 className="mb-2 text-[32px] font-extrabold text-tes-ink md:text-[42px]">
            Catalogue complet
          </h1>
          <p className="text-base text-tes-muted">
            {sorted.length} machine{sorted.length > 1 ? "s" : ""} disponible
            {sorted.length > 1 ? "s" : ""} · achetables en ligne, livrables en boutique
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="sticky top-[81px] z-30 border-b border-tes-border bg-tes-bg px-6 py-[22px] md:px-11">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2.5 overflow-x-auto">
            {chips.map((name) => (
              <Link
                key={name}
                href={{
                  pathname: "/catalogue",
                  query: {
                    ...(name !== "Tous" ? { cat: name } : {}),
                    ...(search ? { search } : {}),
                    ...(sort ? { sort } : {}),
                  },
                }}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold whitespace-nowrap ${
                  active === name
                    ? "border-tes-green bg-tes-green text-white"
                    : "border-tes-border-soft bg-white text-tes-muted-2"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
          <form action="/catalogue" method="GET" className="flex gap-2">
            {active !== "Tous" && <input type="hidden" name="cat" value={active} />}
            <select
              name="sort"
              defaultValue={sort ?? ""}
              className="rounded-full border border-tes-border-soft bg-white px-4 py-2.5 text-sm font-semibold text-tes-muted-2 outline-none"
            >
              <option value="">Trier par prix</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </form>
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 pt-11 pb-[70px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-[60px] text-center text-[15px] text-tes-muted-4">
              Aucune machine dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
