import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { MaterialSpecs } from "@/components/products/MaterialSpecs";
import { SteelProductsGallery } from "@/components/products/SteelProductsGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { FormattedDescription } from "@/components/ui/FormattedDescription";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MATERIAL_SPECS } from "@/lib/constants";
import { getProductOrCategory, getProducts } from "@/lib/data/queries";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getProductOrCategory(slug);
  if (!result) return { title: "Material" };
  if (result.type === "accessory-redirect") {
    return {
      title: result.data.name,
      description: result.data.short_description || result.data.description,
    };
  }
  const name = result.data.name;
  const isRoofing = slug === "roofing-sheets" || result.data.category_slug === "roofing-sheets";
  const isPuff = slug === "puff-sheets" || result.data.category_slug === "puff-sheets";
  let description =
    result.data.description?.slice(0, 155) ||
    `${name} — Velzon Trade Enterprises, Coimbatore`;
  if (isRoofing) {
    description = `${name} — metal roofing sheets and roofing sheet fabrication from Velzon, a roofing material supplier across Tamil Nadu.`;
  } else if (isPuff) {
    description = `${name} — PUF panel supplier and fabrication partner in Tamil Nadu. 30 mm & 50 mm cores from premium brands.`;
  }
  return { title: name, description };
}

export default async function ProductSlugPage({ params }) {
  const { slug } = await params;
  const result = await getProductOrCategory(slug);
  if (!result) notFound();

  if (result.type === "accessory-redirect") {
    redirect(`/products/roofing-accessories/${result.data.slug}`);
  }

  if (slug === "roofing-accessories" && result.type === "category") {
    redirect("/products/roofing-accessories");
  }

  if (result.type === "category") {
    const { data: category, products } = result;
    if (category.slug === "steel-products") {
      const firstProductSlug = products?.[0]?.slug;
      if (firstProductSlug) {
        redirect(`/products/${firstProductSlug}`);
      }
      redirect("/products");
    }

    const spec = MATERIAL_SPECS[category.slug];

    const galleryImages = Array.isArray(category.images)
      ? category.images.filter((image) => image?.url)
      : [];
    const heroImage = category.image_url || galleryImages[0]?.url || null;
    const displayImages = galleryImages.slice(1);  // Skip first image since it's shown in profiles
    const isSteelProducts = category.slug === "steel-products";

    return (
      <SiteShell>
        <section className="border-b border-gold/10 bg-ivory py-14 sm:py-16">
          <Container>
            <p className="text-sm text-graphite">
              <Link href="/products" className="hover:text-gold-dark focus-gold">
                Products
              </Link>{" "}
              / {category.name}
            </p>
            <SectionHeading
              className="mt-4"
              title={category.name}
              description=""
            />
            {category.description ? (
              <div className="mt-4 max-w-2xl text-base text-graphite sm:text-lg">
                <FormattedDescription text={category.description} />
              </div>
            ) : null}
            {spec ? <MaterialSpecs spec={spec} /> : null}

            {isSteelProducts ? (
              <div className="mt-8 rounded-2xl border border-gold/15 bg-white p-6 shadow-card sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      Steel Products catalogue
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-graphite">
                      Download the PDF reference for a detailed overview of the steel materials we can source and fabricate for your project.
                    </p>
                  </div>
                  <a
                    href={category.pdf_url || "/steel-products/Steel_Products_Catalog.pdf"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-gold/30 bg-ivory px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-gold hover:text-gold-dark"
                  >
                    Open PDF catalog
                  </a>
                </div>
                {category.catalogue_items?.length ? (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {category.catalogue_items.map((item) => (
                      <li key={item} className="flex gap-2 rounded-lg border border-gold/10 bg-ivory px-3 py-2 text-sm text-charcoal">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {heroImage ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-card">
                <div className="relative aspect-[16/9] bg-graphite/10">
                  <EntityImage
                    src={heroImage}
                    alt={`${category.name} — Velzon Trade Enterprises`}
                    label={category.name}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            ) : null}

            {isSteelProducts ? (
              <SteelProductsGallery
                images={galleryImages.length ? galleryImages : [{ url: heroImage, alt: category.name }]}
              />
            ) : null}

            {displayImages.length ? (
              <div className="mt-8 rounded-2xl border border-gold/15 bg-white p-5 shadow-card sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      Category gallery
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-graphite">
                      High-resolution reference images for this material range, uploaded from admin.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {displayImages.map((image, index) => (
                    <div
                      key={`${image.url || image.alt || category.slug}-${index}`}
                      className="overflow-hidden rounded-xl border border-gold/15 bg-ivory"
                    >
                      <div className="relative aspect-[16/10] bg-graphite/10">
                        <EntityImage
                          src={image.url}
                          alt={image.alt || `${category.name} gallery ${index + 1}`}
                          label={category.name}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {!(products || []).length && !displayImages.length ? (
              <p className="mt-8 text-graphite">
                Category visuals will appear here once uploaded from admin.
              </p>
            ) : null}
          </Container>
        </section>
      </SiteShell>
    );
  }

  const product = result.data;
  const siblings = await getProducts(product.category_slug);
  const spec = MATERIAL_SPECS[product.category_slug];
  const thicknesses =
    (product.thickness_options?.length
      ? product.thickness_options
      : spec?.thicknesses) || [];
  const isSteelProduct = product.category_slug === "steel-products";

  if (isSteelProduct) {
    return (
      <SiteShell>
        <section className="bg-ivory py-14 sm:py-16">
          <Container className="max-w-4xl">
            <p className="text-sm text-graphite">
              <Link href="/products" className="hover:text-gold-dark focus-gold">
                Products
              </Link>
              {product.category_slug ? (
                <>
                  {" "}/ {" "}
                  <Link
                    href={`/products/${product.category_slug}`}
                    className="hover:text-gold-dark focus-gold"
                  >
                    {product.category_name || "Steel products"}
                  </Link>
                </>
              ) : null}
              {" "}/ {product.name}
            </p>

            <div className="mt-8 space-y-10 rounded-[2rem] border border-gold/15 bg-white p-8 shadow-card sm:p-10">
              <div className="space-y-6">
                <h1 className="font-display text-4xl font-semibold text-ink">
                  {product.name}
                </h1>
                <div className="text-lg leading-8 text-charcoal">
                  <FormattedDescription text={product.description} className="text-charcoal" />
                </div>
              </div>

              {product.features?.length ? (
                <div className="rounded-3xl border border-gold/20 bg-ivory p-6">
                  <h2 className="font-display text-2xl font-semibold text-ink">Benefits</h2>
                  <ul className="mt-5 space-y-3 text-sm text-graphite">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold-dark" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
                <div className="space-y-6">
                  {thicknesses.length ? (
                    <div className="rounded-3xl border border-gold/20 bg-ivory p-6">
                      <h2 className="font-display text-xl font-semibold text-ink">
                        Thickness options
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {thicknesses.map((thickness) => (
                          <span
                            key={thickness}
                            className="rounded-full border border-gold/30 bg-white px-4 py-2 text-sm font-medium text-ink"
                          >
                            {thickness}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {product.use_cases ? (
                    <div className="rounded-3xl border border-gold/20 bg-ivory p-6">
                      <h2 className="font-display text-xl font-semibold text-ink">
                        Suitable for
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-graphite">{product.use_cases}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      href={`/contact?product=${encodeURIComponent(product.name)}`}
                      size="lg"
                    >
                      Enquire about this product
                    </Button>
                    <a
                      href="/steel-products/Steel_Products_Catalog.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-gold/30 bg-ivory px-5 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:text-gold-dark"
                    >
                      Open steel PDF catalog
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-graphite/5">
                  <EntityImage
                    src={product.image_url || "/steel-products/steel-products-category.svg"}
                    alt={`${product.name} — Velzon Trade Enterprises`}
                    label={product.name}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="bg-ivory py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-sm text-graphite">
            <Link href="/products" className="hover:text-gold-dark focus-gold">
              Products
            </Link>
            {product.category_slug ? (
              <>
                {" "}/ {" "}
                <Link
                  href={`/products/${product.category_slug}`}
                  className="hover:text-gold-dark focus-gold"
                >
                  {product.category_name || "Category"}
                </Link>
              </>
            ) : null}
            {" "}/ {product.name}
          </p>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg border border-gold/20 bg-graphite/10">
            <EntityImage
              src={product.image_url}
              alt={`${product.name} — Velzon Trade Enterprises`}
              label={product.name}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold text-ink">
            {product.name}
          </h1>
          <hr className="rule-gold mt-4 w-16" />
          <div className="mt-6 text-lg text-charcoal">
            <FormattedDescription text={product.description} className="text-charcoal" />
          </div>

          <div className="mt-8 rounded-lg border border-gold/20 bg-white p-6 shadow-card">
            <h2 className="font-display text-xl font-semibold text-ink">
              Available thicknesses
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {thicknesses.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-gold/30 bg-ivory px-3 py-1.5 text-sm font-medium text-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
            {spec ? (
              <p className="mt-4 text-sm text-graphite">
                Premium branded materials — see the{" "}
                <Link
                  href={`/products/${product.category_slug}`}
                  className="font-medium text-gold-dark hover:underline focus-gold"
                >
                  {product.category_name || "category"}
                </Link>{" "}
                page for full brand lines and mill options.
              </p>
            ) : null}
          </div>

          {product.features?.length ? (
            <div className="mt-8 rounded-lg border border-gold/20 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-ink">Benefits</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="text-sm text-graphite">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {product.use_cases ? (
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-ink">Use cases</h2>
              <p className="mt-2 text-graphite">{product.use_cases}</p>
            </div>
          ) : null}

          <div className="mt-10">
            <Button
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              size="lg"
            >
              Enquire about this product
            </Button>
          </div>

          {siblings?.length > 1 ? (
            <div className="mt-14 border-t border-gold/15 pt-8">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Related in this category
              </h2>
              <ul className="mt-4 space-y-2">
                {siblings
                  .filter((p) => p.slug !== product.slug)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-gold-dark hover:underline focus-gold"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>
    </SiteShell>
  );
}
