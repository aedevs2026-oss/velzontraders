"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GSAPWrapper({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray("section, article, .gsap-animate, .fade-up, .gsap-card, .gsap-fade");

      targets.forEach((target) => {
        gsap.from(target, {
          y: 36,
          autoAlpha: 0,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: target,
            start: "top 92%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
