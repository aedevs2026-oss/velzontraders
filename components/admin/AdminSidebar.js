"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore if supabase not configured
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-gold/20 bg-white lg:min-h-screen lg:w-56 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-2 border-b border-gold/15 px-4 py-4">
        <Image src="/logo.jpg" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
        <div>
          <p className="font-display text-sm font-semibold text-ink">Velzon Admin</p>
          <Link href="/" className="text-xs text-graphite hover:text-gold-dark">
            View site
          </Link>
        </div>
      </div>
      <nav className="flex flex-row gap-1 overflow-x-auto px-2 py-3 lg:flex-col lg:overflow-visible" aria-label="Admin">
        {LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
                active ? "bg-gradient-gold text-ink" : "text-charcoal hover:bg-ivory"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-gold/15 p-3">
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-md border border-graphite/25 px-3 py-2 text-sm font-medium text-ink hover:border-gold focus-gold"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
