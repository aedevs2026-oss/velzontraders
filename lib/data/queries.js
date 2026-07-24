import path from "path";
import { promises as fs } from "fs";
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

async function loadSteelProductsJson() {
  try {
    const filePath = path.join(process.cwd(), "public", "steel-products", "steel.json");
    const raw = await fs.readFile(filePath, "utf8");
    const items = JSON.parse(raw);
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
      ...item,
      category_slug: "steel-products",
      category_name: "Steel products",
      features: item.features || item.benefits || [],
      image_url: item.image_url || "/steel-products/steel-products-category.svg",
      images: Array.isArray(item.images)
        ? item.images
        : item.image_url
          ? [{ url: item.image_url, alt: `${item.name} — Velzon Trade Enterprises` }]
          : [],
      is_active: item.is_active !== false,
    }));
  } catch (err) {
    return [];
  }
}

async function findSteelProductBySlug(slug) {
  const products = await loadSteelProductsJson();
  return products.find((item) => item.slug === slug) || null;
}

export { loadSteelProductsJson, findSteelProductBySlug };

function resolveProductImages(product) {
  const baseUrl = product?.image_url || product?.images?.[0]?.url || null;
  let image_url = baseUrl;
  let images = Array.isArray(product?.images) ? product.images : [];

  if (!image_url) {
    if (product?.category_slug === "roofing-accessories") {
      image_url = `/products/accessories/${product.slug}.svg`;
      images = [{ url: image_url, alt: `${product.name} — Velzon Trade Enterprises` }];
    } else if (product?.category_slug === "steel-products") {
      image_url = "/steel-products/steel-products-category.svg";
      images = [{ url: image_url, alt: `${product.name} — Velzon Trade Enterprises` }];
    }
  }

  if (!images.length && image_url) {
    images = [{ url: image_url, alt: product?.alt_text || product?.name }];
  }

  return {
    ...product,
    image_url,
    images,
  };
}

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
  const fallbackCategories = CATEGORIES.map((c) => ({ ...c, is_active: true }));

  if (!isSupabaseConfigured()) {
    return fallbackCategories;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data?.length) {
      return fallbackCategories;
    }

    const merged = fallbackCategories.map((category) => ({ ...category }));
    data.forEach((row) => {
      const index = merged.findIndex((category) => category.slug === row.slug || category.id === row.id);
      if (index >= 0) {
        merged[index] = {
          ...merged[index],
          ...row,
          image_url: row.image_url || merged[index].image_url || null,
          images: Array.isArray(row.images) && row.images.length ? row.images : merged[index].images,
        };
      } else {
        merged.push({ ...row, is_active: row.is_active !== false });
      }
    });

    return merged.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  } catch {
    return fallbackCategories;
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

    rows = rows.map((p) => resolveProductImages(p));

    if (categorySlug === "steel-products") {
      const steelProducts = await loadSteelProductsJson();
      const existing = new Set(rows.map((r) => r.slug));
      const missing = steelProducts.filter((item) => !existing.has(item.slug));
      if (missing.length) rows = [...rows, ...missing];
    }

    // If accessories category is empty in DB, use catalogue fallback
    if (categorySlug === "roofing-accessories" && !rows.length) {
      return accessoriesAsProducts();
    }

    // When listing all products, merge in catalogue accessories missing from DB
    if (!categorySlug) {
      const existing = new Set(rows.map((r) => r.slug));
      const missingAccessories = accessoriesAsProducts().filter((a) => !existing.has(a.slug));
      const steelProducts = await loadSteelProductsJson();
      const missingSteel = steelProducts.filter((item) => !existing.has(item.slug));
      if (missingAccessories.length || missingSteel.length) {
        rows = [...rows, ...missingAccessories, ...missingSteel];
      }
    }
    return rows;
  } catch (err) {
    let list = ALL_PRODUCTS.map((p) => ({ ...p, is_active: true }));
    if (categorySlug) list = list.filter((p) => p.category_slug === categorySlug);
    return list;
  }
}

export async function getProductBySlug(slug) {
  const steelProduct = await findSteelProductBySlug(slug);
  if (steelProduct) return steelProduct;

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

    return resolveProductImages({
      ...data,
      category_slug: data.product_categories?.slug,
      category_name: data.product_categories?.name,
    });
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
