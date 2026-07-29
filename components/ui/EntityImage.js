import Image from "next/image";
import { isRemoteImageSrc, isSvgImageSrc, normalizeImageSrc } from "@/lib/media/image-url";

/**
 * Renders a real image when src is set; otherwise a labeled gray placeholder
 * (never a stock photo stand-in).
 *
 * Remote Supabase URLs use unoptimized so the browser loads them directly —
 * Next.js 16 image optimizer rejects some Storage DNS/NAT64 resolutions as
 * "private IP" (SSRF guard), which breaks admin-uploaded gallery images.
 */
export function EntityImage({
  src,
  alt,
  label,
  sizes = "100vw",
  className = "",
  priority = false,
  quality = 75,
}) {
  const resolved = normalizeImageSrc(src);
  if (resolved) {
    return (
      <Image
        src={resolved}
        alt={alt || label || ""}
        fill
        priority={priority}
        quality={quality}
        unoptimized={isRemoteImageSrc(resolved) || isSvgImageSrc(resolved)}
        className={`object-cover ${className}`.trim()}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-1 bg-graphite/10 px-4 text-center ${className}`.trim()}
      role="img"
      aria-label={alt || `${label || "Item"} — photo coming soon`}
    >
      <span className="font-display text-base font-semibold text-charcoal">
        {label || "No photo"}
      </span>
      <span className="text-xs uppercase tracking-wider text-graphite">
        Photo coming soon
      </span>
    </div>
  );
}
