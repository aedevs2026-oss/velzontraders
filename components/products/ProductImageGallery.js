"use client";

import { useCallback, useEffect, useState } from "react";
import { EntityImage } from "@/components/ui/EntityImage";

export function ProductImageGallery({ images = [], name = "Product", altText = "" }) {
  const slides = (images?.length
    ? images
    : [{ url: null, alt: altText || name }]
  ).map((img, i) => ({
    url: img.url || null,
    alt: img.alt || altText || `${name} image ${i + 1}`,
  }));

  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = slides[index] || slides[0];

  const go = useCallback(
    (dir) => {
      setIndex((i) => {
        const next = (i + dir + slides.length) % slides.length;
        return next;
      });
      setZoomed(false);
    },
    [slides.length],
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setZoomed(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-gold/20 bg-graphite/10">
        <button
          type="button"
          className={`relative h-full w-full focus-gold ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
        >
          <EntityImage
            src={current?.url}
            alt={current?.alt || name}
            label={name}
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`transition duration-500 ${zoomed ? "scale-150 object-cover" : "scale-100"}`}
          />
        </button>
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md border border-gold/30 bg-white/90 px-2 py-1 text-sm font-medium text-ink shadow-soft focus-gold"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md border border-gold/30 bg-white/90 px-2 py-1 text-sm font-medium text-ink shadow-soft focus-gold"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Image thumbnails">
          {slides.map((slide, i) => (
            <li key={`${slide.url || "ph"}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setZoomed(false);
                }}
                className={`relative h-16 w-20 overflow-hidden rounded border focus-gold ${
                  i === index ? "border-gold" : "border-gold/20"
                }`}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
              >
                <EntityImage
                  src={slide.url}
                  alt=""
                  label={`${i + 1}`}
                  sizes="80px"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
