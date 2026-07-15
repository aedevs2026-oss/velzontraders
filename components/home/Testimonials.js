import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="border-b border-gold/10 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Client voice"
          title="What partners say"
          description="Placeholder testimonials until we publish verified client stories — structure is ready for real quotes."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded-lg border border-gold/15 bg-ivory p-6 shadow-card"
            >
              <p className="flex-1 text-charcoal">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 border-t border-gold/15 pt-4">
                <cite className="not-italic font-semibold text-ink">{t.name}</cite>
                <p className="text-sm text-graphite">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
