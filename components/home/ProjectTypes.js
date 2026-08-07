import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectTypes({ projects }) {
  return (
    <section className="border-b border-gold/10 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Fabrication focus"
          title="Projects we supply"
          description="From public works to franchise rollouts — materials sourced, fabricated to measure, and delivered ready for your site team."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects#${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-ivory shadow-card transition hover:border-gold/40 hover:shadow-soft focus-gold"
            >
              <div className="relative aspect-[16/10] bg-graphite/10">
                <EntityImage
                  src={project.image_url}
                  alt={`${project.name} — Velzon fabrication`}
                  label={project.name}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-ink group-hover:text-gold-dark">
                  {project.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-graphite">
                  {project.teaser ||
                    (project.description
                      ? `${project.description.slice(0, 90)}…`
                      : "")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark">
                  <span>View details</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
