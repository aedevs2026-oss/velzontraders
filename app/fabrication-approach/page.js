import { SiteShell } from "@/components/layout/SiteShell";
import { FabricationJourneySteps } from "@/components/fabrication/FabricationJourneySteps";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FABRICATION_APPROACH } from "@/lib/constants";

export const metadata = {
  title: "Fabrication Approach",
  description:
    "How Velzon approaches fabrication — from client enquiry and material specification through sourcing, workshop fabrication, and site-ready delivery across Tamil Nadu.",
};

export default function FabricationApproachPage() {
  const { eyebrow, title, summary, intro, steps } = FABRICATION_APPROACH;

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-gold/10 bg-ivory py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.1),transparent)]"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
            <div>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={summary}
              />
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-graphite sm:text-base">
                {intro}
              </p>
              <p className="mt-4 text-sm font-medium text-gold-dark">
                {steps.length} documented stages · Client to Velzon · Tamil Nadu
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gold/20 shadow-soft lg:aspect-[4/3]">
              <EntityImage
                src={steps[7].image_url}
                alt={steps[7].image_alt}
                label="Fabrication journey"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent px-6 pb-5 pt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Enquiry → delivery
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-white">
                  Your project, step by step
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-gold/10 bg-white py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Full journey
              </p>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                From first call to site-ready materials
              </h2>
            </div>
            <p className="text-sm text-graphite">
              How we start, how we fabricate, and how it ends on your site
            </p>
          </div>

          <FabricationJourneySteps steps={steps} />

          <div className="mt-14 rounded-xl border border-gold/20 bg-ivory px-6 py-8 text-center sm:px-10">
            <hr className="rule-gold-center mb-5" />
            <p className="font-display text-2xl font-semibold text-ink">
              Ready to begin at Step 01?
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-graphite sm:text-base">
              Share your drawings or site brief — we respond with specification
              options and a clear fabrication path.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary" size="md">
                Get a quote
              </Button>
              <Button href="/projects" variant="secondary" size="md">
                View project types
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
