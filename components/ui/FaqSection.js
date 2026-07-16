import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({
  items = [],
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description = "Straight answers on supply, fabrication, and materials.",
  className = "border-t border-gold/10 bg-white py-14 sm:py-16",
  includeJsonLd = false,
}) {
  if (!items.length) return null;

  const jsonLd = includeJsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <section className={className}>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <dl className="mt-10 space-y-4">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-gold/15 bg-ivory p-5 sm:p-6"
            >
              <dt className="font-display text-lg font-semibold text-ink sm:text-xl">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm text-graphite sm:text-base">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
