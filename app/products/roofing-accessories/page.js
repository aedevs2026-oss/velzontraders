import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AccessoriesCarousel } from "@/components/products/AccessoriesCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { getCategoryBySlug, getProducts } from "@/lib/data/queries";

export async function generateMetadata() {
  const category = await getCategoryBySlug("roofing-accessories");
  const title =
    category?.name ||
    "Roofing Accessories | Velzon Trade Enterprises · Coimbatore";
  const description =
    category?.description?.slice(0, 155) ||
    "Flashings, fasteners, ventilators, and roofing accessories from Velzon Trade Enterprises, Coimbatore — supply across Tamil Nadu.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: category?.image_url || "/logo.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category?.image_url || "/logo.jpg"],
    },
  };
}

export default async function RoofingAccessoriesPage() {
  const category = await getCategoryBySlug("roofing-accessories");
  const accessories = await getProducts("roofing-accessories");
  // #region agent log
  fetch('http://127.0.0.1:7714/ingest/3106773a-0991-4075-8c39-eee11a2f5f22',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'cc7d39'},body:JSON.stringify({sessionId:'cc7d39',runId:'verify1',hypothesisId:'C',location:'roofing-accessories/page.js',message:'listing page data',data:{hasCategory:Boolean(category),categorySlug:category?.slug||null,accessoryCount:accessories?.length??0,names:(accessories||[]).slice(0,5).map(a=>a.name)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const name = category?.name || "Roofing Accessories";
  const description =
    category?.description ||
    "Flashings, fasteners, ventilators, sealants, and structural accessories for metal roofing systems.";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: "/products/roofing-accessories",
      },
    ],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="border-b border-gold/10 bg-gradient-to-b from-[#F5EFE3] via-ivory to-ivory py-14 sm:py-16">
        <Container>
          <p className="text-sm text-graphite">
            <Link href="/products" className="hover:text-gold-dark focus-gold">
              Products
            </Link>{" "}
            / {name}
          </p>
          <SectionHeading
            className="mt-4"
            eyebrow={SITE.shortLocation}
            title={name}
            description={description}
          />
          <AccessoriesCarousel items={accessories} />
        </Container>
      </section>
    </SiteShell>
  );
}
