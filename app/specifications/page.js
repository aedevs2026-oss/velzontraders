import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Technical Specifications | Velzon Trade Enterprises",
  description:
    "Technical specifications for colour coated coil, galvanized sheets, corrosion resistance, heat reflectance and premium material quality from Velzon Trade Enterprises.",
  alternates: {
    canonical: "/specifications",
  },
};

const sections = [
  {
    id: "colour-coated-coil",
    title: "Colour Coated Coil",
    content:
      "Coil coating is the most advanced technique for applying an organic finish to a continuous metal coil. It provides durable coverage, excellent adhesion, and consistent colour across the full length of the sheet. This process delivers premium corrosion protection, a long service life, and an attractive surface finish for roofing and wall cladding applications.",
  },
  {
    id: "galvanized-plain-sheet",
    title: "Galvanized Plain Sheet",
    content:
      "Galvanized plain sheet combines a smooth steel substrate with a protective zinc finish to deliver reliable performance in demanding environments. It is a versatile base material for roofing, cladding, and structural accessories, with strength that suits industrial, commercial, and residential applications.",
  },
  {
    id: "corrosion-resistance",
    title: "Corrosion Resistance",
    content:
      "Galvalume steel is 3–6 times more resistant to corrosion than conventional zinc-coated steel of the same gauge. It also offers superior protection in coastal and industrial locations, with heat-resistant performance that endures acid rain and high humidity.",
  },
  {
    id: "workability-guarantee",
    title: "Workability Guarantee",
    content:
      "Galvalume’s superior formability is proven by decades of use in demanding markets. The material is easily molded, cut, and shaped while maintaining its protective coating, so complex profiles and precise fabrication are possible without sacrificing durability.",
  },
  {
    id: "attractive-appearance",
    title: "Attractive Appearance",
    content:
      "The natural silvery finish of Galvalume sheets gives a premium architectural look, even without paint. It supports refined building design with a smooth, bright surface that complements modern industrial and commercial structures.",
  },
  {
    id: "heat-reflectance",
    title: "Heat Resistance & Reflectance",
    content:
      "Galvalume coating delivers excellent thermal oxidizing resistance and high heat reflectance, making it ideal for products exposed to high temperatures or direct solar load. This helps keep roof systems cooler and improves long-term service life.",
  },
  {
    id: "material-specifications",
    title: "Material Specifications",
    content:
      "Velzon supplies roofing, wall cladding, tile profile sheets, and accessories manufactured from premium galvanized iron and coated steel coils. Every product is selected for consistent quality, precise gauge control, and mill-backed performance across roofing and fabrication uses.",
  },
];

export default function SpecificationsPage() {
  return (
    <SiteShell>
      <section className="border-b border-gold/10 bg-ivory py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Technical specifications"
              title="Premium sheet metal and coating performance"
              description="A detailed view of our material advantages, from colour coated coil and galvanized sheets to corrosion resistance, heat reflectance, and fabrication-ready material quality."
            />
            <p className="mt-6 text-sm leading-7 text-graphite sm:text-base">
              Velzon Trade Enterprises sources premium branded metal coatings and raw materials for roofing, cladding, and fabricated assemblies. These specifications are chosen for reliability, durability, and clarity across every stage of supply and delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="md">
                Request a specification sheet
              </Button>
              <Button href="/products" variant="secondary" size="md">
                View product categories
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/15 bg-white shadow-soft">
            <Image
              src="/technical-specifications.png"
              alt="Technical specifications overview"
              width={1080}
              height={720}
              className="h-full w-full object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12">
          <aside className="sticky top-24 hidden rounded-3xl border border-gold/15 bg-ivory/80 p-6 shadow-soft lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
              Quick navigation
            </p>
            <nav className="mt-6 flex flex-col gap-3" aria-label="Specifications sections">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm text-charcoal transition hover:border-gold/30 hover:bg-gold/5 hover:text-gold-dark"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 rounded-[2rem] border border-gold/10 bg-ivory/70 p-8 shadow-sm transition duration-500 ease-out hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {section.title}
                  </h2>
                  <span className="rounded-full border border-gold/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                    Spec
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-graphite sm:text-base">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container className="rounded-[2rem] border border-gold/15 bg-white p-10 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-dark">
                Why this matters
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
                Materials built for clarity, performance and long-term trust.
              </h2>
              <p className="mt-5 text-sm leading-7 text-graphite sm:text-base">
                Clear specification means fewer surprises on site. Our material selection emphasises brand-backed coatings, consistent gauge, enhanced corrosion resistance, and fabrication-ready formability for roofing and cladding projects statewide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" size="md">
                  Speak to our materials desk
                </Button>
                <Button href="/projects" variant="secondary" size="md">
                  Explore project types
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                "Colour coated coil for lasting finish",
                "Galvanized sheet with high corrosion resistance",
                "Heat-reflective materials for hot climates",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-gold/15 bg-ivory p-6 shadow-sm">
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
