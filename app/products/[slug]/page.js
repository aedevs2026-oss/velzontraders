import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { MaterialSpecs } from "@/components/products/MaterialSpecs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
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
    const spec = MATERIAL_SPECS[category.slug];

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
              description={category.description}
            />
            {spec ? <MaterialSpecs spec={spec} /> : null}
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {(products || []).map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card hover:border-gold/40 focus-gold"
                >
                  <div className="relative aspect-[16/10] bg-graphite/10">
                    <EntityImage
                      src={product.image_url}
                      alt={`${product.name} — Velzon`}
                      label={product.name}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {product.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-graphite">
                      {product.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-gold-dark">
                      {(product.thickness_options || []).join(" · ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {!(products || []).length ? (
              <p className="mt-8 text-graphite">
                Products for this category will appear here once added in admin.
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
                {" "}
                /{" "}
                <Link
                  href={`/products/${product.category_slug}`}
                  className="hover:text-gold-dark focus-gold"
                >
                  {product.category_name || "Category"}
                </Link>
              </>
            ) : null}{" "}
            / {product.name}
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
          <p className="mt-6 text-lg text-charcoal">{product.description}</p>

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
