"use client";

import { useEffect, useState } from "react";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-white">
      <video
        className="absolute inset-0 z-0 h-full min-h-[100dvh] w-full min-w-full object-cover"
        src="/loader.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 z-10 bg-white/80" aria-hidden />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_55%)]" aria-hidden />

      <div className="relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))] sm:px-6 lg:px-8">
        <div className="w-full max-w-[min(78vw,20rem)] rounded-[1.5rem] border border-[#d4af37]/20 bg-white/90 p-3 shadow-[0_20px_60px_rgba(184,134,11,0.12)] backdrop-blur-md sm:max-w-[24rem] lg:max-w-[28rem]">
          <div className="relative aspect-square overflow-hidden rounded-[1.1rem] border border-[#d4af37]/15 bg-white/80">
            <img
              src="/logo.png"
              alt="Velzon Trade Enterprises logo"
              className="pointer-events-none absolute inset-0 z-[5] m-auto h-20 w-auto max-w-[70%] object-contain opacity-90 sm:h-24 lg:h-28"
            />
            <video
              className="mt-[94px] sm:mt-[145px] h-full w-full object-cover"
              src="/loader.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="mt-3 overflow-hidden rounded-full bg-[#faf8f3]">
            <div className="loader-bar-fill h-2 rounded-full bg-gradient-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
