"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ivory/95 backdrop-blur-md">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-[5rem]">
        <Link href="/" className="flex items-center rounded-sm focus-gold">
          <span className="flex h-[3.25rem] w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent p-0 sm:h-[3.75rem] sm:w-[165px]">
            <Image
              src="/logo.png"
              alt="Velzon Trade Enterprises — Coimbatore"
              width={165}
              height={70}
              className="h-full w-full object-contain object-left"
              priority
              unoptimized
            />
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
      />
    </header>
  );
}
