"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { resolveImageUploads, uploadMediaFile } from "@/lib/media/upload";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseJsonField(formData, key, fallback) {
  const raw = formData.get(key);
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch {
    return fallback;
  }
}

function parseLines(value) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isMissingColumnError(error) {
  const message = String(error?.message || "");
  return error?.code === "42703" || /column .* does not exist|does not exist/i.test(message);
}

function revalidateAccessoryPaths(slug) {
  revalidatePath("/admin/accessories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/products/roofing-accessories");
  if (slug) revalidatePath(`/products/roofing-accessories/${slug}`);
  revalidatePath("/");
}

export async function upsertCategory(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(name);
  const description = String(formData.get("description") || "").trim();
  const teaser = String(formData.get("teaser") || "").trim();
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "on" || formData.get("is_active") === "true";
  let image_url = String(formData.get("image_url") || "").trim() || null;
  let color_image_url = String(formData.get("color_image_url") || "").trim() || null;
  let images = [];

  const meta = parseJsonField(formData, "images_meta", []);
  if (Array.isArray(meta)) {
    const resolved = await resolveImageUploads(supabase, formData, "categories", meta);
    if (resolved.error) return { error: resolved.error };
    images = Array.isArray(resolved.images) ? resolved.images : [];
    image_url = images[0]?.url || image_url || null;
  } else {
    const file = formData.get("file");
    if (file && typeof file === "object" && file.size > 0) {
      const uploaded = await uploadMediaFile(supabase, file, "categories");
      if (uploaded.error) return { error: uploaded.error };
      image_url = uploaded.url;
      images = [{ url: uploaded.url, alt: name, sort_order: 0 }];
    }
  }

  const colorImageFile = formData.get("color_image_file");
  if (colorImageFile && typeof colorImageFile === "object" && colorImageFile.size > 0) {
    const uploaded = await uploadMediaFile(supabase, colorImageFile, "categories");
    if (uploaded.error) return { error: uploaded.error };
    color_image_url = uploaded.url;
  }

  const payload = {
    name,
    slug,
    description,
    sort_order,
    is_active,
    image_url,
    ...(images.length ? { images } : {}),
    ...(teaser ? { teaser } : {}),
    ...(color_image_url ? { color_image_url } : {}),
  };

  const fallbackPayload = { name, slug, description, sort_order, is_active, image_url };
  if (teaser) fallbackPayload.teaser = teaser;
  if (color_image_url) fallbackPayload.color_image_url = color_image_url;

  if (id) {
    let { error } = await supabase.from("product_categories").update(payload).eq("id", id);
    if (error && isMissingColumnError(error)) {
      const { error: fallbackError } = await supabase
        .from("product_categories")
        .update(fallbackPayload)
        .eq("id", id);
      if (fallbackError) return { error: fallbackError.message };
    } else if (error) {
      return { error: error.message };
    }
  } else {
    let { error } = await supabase.from("product_categories").insert(payload);
    if (error && isMissingColumnError(error)) {
      const { error: fallbackError } = await supabase
        .from("product_categories")
        .insert(fallbackPayload);
      if (fallbackError) return { error: fallbackError.message };
    } else if (error) {
      return { error: error.message };
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  if (slug === "roofing-accessories") revalidatePath("/products/roofing-accessories");
  return { ok: true };
}

export async function deleteCategory(id) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("product_categories").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true };
}

export async function upsertProduct(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(name);
  const description = String(formData.get("description") || "").trim();
  const use_cases = String(formData.get("use_cases") || "").trim();
  const category_id = String(formData.get("category_id") || "");
  const thickness_raw = String(formData.get("thickness_options") || "");
  const thickness_options = thickness_raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "on" || formData.get("is_active") === "true";
  let image_url = String(formData.get("image_url") || "").trim() || null;

  const file = formData.get("file");
  if (file && typeof file === "object" && file.size > 0) {
    const uploaded = await uploadMediaFile(supabase, file, "products");
    if (uploaded.error) return { error: uploaded.error };
    // Keep prior Storage object; only update the pointer.
    image_url = uploaded.url;
  }

  const payload = {
    name,
    slug,
    description,
    use_cases,
    category_id,
    thickness_options,
    sort_order,
    is_active,
    image_url,
  };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProduct(id) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/admin/accessories");
  revalidatePath("/products/roofing-accessories");
  return { ok: true };
}

export async function upsertAccessory(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const name = String(formData.get("name") || "").trim();
  if (!name) return { error: "Name is required" };
  const slug = String(formData.get("slug") || "").trim() || slugify(name);
  const category_id = String(formData.get("category_id") || "").trim();
  if (!category_id) return { error: "Category is required" };

  const description = String(formData.get("description") || "").trim();
  const short_description = String(formData.get("short_description") || "").trim();
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "on" || formData.get("is_active") === "true";
  const seo_title = String(formData.get("seo_title") || "").trim();
  const meta_description = String(formData.get("meta_description") || "").trim();
  const keywords = String(formData.get("keywords") || "").trim();
  const alt_text = String(formData.get("alt_text") || "").trim();
  const applications = parseLines(formData.get("applications"));

  const description_detail = {
    overview: String(formData.get("desc_overview") || "").trim(),
    purpose: String(formData.get("desc_purpose") || "").trim(),
    benefits: String(formData.get("desc_benefits") || "").trim(),
    installation: String(formData.get("desc_installation") || "").trim(),
    compatibility: String(formData.get("desc_compatibility") || "").trim(),
    corrosion_resistance: String(formData.get("desc_corrosion") || "").trim(),
    weather_resistance: String(formData.get("desc_weather") || "").trim(),
    industrial_commercial_usage: String(formData.get("desc_usage") || "").trim(),
  };

  const specifications = {
    material: String(formData.get("spec_material") || "").trim(),
    thickness: String(formData.get("spec_thickness") || "").trim(),
    dimensions: String(formData.get("spec_dimensions") || "").trim(),
    finish: String(formData.get("spec_finish") || "").trim(),
    coating: String(formData.get("spec_coating") || "").trim(),
    surface_finish: String(formData.get("spec_surface_finish") || "").trim(),
    weight: String(formData.get("spec_weight") || "").trim(),
    uv_resistance: String(formData.get("spec_uv") || "").trim(),
    weather_resistance: String(formData.get("spec_weather") || "").trim(),
    water_resistance: String(formData.get("spec_water") || "").trim(),
    heat_resistance: String(formData.get("spec_heat") || "").trim(),
    fastening: String(formData.get("spec_fastening") || "").trim(),
    compatible_roofing_sheets: String(formData.get("spec_compatible") || "").trim(),
    maintenance: String(formData.get("spec_maintenance") || "").trim(),
    warranty: String(formData.get("spec_warranty") || "").trim(),
    manufacturing_standard: String(formData.get("spec_standard") || "").trim(),
  };

  const colors = parseJsonField(formData, "colors_json", []);
  const profiles = parseJsonField(formData, "profiles_json", []);
  const features = parseJsonField(formData, "features_json", []);
  const downloads = parseJsonField(formData, "downloads_json", {});
  const related_items = parseJsonField(formData, "related_json", []);
  const faqs = parseJsonField(formData, "faqs_json", []);

  const meta = parseJsonField(formData, "images_meta", []);
  const resolved = await resolveImageUploads(
    supabase,
    formData,
    "accessories",
    Array.isArray(meta) ? meta : [],
  );
  if (resolved.error) return { error: resolved.error };
  const images = resolved.images;
  const image_url = images[0]?.url || null;

  const payload = {
    category_id,
    name,
    slug,
    description: description || short_description || description_detail.overview,
    short_description,
    use_cases: applications.join(", "),
    sort_order,
    is_active,
    image_url,
    images,
    description_detail,
    specifications,
    colors: Array.isArray(colors) ? colors : [],
    profiles: Array.isArray(profiles) ? profiles : [],
    features: Array.isArray(features) ? features : [],
    applications,
    downloads: downloads && typeof downloads === "object" ? downloads : {},
    related_items: Array.isArray(related_items) ? related_items : [],
    seo_title,
    meta_description,
    keywords,
    alt_text: alt_text || (images[0]?.alt ?? ""),
    faqs: Array.isArray(faqs) ? faqs : [],
  };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { error: error.message };
  }

  revalidateAccessoryPaths(slug);
  return { ok: true };
}

export async function deleteAccessory(id, slug) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAccessoryPaths(slug);
  return { ok: true };
}

export async function upsertProject(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(name);
  const description = String(formData.get("description") || "").trim();
  let image_url = String(formData.get("image_url") || "").trim() || null;
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "on" || formData.get("is_active") === "true";

  const file = formData.get("file");
  if (file && typeof file === "object" && file.size > 0) {
    const uploaded = await uploadMediaFile(supabase, file, "projects");
    if (uploaded.error) return { error: uploaded.error };
    image_url = uploaded.url;
  }

  const payload = { name, slug, description, image_url, sort_order, is_active };

  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("projects").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProject(id) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function upsertGalleryImage(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const title = String(formData.get("title") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active =
    formData.get("is_active") === "on" || formData.get("is_active") === "true";
  const file = formData.get("file");

  let image_url = String(formData.get("image_url") || "").trim() || null;
  let storage_path = String(formData.get("storage_path") || "").trim() || null;

  if (file && typeof file === "object" && file.size > 0) {
    const uploaded = await uploadMediaFile(supabase, file, "gallery");
    if (uploaded.error) return { error: uploaded.error };
    // Keep prior Storage object; only update the pointer.
    image_url = uploaded.url;
    storage_path = uploaded.path;
  }

  if (!image_url) return { error: "Provide an image file or URL" };

  if (id) {
    const { error } = await supabase
      .from("gallery_images")
      .update({ title, caption, image_url, storage_path, sort_order, is_active })
      .eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("gallery_images").insert({
      title,
      caption,
      image_url,
      storage_path,
      sort_order,
      is_active: true,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}

/** @deprecated Use upsertGalleryImage */
export async function addGalleryImage(formData) {
  return upsertGalleryImage(formData);
}

export async function toggleGalleryActive(id, is_active) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase
    .from("gallery_images")
    .update({ is_active })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteGalleryImage(id, storage_path) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  // Row delete may remove Storage object; image *replace* keeps prior objects.
  if (storage_path) {
    const bucket = storage_path.includes("/") ? "media" : "gallery";
    await supabase.storage.from(bucket).remove([storage_path]);
  }
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}

export async function updateEnquiryStatus(id, status) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function deleteEnquiry(id) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/enquiries");
  return { ok: true };
}

export async function updateSettings(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const keys = ["phone", "phone_secondary", "address", "tagline", "company_name", "email"];
  for (const key of keys) {
    const value = String(formData.get(key) || "");
    const { error } = await supabase.from("settings").upsert({ key, value });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  return { ok: true };
}
