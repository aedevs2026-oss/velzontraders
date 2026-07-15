import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export function ContactCta({ phone = SITE.phone, address = SITE.address }) {
  const phoneHref = `tel:+91${String(phone).replace(/\D/g, "").slice(-10)}`;

  return (
    <section className="bg-ivory py-16 sm:py-20">
      <Container>
        <div className="rounded-xl border border-gold/20 bg-white px-6 py-10 text-center shadow-soft sm:px-12">
          <hr className="rule-gold-center mb-6" />
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ready to specify your materials?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-graphite">
            Call our Coimbatore desk or send project details — we will respond with
            availability, thickness options, and a clear next step.
          </p>
          <p className="mt-4 font-display text-2xl font-semibold text-gold-dark">
            <a href={phoneHref} className="focus-gold rounded-sm">
              {phone}
            </a>
          </p>
          <p className="mt-1 text-sm text-graphite">{address}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
            <Button href={phoneHref} variant="secondary" size="lg">
              Call Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
