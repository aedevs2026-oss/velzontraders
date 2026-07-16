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
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 focus-gold rounded-sm">
            <Image
              src="/logo.jpg"
              alt="Velzon Trade Enterprise — Coimbatore"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl font-semibold text-ink">VELZON</span>
          </Link>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-gold-dark">
            {tagline}
          </p>
          <p className="mt-3 max-w-xs text-sm text-graphite">
            Roofing and fabrication materials — sourced, customised, and supplied from{" "}
            {address}. {SITE.serviceArea}.
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
            <li>{address}</li>
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

        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Admin</h3>
          <p className="mt-3 text-sm text-graphite">
            Staff login for catalogue and enquiry management.
          </p>
          <Link
            href="/admin/login"
            className="mt-2 inline-block text-sm font-medium text-gold-dark hover:underline focus-gold rounded-sm"
          >
            Admin login
          </Link>
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
