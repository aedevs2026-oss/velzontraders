"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

import "swiper/css";

export function SteelProductsSection({ category, products = [] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  if (!category) return null;

  const slides = Array.isArray(products) && products.length
    ? products
    : Array.isArray(category.images)
      ? category.images.filter((item) => item?.url)
      : [];
  const displaySlides = slides.length
    ? slides
    : [
        {
          url: category.image_url || "/steel-products/steel-products-category.svg",
          alt: category.description || "Steel Products — Velzon Trade Enterprises",
          name: category.name || "Steel Products",
          description: category.description || "Project-ready steel materials for fabrication and supply.",
        },
      ];

  return (
    <section className="border-b border-gold/10 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Steel products"
          title="Steel range for fabrication and supply"
          description={
            category.description ||
            "Project-ready steel materials for fabrication, structural support, cladding and industrial assembly across Tamil Nadu."
          }
        />

        {!mounted ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displaySlides.slice(0, 3).map((item, index) => (
              <SteelCard key={`${item.url}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, A11y]}
              spaceBetween={20}
              slidesPerView={1.05}
              loop={displaySlides.length >= 3}
              speed={700}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1.6 },
                1024: { slidesPerView: 2.4 },
              }}
              className="steel-products-home-swiper"
              aria-label="Steel products"
            >
              {displaySlides.map((item, index) => (
                <SwiperSlide key={`${item.url}-${index}`}>
                  <SteelCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <p className="mt-8 text-center">
          <Link
            href={products?.[0]?.slug ? `/products/steel/${products[0].slug}` : "/products"}
            className="text-sm font-semibold text-gold-dark hover:underline focus-gold"
          >
            Explore steel product details →
          </Link>
        </p>
      </Container>
    </section>
  );
}

function SteelCard({ item }) {
  const href = item.slug ? `/products/steel/${item.slug}` : "/products";

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-ivory shadow-card transition hover:border-gold/40 focus-within:border-gold/40"
    >
      <div className="relative aspect-[16/10] bg-graphite/10">
        <EntityImage
          src={item.image_url || item.url}
          alt={item.alt || item.name || "Steel product"}
          label={item.name || "Steel product"}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
            {item.name || "Steel product"}
          </h3>
          {item.description ? (
            <p className="mt-2 text-sm leading-6 text-graphite">
              {item.description}
            </p>
          ) : null}
          {item.thickness_options?.length ? (
            <p className="mt-4 text-sm font-semibold text-ink">
              Thickness: {item.thickness_options.slice(0, 3).join(", ")}
              {item.thickness_options.length > 3 ? " + more" : ""}
            </p>
          ) : null}
        </div>
        {item.pdf_reference ? (
          <p className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {item.pdf_reference}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
