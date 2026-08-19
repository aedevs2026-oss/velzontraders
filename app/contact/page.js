import { SiteShell } from "@/components/layout/SiteShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { PhoneLinks } from "@/components/ui/PhoneLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_FAQS, SITE } from "@/lib/constants";
import { resolvePhones, whatsappHref } from "@/lib/phone";
import { getProjects, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Contact Velzon Trade Enterprises | Roofing Enquiry in Coimbatore",
  description:
    "Contact Velzon Trade Enterprises in Coimbatore for roofing sheets, PUF panels, steel products and fabrication support across Tamil Nadu. Call +91 96000 65505 or +91 96000 65503.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const product = typeof params?.product === "string" ? params.product : "";
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const phones = resolvePhones(settings, SITE);
  const primary = phones[0];
  const contactAddress = SITE.shortLocation;
  const wa = whatsappHref(
    primary?.raw || SITE.phone,
    "Hello Velzon Trade Enterprises, I would like to enquire about materials."
  );

  return (
    <SiteShell>
      <section className="bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact our Coimbatore desk"
            description={`${SITE.serviceArea}. Share your project type and material needs — we respond with availability and next steps.`}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">Call</h2>
                <div className="mt-3 space-y-1 font-display text-xl font-semibold text-gold-dark sm:text-2xl">
                  <PhoneLinks
                    phones={phones}
                    className="flex flex-col gap-1"
                    separator=""
                    linkClassName="focus-gold rounded-sm hover:underline"
                  />
                </div>
                <p className="mt-3 text-sm text-graphite">{contactAddress}</p>
                <p className="mt-2 text-sm text-graphite">{SITE.serviceArea}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button href={primary?.href || SITE.phoneHref} size="sm">
                    Call Now
                  </Button>
                  <Button
                    href={wa}
                    variant="whatsapp"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

             <div className="overflow-hidden rounded-lg border border-gold/20 bg-white shadow-card">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1002342.8473921582!2d75.76068878173831!3d11.08340612476991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7b8de3fe65b%3A0xf2c84ccc4b2a9a5d!2sSteel%20Zone!5e0!3m2!1sen!2sin!4v1787129141435!5m2!1sen!2sin"
    className="h-full min-h-[300px] w-full"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    title="Velzon Trade Enterprises location map"
  />
</div>
            </div>

            <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-card lg:col-span-3 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">Enquiry form</h2>
              <hr className="rule-gold mt-3 w-12" />
              <div className="mt-6">
                <ContactForm defaultProduct={product} projectTypes={projects} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection
        items={CONTACT_FAQS}
        includeJsonLd
        title="Before you call"
        description="Thicknesses, premium brands, and how we work with roofing contractors across Tamil Nadu."
      />
    </SiteShell>
  );
}
