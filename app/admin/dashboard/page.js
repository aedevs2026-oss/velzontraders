import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import { CATEGORIES, PRODUCTS, PROJECT_TYPES } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/constants";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const { demo, supabase } = await requireAdmin();

  let enquiryCount = 0;
  let productCount = PRODUCTS.length;
  let categoryCount = CATEGORIES.length;
  let recent = [];

  if (!demo && supabase) {
    const [enq, prods, cats, recentRes] = await Promise.all([
      supabase.from("enquiries").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("product_categories").select("id", { count: "exact", head: true }),
      supabase
        .from("enquiries")
        .select("id, name, phone, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    enquiryCount = enq.count || 0;
    productCount = prods.count || 0;
    categoryCount = cats.count || 0;
    recent = recentRes.data || [];
  }

  const cards = [
    { label: "Enquiries", value: enquiryCount, href: "/admin/enquiries" },
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Categories", value: categoryCount, href: "/admin/products" },
    { label: "Projects", value: PROJECT_TYPES.length, href: "/admin/projects" },
  ];

  return (
    <AdminShell title="Dashboard">
      {demo ? (
        <p className="mb-4 rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — configure Supabase in <code>.env.local</code> to load live counts.
          {!isSupabaseConfigured() ? " Middleware will ask you to log in once env is set." : ""}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-lg border border-gold/20 bg-white p-5 shadow-card hover:border-gold focus-gold"
          >
            <p className="text-sm text-graphite">{c.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">Recent enquiries</h2>
        {recent.length ? (
          <ul className="mt-4 divide-y divide-gold/10">
            {recent.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span className="font-medium text-ink">{row.name}</span>
                <span className="text-graphite">{row.phone}</span>
                <span className="rounded bg-ivory px-2 py-0.5 text-xs uppercase text-gold-dark">
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-graphite">No enquiries yet.</p>
        )}
        <Link href="/admin/enquiries" className="mt-4 inline-block text-sm font-semibold text-gold-dark">
          Manage enquiries →
        </Link>
      </div>
    </AdminShell>
  );
}
