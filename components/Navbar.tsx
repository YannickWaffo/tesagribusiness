"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { COMPANY } from "@/lib/constants";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-tes-border bg-white/[0.92] backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-5 px-6 py-4 md:px-11">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-tes-ink text-sm font-extrabold text-white shadow-[0_4px_14px_-5px_rgba(20,40,26,.5)]">
            TES
          </span>
          <span className="whitespace-nowrap text-lg font-extrabold leading-tight text-tes-ink">
            {COMPANY.name}
          </span>
        </Link>

        <div className="order-3 hidden basis-full justify-center gap-5 text-sm font-semibold whitespace-nowrap md:order-none md:flex md:basis-auto">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "text-tes-green" : "text-tes-muted-2 hover:text-tes-green"}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-shrink-0 items-center gap-3.5">
          <span className="hidden text-sm font-bold text-tes-muted-2 md:inline">
            <span className="text-tes-green">FR</span> · EN
          </span>
          <Link
            href="/compte"
            aria-label="Mon compte"
            title="Mon compte"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-tes-bg text-lg text-tes-ink"
          >
            👤
          </Link>
          <Link
            href="/panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tes-bg text-lg text-tes-ink"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-tes-green text-[10px] font-extrabold text-white">
                {count}
              </span>
            )}
          </Link>
          <a
            href={COMPANY.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-tes-ink px-[22px] py-3 text-sm font-bold text-white sm:inline-block"
          >
            Demander un devis
          </a>
          <button
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1 md:hidden"
          >
            <span className="h-0.5 w-[22px] rounded-full bg-tes-green" />
            <span className="h-0.5 w-[22px] rounded-full bg-tes-green" />
            <span className="h-0.5 w-[15px] rounded-full bg-tes-green" />
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-tes-border bg-white px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                pathname === link.href
                  ? "bg-tes-chip text-tes-green"
                  : "text-tes-muted-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/compte"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-tes-muted-2"
          >
            👤 Mon compte
          </Link>
          <a
            href={COMPANY.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-tes-ink px-5 py-3 text-center text-sm font-bold text-white"
          >
            Demander un devis
          </a>
        </div>
      )}
    </div>
  );
}
