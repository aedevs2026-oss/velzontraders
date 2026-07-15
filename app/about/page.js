import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "About Us",
  description:
    "Learn how Velzon Trade Enterprise sources, fabricates, and supplies roofing materials across Coimbatore, Tamil Nadu — Confidence, Growth, Trust.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <section className="border-b border-gold/10 bg-ivory py-14 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Our story"
            title="Trading strength. Fabrication care."
            description={`${settings.company_name || SITE.name} is a Coimbatore-based trading house for roofing and fabrication materials. We do not manufacture — we source from mills and makers, fabricate and customise to your drawings, and supply sellers, builders, and end clients.`}
          />
        </Container>
      </section>

      <section className="border-b border-gold/10 bg-white py-14 sm:py-16">
        <Container className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Mission",
              body: "Put the right thickness, profile, and finish into every Coimbatore-region project — with quotes you can act on and deliveries you can plan around.",
            },
            {
              title: "Values",
              body: "Confidence in specifications. Growth through repeatable supply for multi-site work. Trust earned in every hand-off from enquiry to dispatch.",
            },
            {
              title: "How we operate",
              body: "Source → fabricate/customise → supply. When house builds need it, we also help coordinate wiring and electrical material supply alongside the roofing package.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-gold/15 bg-ivory p-6">
              <h2 className="font-display text-2xl font-semibold text-ink">{item.title}</h2>
              <hr className="rule-gold mt-3 w-12" />
              <p className="mt-4 text-sm text-graphite sm:text-base">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-ink">Service area</h2>
          <hr className="rule-gold mt-3 w-16" />
          <p className="mt-4 text-graphite">
            Based in {settings.address || SITE.address}, we regularly support projects across
            Coimbatore and neighbouring towns — Tiruppur, Pollachi, and surrounding industrial
            and residential corridors. Tell us your site location when you enquire so we can
            plan lead times.
          </p>
          <div className="mt-8">
            <Button href="/contact">Talk to our desk</Button>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
