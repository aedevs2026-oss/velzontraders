import { SiteShell } from "@/components/layout/SiteShell";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedMaterials } from "@/components/home/FeaturedMaterials";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ProjectTypes } from "@/components/home/ProjectTypes";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FaqSection } from "@/components/ui/FaqSection";
import { CATEGORIES, HOME_FAQS, SITE } from "@/lib/constants";
import { phoneDigits, resolvePhones } from "@/lib/phone";
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

  const phones = resolvePhones(settings, SITE);

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
      "Roofing material supplier and fabricator in Tamil Nadu — metal roofing sheets, PUF panel supply, and industrial roofing solutions from Coimbatore.",
    telephone: phones.map((p) => `+91${phoneDigits(p.raw)}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || SITE.address,
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      postalCode: "641035",
    },
    image: "/logo.jpg",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://velzontrade.com",
    slogan: settings.tagline || SITE.tagline,
    foundingDate: SITE.establishedIso,
    areaServed: {
      "@type": "State",
      name: "Tamil Nadu",
    },
    knowsAbout: [
      "Metal Roofing Sheets",
      "PUF Panel Supplier",
      "PUF Panel Fabrication",
      "Industrial Roofing Solutions",
      "Warehouse Roofing",
      "Factory Roofing",
      "Roofing Sheet Fabrication",
      "Roofing Installation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing & fabrication materials",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Metal roofing sheet supply & fabrication",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PUF panel supply & fabrication",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industrial warehouse & factory roofing solutions",
          },
        },
      ],
    },
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

  const homeFaqs = HOME_FAQS;

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        tagline={settings.tagline}
        phone={settings.phone}
        phoneSecondary={settings.phone_secondary}
      />
      <FeaturedMaterials categories={categoriesWithTeaser} />
      <FeaturedProducts products={featuredProducts} />
      <ProjectTypes projects={projectsWithTeaser} />
      <TrustStrip tagline={settings.tagline} />
      <Testimonials />
      <FaqSection
        items={homeFaqs}
        includeJsonLd
        description="Quick answers on service area, materials, and how to reach us."
        className="border-t border-gold/10 bg-ivory py-14 sm:py-16"
      />
      <ContactCta
        phone={settings.phone}
        phoneSecondary={settings.phone_secondary}
        address={settings.address}
      />
    </SiteShell>
  );
}
