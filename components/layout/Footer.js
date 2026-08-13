import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
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
  const resolvedAddress = SITE.shortLocation;

  return (
    <footer className="relative mt-auto border-t border-gold/20 bg-white">
      {/* subtle gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="focus-gold inline-flex items-center rounded-sm"
          >
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
            Roofing and fabrication materials — sourced, customised, and
            supplied.{" "}
            <span className="text-ink/80">{SITE.serviceArea}.</span>
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Explore
          </h3>
          <span className="mt-2 block h-px w-8 bg-gold/40" />
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-gold group inline-flex items-center gap-1 font-semibold  rounded-sm text-sm text-graphite transition-colors hover:text-gold-dark"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
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
          <p className="text-graphite/80">{SITE.serviceArea}</p>
        </Container>
      </div>
    </footer>
  );
}
