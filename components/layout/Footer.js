import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";

// lucide-react drops brand/logo marks (Instagram, X/Twitter, etc.) in newer
// releases, so both icons are defined locally as tiny inline SVGs that
// inherit color/size the same way a lucide icon would via className.
function InstagramIcon({ className, strokeWidth = 1.75 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/velzon_trade?utm_source=qr&igsi=MW90b2NqYmV6dDlkZA==",
    Icon: InstagramIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/VELZONTRADE",
    Icon: XIcon,
  },
];

export function Footer({
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
  address = SITE.address,
  tagline = SITE.tagline,
  categories = [],
}) {
  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const year = new Date().getFullYear();
  const resolvedAddress = SITE.shortLocation;
  const footerCategories = categories.slice(0, 5);

  return (
    <footer className="relative mt-auto border-t border-gold/20 bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="focus-gold inline-flex items-center rounded-sm">
            <span className="flex h-16 w-36 items-center justify-center overflow-hidden rounded-md bg-transparent p-0 sm:h-20 sm:w-44">
              <Image
                src="/logo.png"
                alt="Velzon Trade Enterprises logo"
                width={176}
                height={80}
                className="h-full w-full object-contain object-left"
                priority
              />
            </span>
          </Link>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">
            {tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-graphite">
            Roofing and fabrication materials — sourced, customised, and supplied.{" "}
            <span className="text-ink/80">{SITE.serviceArea}.</span>
          </p>

          <div className="mt-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Follow Us
            </h3>
            <span className="mt-2 block h-px w-8 bg-gold/40" />
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map(function (item) {
                const label = item.label;
                const href = item.href;
                const Icon = item.Icon;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="focus-gold group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-dark transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:border-gold hover:bg-gold hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(191,155,48,0.55)] active:scale-95"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-gold/60 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-75" />
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg]"
                      strokeWidth={1.75}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Explore
          </h3>
          <span className="mt-2 block h-px w-8 bg-gold/40" />
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map(function (link) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-gold group inline-flex items-center gap-1 font-semibold rounded-sm text-sm text-graphite transition-colors hover:text-gold-dark"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Our Services
          </h3>
          <span className="mt-2 block h-px w-8 bg-gold/40" />
          <ul className="mt-4 space-y-2.5">
            {footerCategories.map(function (cat) {
              return (
                <li key={cat.slug}>
                  <Link
                    href={"/products/" + cat.slug}
                    className="focus-gold group inline-flex items-center gap-1 font-semibold rounded-sm text-sm text-graphite transition-colors hover:text-gold-dark"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/products"
                className="focus-gold group inline-flex items-center gap-1 text-sm font-semibold text-gold-dark hover:underline"
              >
                <span>View all products</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Contact
          </h3>
          <span className="mt-2 block h-px w-8 bg-gold/40" />
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.75} />
              <PhoneLinks
                phones={phones}
                className="flex flex-col gap-1"
                separator=""
                linkClassName="focus-gold rounded-sm text-sm text-graphite transition-colors hover:text-gold-dark"
              />
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.75} />
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-gold rounded-sm text-sm text-graphite transition-colors hover:text-gold-dark"
              >
                WhatsApp chat
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.75} />
              <span className="block max-w-xs whitespace-pre-line break-words text-sm leading-relaxed text-graphite">
                {resolvedAddress}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-gold/10 bg-canvas/40">
        <Container className="flex flex-col gap-2 py-5 text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved. Est. {SITE.established}.
          </p>
          <p className="text-graphite/80">
            Developed by{" "}
            <a
              href="https://aedevs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-dark transition-colors hover:text-ink"
            >
              AEDEVS
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
