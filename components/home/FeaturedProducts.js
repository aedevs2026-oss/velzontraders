"use client";

/**
 * FEATURED PRODUCTS — "Materials Index" layout
 * ------------------------------------------------------------------
 * Light theme, restructured from a tabbed rail + panel into a
 * horizontal "sample strip" selector sitting above a full-width
 * datasheet, framed top and bottom by a corrugated-sheet divider —
 * the one signature motif, since the subject is literally corrugated
 * roofing sheet. Everything else (paper background, quiet type,
 * hairline rules) stays deliberately restrained around it.
 *
 * Palette uses Tailwind's stock swatches only:
 *   paper   stone-50 / stone-100
 *   panel   white
 *   ink     stone-900
 *   muted   stone-500 / stone-600
 *   line    stone-200
 *   accent  orange-700 / orange-800 (rust — the one bold color)
 *
 * This file is written as a standalone artifact preview: next/link
 * and the site's Container/SectionHeading wrappers are swapped for
 * plain <a> / <div> equivalents. Swap them back in when you drop
 * this into the Next.js app.
 */

import { useId, useRef, useState, useEffect } from "react";

const materials = [
   {
    code: "MATL.01",
    title: "Complete roofing support",
    eyebrow: "From supply to guidance",
    description:
      "We help clients select the right material, finish, and brand profile for factory roofs, workshops, and modern commercial builds.",
    specs: [
      { label: "Guidance", value: "Material + brand fit" },
      { label: "Turnaround", value: "Fast quotes" },
      { label: "Coverage", value: "Tamil Nadu" },
    ],
    brands: ["Warehouse roofing", "Retail & WFH structures", "Shops & franchisee projects"],
    cta: "Request a quote",
  },
  {
    code: "MATL.02",
    title: "Roofing sheet brands",
    eyebrow: "Mill-trusted names",
    description:
      "Choose from leading roofing sheet brands that match finish preferences, project specs, and long-term performance expectations.",
    specs: [
      { label: "Width", value: "1100 mm" },
      { label: "Mills", value: "JSW · Tata · AMNS · Jindal" },
      { label: "Finish", value: "Colour-coated" },
    ],
    brands: [
      { name: "JSW", subBrands: ["Silveron", "Colouron+", "JSW Steel", "Pragati", "Pragati+"] },
      { name: "Tata", subBrands: ["Tata Steel", "Tata BlueScope", "Tata Busion"] },
      { name: "AMNS India" },
      { name: "Jindal" },
    ],
    cta: "View brand options",
  },
 
  {
    code: "MATL.03",
    title: "Steel materials",
    eyebrow: "Structural supply",
    description:
      "Purlins, angles, channels and heavy sections sized for the load-bearing frame beneath the sheet — the structural layer that carries the roof.",
    specs: [
      { label: "Sections", value: "C · Z · Angle · Pipe · Beam" },
      { label: "Grade", value: "Fe410 / Fe250" },
      { label: "Supply", value: "Cut-to-length / cut-to-size" },
    ],
    brands: ["JSW Steel", "Tata Steel", "SAIL"],
    cta: "Enquire on steel",
  },
    {
    code: "MATL.04",
    title: "Puff sheet range",
    eyebrow: "Fabrication-ready supply",
    description:
      "Premium puff sheet options with dependable thickness availability for warehouse, industrial, and commercial roofing systems.",
    specs: [
      { label: "Width", value: "1080 mm" },
      { label: "Function", value: "Insulation support" },
      { label: "Supply", value: "Fabrication-ready" },
    ],
    brands: ["Metecno India Pvt Ltd", "Alfaa India Pvt Ltd", "Mount India Pvt Ltd"],
    cta: "Explore puff sheets",
  },
];

function monogram(name) {
  const words = name.replace(/Pvt\.?\s*Ltd\.?/i, "").trim().split(/\s+/);
  const first = words[0];
  if (first.length <= 5 && first === first.toUpperCase()) return first.slice(0, 2).toUpperCase();
  if (words.length === 1) return first.slice(0, 2).toUpperCase();
  return (first[0] + words[1][0]).toUpperCase();
}

const MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };
const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" };

/** Trapezoidal box-rib roofing profile, drawn as an engineering cross-section. */
function RoofProfileDiagram({ gaugeLabel, compact = false }) {
  const width = 400;
  const height = compact ? 26 : 60;
  const baseY = compact ? 56 : 118;
  const peaks = compact ? 3 : 5;
  const segW = width / peaks;

  let d = `M 0 ${baseY}`;
  const rivetX = [];
  for (let i = 0; i < peaks; i++) {
    const x0 = i * segW;
    d += ` L ${x0 + segW * 0.22} ${baseY}`;
    d += ` L ${x0 + segW * 0.36} ${baseY - height}`;
    d += ` L ${x0 + segW * 0.64} ${baseY - height}`;
    d += ` L ${x0 + segW * 0.78} ${baseY}`;
    d += ` L ${x0 + segW} ${baseY}`;
    rivetX.push(x0 + segW * 0.5);
  }

  const viewH = compact ? baseY + 14 : baseY + 30;

  return (
    <svg
      viewBox={`0 0 400 ${viewH}`}
      className="h-full w-full"
      role="img"
      aria-label={`Cross-section diagram of the ${gaugeLabel} roofing profile`}
    >
      <path d={`${d} L 400 ${viewH} L 0 ${viewH} Z`} className="fill-gold/20" stroke="none" />
      <path
        d={d}
        fill="none"
        className="stroke-gold-dark"
        strokeWidth={compact ? 1.75 : 2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {!compact &&
        rivetX.map((x, i) => <circle key={i} cx={x} cy={baseY} r="2.5" className="fill-gold-dark" opacity="0.7" />)}
      <line x1="0" y1={baseY} x2="400" y2={baseY} className="stroke-gold/40" strokeWidth="1" />
    </svg>
  );
}

function BrandBadge({ name }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-[11px] font-semibold tracking-wide text-gold-dark"
      style={MONO}
    >
      {monogram(name)}
    </span>
  );
}

export default function FeaturedProducts() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const material = materials[active];
  const baseId = useId();
  const tabRefs = useRef([]);

  useEffect(() => setMounted(true), []);

  const tabId = (i) => `${baseId}-tab-${materials[i].code}`;
  const panelId = (i) => `${baseId}-panel-${materials[i].code}`;

  function focusTab(i) {
    const next = (i + materials.length) % materials.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(materials.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <section className="border-b border-gold/10 bg-ivory py-16 sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 max-w-2xl">
          <h2 className="text-4xl font-display font-semibold leading-[1.05] text-ink sm:text-5xl">
            Premium roofing materials &amp; trusted brands
          </h2>
          <p className="mt-4 text-base leading-7 text-graphite">
            A working specification index for puff sheets, roofing sheets, and fabrication-ready brand options
            across Tamil Nadu.
          </p>
        </div>

        {/* selector strip — sample swatches, not a sidebar tab list */}
        <div
          role="tablist"
          aria-label="Roofing material categories"
          onKeyDown={handleKeyDown}
          className="mt-10 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {materials.map((m, i) => {
            const isActive = i === active;
            return (
              <button
                key={m.code}
                ref={(el) => (tabRefs.current[i] = el)}
                id={tabId(i)}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId(i)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group flex min-w-[210px] flex-1 flex-col overflow-hidden rounded-lg border bg-white text-left transition duration-300 ease-out motion-safe:transform-gpu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:min-w-0 ${
                  isActive
                    ? "border-gold/30 bg-gold/10 shadow-soft scale-[1.01]"
                    : "border-gold/10 hover:border-gold/20 hover:-translate-y-0.5"
                }`}
              >
                <div className={`h-14 border-b px-4 pt-3 ${isActive ? "border-gold/20 bg-gold/10" : "border-gold/10 bg-ivory"}`}>
                  <RoofProfileDiagram gaugeLabel={m.specs[0].value} compact />
                </div>
                <div className="px-4 py-3">
                  <span
                    className={`text-[10px] uppercase tracking-[0.15em] ${isActive ? "text-orange-800" : "text-stone-400"}`}
                    style={MONO}
                  >
                    {m.code}
                  </span>
                  <div className={`mt-1 text-lg font-semibold leading-tight ${isActive ? "text-stone-900" : "text-stone-700"}`} style={DISPLAY}>
                    {m.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* datasheet */}
        <div
          key={material.code}
          id={panelId(active)}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          tabIndex={0}
          className="mt-3 grid overflow-hidden rounded-lg border border-gold/10 bg-white transition duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="border-b border-gold/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold" style={MONO}>
              {material.eyebrow}
            </span>
            <h3 className="mt-2 text-3xl font-display font-semibold text-ink sm:text-4xl">
              {material.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-graphite sm:text-base">{material.description}</p>

            <div className="mt-6 h-36 rounded-md border border-gold/10 bg-ivory p-4 transition duration-300 ease-out">
              <RoofProfileDiagram gaugeLabel={material.specs[0].value} />
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-gold/10 pt-5">
              {material.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.15em] text-graphite" style={MONO}>
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-ivory p-6 sm:p-8">
            {material.items ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold" style={MONO}>
                  Steel product specifications
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {material.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gold/10 bg-white p-4 shadow-sm"
                    >
                      <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-graphite">{item.description}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold-dark">Thickness</p>
                      <p className="mt-1 text-sm text-charcoal">{item.thickness.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold" style={MONO}>
                  Featured brand partners
                </p>
                <ul className="mt-4 divide-y divide-gold/10">
                  {material.brands.map((brand) => {
                    const isGroup = typeof brand === "object";
                    const name = isGroup ? brand.name : brand;
                    return (
                      <li key={name} className="py-3">
                        <div className="flex items-center gap-3">
                          <BrandBadge name={name} />
                          <span className="text-sm leading-6 text-graphite sm:text-base">{name}</span>
                        </div>
                        {isGroup && brand.subBrands?.length > 0 && (
                          <ul aria-label={`${name} product lines`} className="ml-12 mt-2 flex flex-wrap gap-2">
                            {brand.subBrands.map((sub) => (
                              <li
                                key={sub}
                                className="rounded-full border border-gold/10 bg-white px-3 py-1 text-xs text-graphite"
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {material.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Request a quote
          </a>
          <a
            href="#products"
            className="rounded-full border border-gold/20 bg-white px-5 py-3 text-sm font-semibold text-gold-dark transition hover:border-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View all materials →
          </a>
        </div>
      </div>
    </section>
  );
}