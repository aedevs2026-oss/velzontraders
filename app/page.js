import { SiteShell } from "@/components/layout/SiteShell";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedMaterials } from "@/components/home/FeaturedMaterials";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ProjectTypes } from "@/components/home/ProjectTypes";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { SITE, CATEGORIES } from "@/lib/constants";
import {
  getCategories,
  getProducts,
  getProjects,
  getSettings,
} from "@/lib/data/queries";

export default async function HomePage() {
  const [settings, projects, categories, allProducts] = await Promise.all([
    getSettings(),
    getProjects(),
    getCategories(),
    getProducts(),
  ]);

  const featuredProducts = (allProducts || []).slice(0, 8).map((p) => ({
    ...p,
    category_name:
      p.category_name ||
      categories.find((c) => c.slug === p.category_slug)?.name ||
      p.category_slug,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.company_name || SITE.name,
    description:
      "Roofing and fabrication materials trading, sourcing, and custom supply in Coimbatore, Tamil Nadu.",
    telephone: `+91${String(settings.phone).replace(/\D/g, "").slice(-10)}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    image: "/logo.jpg",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://velzontrade.com",
    slogan: settings.tagline || SITE.tagline,
  };

  const teaserBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.teaser]));
  const categoriesWithTeaser = categories.map((c) => ({
    ...c,
    teaser: c.teaser || teaserBySlug[c.slug] || "View specs",
  }));

  const projectsWithTeaser = projects.map((p) => ({
    ...p,
    teaser: p.teaser || (p.description ? `${p.description.slice(0, 70)}…` : ""),
  }));

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero tagline={settings.tagline} phone={settings.phone} />
      <FeaturedMaterials categories={categoriesWithTeaser} />
      <FeaturedProducts products={featuredProducts} />
      <ProjectTypes projects={projectsWithTeaser} />
      <TrustStrip tagline={settings.tagline} />
      <Testimonials />
      <ContactCta phone={settings.phone} address={settings.address} />
    </SiteShell>
  );
}
