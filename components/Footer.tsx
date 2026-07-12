import Link from "next/link";
import { COMPANY, FOOT_LINKS, FOOT_SERVICES, SOCIALS, STORES } from "@/lib/constants";

export function Footer() {
  return (
    <div className="bg-tes-footer text-tes-footer-text">
      <div className="mx-auto max-w-[1240px] px-6 pt-16 pb-10 md:px-11">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-sm font-extrabold text-white">
                TES
              </span>
              <span className="text-xl font-extrabold text-white">{COMPANY.name}</span>
            </div>
            <p className="max-w-[300px] text-sm leading-7 text-tes-footer-text-2">
              Distribution d&apos;équipements agricoles modernes au Cameroun. Innovation –
              Performance – Productivité au service des agriculteurs.
            </p>
          </div>
          <div>
            <div className="mb-[18px] text-base font-extrabold text-white">Liens rapides</div>
            <div className="flex flex-col gap-3">
              {FOOT_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-tes-footer-text-3">
                  › {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-[18px] text-base font-extrabold text-white">Nos services</div>
            <div className="flex flex-col gap-3">
              {FOOT_SERVICES.map((s) => (
                <div key={s} className="text-sm text-tes-footer-text-3">
                  › {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3.5 text-base font-extrabold text-white">Siège social</div>
            <div className="mb-[22px] text-sm leading-7 text-tes-footer-text-2">
              {STORES.map((s) => (
                <div key={s.city}>
                  {s.city} – {s.address}
                </div>
              ))}
              {COMPANY.phones[0]}
            </div>
            <div className="mb-2.5 text-base font-extrabold text-white">Heures d&apos;ouverture</div>
            <div className="text-sm leading-7 text-tes-footer-text-2">{COMPANY.hours}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-[22px] md:px-11">
          <div className="text-[13px] text-tes-footer-text-2/90">
            © 2026 {COMPANY.name} · Tous droits réservés
          </div>
          <div className="flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-tes-gold text-sm font-extrabold text-tes-footer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
