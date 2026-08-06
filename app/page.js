import { SiteShell } from "@/components/layout/SiteShell";
import { BrandStrip } from "@/components/home/BrandStrip";
import { ContactCta } from "@/components/home/ContactCta";
import { FabricationApproach } from "@/components/home/FabricationApproach";
import { FeaturedMaterials } from "@/components/home/FeaturedMaterials";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ProjectTypes } from "@/components/home/ProjectTypes";
import { RoofingAccessoriesSection } from "@/components/home/RoofingAccessoriesSection";
import { SteelProductsSection } from "@/components/home/SteelProductsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getCategories, getCategoryBySlug, getProducts, getProjects, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Velzon Trade Enterprises | Roofing Sheets & PUF Panels · Coimbatore",
  description:
    "Coimbatore-based roofing material supplier and fabricator for Tamil Nadu. Metal roofing sheets, PUF panels, fabrication support and site coordination across the state.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [categories, projects, settings, steelCategory, steelProducts, accessories] = await Promise.all([
    getCategories(),
    getProjects(),
    getSettings(),
    getCategoryBySlug("steel-products"),
    getProducts("steel-products"),
    getProducts("roofing-accessories"),
  ]);

  return (
    <SiteShell>
      <Hero phone={settings.phone} phoneSecondary={settings.phone_secondary} />
      <FeaturedMaterials categories={categories} />
                  <SteelProductsSection category={steelCategory} products={steelProducts} />
      <FabricationApproach />

      <RoofingAccessoriesSection accessories={accessories} />

         <BrandStrip />
      <TrustStrip />
            <FeaturedProducts />

      <ProjectTypes projects={projects} />
      <Testimonials />
      <ContactCta phone={settings.phone} phoneSecondary={settings.phone_secondary} />
    </SiteShell>
  );
}
