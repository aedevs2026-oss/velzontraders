import Image from "next/image";
import { Container } from "@/components/ui/Container";

const brands = [
  { name: "Bhushan Steel", src: "/brands/bhushan-velzon.png" },
  { name: "JSW", src: "/brands/jsw.webp" },
  { name: "Tata Blue Scope", src: "/brands/tata-blue-velzon.png" },
  { name: "Tata Steel", src: "/brands/tata-steel-velzon.png" },
];

export function BrandStrip() {
  return (
    <section className="border-y border-gold/10 bg-white/70 py-8 sm:py-10">
      <Container>
        <div className="flex flex-col gap-6 rounded-[1.75rem] border border-gold/15 bg-ivory/80 px-5 py-6 shadow-card sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-dark">
              Trusted brands we supply
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Right choice brands, delivered with premium roofing expertise.
            </h2>
            <p className="mt-3 text-sm leading-7 text-graphite">
              We source dependable material brands for roofing, fabrication, and industrial build projects across Tamil Nadu.
            </p>
          </div>
          <div className="grid w-full flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex h-20 items-center justify-center rounded-xl border border-gold/15 bg-white px-3 py-2 shadow-sm transition hover:border-gold hover:shadow-md"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={140}
                  height={72}
                  className="max-h-12 w-full object-contain"
                  unoptimized={brand.src.endsWith(".webp")}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
