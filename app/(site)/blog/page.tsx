import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = cat ?? "Tous";
  const posts = await getBlogPosts();

  const [featured, ...rest] = posts;
  const catNames = ["Tous", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = active === "Tous" ? rest : rest.filter((p) => p.category === active);

  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden bg-tes-bg-soft px-6 py-[60px] md:px-11">
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-3.5 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">Blog</span>
          </div>
          <h1 className="mb-4 max-w-[680px] text-[38px] leading-tight font-extrabold tracking-tight text-tes-ink md:text-[52px]">
            Conseils, guides et actualités agricoles
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-tes-muted">
            Entretien, irrigation, agronomie et financement — tout ce qu&apos;il faut savoir pour
            tirer le meilleur de votre matériel.
          </p>
        </div>
      </div>

      {featured && (
        <div className="px-6 pt-14 pb-5 md:px-11">
          <div className="mx-auto max-w-[1240px]">
            <Link
              href={`/blog/${featured.slug}`}
              className="grid grid-cols-1 items-center gap-9 overflow-hidden rounded-3xl border border-tes-border bg-tes-bg md:grid-cols-2"
            >
              <div className="flex h-[220px] items-center justify-center bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)] md:h-[320px]">
                <span className="rounded-lg bg-white/75 px-3 py-1.5 font-mono text-[11px] text-[#6f8473] uppercase">
                  [ image article ]
                </span>
              </div>
              <div className="px-6 pb-6 md:px-0 md:pr-[34px] md:py-5">
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span className="rounded-full bg-tes-chip px-3.5 py-1.5 text-xs font-extrabold text-tes-green">
                    {featured.category}
                  </span>
                  <span className="text-[13px] text-tes-muted-4">
                    {dateFmt.format(featured.publishedAt)} · {featured.readTime}
                  </span>
                </div>
                <div className="mb-3 text-2xl leading-tight font-extrabold text-tes-ink">
                  {featured.title}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-tes-muted">{featured.excerpt}</p>
                <span className="text-sm font-bold text-tes-green">Lire l&apos;article →</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* CHIPS */}
      <div className="px-6 pt-[30px] pb-2.5 md:px-11">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2.5">
          {catNames.map((name) => (
            <Link
              key={name}
              href={name === "Tous" ? "/blog" : `/blog?cat=${encodeURIComponent(name)}`}
              className={`rounded-full border px-[18px] py-2.5 text-[13px] font-bold whitespace-nowrap ${
                active === name
                  ? "border-tes-green bg-tes-green text-white"
                  : "border-tes-border-soft bg-white text-tes-muted-2"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 pt-[30px] pb-[70px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="overflow-hidden rounded-[20px] border border-tes-border bg-white transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-28px_rgba(20,40,26,.35)]"
              >
                <div className="flex h-[170px] items-center justify-center bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)]">
                  <span className="rounded-md bg-white/75 px-2.5 py-1.5 font-mono text-[10px] text-[#6f8473] uppercase">
                    [ image ]
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-tes-bg px-2.5 py-1 text-[11px] font-extrabold text-tes-green">
                      {p.category}
                    </span>
                    <span className="text-xs text-tes-muted-4">{dateFmt.format(p.publishedAt)}</span>
                  </div>
                  <div className="mb-2.5 text-base leading-tight font-extrabold text-tes-ink">
                    {p.title}
                  </div>
                  <p className="text-[13px] leading-relaxed text-tes-muted-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-tes-bg px-6 pb-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
