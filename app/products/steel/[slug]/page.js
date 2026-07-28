import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findSteelProductBySlug, getProductBySlug } from "@/lib/data/queries";

const STEEL_WORK_IMAGE_MAP = {
  "gp-pipe": "/steel-work/gp-pipes-work.png",
  "ms-pipe": "/steel-work/ms-pipes-work.png",
  "stainless-steel-pipe": "/steel-work/ss-pipe-work.png",
  "ms-round-rod": "/steel-work/ms-round-rods-work.png",
  "ms-plate": "/steel-work/ms-plate-work.png",
  "aluminium-angle": "/steel-work/aluminium-angle-work.png",
  "ms-angle": "/steel-work/ms-angle-work.png",
  "ms-channel": "/steel-work/ms-channel-work.png",
  "c-purlin": "/steel-work/c-purlin-wok.png",
  "z-purlin": "/steel-work/z-purlin-work.png",
  "i-beam": "/steel-work/I & H BEAMS work image .png",
  "h-beam": "/steel-work/I & H BEAMS work image .png",
};

function getSteelWorkImage(slug) {
  return STEEL_WORK_IMAGE_MAP[slug] || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product =
    (await findSteelProductBySlug(slug)) || (await getProductBySlug(slug));

  if (!product || product.category_slug !== "steel-products") {
    return { title: "Steel product" };
  }

  return {
    title: `${product.name} | Steel Products · Velzon Trade Enterprises`,
    description:
      product.description?.slice(0, 155) ||
      `${product.name} steel product from Velzon Trade Enterprises, Coimbatore.`,
  };
}

export default async function SteelProductPage({ params }) {
  const { slug } = await params;
  const product =
    (await findSteelProductBySlug(slug)) || (await getProductBySlug(slug));

  if (!product || product.category_slug !== "steel-products") {
    notFound();
  }

  const steelWorkImage = getSteelWorkImage(product.slug);
  const productImage = steelWorkImage || product.image_url || "/steel-products/steel-products-category.svg";

  return (
    <SiteShell>
      <section className="bg-ivory pb-28 pt-8 sm:pb-16 sm:pt-12 lg:py-16">
        <Container className="max-w-6xl">
          {/* Breadcrumb — truncates gracefully on small screens */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-graphite/70 sm:text-sm">
              <li>
                <Link href="/products" className="hover:text-gold-dark focus-gold">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products/steel" className="hover:text-gold-dark focus-gold">
                  Steel products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ink" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(320px,480px)_minmax(0,1fr)] lg:gap-12 lg:items-start">
            {/* Image column — sticky on desktop so it stays in view while scrolling specs */}
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 bg-graphite/5 shadow-card sm:aspect-[3/2] sm:rounded-[2rem] lg:aspect-[4/3]">
                <EntityImage
                  src={productImage}
                  alt={`${product.name} — Velzon Trade Enterprises`}
                  label={product.name}
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-graphite shadow-sm backdrop-blur">
                  Steel product
                </span>
              </div>

              {/* Desktop-only CTA under image */}
              <div className="mt-6 hidden flex-col gap-3 lg:flex">
                <Button href={`/contact?product=${encodeURIComponent(product.name)}`} size="lg" className="w-full">
                  Enquire about this product
                </Button>
                <p className="text-center text-xs text-graphite/70">
                  Get pricing and availability for your project.
                </p>
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-6 sm:space-y-8">
              <SectionHeading
                eyebrow="Steel product"
                title={product.name}
                description={product.description}
              />

              {/* Benefits — two columns from sm up, one on mobile */}
              {product.features?.length ? (
                <div className="rounded-2xl border border-gold/20 bg-white p-5 shadow-card sm:rounded-3xl sm:p-6">
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    Benefits
                  </h2>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:mt-5 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-graphite">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.415l-7.25 7.25a1 1 0 01-1.415 0l-3.25-3.25a1 1 0 111.415-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Specs — stack on mobile, side by side from sm up */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {product.thickness_options?.length ? (
                  <div className="rounded-2xl border border-gold/20 bg-white p-5 sm:rounded-3xl sm:bg-ivory sm:p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-graphite/70">
                      Thickness options
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                      {product.thickness_options.map((thickness) => (
                        <span
                          key={thickness}
                          className="rounded-full border border-gold/30 bg-white px-3.5 py-1.5 text-xs font-medium text-ink sm:px-4 sm:py-2 sm:text-sm"
                        >
                          {thickness}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {product.use_cases ? (
                  <div className="rounded-2xl border border-gold/20 bg-white p-5 sm:rounded-3xl sm:bg-ivory sm:p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-graphite/70">
                      Suitable for
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-graphite sm:leading-7">
                      {product.use_cases}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Desktop inline CTA fallback for very short benefit lists */}
              <div className="hidden pt-2 sm:flex lg:hidden">
                <Button href={`/contact?product=${encodeURIComponent(product.name)}`} size="lg">
                  Enquire about this product
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile sticky CTA — always reachable without hunting for the button */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur sm:hidden">
        <Button
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          size="lg"
          className="w-full justify-center"
        >
          Enquire about {product.name}
        </Button>
      </div>
    </SiteShell>
  );
}