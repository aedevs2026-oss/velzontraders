"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SteelProductsSection({ category, products = [] }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobile(event.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!category) return null;

  const slides = Array.isArray(products) && products.length
    ? products
    : Array.isArray(category.images)
      ? category.images.filter((item) => item?.url)
      : [];
  const previewSlides = slides.length
    ? slides.slice(0, 4)
    : [
        {
          url: category.image_url || "/steel-products/steel-products-category.svg",
          alt: category.description || "Steel Products — Velzon Trade Enterprises",
          name: category.name || "Steel Products",
          description: category.description || "Project-ready steel materials for fabrication and supply.",
        },
      ];
  const displaySlides = isMobile ? slides : expanded ? slides : previewSlides;
  const totalSlides = slides.length;
  const isExpandable = !isMobile && totalSlides > previewSlides.length;

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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displaySlides.map((item, index) => (
            <SteelCard key={`${item.url}-${index}`} item={item} />
          ))}
        </div>

        {isMobile ? (
          <p className="mt-6 text-center text-sm text-graphite/70">
            Showing all {totalSlides} steel products on mobile.
          </p>
        ) : isExpandable ? (
          <>
            <p className="mt-6 text-center text-sm text-graphite/70">
              Showing {expanded ? totalSlides : previewSlides.length} of {totalSlides} steel products.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="inline-flex items-center rounded-full border border-gold/30 bg-white px-5 py-3 text-sm font-semibold text-gold-dark transition hover:border-gold hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6508]"
                aria-expanded={expanded}
              >
                {expanded ? "Show fewer steel products" : "View all steel products"}
              </button>
            </div>
          </>
        ) : (
          <p className="mt-8 text-center text-sm font-semibold text-gold-dark">
            All steel products are displayed.
          </p>
        )}
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
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-graphite">
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
