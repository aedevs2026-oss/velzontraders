import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSettings } from "@/lib/data/queries";

export async function SiteShell({ children }) {
  const settings = await getSettings();

  return (
    <>
      <Navbar phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer
        phone={settings.phone}
        address={settings.address}
        tagline={settings.tagline}
      />
      <WhatsAppFloat phone={settings.phone} />
    </>
  );
}
