"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EntityImage } from "@/components/ui/EntityImage";

const TAB_IDS = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "colors", label: "Available Colors" },
  { id: "profiles", label: "Available Profiles" },
  { id: "gallery", label: "Gallery" },
  { id: "features", label: "Features" },
  { id: "applications", label: "Applications" },
  { id: "downloads", label: "Downloads" },
];

const SPEC_LABELS = {
  material: "Material",
  thickness: "Thickness",
  dimensions: "Dimensions",
  finish: "Finish",
  coating: "Coating",
  surface_finish: "Surface finish",
  weight: "Weight",
  uv_resistance: "UV resistance",
  weather_resistance: "Weather resistance",
  water_resistance: "Water resistance",
  heat_resistance: "Heat resistance",
  fastening: "Fastening",
  compatible_roofing_sheets: "Compatible roofing sheets",
  maintenance: "Maintenance",
  warranty: "Warranty",
  manufacturing_standard: "Manufacturing standard",
};
​
const DESC_LABELS = {
  overview: "Overview",
  purpose: "Purpose",
  benefits: "Benefits",
  installation: "Installation",
  compatibility: "Compatibility",
  corrosion_resistance: "Corrosion resistance",
  weather_resistance: "Weather resistance",
  industrial_commercial_usage: "Industrial / commercial usage",
};

const DOWNLOAD_LABELS = {
  brochure: "Brochure",
  datasheet: "Technical datasheet",
  installation_guide: "Installation guide",
  warranty: "Warranty PDF",
};
​
function renderDescriptionContent(value, isBenefits = false) {
  if (!value) return null;

  const text = String(value).trim();
  if (!text) return null;

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);
​
  const shouldRenderList = isBenefits && lines.length > 1;
​
  if (shouldRenderList) {
    return (
      <ul className="mt-2 space-y-2">
        {lines.map((line, index) => (
          <li key={`${line}-${index}`} className="flex gap-2 text-charcoal">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gold-dark" aria-hidden />
            <span className="font-semibold text-ink">{line}</span>
          </li>
        ))}
      </ul>
    );
  }
​
  return <p className="mt-1 whitespace-pre-line text-charcoal">{text}</p>;
}
​
export function AccessoryDetailTabs({ product }) {
  const [active, setActive] = useState("description");
  const sectionRefs = useRef({});
​
  const detail = product.description_detail || {};
  const specs = product.specifications || {};
  const colors = product.colors || [];
  const profiles = product.profiles || [];
  const allImages = product.images || [];
  const galleryImages = allImages.slice(1);
  const features = product.features || [];
  const applications = product.applications || [];
  const downloads = product.downloads || {};
​
  const visibleTabs = useMemo(() => {
    return TAB_IDS.filter((tab) => {
      if (tab.id === "description") {
        return Object.values(detail).some(Boolean) || product.description;
      }
      if (tab.id === "specifications") return Object.values(specs).some(Boolean);
      if (tab.id === "colors") return colors.length > 0;
      if (tab.id === "profiles") return profiles.length > 0;
      if (tab.id === "gallery") return galleryImages.length > 0;
      if (tab.id === "features") return features.length > 0;
      if (tab.id === "applications") return applications.length > 0;
      if (tab.id === "downloads") {
        return Object.values(downloads).some((v) => Boolean(v));
      }
      return true;
    });
  }, [detail, specs, colors, profiles, galleryImages, features, applications, downloads, product.description]);
​
  useEffect(() => {
    const observers = [];
    visibleTabs.forEach((tab) => {
      const el = sectionRefs.current[tab.id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(tab.id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [visibleTabs]);
​
  function scrollTo(id) {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
​
  return (
    <div className="mt-12">
      <div className="sticky top-0 z-20 -mx-4 border-b border-gold/15 bg-ivory/95 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0">
        <nav
          className="flex gap-1 overflow-x-auto"
          aria-label="Product sections"
          role="tablist"
        >
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition focus-gold ${
                active === tab.id
                  ? "bg-gradient-gold text-ink"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
​
      <div className="mt-8 space-y-14">
        {visibleTabs.some((t) => t.id === "description") ? (
          <section
            id="description"
            ref={(el) => {
              sectionRefs.current.description = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Description</h2>
            <hr className="rule-gold mt-3 w-14" />
            <div className="mt-6 space-y-5">
              {Object.entries(DESC_LABELS).map(([key, label]) =>
                detail[key] ? (
                  <div key={key}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
                      {label}
                    </h3>
                    {renderDescriptionContent(detail[key], key === "benefits")}
                  </div>
                ) : null,
              )}
              {!Object.values(detail).some(Boolean) && product.description ? (
                <p className="text-charcoal">{product.description}</p>
              ) : null}
            </div>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "specifications") ? (
          <section
            id="specifications"
            ref={(el) => {
              sectionRefs.current.specifications = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Specifications</h2>
            <hr className="rule-gold mt-3 w-14" />
            <dl className="mt-6 divide-y divide-gold/10 rounded-lg border border-gold/15 bg-white">
              {Object.entries(SPEC_LABELS).map(([key, label]) =>
                specs[key] ? (
                  <div
                    key={key}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-graphite">{label}</dt>
                    <dd className="text-sm text-ink">{specs[key]}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "colors") ? (
          <section
            id="colors"
            ref={(el) => {
              sectionRefs.current.colors = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Available Colors</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {colors.map((color, i) => (
                <li
                  key={`${color.name || color.hex}-${i}`}
                  className="overflow-hidden rounded-lg border border-gold/15 bg-white p-3 text-center"
                >
                  {color.image_url ? (
                    <div className="relative mx-auto aspect-square w-full max-w-[7rem] overflow-hidden rounded-md">
                      <EntityImage
                        src={color.image_url}
                        alt={color.name || "Colour"}
                        label={color.name}
                        sizes="112px"
                      />
                    </div>
                  ) : (
                    <span
                      className="mx-auto block aspect-square w-full max-w-[7rem] rounded-md border border-graphite/20"
                      style={{ backgroundColor: color.hex || "#ccc" }}
                      aria-hidden
                    />
                  )}
                  <p className="mt-2 text-sm font-medium text-ink">{color.name}</p>
                  {color.hex ? (
                    <p className="text-xs text-graphite">{color.hex}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "profiles") ? (
          <section
            id="profiles"
            ref={(el) => {
              sectionRefs.current.profiles = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Available Profiles</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {profiles.map((profile, i) => (
                <li
                  key={`${profile.name}-${i}`}
                  className="overflow-hidden rounded-lg border border-gold/15 bg-white"
                >
                  <div className="relative aspect-[16/9] bg-graphite/10">
                    <EntityImage
                      src={profile.image_url}
                      alt={profile.name || "Profile"}
                      label={profile.name}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {profile.name}
                    </h3>
                    {profile.description ? (
                      <p className="mt-1 text-sm text-graphite">{profile.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "gallery") ? (
          <section
            id="gallery"
            ref={(el) => {
              sectionRefs.current.gallery = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Gallery</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {galleryImages.map((image, i) => (
                <li
                  key={`${image.url || image}-${i}`}
                  className="overflow-hidden rounded-lg border border-gold/15 bg-graphite/10"
                >
                  <div className="relative aspect-[16/9]">
                    <EntityImage
                      src={image.url || image}
                      alt={image.caption || `Gallery image ${i + 2}`}
                      label={image.caption}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {image.caption ? (
                    <div className="p-3">
                      <p className="text-sm text-graphite">{image.caption}</p>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "features") ? (
          <section
            id="features"
            ref={(el) => {
              sectionRefs.current.features = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Features</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {features.map((feature, i) => (
                <li
                  key={`${feature.title}-${i}`}
                  className="rounded-lg border border-gold/15 bg-white p-5 shadow-card"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-gold text-sm font-bold text-ink"
                    aria-hidden
                  >
                    {(feature.icon || feature.title || "?").toString().slice(0, 1).toUpperCase()}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  {feature.description ? (
                    <p className="mt-1 text-sm text-graphite">{feature.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "applications") ? (
          <section
            id="applications"
            ref={(el) => {
              sectionRefs.current.applications = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Applications</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {applications.map((app) => (
                <li
                  key={app}
                  className="flex items-center gap-2 rounded-md border border-gold/15 bg-white px-4 py-3 text-sm text-ink"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {app}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
​
        {visibleTabs.some((t) => t.id === "downloads") ? (
          <section
            id="downloads"
            ref={(el) => {
              sectionRefs.current.downloads = el;
            }}
            className="scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold text-ink">Downloads</h2>
            <hr className="rule-gold mt-3 w-14" />
            <ul className="mt-6 space-y-2">
              {Object.entries(DOWNLOAD_LABELS).map(([key, label]) =>
                downloads[key] ? (
                  <li key={key}>
                    <a
                      href={downloads[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-gold/25 bg-white px-4 py-3 text-sm font-medium text-gold-dark hover:border-gold focus-gold"
                    >
                      {label} →
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
