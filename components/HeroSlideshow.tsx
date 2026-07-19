"use client";

import { useEffect, useState } from "react";
import { ProductImage } from "@/components/ProductImage";

export type HeroSlide = { name: string; imageUrl: string };

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setActive((s) => (s + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[400px] animate-reveal-up">
      <div className="absolute inset-0 overflow-hidden rounded-[28px]">
        {slides.map((slide, i) => (
          <div
            key={slide.name + i}
            className="absolute inset-6 flex items-center justify-center transition-all duration-1000 ease-in-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1) translateY(0)" : "scale(1.06) translateY(10px)",
            }}
          >
            <ProductImage
              src={slide.imageUrl}
              alt={slide.name}
              eager
              className="h-full w-full"
              imgClassName="max-w-[82%] max-h-[82%] object-contain drop-shadow-[0_24px_30px_rgba(20,40,26,.28)]"
            />
          </div>
        ))}
      </div>
      <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.name + i}
            aria-label={`Voir ${slide.name}`}
            onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 8,
              background: i === active ? "var(--color-tes-green)" : "#cdd8ce",
            }}
          />
        ))}
      </div>
      <div className="absolute top-6 -right-5 animate-[floaty_5s_ease-in-out_infinite] rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_18px_38px_-22px_rgba(20,40,26,.5)]">
        <div className="text-xs font-semibold text-tes-muted-4">+3 000 clients</div>
        <div className="text-lg font-extrabold text-tes-green">satisfaits</div>
      </div>
      <div className="absolute bottom-6 -left-5 animate-[floaty2_6s_ease-in-out_infinite] rounded-2xl bg-tes-ink px-[18px] py-3.5 text-white shadow-[0_18px_38px_-22px_rgba(20,40,26,.6)]">
        <div className="text-xs opacity-70">Dès</div>
        <div className="text-lg font-extrabold text-tes-gold">95 000 FCFA</div>
      </div>
    </div>
  );
}
