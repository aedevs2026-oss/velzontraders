export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Velzon Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-ivory text-charcoal">{children}</div>;
}
