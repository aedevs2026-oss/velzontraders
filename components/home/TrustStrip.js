import { Container } from "@/components/ui/Container";

const badges = [
  { label: "Confidence", detail: "Documented thicknesses & premium brands" },
  { label: "Growth", detail: "Scalable supply for multi-site rollouts" },
  { label: "Trust", detail: "Supply & fabrication across Tamil Nadu" },
];

export function TrustStrip({ tagline = "Confidence | Growth | Trust" }) {
  return (
    <section className="border-b border-gold/10 bg-gradient-gold py-12 text-ink">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em]">
          {tagline}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {badges.map((b) => (
            <div key={b.label} className="text-center">
              <p className="font-display text-2xl font-semibold">{b.label}</p>
              <p className="mt-1 text-sm text-ink/80">{b.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-ink/15 pt-8 text-center sm:grid-cols-4">
          <div>
            <p className="font-display text-3xl font-bold">8+</p>
            <p className="text-xs uppercase tracking-wider text-ink/75">Material lines</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold">4</p>
            <p className="text-xs uppercase tracking-wider text-ink/75">Project segments</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold">TN</p>
            <p className="text-xs uppercase tracking-wider text-ink/75">Across Tamil Nadu</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold">2024</p>
            <p className="text-xs uppercase tracking-wider text-ink/75">Est. 11 June</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
