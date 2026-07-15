import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedMaterials({ categories }) {
  return (
    <section className="border-b border-gold/10 bg-ivory py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Materials catalogue"
          title="Featured categories"
          description="Structured thickness options and original project-ready descriptions — managed from our materials desk and available for enquiry."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card transition hover:border-gold/40 focus-gold"
            >
              <div className="relative aspect-[16/10] bg-graphite/10">
                <EntityImage
                  src={cat.image_url}
                  alt={`${cat.name} — Velzon materials`}
                  label={cat.name}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
                  {cat.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-graphite">
                  {cat.teaser || cat.description || "View specs"}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/products" className="text-sm font-semibold text-gold-dark hover:underline focus-gold">
            Browse all materials →
          </Link>
        </p>
      </Container>
    </section>
  );
}
