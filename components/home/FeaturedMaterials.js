"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedMaterials({ categories }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = (event) => setIsMobile(event.matches);
    updateMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  const hiddenCategorySlugs = new Set(["steel-products", "roofing-accessories", "ridge-gutter-screw"]);
  const filteredCategories = categories.filter((cat) => {
    const slug = String(cat?.slug || "").toLowerCase();
    return !hiddenCategorySlugs.has(slug);
  });

  const previewCategories = filteredCategories.slice(0, 8);
  const visibleCategories = isMobile ? filteredCategories : expanded ? filteredCategories : previewCategories;
  const canExpand = !isMobile && filteredCategories.length > previewCategories.length;

  return (
    <section className="border-b border-gold/10 bg-ivory py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Materials catalogue"
          title="Featured categories"
          description="Structured thickness options and premium mill brands — managed from our materials desk for supply and fabrication across Tamil Nadu."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card transition hover:border-gold/40 focus-gold"
            >
              <div className="relative aspect-[16/10] bg-graphite/10">
                <EntityImage
                  src={cat.image_url}
                  alt={`${cat.name} — Velzon materials`}
                  label={cat.name}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
                  {cat.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-graphite">
                  {cat.teaser || cat.description || "View specs"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {canExpand ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex items-center rounded-full border border-gold/30 bg-white px-5 py-3 text-sm font-semibold text-gold-dark transition hover:border-gold hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6508]"
            >
              {expanded ? "Show fewer categories" : "View all categories"}
            </button>
          </div>
        ) : null}

        <p className="mt-8 text-center">
          <Link href="/products" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-gold-dark hover:underline focus-gold">
            <span>Browse all materials</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </section>
  );
}
