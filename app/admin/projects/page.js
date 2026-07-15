import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { requireAdmin } from "@/lib/admin/auth";
import { PROJECT_TYPES } from "@/lib/constants";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const { demo, supabase } = await requireAdmin();
  let projects = PROJECT_TYPES.map((p) => ({ ...p, id: null, is_active: true }));

  if (!demo && supabase) {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    if (data?.length) projects = data;
  }

  return (
    <AdminShell title="Fabrication projects">
      <ProjectsManager projects={projects} demo={demo} />
    </AdminShell>
  );
}
