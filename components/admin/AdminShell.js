import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children, title }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1">
        <header className="border-b border-gold/15 bg-white px-4 py-4 sm:px-6">
          <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
