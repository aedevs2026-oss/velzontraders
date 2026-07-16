import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategories } from "@/lib/data/queries";

export const metadata = {
  title: "Products & Materials",
  description:
    "Metal roofing sheets, PUF panels, decking, and more — thicknesses and premium brands from Velzon Trade Enterprise, roofing material supplier across Tamil Nadu.",
};

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <SiteShell>
      <section className="border-b border-gold/10 bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Materials"
            title="Products & categories"
            description="Browse by category for thicknesses, premium brands, and use cases. Enquire with the product name pre-filled — supply and fabrication across Tamil Nadu."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card transition hover:border-gold/40 focus-gold"
              >
                <div className="relative aspect-[16/10] bg-graphite/10">
                  <EntityImage
                    src={cat.image_url}
                    alt={`${cat.name} — Velzon materials`}
                    label={cat.name}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl font-semibold text-ink">{cat.name}</h2>
                  <hr className="rule-gold mt-3 w-12" />
                  <p className="mt-3 flex-1 text-sm text-graphite">{cat.description}</p>
                  <span className="mt-4 text-sm font-semibold text-gold-dark">
                    View category →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
