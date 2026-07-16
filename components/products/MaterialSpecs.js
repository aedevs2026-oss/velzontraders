/**
 * Thickness + brand specs for roofing sheets and PUF panels.
 * @param {{ spec: { thicknesses: string[], brands: Array<string | { name: string, lines?: string[] }>, note?: string } }} props
 */
export function MaterialSpecs({ spec }) {
  if (!spec) return null;

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          Thickness available
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {spec.thicknesses.map((t) => (
            <li
              key={t}
              className="rounded-md border border-gold/30 bg-ivory px-3 py-1.5 text-sm font-medium text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
        {spec.note ? (
          <p className="mt-4 text-sm text-graphite">{spec.note}</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          Premium branded materials
        </h2>
        <p className="mt-2 text-sm text-graphite">
          We supply mill-backed brands so warehouse roofing, factory roofing, and
          insulated panel packages meet documented specs.
        </p>
        <ul className="mt-4 space-y-3">
          {spec.brands.map((brand) => {
            if (typeof brand === "string") {
              return (
                <li key={brand} className="text-sm font-medium text-ink">
                  {brand}
                </li>
              );
            }
            return (
              <li key={brand.name}>
                <p className="text-sm font-semibold text-ink">{brand.name}</p>
                {brand.lines?.length ? (
                  <p className="mt-0.5 text-sm text-graphite">
                    {brand.lines.join(" · ")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
