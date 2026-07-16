/** Normalize to 10-digit Indian mobile and build tel / WhatsApp hrefs. */

export function phoneDigits(phone) {
  return String(phone || "").replace(/\D/g, "").slice(-10);
}

export function formatPhoneDisplay(phone) {
  const d = phoneDigits(phone);
  if (d.length !== 10) return String(phone || "");
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

export function telHref(phone) {
  const d = phoneDigits(phone);
  return d ? `tel:+91${d}` : "#";
}

export function whatsappHref(phone, message) {
  const d = phoneDigits(phone);
  const base = `https://wa.me/91${d}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Resolve primary + optional secondary from SITE defaults / settings map.
 * @param {{ phone?: string, phone_secondary?: string }} [settings]
 * @param {{ phone: string, phoneSecondary?: string }} site
 */
export function resolvePhones(settings, site) {
  const primary = settings?.phone || site.phone;
  const secondary = settings?.phone_secondary || site.phoneSecondary;
  const list = [
    {
      raw: primary,
      display: formatPhoneDisplay(primary),
      href: telHref(primary),
    },
  ];
  if (secondary && phoneDigits(secondary) !== phoneDigits(primary)) {
    list.push({
      raw: secondary,
      display: formatPhoneDisplay(secondary),
      href: telHref(secondary),
    });
  }
  return list;
}
