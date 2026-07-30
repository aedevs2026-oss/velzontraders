"use client";

import { useEffect, useRef, useState } from "react";

export function InitialLoader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
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
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      <div className="flex h-full w-full items-center justify-center px-4 py-4 sm:px-0 sm:py-0">
        <div className="h-[92vh] w-[92vw] max-h-full max-w-full sm:h-full sm:w-full">
          <video
            className="h-full w-full object-contain sm:object-cover"
            src="/loader.mp4"
            width="100%"
            height="100%"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

