"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ivory/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-gold/25 bg-white/80 shadow-soft sm:h-56 sm:w-56">
          <div className="absolute inset-0 rounded-full bg-gradient-gold/10" aria-hidden />
          <Image
            src="/velzon-hero.png"
            alt="Velzon loading"
            width={320}
            height={320}
            className="loader-image relative z-10 h-full w-full rounded-full object-cover"
            priority
          />
        </div>

        <div className="w-56 overflow-hidden rounded-full bg-gold/20">
          <div className="loader-bar-fill h-2 rounded-full bg-gradient-gold" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Trade Enterprises — Roofing Solutions 
        </p>
      </div>
    </div>
  );
}
