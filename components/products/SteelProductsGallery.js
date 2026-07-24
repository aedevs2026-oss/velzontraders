"use client";

import { useEffect, useState } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EntityImage } from "@/components/ui/EntityImage";
import "swiper/css";
import "swiper/css/navigation";

export function SteelProductsGallery({ images = [] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const list = (images || []).filter((image) => image?.url);
  if (!list.length) return null;

  return (
    <div className="mt-8 rounded-2xl border border-gold/15 bg-white p-5 shadow-card sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Steel products gallery</h2>
          <p className="mt-2 max-w-2xl text-sm text-graphite">
            Product reference images from the Steel Products catalogue folder.
          </p>
        </div>
      </div>
      {mounted ? (
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1.1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.4 },
          }}
          className="mt-6 !pb-2"
        >
          {list.map((image, index) => (
            <SwiperSlide key={`${image.url}-${index}`}>
              <div className="overflow-hidden rounded-xl border border-gold/15 bg-ivory">
                <div className="relative aspect-[16/10] bg-graphite/10">
                  <EntityImage
                    src={image.url}
                    alt={image.alt || `${image.name || "Steel product"} ${index + 1}`}
                    label={image.name || "Steel product"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-2 border-t border-gold/10 bg-white/90 p-4">
                  {image.name ? (
                    <h3 className="font-display text-lg font-semibold text-ink">{image.name}</h3>
                  ) : null}
                  {image.description ? (
                    <p className="text-sm leading-6 text-graphite">{image.description}</p>
                  ) : null}
                  {image.pdf_reference ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                      {image.pdf_reference}
                    </p>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {list.slice(0, 4).map((image, index) => (
            <div key={`${image.url}-${index}`} className="overflow-hidden rounded-xl border border-gold/15 bg-ivory">
              <div className="relative aspect-[16/10] bg-graphite/10">
                <EntityImage
                  src={image.url}
                  alt={image.alt || `${image.name || "Steel product"} ${index + 1}`}
                  label={image.name || "Steel product"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-2 border-t border-gold/10 bg-white/90 p-4">
                {image.name ? (
                  <h3 className="font-display text-lg font-semibold text-ink">{image.name}</h3>
                ) : null}
                {image.description ? (
                  <p className="text-sm leading-6 text-graphite">{image.description}</p>
                ) : null}
                {image.pdf_reference ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {image.pdf_reference}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
