import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/lib/data/queries";

export const metadata = {
  title: "Steel products | Velzon Trade Enterprises",
  description:
    "Browse steel product details, thickness options, and reference images for fabrication and supply across Tamil Nadu.",
};

export default async function SteelProductsIndexPage() {
  const products = await getProducts("steel-products");
  const steelProducts = Array.isArray(products) ? products : [];
  const displayProducts = steelProducts.slice(0, 8);
  const totalProducts = steelProducts.length;

  return (
    <SiteShell>
      <section className="border-b border-gold/10 bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Steel products"
            title="Steel products catalogue"
            description="Browse our steel range with product details and thickness options. This page shows the first 8 materials by default for easier review."
          />

          {totalProducts > 8 ? (
            <p className="mt-6 text-sm text-graphite/70">
              Showing 8 of {totalProducts} available steel products.
            </p>
          ) : null}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/steel/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-white shadow-card transition hover:border-gold/40 focus-within:border-gold/40"
              >
                <div className="relative aspect-[16/10] bg-graphite/10">
                  <EntityImage
                    src={product.image_url || "/steel-products/steel-products-category.svg"}
                    alt={product.image_url || product.name ? `${product.name} — Velzon Trade Enterprises` : "Steel product"}
                    label={product.name || "Steel product"}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-gold-dark">
                      {product.name}
                    </h3>
                    {product.description ? (
                      <p className="mt-2 text-sm leading-6 text-graphite">
                        {product.description}
                      </p>
                    ) : null}
                    {product.thickness_options?.length ? (
                      <p className="mt-4 text-sm font-semibold text-ink">
                        Thickness: {product.thickness_options.slice(0, 3).join(", ")}
                        {product.thickness_options.length > 3 ? " + more" : ""}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-auto text-sm font-semibold text-gold-dark">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalProducts > 8 ? (
            <div className="mt-8 text-center">
              <p className="text-sm text-graphite/70">
                Want to see the full catalogue? Contact us for the complete steel product list and pricing.
              </p>
            </div>
          ) : null}
        </Container>
      </section>
    </SiteShell>
  );
}
