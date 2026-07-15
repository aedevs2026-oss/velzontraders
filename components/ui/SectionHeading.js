export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      <hr className={`rule-gold ${align === "center" ? "rule-gold-center w-16" : "w-16"}`} />
      {description ? (
        <p className="max-w-2xl text-base text-graphite sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
