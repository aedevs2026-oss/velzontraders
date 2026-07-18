import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/ui/PhoneLinks";
import { SITE } from "@/lib/constants";
import { resolvePhones } from "@/lib/phone";

export function Hero({
  tagline = SITE.tagline,
  phone = SITE.phone,
  phoneSecondary = SITE.phoneSecondary,
}) {
  const phones = resolvePhones(
    { phone, phone_secondary: phoneSecondary },
    SITE
  );
  const primaryHref = phones[0]?.href || SITE.phoneHref;

  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(212,175,55,0.18), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(156,163,175,0.15), transparent)",
        }}
        aria-hidden
      />
      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
            {SITE.serviceArea}
          </p>
          <div className="mt-4 flex items-center gap-4">
            
            <div>
              <h1 className="font-display text-4xl font-bold tracking-wide text-ink sm:text-5xl lg:text-[3.25rem]">
                <span className="text-gradient-gold">VELZON</span>
              </h1>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-graphite">
                Trade Enterprises
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark sm:text-base">
            {tagline}
          </p>
          <p className="mt-5 max-w-xl text-base text-charcoal sm:text-lg">
            We source premium branded roofing and fabrication materials, customise
            them for your project, and supply sellers, builders, and end clients
            across Tamil Nadu — with wiring coordination support when your build
            needs it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
            <Button href={primaryHref} variant="secondary" size="lg">
              Call Now
            </Button>
          </div>
          <p className="mt-4 text-sm text-graphite">
            <PhoneLinks
              phones={phones}
              linkClassName="font-medium text-gold-dark hover:underline focus-gold rounded-sm"
            />
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-3 rounded-full bg-gradient-gold opacity-20 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-transparent p-0 shadow-soft sm:rounded-[2.5rem]">
            <Image
              src="/velzon-hero.png"
              alt="Velzon Trade Enterprises logo — Confidence, Growth, Trust"
              width={640}
              height={640}
              className="mx-auto h-full w-full max-w-[28rem] object-contain object-center sm:max-w-[32rem]"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
