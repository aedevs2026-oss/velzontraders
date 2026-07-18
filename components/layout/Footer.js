import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";

export function Footer({
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
  address = SITE.address,
  tagline = SITE.tagline,
}) {
  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/20 bg-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 focus-gold rounded-sm">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gold/20 bg-white p-1 shadow-card sm:h-16 sm:w-16">
              <Image
                src="/logo.jpg"
                alt="Velzon Trade Enterprises — Coimbatore"
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-xl font-semibold text-ink sm:text-2xl">
              VELZON
            </span>
          </Link>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-gold-dark">
            {tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm text-graphite">
            Roofing and fabrication materials — sourced, customised, and supplied.
            {SITE.serviceArea}.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Explore</h3>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-graphite hover:text-gold-dark focus-gold rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-graphite">
            <li>
              <PhoneLinks
                phones={phones}
                className="flex flex-col gap-1"
                separator=""
                linkClassName="hover:text-gold-dark focus-gold rounded-sm"
              />
            </li>
            <li className="leading-relaxed">{address}</li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-dark focus-gold rounded-sm"
              >
                WhatsApp chat
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-gold/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved. Est. {SITE.established}.
          </p>
          <p>{SITE.serviceArea}</p>
        </Container>
      </div>
    </footer>
  );
}
