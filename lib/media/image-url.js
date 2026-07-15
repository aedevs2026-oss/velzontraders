/**
 * Normalize image_url values from DB / seed for next/image and <img>.
 * - Absolute http(s) URLs (Supabase Storage public URLs) pass through.
 * - Relative public/ paths are ensured to start with `/` and path segments
 *   are encoded (spaces, parentheses in long photorealistic filenames).
 */
export function normalizeImageSrc(src) {
  if (src == null) return null;
  const raw = String(src).trim();
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash
    .split("/")
    .map((segment, index) => {
      if (index === 0) return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}

/** True for absolute Storage / CDN URLs (skip next/image optimizer). */
export function isRemoteImageSrc(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src.trim());
}
