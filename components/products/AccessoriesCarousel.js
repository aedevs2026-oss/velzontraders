"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/Button";
import { EntityImage } from "@/components/ui/EntityImage";

import "swiper/css";
import "swiper/css/pagination";

export function AccessoriesCarousel({ items = [] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!items.length) {
    return (
      <p className="mt-8 text-graphite">
        Accessories will appear here once published in the admin CMS.
      </p>
    );
  }

  if (!mounted) {
    return (
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <AccessoryCard key={item.slug} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1.15}
        loop={items.length >= 3}
        speed={700}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-12 accessories-swiper"
        aria-label="Roofing accessories"
      >
        {items.map((item) => (
          <SwiperSlide key={item.slug}>
            <AccessoryCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function AccessoryCard({ item }) {
  const href = `/products/roofing-accessories/${item.slug}`;
  const img = item.images?.[0]?.url || item.image_url;
  const alt = item.images?.[0]?.alt || item.alt_text || `${item.name} — Velzon`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card transition duration-300 hover:border-gold/40">
      <Link href={href} className="relative aspect-[16/10] bg-graphite/10 focus-gold">
        <EntityImage src={img} alt={alt} label={item.name} sizes="(max-width: 1024px) 50vw, 33vw" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-xl font-semibold text-ink">
          <Link href={href} className="hover:text-gold-dark focus-gold">
            {item.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-graphite">
          {item.short_description || item.description}
        </p>
        <div className="mt-4">
          <Button href={href} size="sm" className="w-full sm:w-auto">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
