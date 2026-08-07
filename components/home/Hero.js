"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import heroScreen from "../../public/Hero/hero-1.png";
import heroScreenTwo from "../../public/Hero/hero-2.png";
import heroScreenThree from "../../public/Hero/hero-3.png";
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
    <section className="relative overflow-hidden bg-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(212,175,55,0.18), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(156,163,175,0.15), transparent)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-none">
        <div className="relative w-full overflow-hidden bg-transparent">
          <div
            className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              width: `${heroSlides.length * 100}%`,
              transform: `translateX(-${activeSlide * (100 / heroSlides.length)}%)`,
            }}
          >
            {heroSlides.map((slide, index) => (
              <div
                key={slide.imageAlt}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / heroSlides.length}%` }}
                aria-hidden={index !== activeSlide}
              >
                {/*
                  Fixed height strategy:
                  - w-full (not w-screen) avoids horizontal overflow from scrollbar width.
                  - h-[70dvh] on mobile portrait uses dynamic viewport height so the
                    image doesn't jump when the browser address bar shows/hides.
                  - min-h / max-h caps stop the image from being too short (small phones)
                    or absurdly tall (large desktop monitors).
                  - sm: breakpoint gives a taller, more "hero-like" crop on tablet/desktop.
                  - landscape: variant caps height so mobile landscape doesn't crop
                    the image down to a thin sliver with object-cover.
                */}
                <div className="hero-image-container">
                   <Image
    src={slide.image}
    alt={slide.imageAlt}
    fill
    priority={index === 0}
    sizes="100vw"
    className="hero-image"
  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/25 bg-ivory/80 p-2.5 shadow-soft backdrop-blur transition-all duration-300 hover:border-gold-dark/50 hover:bg-ivory focus-gold sm:left-5 sm:p-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink transition-transform duration-300 group-hover:-translate-x-0.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/25 bg-ivory/80 p-2.5 shadow-soft backdrop-blur transition-all duration-300 hover:border-gold-dark/50 hover:bg-ivory focus-gold sm:right-5 sm:p-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 pb-4 sm:gap-3 sm:pb-5">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.imageAlt}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative h-1.5 w-8 overflow-hidden rounded-full bg-gold/15 focus-gold sm:w-10"
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

  .hero-image-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;
  }

  .hero-image {
    object-fit: cover;
    object-position: center;
  }

  /* Mobile only */
  @media (max-width: 640px) {
    .hero-image-container {
      height: 28vh;
    }
  }

  /* Landscape mode */
  @media (orientation: landscape) {
    .hero-image {
      object-fit: contain;
      background: #fff;
    }
  }
`}</style>
    </section>
  );
}