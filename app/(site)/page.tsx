import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import { BRANDS, COMPANY, SERVICES, STATS, TEAM, TESTIMONIALS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(6),
  ]);
  const heroSlides = products.slice(0, 5).map((p) => ({ name: p.name, imageUrl: p.imageUrl }));

  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden bg-tes-bg-soft px-6 py-16 md:px-11 md:py-20">
        <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-11 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-tes-chip px-4 py-2 text-[13px] font-bold text-tes-green">
              <span className="h-1.5 w-1.5 rounded-full bg-tes-green" />
              Vente &amp; services agricoles · Cameroun
            </div>
            <h1 className="mb-[22px] text-[40px] leading-[1.04] font-extrabold tracking-tight text-tes-ink md:text-[60px]">
              Le bon matériel,
              <br />
              la bonne <span className="text-tes-green">récolte</span>.
            </h1>
            <p className="mb-[30px] max-w-[470px] text-lg leading-relaxed text-tes-muted">
              Parcourez le catalogue, commandez en ligne, retirez ou faites livrer en boutique.
              Installation, formation et SAV assurés par nos équipes.
            </p>
            <form
              action="/catalogue"
              method="GET"
              className="flex max-w-[500px] gap-2 rounded-full border border-tes-border-soft bg-white p-2 shadow-[0_20px_40px_-26px_rgba(20,40,26,.4)]"
            >
              <select
                name="cat"
                defaultValue="Tous"
                className="rounded-full border-none bg-tes-bg px-4 text-sm font-bold text-tes-green outline-none"
              >
                <option value="Tous">Catégorie</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                name="search"
                placeholder="Rechercher une machine…"
                className="min-w-[140px] flex-1 border-none bg-transparent px-2 text-[15px] text-tes-ink outline-none"
              />
              <button className="rounded-full bg-tes-green px-[26px] py-3.5 text-sm font-bold text-white transition-colors hover:bg-tes-ink">
                Chercher
              </button>
            </form>
            <div className="mt-[30px] flex flex-wrap gap-[26px]">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-tes-muted-2">
                <span className="h-2 w-2 rounded-full bg-tes-green" />
                Livraison 48h en boutique
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-tes-muted-2">
                <span className="h-2 w-2 rounded-full bg-tes-gold" />
                Garantie &amp; SAV inclus
              </div>
            </div>
          </div>
          <HeroSlideshow slides={heroSlides} />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-6 py-14 md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[26px] flex items-end justify-between">
            <h2 className="text-[30px] font-extrabold text-tes-ink">Explorez par catégorie</h2>
            <Link href="/catalogue" className="text-sm font-bold text-tes-green">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogue?cat=${encodeURIComponent(cat.name)}`}
                className="block text-center"
              >
                <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-tes-border bg-tes-bg text-tes-green transition-all duration-200 hover:-translate-y-1 hover:bg-tes-chip">
                  <Icon name={cat.icon as IconName} />
                </div>
                <div className="text-[13px] leading-tight font-semibold text-[#2b3a2c]">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CATALOG PREVIEW */}
      <div className="bg-tes-bg px-6 py-14 md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[34px] text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Achetable en ligne · livrable en boutique
            </div>
            <h2 className="text-[34px] font-extrabold text-tes-ink">Notre sélection</h2>
          </div>
          <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-[34px] text-center">
            <Link
              href="/catalogue"
              className="inline-block rounded-full bg-tes-ink px-[34px] py-4 text-[15px] font-bold text-white"
            >
              Voir tout le catalogue →
            </Link>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-[42px] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-[100px]">
            <div className="mb-2.5 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Nos services
            </div>
            <h2 className="mb-4 text-[34px] leading-tight font-extrabold text-tes-ink">
              On vous accompagne, saison après saison
            </h2>
            <p className="mb-[22px] text-[15px] leading-relaxed text-tes-muted">
              De l&apos;achat à la maintenance, une équipe dédiée pour faire tourner votre
              exploitation sans accroc.
            </p>
            <Link
              href="/services"
              className="inline-block rounded-full bg-tes-chip px-[26px] py-3.5 text-sm font-bold text-tes-green"
            >
              Tous les services →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <div
                key={s.n}
                className="rounded-[18px] border border-tes-border bg-tes-bg p-[22px] transition-colors hover:bg-tes-chip"
              >
                <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-tes-green font-extrabold text-white">
                  {s.n}
                </div>
                <div className="mb-1.5 text-base font-extrabold text-tes-ink">{s.title}</div>
                <div className="text-[13px] leading-relaxed text-tes-muted-3">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-tes-green px-6 py-14 text-white md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[40px] leading-none font-extrabold text-white md:text-[52px]">
                {s.display}
              </div>
              <div className="mt-2 text-sm font-semibold text-[#bfe0cb]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-9 text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Avis clients
            </div>
            <h2 className="text-[34px] font-extrabold text-tes-ink">Ils cultivent avec TES</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-[22px] border border-tes-border bg-tes-bg p-[26px]">
                <div className="mb-3.5 text-[15px] tracking-[2px] text-tes-gold">★★★★★</div>
                <p className="mb-[22px] text-[17px] leading-relaxed text-[#26342a]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-tes-green font-extrabold text-white">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-tes-ink">{t.name}</div>
                    <div className="text-[13px] text-tes-muted-4">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BRANDS */}
      <div className="overflow-hidden bg-tes-bg py-10">
        <div className="mb-6 text-center text-xs font-bold tracking-[.1em] text-tes-muted-4 uppercase">
          Marques partenaires
        </div>
        <div className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee flex w-max gap-14">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={b + i} className="text-2xl font-extrabold whitespace-nowrap text-[#aab5ac]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[34px] text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Notre équipe
            </div>
            <h2 className="text-[34px] font-extrabold text-tes-ink">À votre service</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.name} className="text-center">
                <div className="mb-3.5 flex h-[210px] items-end justify-center rounded-[22px] bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)] pb-3">
                  <span className="rounded-md bg-white/75 px-2.5 py-1.5 font-mono text-[10px] text-[#6f8473] uppercase">
                    [ portrait ]
                  </span>
                </div>
                <div className="text-lg font-extrabold text-tes-ink">{m.name}</div>
                <div className="text-[13px] font-semibold text-tes-green">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT + NEWSLETTER */}
      <div className="bg-tes-bg px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-[42px] lg:grid-cols-2">
            <div>
              <div className="mb-2.5 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
                Contact
              </div>
              <h2 className="mb-[18px] text-[34px] font-extrabold text-tes-ink">
                Demandez votre devis
              </h2>
              <p className="mb-[26px] max-w-[420px] text-[15px] leading-relaxed text-tes-muted">
                Un conseiller vous rappelle sous 24h avec une proposition et un délai de livraison
                en boutique.
              </p>
              <div className="flex flex-col gap-3.5 text-[15px] font-semibold text-[#2b3a2c]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tes-chip text-tes-green">
                    ✆
                  </span>
                  {COMPANY.phones[0]}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tes-chip text-tes-green">
                    ✉
                  </span>
                  {COMPANY.email}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tes-chip text-tes-green">
                    ⌖
                  </span>
                  2 boutiques au Cameroun
                </div>
              </div>
            </div>
            <ContactForm compact />
          </div>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
