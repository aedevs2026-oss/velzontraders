import { AdminShell } from "@/components/admin/AdminShell";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { requireAdmin } from "@/lib/admin/auth";
import { GALLERY } from "@/lib/constants";

export const metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const { demo, supabase } = await requireAdmin();
  let images = GALLERY.map((g) => ({ ...g, is_active: true, storage_path: null }));

  if (!demo && supabase) {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order");
    if (data?.length) images = data;
  }

  return (
    <AdminShell title="Gallery">
      <GalleryManager images={images} demo={demo} />
    </AdminShell>
  );
}
