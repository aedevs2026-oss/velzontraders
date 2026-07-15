"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { uploadMediaFile } from "@/lib/media/upload";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function upsertCategory(formData) {
  const { demo, supabase } = await requireAdmin();
  if (demo || !supabase) return { error: "Supabase not configured" };

  const id = formData.get("id") || null;
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || slugify(name);
  const description = String(formData.get("description") || "").trim();
  const sort_order = Number(formData.get("sort_order") || 0);
  const is_active = formData.get("is_active") === "on" || formData.get("is_active") === "true";

  const payload = { name, slug, description, sort_order, is_active };

  if (id) {
    const { error } = await supabase.from("product_categories").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("product_categories").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
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

  const keys = ["phone", "address", "tagline", "company_name", "email"];
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
