import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getSettings } from "@/lib/data/queries";

export const metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const { demo } = await requireAdmin();
  const settings = await getSettings();

  return (
    <AdminShell title="Site settings">
      <SettingsForm settings={settings} demo={demo} />
    </AdminShell>
  );
}
