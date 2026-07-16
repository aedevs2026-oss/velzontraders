import { AccessoriesManager } from "@/components/admin/AccessoriesManager";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Roofing Accessories" };

export default async function AdminAccessoriesPage() {
  const { demo, supabase } = await requireAdmin();

  let categories = [];
  let accessories = [];

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
      }));
    }
  }

  return (
    <AdminShell title="Roofing Accessories CMS">
      <AccessoriesManager categories={categories} accessories={accessories} demo={demo} />
    </AdminShell>
  );
}
