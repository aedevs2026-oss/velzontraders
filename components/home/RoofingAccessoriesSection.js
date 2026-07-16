"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

import "swiper/css";

export function RoofingAccessoriesSection({ accessories = [] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = accessories.slice(0, 5);
  if (!items.length) return null;

  return (
    <section className="border-b border-gold/10 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Complete the system"
          title="Roofing Accessories"
          description="Flashings, fasteners, ventilators, and structural fittings that finish metal roofing and cladding — supply across Tamil Nadu."
        />

        {!mounted ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 3).map((item) => (
              <AccessorySlide key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, A11y]}
              spaceBetween={20}
              slidesPerView={1.15}
              loop={items.length >= 3}
              speed={700}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2.15 },
                1024: { slidesPerView: 3 },
              }}
              className="roofing-accessories-home-swiper"
              aria-label="Roofing accessories"
            >
              {items.map((item) => (
                <SwiperSlide key={item.slug}>
                  <AccessorySlide item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <p className="mt-8 text-center">
          <Link
            href="/products/roofing-accessories"
            className="text-sm font-semibold text-gold-dark hover:underline focus-gold"
          >
            View all roofing accessories →
          </Link>
        </p>
      </Container>
    </section>
  );
}

function AccessorySlide({ item }) {
  const href = `/products/roofing-accessories/${item.slug}`;
  const img = item.images?.[0]?.url || item.image_url;
  const alt = item.images?.[0]?.alt || item.alt_text || `${item.name} — Velzon`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gold/15 bg-ivory shadow-card transition hover:border-gold/40 focus-gold"
    >
      <div className="relative aspect-[16/10] bg-graphite/10">
        <EntityImage src={img} alt={alt} label={item.name} sizes="(max-width: 1024px) 50vw, 20vw" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-graphite">
          {item.short_description || item.description || "View details"}
        </p>
      </div>
    </Link>
  );
}
