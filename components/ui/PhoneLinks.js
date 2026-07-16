import { SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";

/**
 * Accessible list of one or more click-to-call numbers.
 * @param {{ phones?: { display: string, href: string }[], phone?: string, phoneSecondary?: string, className?: string, linkClassName?: string, separator?: string }} props
 */
export function PhoneLinks({
  phones,
  phone,
  phoneSecondary,
  className = "",
  linkClassName = "hover:text-gold-dark focus-gold rounded-sm",
  separator = " · ",
}) {
  const list =
    phones ||
    resolvePhones(
      { phone: phone || SITE.phone, phone_secondary: phoneSecondary || SITE.phoneSecondary },
      SITE
    );

  return (
    <span className={className}>
      {list.map((p, i) => (
        <span key={p.href}>
          {i > 0 && separator ? (
            <span aria-hidden="true">{separator}</span>
          ) : null}
          <a href={p.href} className={linkClassName}>
            {p.display}
          </a>
        </span>
      ))}
    </span>
  );
}
