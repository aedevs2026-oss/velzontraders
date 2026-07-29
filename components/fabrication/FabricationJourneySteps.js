import { EntityImage } from "@/components/ui/EntityImage";

export function FabricationJourneyStep({ step, index, isLast }) {
  const imageFirst = index % 2 === 0;

  return (
    <article
      className="process-step animate-fade-up grid gap-6 md:grid-cols-2 md:items-center md:gap-10"
      style={{ animationDelay: `${Math.min(index * 0.06, 0.5)}s` }}
    >
      <div className={`relative ${imageFirst ? "md:order-1" : "md:order-2"}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-gold/20 bg-white shadow-card">
          <EntityImage
            src={step.image_url}
            alt={step.image_alt}
            label={step.title}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark shadow-sm">
            {step.phase}
          </span>
        </div>
      </div>

      <div className={`relative ${imageFirst ? "md:order-2" : "md:order-1"}`}>
        {!isLast ? (
          <span
            aria-hidden
            className="process-rail absolute -bottom-8 left-5 top-14 hidden w-px bg-gradient-to-b from-gold/50 to-gold/10 md:block"
          />
        ) : null}

        <div className="flex gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-lg font-bold text-ink shadow-soft"
            aria-hidden
          >
            {step.step}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Step {String(step.step).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-[1.65rem]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite sm:text-base">
              {step.description}
            </p>
            <p className="mt-3 border-l-2 border-gold/35 pl-4 text-sm text-charcoal/90">
              {step.detail}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FabricationJourneySteps({ steps }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {steps.map((step, index) => (
        <FabricationJourneyStep
          key={step.step}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}
