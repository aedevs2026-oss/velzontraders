import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/data/queries";

export const metadata = {
  title: "Fabrication Projects",
  description:
    "Warehouse roofing, factory roofing, government, retail, and franchise fabrication supply from Velzon Trade Enterprises across Tamil Nadu.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <section className="border-b border-gold/10 bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Fabrication segments"
            title="Projects we deliver for"
            description="Filter by the work you do — each segment gets sourcing, cut-to-length fabrication, and supply coordination for roofing contractors and builders across Tamil Nadu."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-md border border-gold/25 bg-white px-3 py-1.5 text-sm font-medium text-ink hover:border-gold focus-gold"
              >
                {p.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container className="space-y-12">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              id={project.slug}
              className="scroll-mt-24 grid gap-8 rounded-xl border border-gold/15 bg-ivory p-6 shadow-card md:grid-cols-5 md:p-8"
            >
              <div className="md:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  Segment {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
                  {project.name}
                </h2>
                <hr className="rule-gold mt-4 w-16" />
                <p className="mt-4 text-charcoal">{project.description}</p>
                <Button href="/contact" className="mt-6" size="sm">
                  Enquire for this segment
                </Button>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gold/20 bg-white md:col-span-2">
                <EntityImage
                  src={project.image_url}
                  alt={`${project.name} — Velzon fabrication supply`}
                  label={project.name}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </article>
          ))}
        </Container>
      </section>
    </SiteShell>
  );
}
