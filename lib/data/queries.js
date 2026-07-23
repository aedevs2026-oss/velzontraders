import {
  CATEGORIES,
  GALLERY,
  PRODUCTS,
  PROJECT_TYPES,
  SITE,
  isSupabaseConfigured,
} from "@/lib/constants";
import { accessoriesAsProducts } from "@/lib/data/accessories-catalog";
import { createClient } from "@/lib/supabase/server";

const ALL_PRODUCTS = [...PRODUCTS, ...accessoriesAsProducts()];

export async function getSettings() {
  const defaults = {
    phone: SITE.phone,
    phone_secondary: SITE.phoneSecondary,
    address: SITE.address,
    tagline: SITE.tagline,
    company_name: SITE.name,
    email: "",
  };

  if (!isSupabaseConfigured()) return defaults;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("settings").select("key, value");
    if (error || !data?.length) return defaults;
    const map = { ...defaults };
    data.forEach((row) => {
      map[row.key] = row.value;
    });
    const legacyAddress =
      "No 36/48, Thudiyalur Road, Velappanaikan Pudur, Saravanampatty, Coimbatore, 641035";
    if (String(map.address || "").trim() === legacyAddress) {
      map.address = SITE.address;
    }
    return map;
  } catch {
    return defaults;
  }
}

export async function getCategories() {
  if (!isSupabaseConfigured()) {
    return CATEGORIES.map((c) => ({ ...c, is_active: true }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data?.length) {
      return CATEGORIES.map((c) => ({ ...c, is_active: true }));
    }
    return data;
  } catch {
    return CATEGORIES.map((c) => ({ ...c, is_active: true }));
  }
}

export async function getCategoryBySlug(slug) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getProducts(categorySlug) {
  if (!isSupabaseConfigured()) {
    let list = ALL_PRODUCTS.map((p) => ({ ...p, is_active: true }));
    if (categorySlug) {
      list = list.filter((p) => p.category_slug === categorySlug);
    }
    return list;
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*, product_categories(slug, name)")
      .eq("is_active", true)
      .order("sort_order");

    const { data, error } = await query;
    if (error || !data?.length) {
      let list = ALL_PRODUCTS.map((p) => ({ ...p, is_active: true }));
      if (categorySlug) list = list.filter((p) => p.category_slug === categorySlug);
      return list;
    }

    let rows = data.map((p) => ({
      ...p,
      category_slug: p.product_categories?.slug,
      category_name: p.product_categories?.name,
    }));

    if (categorySlug) {
      rows = rows.filter((p) => p.category_slug === categorySlug);
    }

    // Local Velzon placeholders when CMS has no photo yet
    rows = rows.map((p) => {
      if (p.category_slug !== "roofing-accessories") return p;
      const fallback = `/products/accessories/${p.slug}.svg`;
      const image_url = p.image_url || p.images?.[0]?.url || fallback;
      return { ...p, image_url };
    });

    // If accessories category is empty in DB, use catalogue fallback
    if (categorySlug === "roofing-accessories" && !rows.length) {
      return accessoriesAsProducts();
    }

    // When listing all products, merge in catalogue accessories missing from DB
    if (!categorySlug) {
      const existing = new Set(rows.map((r) => r.slug));
      const missing = accessoriesAsProducts().filter((a) => !existing.has(a.slug));
      if (missing.length) rows = [...rows, ...missing];
    }
    return rows;
  } catch (err) {
    let list = ALL_PRODUCTS.map((p) => ({ ...p, is_active: true }));
    if (categorySlug) list = list.filter((p) => p.category_slug === categorySlug);
    return list;
  }
}

export async function getProductBySlug(slug) {
  if (!isSupabaseConfigured()) {
    return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, product_categories(slug, name)")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
    }

    return {
      ...data,
      category_slug: data.product_categories?.slug,
      category_name: data.product_categories?.name,
    };
  } catch (err) {
    return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

/** Resolve /products/[slug] as either a product or a category page target */
export async function getProductOrCategory(slug) {
  // Dedicated route handles roofing-accessories listing + detail
  if (slug === "roofing-accessories") {
    const category = await getCategoryBySlug(slug);
    if (category) {
      const products = await getProducts(slug);
      return { type: "category", data: category, products };
    }
  }

  const product = await getProductBySlug(slug);
  if (product) {
    if (product.category_slug === "roofing-accessories") {
      return { type: "accessory-redirect", data: product };
    }
    return { type: "product", data: product };
  }

  const category = await getCategoryBySlug(slug);
  if (category) {
    const products = await getProducts(slug);
    return { type: "category", data: category, products };
  }

  return null;
}

export async function getProjects() {
  if (!isSupabaseConfigured()) {
    return PROJECT_TYPES.map((p) => ({ ...p, is_active: true }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data?.length) {
      return PROJECT_TYPES.map((p) => ({ ...p, is_active: true }));
    }
    return data;
  } catch {
    return PROJECT_TYPES.map((p) => ({ ...p, is_active: true }));
  }
}

export async function getGallery() {
  if (!isSupabaseConfigured()) return GALLERY;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data?.length) return GALLERY;
    return data;
  } catch {
    return GALLERY;
  }
}
