import { SiteShell } from "@/components/layout/SiteShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { getProjects, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Contact",
  description:
    "Contact Velzon Trade Enterprise in Coimbatore — call 9080937360, WhatsApp, or send a project enquiry.",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const product = typeof params?.product === "string" ? params.product : "";
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const phone = settings.phone || SITE.phone;
  const phoneHref = `tel:+91${String(phone).replace(/\D/g, "").slice(-10)}`;
  const wa = `https://wa.me/91${String(phone).replace(/\D/g, "").slice(-10)}`;

  return (
    <SiteShell>
      <section className="bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact our Coimbatore desk"
            description="Share your project type and material needs. We respond with availability and next steps."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">Call</h2>
                <a
                  href={phoneHref}
                  className="mt-2 block font-display text-2xl font-semibold text-gold-dark focus-gold"
                >
                  {phone}
                </a>
                <p className="mt-2 text-sm text-graphite">{settings.address}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button href={phoneHref} size="sm">
                    Call Now
                  </Button>
                  <Button href={wa} variant="whatsapp" size="sm" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-gold/20 bg-white shadow-card">
                <div className="flex aspect-video items-center justify-center bg-graphite/10 p-6 text-center">
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Map placeholder
                    </p>
                    <p className="mt-1 text-sm text-graphite">
                      Coimbatore, Tamil Nadu — embed Google Maps when address pin is final.
                    </p>
                  </div>
                </div>
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
    </SiteShell>
  );
}
