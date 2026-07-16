"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function MobileNav({ open, onClose, pathname }) {
  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      className="border-t border-gold/15 bg-ivory lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <nav className="flex flex-col gap-1 px-4 py-4">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-md px-3 py-3 text-base font-medium ${
                active ? "bg-white text-gold-dark shadow-card" : "text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="mt-3 flex flex-col gap-2 border-t border-gold/10 pt-4">
          <Button href="/contact" onClick={onClose}>
            Get a Quote
          </Button>
        </div>
      </nav>
    </div>
  );
}
