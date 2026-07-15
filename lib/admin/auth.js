import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    return { demo: true, user: null, supabase: null };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return { demo: false, user, supabase };
}
