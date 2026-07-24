import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/constants";
import { accessoriesAsProducts } from "@/lib/data/accessories-catalog";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return new Response(JSON.stringify({ data: accessoriesAsProducts() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = await createClient();
    const categoryId = await getRoofingAccessoriesCategoryId(supabase);
    if (!categoryId) {
      throw new Error("Roofing accessories category not found");
    }

    const { data, error } = await supabase
      .from("products")
      .select("*, product_categories(slug, name)")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("sort_order");

    if (error) {
      throw error;
    }

    const items = Array.isArray(data)
      ? data.map((item) => ({
          ...item,
          category_slug: item.product_categories?.slug,
          category_name: item.product_categories?.name,
          image_url: item.images?.[0]?.url || item.image_url,
        }))
      : [];

    return new Response(JSON.stringify({ data: items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ data: accessoriesAsProducts(), error: err.message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getRoofingAccessoriesCategoryId(supabase) {
  const { data, error } = await supabase
    .from("product_categories")
    .select("id")
    .eq("slug", "roofing-accessories")
    .maybeSingle();
  if (error || !data) {
    return null;
  }
  return data.id;
}

