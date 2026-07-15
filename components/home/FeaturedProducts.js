import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="border-b border-gold/10 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Stocked materials"
          title="Featured products"
          description="A sample of sheets and panels we supply — open any card for thicknesses and use cases, then enquire with the name pre-filled."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-gold/15 bg-ivory shadow-card transition hover:border-gold/40 focus-gold"
            >
              <div className="relative aspect-[16/10] bg-graphite/10">
                <EntityImage
                  src={product.image_url}
                  alt={`${product.name} — Velzon`}
                  label={product.name}
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  {product.category_name || product.category_slug || "Material"}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs font-medium text-graphite">
                  {(product.thickness_options || []).length
                    ? (product.thickness_options || []).join(" · ")
                    : "See specs"}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/products"
            className="text-sm font-semibold text-gold-dark hover:underline focus-gold"
          >
            View all products →
          </Link>
        </p>
      </Container>
    </section>
  );
}
