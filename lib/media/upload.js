const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "svg"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export const MEDIA_UPLOAD_ACCEPT =
  "image/jpeg,image/png,image/webp,image/svg+xml,.jpg,.jpeg,.png,.webp,.svg";

export const MEDIA_UPLOAD_HINT =
  "JPG, JPEG, PNG, WebP, or SVG — max 5 MB each";

/**
 * Upload an image to the public `media` Storage bucket.
 * Returns the public object URL for storage in image_url / images[].url.
 * On replace: keep the previous object and only update the DB pointer (simpler).
 */
export async function uploadMediaFile(supabase, file, folder = "uploads") {
  if (!file || typeof file !== "object" || !file.size) {
    return { url: null, path: null };
  }

  const type = file.type || "";
  const extRaw = (file.name?.split(".").pop() || "").toLowerCase();
  const ext = extRaw === "jpeg" ? "jpg" : extRaw;

  if (!ALLOWED_TYPES.has(type) && !ALLOWED_EXT.has(ext)) {
    return { error: "Only JPG, JPEG, PNG, WebP, or SVG images are allowed" };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be 5 MB or smaller" };
  }

  const safeExt = ALLOWED_EXT.has(ext) ? (ext === "jpeg" ? "jpg" : ext) : "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;
  const contentType =
    type ||
    (safeExt === "jpg"
      ? "image/jpeg"
      : safeExt === "svg"
        ? "image/svg+xml"
        : `image/${safeExt}`);

  // Prefer ArrayBuffer so Node Server Actions upload reliably to Storage.
  const body =
    typeof file.arrayBuffer === "function"
      ? Buffer.from(await file.arrayBuffer())
      : file;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, body, {
      contentType,
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) return { error: uploadError.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  const publicUrl = data?.publicUrl;
  if (!publicUrl) {
    return { error: "Upload succeeded but public URL could not be generated" };
  }
  return { url: publicUrl, path };
}

/**
 * Resolve a list of image meta entries + optional FormData files into stored URL objects.
 * meta: [{ url?, alt?, sort_order? }]
 * file keys: image_file_0, image_file_1, ...
 */
export async function resolveImageUploads(supabase, formData, folder, meta = []) {
  const images = [];
  for (let i = 0; i < meta.length; i++) {
    const entry = meta[i] || {};
    const file = formData.get(`image_file_${i}`);
    if (file && typeof file === "object" && file.size > 0) {
      const uploaded = await uploadMediaFile(supabase, file, folder);
      if (uploaded.error) return { error: uploaded.error };
      images.push({
        url: uploaded.url,
        alt: String(entry.alt || "").trim(),
        sort_order: i,
      });
    } else if (entry.url) {
      images.push({
        url: String(entry.url).trim(),
        alt: String(entry.alt || "").trim(),
        sort_order: i,
      });
    }
  }
  return { images };
}
