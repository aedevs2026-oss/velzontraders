"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import heroScreen from "../../public/Hero/screen.png";
import heroScreenTwo from "../../public/Hero/screen-2.png";
import heroScreenThree from "../../public/Hero/screen-3.png";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";
import { SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";

const heroSlides = [
  {
    eyebrow: SITE.serviceArea,
    heading: "VELZON",
    subheading: "Trade Enterprises",
    tagline: "Premium Colour Coated Roofing Sheets",
    description:
      "Supply of premium colour-coated roofing sheets for residential, commercial, industrial and warehouse projects. High-quality materials, multiple colour options, reliable delivery and trusted service across Tamil Nadu.",
    image: heroScreen,
    imageAlt: "Velzon Trade Enterprises premium colour coated roofing sheets",
  },
  {
    eyebrow: SITE.serviceArea,
    heading: "VELZON",
    subheading: "Trade Enterprises",
    tagline: "Trusted Fabrication and Structural Materials",
    description:
      "From structural steel to custom fabrication components, we source and supply branded materials built to spec, helping builders and contractors keep every project on schedule and on budget.",
    image: heroScreenTwo,
    imageAlt: "Velzon Trade Enterprises fabrication and structural materials",
  },
  {
    eyebrow: SITE.serviceArea,
    heading: "VELZON",
    subheading: "Trade Enterprises",
    tagline: "Reliable Wiring Coordination Support",
    description:
      "Beyond materials, we coordinate wiring requirements alongside your build, working closely with sellers, builders, and end clients to keep every phase of the project moving smoothly.",
    image: heroScreenThree,
    imageAlt: "Velzon Trade Enterprises wiring coordination support",
  },
];

const SLIDE_DURATION = 6500;

export function Hero({
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const primaryHref = phones[0]?.href || SITE.phoneHref;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setProgressKey((k) => k + 1);
  };
  const goPrev = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
    setProgressKey((k) => k + 1);
  };
  const goNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
    setProgressKey((k) => k + 1);
  };

  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(212,175,55,0.18), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(156,163,175,0.15), transparent)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            width: `${heroSlides.length * 100}%`,
            transform: `translateX(-${activeSlide * (100 / heroSlides.length)}%)`,
          }}
        >
          {heroSlides.map((s, index) => (
            <div
              key={s.tagline}
              className="w-full flex-shrink-0"
              style={{ width: `${100 / heroSlides.length}%` }}
              aria-hidden={index !== activeSlide}
            >
              <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-gold-dark/60" aria-hidden />
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      {s.eyebrow}
                    </p>
                  </div>

                  <div className="mt-5">
                    <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-wide text-ink sm:text-5xl lg:text-[3.4rem]">
                      <span className="text-gradient-gold">{s.heading}</span>
                    </h1>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-graphite/80">
                      {s.subheading}
                    </p>
                  </div>

                  <p className="mt-6 max-w-lg font-display text-lg font-semibold leading-snug text-charcoal sm:text-xl">
                    {s.tagline}
                  </p>

                  <p className="mt-4 max-w-xl text-[0.975rem] leading-relaxed text-graphite sm:text-base">
                    {s.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Button href="/contact" size="lg">
                      Get a Quote
                    </Button>
                    <Button href={primaryHref} variant="secondary" size="lg">
                      Call Now
                    </Button>
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-sm text-graphite">
                    <span className="h-px w-4 bg-gold/40" aria-hidden />
                    <PhoneLinks
                      phones={phones}
                      linkClassName="font-medium text-gold-dark hover:underline focus-gold rounded-sm"
                    />
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  <div className="absolute -inset-4 rounded-full bg-gradient-gold opacity-[0.15] blur-3xl" aria-hidden />

                  <div className="relative">
                    <span className="absolute -left-2 -top-2 h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-gold-dark/50 sm:h-8 sm:w-8" aria-hidden />
                    <span className="absolute -right-2 -top-2 h-6 w-6 rounded-tr-2xl border-r-2 border-t-2 border-gold-dark/50 sm:h-8 sm:w-8" aria-hidden />
                    <span className="absolute -bottom-2 -left-2 h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-gold-dark/50 sm:h-8 sm:w-8" aria-hidden />
                    <span className="absolute -bottom-2 -right-2 h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-gold-dark/50 sm:h-8 sm:w-8" aria-hidden />

                    <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:rounded-[2.5rem]">
                      <div className="relative aspect-square w-full max-w-[28rem] mx-auto sm:max-w-[32rem]">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 32rem, 90vw"
                          className="object-contain object-center"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="hidden group absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/25 bg-ivory/70 p-2.5 shadow-soft backdrop-blur transition-all duration-300 hover:border-gold-dark/50 hover:bg-ivory focus-gold sm:left-5 sm:p-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink transition-transform duration-300 group-hover:-translate-x-0.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="hidden group absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/25 bg-ivory/70 p-2.5 shadow-soft backdrop-blur transition-all duration-300 hover:border-gold-dark/50 hover:bg-ivory focus-gold sm:right-5 sm:p-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center gap-5 pb-9">
        <span className="font-display text-xs tabular-nums tracking-widest text-graphite/70">
          {String(activeSlide + 1).padStart(2, "0")}
        </span>

        <div className="flex gap-2">
          {heroSlides.map((s, index) => (
            <button
              key={s.tagline}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative h-1.5 w-10 overflow-hidden rounded-full bg-gold/15 focus-gold"
            >
              {index === activeSlide && (
                <span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 rounded-full bg-gold-dark"
                  style={{
                    animation: `heroProgress ${SLIDE_DURATION}ms linear forwards`,
                  }}
                />
              )}
              {index < activeSlide && (
                <span className="absolute inset-0 rounded-full bg-gold-dark/70" />
              )}
            </button>
          ))}
        </div>

        <span className="font-display text-xs tabular-nums tracking-widest text-graphite/40">
          {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      <style jsx>{`
        @keyframes heroProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}