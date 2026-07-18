import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";
import { SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";

export function ContactCta({
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
  address = SITE.address,
}) {
  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const primaryHref = phones[0]?.href || SITE.phoneHref;
  const resolvedAddress = SITE.shortLocation;

  return (
    <section className="bg-ivory py-16 sm:py-20">
      <Container>
        <div className="rounded-xl border border-gold/20 bg-white px-6 py-10 text-center shadow-soft sm:px-12">
          <hr className="rule-gold-center mb-6" />
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ready to specify your materials?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-graphite">
            Call our desk or send project details — we respond with availability,
            thickness options, and a clear next step for supply and fabrication
            across Tamil Nadu.
          </p>
          <p className="mt-4 font-display text-xl font-semibold text-gold-dark sm:text-2xl">
            <PhoneLinks
              phones={phones}
              linkClassName="focus-gold rounded-sm hover:underline"
              separator=" · "
            />
          </p>
          <p className="mt-1 text-sm text-graphite">{resolvedAddress}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
            <Button href={primaryHref} variant="secondary" size="lg">
              Call Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
