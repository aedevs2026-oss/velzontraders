"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FABRICATION_APPROACH } from "@/lib/constants";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export function FabricationApproach({
  content = FABRICATION_APPROACH,
}) {
  const { eyebrow, title, summary, intro, steps } = content;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStepIndex((current) => (current + 1) % steps.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [steps.length]);

  const activeImage = steps[activeStepIndex];

  const goPrev = () =>
    setActiveStepIndex((current) => (current - 1 + steps.length) % steps.length);
  const goNext = () =>
    setActiveStepIndex((current) => (current + 1) % steps.length);

  return (
    <section
      id="fabrication-approach"
      className="relative overflow-hidden border-b border-gold/10 bg-white py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.08),transparent)]"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} description={summary} />
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-graphite sm:text-base">
              {intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/fabrication-approach" variant="primary" size="md">
                Show journey details
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark hover:underline focus-gold rounded-sm"
              >
                <span>Start your enquiry</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {steps.slice(0, 4).map((step) => (
                <li
                  key={step.step}
                  className="flex items-start gap-3 rounded-lg border border-gold/12 bg-ivory/70 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-xs font-bold text-ink">
                    {step.step}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-graphite">{step.phase}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-center rounded-lg border border-dashed border-gold/25 bg-ivory/40 px-4 py-3 text-sm text-graphite">
                <Link href="/fabrication-approach" className="w-full text-center font-semibold text-graphite hover:text-ink">
                  + {steps.length - 4} more steps on the full journey page
                </Link>
              </li>
            </ol>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gold/20 bg-ivory shadow-soft">
              <EntityImage
                src={activeImage.image_url}
                alt={activeImage.image_alt}
                label="Fabrication approach"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
                quality={100}
                className="object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent px-6 pb-6 pt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Client to Velzon
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  {steps.length} documented stages
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/85">
                  <span className="inline-flex items-center gap-1">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Enquiry</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Specification</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Fabrication</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Site-ready delivery</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-white text-ink shadow-soft transition hover:border-gold hover:text-gold"
                aria-label="Previous fabrication step"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
                Step {activeImage.step} of {steps.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-white text-ink shadow-soft transition hover:border-gold hover:text-gold"
                aria-label="Next fabrication step"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
