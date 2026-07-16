"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";
import { MobileNav } from "@/components/layout/MobileNav";

export function Navbar({
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const primaryHref = phones[0]?.href || SITE.phoneHref;

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ivory/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link href="/" className="flex items-center gap-2.5 focus-gold rounded-sm">
          <Image
            src="/logo.jpg"
            alt="Velzon Trade Enterprise — Coimbatore"
            width={44}
            height={44}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            priority
          />
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-display text-lg font-semibold tracking-wide text-ink sm:text-xl">
              VELZON
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-graphite">
              Trade Enterprise
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition focus-gold ${
                  active
                    ? "text-gold-dark"
                    : "text-charcoal hover:text-gold-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <PhoneLinks
            phones={phones}
            className="hidden text-xs font-medium text-charcoal lg:inline"
            linkClassName="hover:text-gold-dark focus-gold rounded-sm whitespace-nowrap"
            separator=" · "
          />
          <Button
            href={primaryHref}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex lg:hidden"
          >
            Call Now
          </Button>
          <Button href="/contact" size="sm" className="hidden min-[380px]:inline-flex">
            Get a Quote
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-graphite/20 p-2 text-ink lg:hidden focus-gold"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
        phones={phones}
      />
    </header>
  );
}
