"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Colours reuse the site's existing design tokens (bg-ivory, text-graphite,
 * text-gold-dark, bg-gradient-gold, text-ink, border-gold) so this section
 * sits consistently with the rest of the page instead of introducing a new
 * palette. The SVG diagram can't take Tailwind classes directly for its
 * stroke/fill, so it uses #B8860B — the same gold-dark hex already used in
 * the site's hero gradient — to stay on-brand.
 *
 * ACCESSIBILITY NOTE: #B8860B on white/ivory is only ~3.25:1 contrast, which
 * fails WCAG AA (4.5:1) for regular-size text. It's kept for the decorative
 * diagram strokes and large CTA surfaces, but every small mono label now
 * uses TEXT_GOLD (#8B6508, ~5.3:1) instead so labels stay legible.
 */

const GOLD_DARK = "#B8860B";
const TEXT_GOLD = "#8B6508"; // AA-safe gold for small text (eyebrows, specs, codes)

const materials = [
  {
    code: "MATL.01",
    title: "Puff sheet range",
    eyebrow: "Fabrication-ready supply",
    description:
      "Premium puff sheet options with dependable thickness availability for warehouse, industrial, and commercial roofing systems.",
    specs: [
      { label: "Thickness", value: "30 / 50 mm" },
      { label: "Function", value: "Insulation support" },
      { label: "Supply", value: "Fabrication-ready" },
    ],
    brands: ["Metecno India Pvt Ltd", "Alfaa India Pvt Ltd", "Mount India Pvt Ltd"],
    cta: "Explore puff sheets",
  },
  {
    code: "MATL.02",
    title: "Roofing sheet brands",
    eyebrow: "Mill-trusted names",
    description:
      "Choose from leading roofing sheet brands that match finish preferences, project specs, and long-term performance expectations.",
    specs: [
      { label: "Mills", value: "JSW · Tata · AMNS · Jindal" },
      { label: "Finish", value: "Colour-coated" },
      { label: "Grade", value: "Commercial / industrial" },
    ],
    brands: [
      {
        name: "JSW",
        subBrands: ["Silveron", "Colouron+", "JSW Steel", "Pragati", "Pragati+"],
      },
      {
        name: "Tata",
        subBrands: ["Tata Steel", "Tata BlueScope", "Tata Busion"],
      },
      { name: "AMNS India" },
      { name: "Jindal" },
    ],
    cta: "View brand options",
  },
  {
    code: "MATL.03",
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
];

/** Turns "Tata Blue Scope" into "TB", "Silveron" into "SI", "JSW" into "JS", etc. */
function monogram(name) {
  const words = name.replace(/Pvt\.?\s*Ltd\.?/i, "").trim().split(/\s+/);
  const first = words[0];
  // Acronym-style names (JSW, AMNS) should keep their own letters rather than
  // blending with the next word ("AMNS India" -> "AM", not "AI").
  if (first.length <= 5 && first === first.toUpperCase()) {
    return first.slice(0, 2).toUpperCase();
  }
  if (words.length === 1) return first.slice(0, 2).toUpperCase();
  return (first[0] + words[1][0]).toUpperCase();
}

/** Trapezoidal box-rib roofing profile, drawn as an engineering cross-section. */
function RoofProfileDiagram({ gaugeLabel }) {
  const width = 400;
  const height = 60;
  const baseY = 118;
  const peaks = 5;
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

  return (
    <svg
      viewBox="0 0 400 170"
      className="h-full w-full"
      role="img"
      aria-label={`Cross-section diagram of the ${gaugeLabel} roofing profile`}
    >
      {/* dimension line */}
      <line x1="0" y1="24" x2="400" y2="24" stroke="#B8860B22" strokeWidth="1" />
      <line x1="0" y1="18" x2="0" y2="30" stroke={GOLD_DARK} strokeWidth="1.5" />
      <line x1="400" y1="18" x2="400" y2="30" stroke={GOLD_DARK} strokeWidth="1.5" />
      <text x="200" y="16" textAnchor="middle" className="font-mono text-[10px] tracking-[0.15em]" fill={TEXT_GOLD}>
        PITCH {(width / peaks).toFixed(0)}mm
      </text>

      {/* profile fill */}
      <path d={`${d} L 400 170 L 0 170 Z`} fill={`${GOLD_DARK}14`} stroke="none" />

      {/* profile line, drawn on */}
      <path
        d={d}
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="motion-safe:animate-[draw_1.1s_ease-out]"
        style={{ strokeDasharray: 1400, strokeDashoffset: 0 }}
      />

      {/* rivets */}
      {rivetX.map((x, i) => (
        <circle key={i} cx={x} cy={baseY} r="2.5" fill={GOLD_DARK} opacity="0.75" />
      ))}

      {/* gauge callout, left edge */}
      <line x1="14" y1={baseY - height} x2="14" y2={baseY} stroke={GOLD_DARK} strokeWidth="1.5" />
      <line x1="9" y1={baseY - height} x2="19" y2={baseY - height} stroke={GOLD_DARK} strokeWidth="1.5" />
      <line x1="9" y1={baseY} x2="19" y2={baseY} stroke={GOLD_DARK} strokeWidth="1.5" />
      <text x="26" y={baseY - height / 2 + 3} className="font-mono text-[10px] tracking-[0.1em]" fill={TEXT_GOLD}>
        {gaugeLabel}
      </text>

      {/* baseline */}
      <line x1="0" y1={baseY} x2="400" y2={baseY} stroke="#1114" strokeWidth="1" />
    </svg>
  );
}

/** Small circular monogram badge used as a stand-in "logo" for each brand. */
function BrandBadge({ name }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-gold font-mono text-[11px] font-semibold tracking-wide text-ink shadow-sm ring-1 ring-gold/20"
    >
      {monogram(name)}
    </span>
  );
}

export function FeaturedProducts() {
  const [active, setActive] = useState(0);
  const material = materials[active];
  const baseId = useId();
  const tabRefs = useRef([]);

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
    <section className="relative overflow-hidden border-b border-gold/10 bg-ivory py-16 sm:py-20">
      <style>{`
        @keyframes draw {
          from { stroke-dashoffset: 1400; }
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[draw_1\\.1s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>

      <Container>
        <SectionHeading
          eyebrow="Roofing accessories · materials index"
          title="Premium roofing materials & trusted brands"
          description="A working specification index for puff sheets, roofing sheets, and fabrication-ready brand options across Tamil Nadu."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-card">
          <div className="flex flex-col lg:flex-row">
            {/* index rail */}
            <div
              role="tablist"
              aria-label="Roofing material categories"
              className="flex shrink-0 flex-row overflow-x-auto border-b border-gold/10 bg-ivory/70 lg:w-64 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
              onKeyDown={handleKeyDown}
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
                    className={`group flex min-w-[220px] flex-1 items-center gap-3 border-l-2 px-5 py-4 text-left transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8B6508] lg:min-w-0 ${
                      isActive
                        ? "border-l-[3px] border-gold-dark bg-white"
                        : "border-transparent hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.15em] transition-colors ${
                        isActive ? "text-[#8B6508]" : "text-graphite/60 group-hover:text-graphite/80"
                      }`}
                    >
                      {m.code}
                    </span>
                    <span className={`font-display text-sm leading-tight ${isActive ? "text-ink" : "text-graphite/80"}`}>
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* spec sheet */}
            <div
              key={material.code}
              id={panelId(active)}
              role="tabpanel"
              aria-labelledby={tabId(active)}
              tabIndex={0}
              className="grid flex-1 gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B6508] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="border-b border-gold/10 bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B6508]">
                  {material.eyebrow}
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {material.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-graphite sm:text-base">
                  {material.description}
                </p>

                <div className="mt-6 h-40 rounded-xl border border-gold/10 bg-ivory/70 p-4">
                  <RoofProfileDiagram gaugeLabel={material.specs[0].value} />
                </div>

                <dl className="mt-6 grid grid-cols-3 gap-4">
                  {material.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-graphite/70">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-ivory/70 p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B6508]">
                  Featured brand partners
                </p>
                <ul className="mt-4 space-y-0 divide-y divide-gold/10">
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
                          <ul
                            aria-label={`${name} product lines`}
                            className="ml-12 mt-2 flex flex-wrap gap-2"
                          >
                            {brand.subBrands.map((sub) => (
                              <li
                                key={sub}
                                className="rounded-full border border-gold/20 bg-white px-3 py-1 text-xs text-graphite/80"
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

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-ink transition motion-safe:hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6508]"
                >
                  {material.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6508]"
          >
            Request a quote
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-gold/25 bg-white px-5 py-3 text-sm font-semibold text-[#8B6508] transition hover:border-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6508]"
          >
            View all materials →
          </Link>
        </div>
      </Container>
    </section>
  );
}