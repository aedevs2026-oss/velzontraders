import { AccessoriesManager } from "@/components/admin/AccessoriesManager";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import { CATEGORIES } from "@/lib/constants";
import { accessoriesAsProducts, getAccessoryImageUrl } from "@/lib/data/accessories-catalog";

export const metadata = { title: "Roofing Accessories" };

export default async function AdminAccessoriesPage() {
  const { demo, supabase } = await requireAdmin();

  let categories = CATEGORIES.map((c) => ({ ...c, id: null, is_active: true }));
  let accessories = accessoriesAsProducts();

  if (!demo && supabase) {
    const [cats, prods] = await Promise.all([
      supabase.from("product_categories").select("*").order("sort_order"),
      supabase
        .from("products")
        .select("*, product_categories!inner(slug, name)")
        .eq("product_categories.slug", "roofing-accessories")
        .order("sort_order"),
    ]);
    if (cats.data?.length) categories = cats.data;
    if (prods.data?.length) {
      accessories = prods.data.map((p) => ({
        ...p,
        category_slug: p.product_categories?.slug,
        category_name: p.product_categories?.name,
        // Prefer CMS image; fall back to local Velzon placeholder by slug
        image_url:
          p.image_url ||
          p.images?.[0]?.url ||
          getAccessoryImageUrl(p.slug),
      }));
    }
  }

  return (
    <AdminShell title="Roofing Accessories CMS">
      <AccessoriesManager categories={categories} accessories={accessories} demo={demo} />
    </AdminShell>
  );
}
