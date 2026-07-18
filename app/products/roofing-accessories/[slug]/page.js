import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { AccessoryDetailTabs } from "@/components/products/AccessoryDetailTabs";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { RelatedProductsCarousel } from "@/components/products/RelatedProductsCarousel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { getProductBySlug } from "@/lib/data/queries";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.category_slug !== "roofing-accessories") {
    return { title: "Roofing Accessory" };
  }

  const title =
    product.seo_title ||
    `${product.name} | Roofing Accessories · Velzon Coimbatore`;
  const description =
    product.meta_description ||
    product.short_description ||
    product.description?.slice(0, 155) ||
    `${product.name} from Velzon Trade Enterprises, Coimbatore.`;
  const image =
    product.images?.[0]?.url || product.image_url || "/logo.png";

  return {
    title,
    description,
    keywords: product.keywords || undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: image, alt: product.alt_text || product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AccessoryDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.category_slug !== "roofing-accessories") {
    notFound();
  }

  const images =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : product.image_url
        ? [{ url: product.image_url, alt: product.alt_text || product.name }]
        : [];

  const primaryImage = images[0]?.url || product.image_url || "/logo.png";
  const faqs = Array.isArray(product.faqs) ? product.faqs : [];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Roofing Accessories",
        item: "/products/roofing-accessories",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `/products/roofing-accessories/${product.slug}`,
      },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.meta_description || product.short_description || product.description,
    image: primaryImage,
    brand: { "@type": "Brand", name: SITE.name },
    category: "Roofing Accessories",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: `/products/roofing-accessories/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: SITE.name,
        telephone: `+91${SITE.phone}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
    },
  };

  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      <section className="bg-gradient-to-b from-[#F5EFE3] via-ivory to-ivory py-12 sm:py-16">
        <Container>
          <p className="text-sm text-graphite">
            <Link href="/products" className="hover:text-gold-dark focus-gold">
              Products
            </Link>{" "}
            /{" "}
            <Link
              href="/products/roofing-accessories"
              className="hover:text-gold-dark focus-gold"
            >
              Roofing Accessories
            </Link>{" "}
            / {product.name}
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <ProductImageGallery
              images={images}
              name={product.name}
              altText={product.alt_text}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Roofing Accessories
              </p>
              <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
                {product.name}
              </h1>
              <hr className="rule-gold mt-4 w-16" />
              <p className="mt-5 text-lg text-charcoal">
                {product.short_description || product.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  size="lg"
                >
                  Enquire now
                </Button>
                <Button href={SITE.phoneHref} variant="secondary" size="lg">
                  Call {SITE.phone}
                </Button>
              </div>
            </div>
          </div>

          <AccessoryDetailTabs product={product} />
          <RelatedProductsCarousel items={product.related_items || []} />
        </Container>
      </section>
    </SiteShell>
  );
}
