import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiriesManager } from "@/components/admin/EnquiriesManager";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Enquiries" };

export default async function AdminEnquiriesPage() {
  const { demo, supabase } = await requireAdmin();
  let enquiries = [];

  if (!demo && supabase) {
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    enquiries = data || [];
  }

  return (
    <AdminShell title="Enquiries">
      <EnquiriesManager enquiries={enquiries} demo={demo} />
    </AdminShell>
  );
}
