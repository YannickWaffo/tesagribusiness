import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug);

  return (
    <div className="bg-white">
      <div className="px-6 pt-5 md:px-11">
        <div className="mx-auto max-w-[900px] text-[13px] font-semibold text-tes-muted">
          <Link href="/" className="text-tes-muted">
            Accueil
          </Link>{" "}
          /{" "}
          <Link href="/blog" className="text-tes-muted">
            Blog
          </Link>{" "}
          / <span className="text-tes-ink">{post.category}</span>
        </div>
      </div>

      <div className="px-6 pt-[26px] pb-[60px] md:px-11">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="rounded-full bg-tes-chip px-3.5 py-1.5 text-xs font-extrabold text-tes-green">
              {post.category}
            </span>
            <span className="text-[13px] text-tes-muted-4">
              {dateFmt.format(post.publishedAt)} · {post.readTime} de lecture
            </span>
          </div>
          <h1 className="mb-6 text-[32px] leading-tight font-extrabold text-tes-ink md:text-[38px]">
            {post.title}
          </h1>
          <div className="mb-7 flex h-[220px] items-center justify-center rounded-3xl bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)] md:h-[320px]">
            <span className="rounded-lg bg-white/75 px-3 py-1.5 font-mono text-[11px] text-[#6f8473] uppercase">
              [ image article ]
            </span>
          </div>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-tes-muted-2">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className={i === 0 ? "text-lg font-semibold text-[#2b3a2c]" : undefined}>
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-tes-border pt-6">
            <Link href="/blog" className="text-sm font-bold text-tes-green">
              ← Retour au blog
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-tes-green px-[22px] py-3.5 text-sm font-bold text-white"
            >
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-tes-bg px-6 pt-[50px] pb-[70px] md:px-11">
          <div className="mx-auto max-w-[1240px]">
            <h2 className="mb-[22px] text-2xl font-extrabold text-tes-ink">À lire aussi</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="overflow-hidden rounded-2xl border border-tes-border bg-white transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="h-[130px] bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)]" />
                  <div className="p-4">
                    <div className="mb-2 text-[11px] font-extrabold text-tes-green">
                      {p.category}
                    </div>
                    <div className="text-sm leading-tight font-bold text-tes-ink">{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
