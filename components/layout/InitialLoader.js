"use client";

import { useEffect, useRef, useState } from "react";

export function InitialLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      const updateViewport = () => setIsMobile(mediaQuery.matches);

      updateViewport();
      mediaQuery.addEventListener("change", updateViewport);

      return () => {
        mediaQuery.removeEventListener("change", updateViewport);
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
      };
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleEnded = () => {
    timerRef.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!isMounted || !isLoading) return null;

return (
  <div className="fixed inset-0 z-[9999] overflow-hidden">
    {/* Mobile background */}
    <div className="absolute inset-0 bg-[url('/Hero/screen-2.png')] bg-cover bg-center md:hidden" />

    {/* Desktop background */}
    <div className="absolute inset-0 hidden bg-black md:block" />

    {/* Overlay */}
    <div className="absolute inset-0 z-10 bg-white/20 md:bg-black/80" />

    {/* Full-screen video */}
    <video
      className="absolute inset-0 z-20 h-full w-full object-cover"
      src={isMobile ? "/loader-mobile.mp4" : "/loader-web.mp4"}
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={handleEnded}
      aria-hidden="true"
    />
  </div>
);
}

