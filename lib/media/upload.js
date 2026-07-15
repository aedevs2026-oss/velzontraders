const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Upload an image to the public `media` Storage bucket.
 * Returns the public object URL for storage in image_url.
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
    return { error: "Only JPG, PNG, or WebP images are allowed" };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be 5 MB or smaller" };
  }

  const safeExt = ALLOWED_EXT.has(ext) ? (ext === "jpeg" ? "jpg" : ext) : "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;
  const contentType = type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`;

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
