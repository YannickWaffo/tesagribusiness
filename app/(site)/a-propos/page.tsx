import Link from "next/link";
import {
  ABOUT_CLIENTELE,
  ABOUT_POSITIONING,
  ABOUT_VALUES,
  STATS,
  STORES,
  TEAM,
} from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden bg-tes-bg-soft px-6 py-[60px] md:px-11">
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-3.5 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">À propos</span>
          </div>
          <h1 className="mb-4 max-w-[680px] text-[38px] leading-tight font-extrabold tracking-tight text-tes-ink md:text-[52px]">
            Au service des agriculteurs camerounais
          </h1>
          <p className="mb-[18px] max-w-[560px] text-lg leading-relaxed text-tes-muted">
            TES Agribusiness distribue des équipements agricoles modernes pour moderniser
            l&apos;agriculture camerounaise : plus de productivité, moins de pénibilité, une
            vraie transition vers une agriculture mécanisée.
          </p>
          <div className="text-sm font-bold tracking-wide text-tes-green">
            Innovation · Performance · Productivité au service des agriculteurs
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="px-6 py-16 md:px-11">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-3.5 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
            Notre mission
          </div>
          <p className="text-2xl leading-snug font-bold text-tes-ink md:text-[26px]">
            Moderniser l&apos;agriculture camerounaise grâce à des équipements mécanisés, afin
            d&apos;améliorer la productivité, réduire la pénibilité du travail et accompagner la
            transition vers une agriculture moderne.
          </p>
        </div>
      </div>

      {/* VALUES */}
      <div className="px-6 pb-[60px] md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-5 md:grid-cols-4">
          {ABOUT_VALUES.map((v) => (
            <div key={v.title} className="rounded-[20px] border border-tes-border bg-tes-bg p-[26px]">
              <div className="mb-2.5 text-lg font-extrabold text-tes-ink">{v.title}</div>
              <div className="text-sm leading-relaxed text-tes-muted-3">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* POSITIONING */}
      <div className="bg-tes-ink px-6 py-[60px] text-white md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-9 text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Positionnement de la marque
            </div>
            <h2 className="mx-auto max-w-[640px] text-[32px] font-extrabold text-white">
              Un partenaire de la modernisation agricole camerounaise
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_POSITIONING.map((p) => (
              <div
                key={p}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-relaxed text-[#cfe0d3]"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLIENTELE */}
      <div className="bg-tes-bg px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Qui nous accompagnons
            </div>
            <h2 className="text-[32px] font-extrabold text-tes-ink">Notre clientèle</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {ABOUT_CLIENTELE.map((c) => (
              <div
                key={c}
                className="rounded-2xl border border-tes-border bg-white p-[22px] text-center"
              >
                <div className="text-[15px] font-extrabold text-tes-ink">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOCATIONS */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Où nous trouver
            </div>
            <h2 className="text-[32px] font-extrabold text-tes-ink">Nos implantations</h2>
          </div>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-5 sm:grid-cols-2">
            {STORES.map((s) => (
              <div key={s.city} className="rounded-[20px] border border-tes-border bg-tes-bg p-[26px]">
                <div className="mb-2 text-lg font-extrabold text-tes-ink">{s.city}</div>
                <div className="text-sm leading-relaxed text-tes-muted-3">{s.address}</div>
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
              <div className="text-[36px] leading-none font-extrabold text-white md:text-[48px]">
                {s.display}
              </div>
              <div className="mt-2 text-sm font-semibold text-[#bfe0cb]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[34px] text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Notre équipe
            </div>
            <h2 className="text-[32px] font-extrabold text-tes-ink">Les personnes derrière TES</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.name} className="text-center">
                <div className="mb-3.5 flex h-[200px] items-end justify-center rounded-[20px] bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)] pb-3">
                  <span className="rounded-md bg-white/75 px-2.5 py-1.5 font-mono text-[10px] text-[#6f8473] uppercase">
                    [ portrait ]
                  </span>
                </div>
                <div className="text-base font-extrabold text-tes-ink">{m.name}</div>
                <div className="text-[13px] font-semibold text-tes-green">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-tes-ink px-6 py-14 text-white md:px-11">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
          <div>
            <div className="mb-2 text-2xl font-extrabold">Envie de nous rencontrer ?</div>
            <div className="text-[15px] text-[#9fb6a6]">
              Visitez l&apos;une de nos 2 boutiques au Cameroun.
            </div>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-tes-green px-7 py-4 text-[15px] font-bold text-white"
          >
            Trouver une boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
