"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EntityImage } from "@/components/ui/EntityImage";

import "swiper/css";
import "swiper/css/navigation";

function RelatedCard({ item }) {
  return (
    <Link
      href={item.href}
      className="block h-full overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card transition hover:border-gold/40 focus-gold"
    >
      <div className="relative aspect-[16/10] bg-graphite/10">
        <EntityImage
          src={item.image_url}
          alt={`${item.name} — related`}
          label={item.name}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="p-4 font-display text-lg font-semibold text-ink">{item.name}</p>
    </Link>
  );
}

export function RelatedProductsCarousel({ items = [] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const list = (items || []).filter((item) => item?.name && item?.href);
  if (!list.length) return null;

  return (
    <section className="mt-16 border-t border-gold/15 pt-10">
      <h2 className="font-display text-2xl font-semibold text-ink">Related products</h2>
      <hr className="rule-gold mt-3 w-14" />
      {mounted ? (
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="mt-6 !pb-2"
        >
          {list.map((item) => (
            <SwiperSlide key={`${item.href}-${item.name}`}>
              <RelatedCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 3).map((item) => (
            <RelatedCard key={`${item.href}-${item.name}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
