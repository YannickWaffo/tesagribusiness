import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { COMPANY, PROCESS_STEPS, SERVICES } from "@/lib/constants";

const SERVICE_ICONS: IconName[] = ["truck", "wrench", "gear", "book", "medal", "drop"];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden bg-tes-bg-soft px-6 py-[60px] md:px-11">
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-3.5 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">Services</span>
          </div>
          <h1 className="mb-4 max-w-[680px] text-[38px] leading-tight font-extrabold tracking-tight text-tes-ink md:text-[52px]">
            Bien plus qu&apos;un vendeur de machines
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-tes-muted">
            De l&apos;achat à la récolte, nos équipes vous accompagnent à chaque étape avec des
            services pensés pour le terrain.
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="px-6 py-[60px] md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className="rounded-[20px] border border-tes-border bg-tes-bg p-[26px] transition-colors hover:bg-tes-chip"
            >
              <div className="mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-tes-border bg-white text-tes-green">
                <Icon name={SERVICE_ICONS[i % SERVICE_ICONS.length]} size={26} />
              </div>
              <div className="mb-2.5 text-lg font-extrabold text-tes-ink">{s.title}</div>
              <div className="text-sm leading-relaxed text-tes-muted-3">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-tes-bg px-6 py-[60px] md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            <div className="mb-2 text-[13px] font-extrabold tracking-wide text-tes-gold uppercase">
              Comment ça marche
            </div>
            <h2 className="text-[32px] font-extrabold text-tes-ink">
              De la commande à l&apos;exploitation
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tes-green text-xl font-extrabold text-white">
                  {s.n}
                </div>
                <div className="mb-2 text-base font-extrabold text-tes-ink">{s.title}</div>
                <div className="text-[13px] leading-relaxed text-tes-muted-3">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-tes-ink px-6 py-14 text-white md:px-11">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 md:px-11">
          <div>
            <div className="mb-2 text-2xl font-extrabold">Un projet d&apos;équipement ?</div>
            <div className="text-[15px] text-[#9fb6a6]">
              Décrivez votre besoin, nous revenons vers vous sous 24h.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-tes-green px-7 py-4 text-[15px] font-bold text-white"
            >
              Nous contacter
            </Link>
            <a
              href={COMPANY.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-tes-whatsapp px-7 py-4 text-[15px] font-bold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
