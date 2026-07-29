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
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black/95">
      <video
        className="absolute inset-0 h-full min-h-[100dvh] w-full min-w-full object-cover"
        src="/loader.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" aria-hidden />

      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))] sm:px-6 lg:px-8">
        <div className="w-full max-w-[min(78vw,20rem)] rounded-[1.5rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md sm:max-w-[24rem] lg:max-w-[28rem]">
          <div className="aspect-square overflow-hidden rounded-[1.1rem] border border-white/15 bg-black/20">
            <video
              className="h-full w-full object-cover"
              src="/loader.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="mt-3 overflow-hidden rounded-full bg-white/20">
            <div className="loader-bar-fill h-2 rounded-full bg-gradient-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
