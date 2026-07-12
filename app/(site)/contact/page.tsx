import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { COMPANY, SOCIALS, STORES } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="px-6 pt-[60px] pb-5 md:px-11">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3.5 text-[13px] font-semibold text-tes-muted">
            <Link href="/" className="text-tes-muted">
              Accueil
            </Link>{" "}
            / <span className="text-tes-ink">Contact</span>
          </div>
          <h1 className="mb-3.5 text-[32px] font-extrabold text-tes-ink md:text-[46px]">
            Parlons de votre exploitation
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-tes-muted">
            Une question, un devis, un rendez-vous en boutique ? Notre équipe vous répond sous
            24h.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="px-6 pt-9 pb-5 md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 lg:grid-cols-4">
          <a
            href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
            className="rounded-[18px] border border-tes-border bg-tes-bg p-[22px]"
          >
            <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-tes-chip text-lg text-tes-green">
              ✆
            </div>
            <div className="mb-1 text-[15px] font-extrabold text-tes-ink">Téléphone</div>
            <div className="text-[13px] leading-relaxed text-tes-muted">
              {COMPANY.phones.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="rounded-[18px] border border-tes-border bg-tes-bg p-[22px]"
          >
            <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-tes-chip text-lg text-tes-green">
              ✉
            </div>
            <div className="mb-1 text-[15px] font-extrabold text-tes-ink">E-mail</div>
            <div className="text-sm text-tes-muted">{COMPANY.email}</div>
          </a>
          <div className="rounded-[18px] border border-tes-border bg-tes-bg p-[22px]">
            <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-tes-chip text-lg text-tes-green">
              ⌖
            </div>
            <div className="mb-1 text-[15px] font-extrabold text-tes-ink">Boutiques</div>
            <div className="text-sm leading-relaxed text-tes-muted">
              {STORES.map((s) => (
                <div key={s.city}>
                  {s.city} · {s.address}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] border border-tes-border bg-tes-bg p-[22px]">
            <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-tes-chip text-lg text-tes-green">
              ⏱
            </div>
            <div className="mb-1 text-[15px] font-extrabold text-tes-ink">Horaires</div>
            <div className="text-sm text-tes-muted">{COMPANY.hours}</div>
          </div>
        </div>
      </div>

      {/* FORM + INFO */}
      <div className="px-6 pt-10 pb-[70px] md:px-11">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div>
            <div className="mb-5 flex h-[280px] items-center justify-center rounded-3xl border border-tes-border bg-[repeating-linear-gradient(135deg,#dbe7dd_0_14px,#e7efe8_14px_28px)]">
              <span className="rounded-lg bg-white/75 px-3 py-1.5 font-mono text-xs text-[#6f8473] uppercase">
                [ carte · Yaoundé &amp; Douala ]
              </span>
            </div>
            <div className="rounded-[20px] bg-tes-ink p-[26px] text-white">
              <div className="mb-3.5 text-[17px] font-extrabold">Suivez-nous</div>
              <div className="flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-tes-gold text-base font-extrabold text-tes-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a
                href={COMPANY.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2.5 rounded-full bg-tes-whatsapp px-[18px] py-3.5 text-sm font-bold text-white"
              >
                Discuter sur WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
