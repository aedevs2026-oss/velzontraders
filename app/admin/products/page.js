import { AdminShell } from "@/components/admin/AdminShell";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { requireAdmin } from "@/lib/admin/auth";
import { CATEGORIES, PRODUCTS } from "@/lib/constants";

export const metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const { demo, supabase } = await requireAdmin();

  let categories = CATEGORIES.map((c) => ({ ...c, id: null, is_active: true }));
  let products = PRODUCTS.map((p) => ({ ...p, id: null, is_active: true, category_id: null }));

  if (!demo && supabase) {
    const [cats, prods] = await Promise.all([
      supabase.from("product_categories").select("*").order("sort_order"),
      supabase.from("products").select("*").order("sort_order"),
    ]);
    if (cats.data?.length) categories = cats.data;
    if (prods.data?.length) products = prods.data;
  }

  return (
    <AdminShell title="Products & categories">
      <ProductsManager categories={categories} products={products} demo={demo} />
    </AdminShell>
  );
}
