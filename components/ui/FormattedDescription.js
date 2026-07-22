export function FormattedDescription({ text, className = "" }) {
  if (!text) return null;

  const normalized = String(text).trim();
  if (!normalized) return null;

  const lines = normalized.split(/\r?\n/).map((line) => line.trim());
  const blocks = [];

  const parseBenefitsItems = (input) => {
    const trimmed = String(input || "").trim();
    if (!trimmed) return [];

    const items = trimmed
      .split(/[-•*]\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
    return items.length > 0 ? items : [];
  };

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line) {
      index += 1;
      continue;
    }

    const inlineBenefitsMatch = line.match(/^(.*?)\bbenefits\s*[:\-]\s*(.+)$/i);
    if (inlineBenefitsMatch) {
      const prefix = inlineBenefitsMatch[1].trim();
      const benefitText = inlineBenefitsMatch[2].trim();
      if (prefix) {
        blocks.push({ type: "paragraph", text: prefix });
      }
      blocks.push({ type: "benefits", items: parseBenefitsItems(benefitText) });
      index += 1;
      continue;
    }

    const benefitsHeading = line.match(/^benefits\s*[:\-]?\s*(.*)$/i);
    if (benefitsHeading) {
      const items = parseBenefitsItems(benefitsHeading[1] || "");
      index += 1;

      while (index < lines.length) {
        const nextLine = lines[index].trim();
        if (!nextLine) {
          index += 1;
          continue;
        }
        if (/^(overview|purpose|installation|compatibility|features|applications|specifications)\s*[:\-]/i.test(nextLine)) {
          break;
        }
        const bulletMatch = nextLine.match(/^[-•*]\s*(.+)$/);
        if (bulletMatch) {
          items.push(bulletMatch[1].trim());
          index += 1;
          continue;
        }
        if (items.length) {
          items.push(nextLine);
          index += 1;
          continue;
        }
        break;
      }

      if (items.length) {
        blocks.push({ type: "benefits", items });
      }
      continue;
    }

    const bulletMatch = line.match(/^[-•*]\s*(.+)$/);
    if (bulletMatch) {
      const items = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const itemMatch = current.match(/^[-•*]\s*(.+)$/);
        if (!itemMatch) break;
        items.push(itemMatch[1].trim());
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (!current || /^[-•*]\s*(.+)$/.test(current) || /^(benefits\s*[:\-])/.test(current)) break;
      paragraph.push(current);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return (
    <div className={className}>
      {blocks.map((block, blockIndex) => {
        if (block.type === "benefits") {
          return (
            <div key={blockIndex} className={blockIndex > 0 ? "mt-4" : ""}>
              <p className="font-semibold text-ink">Benefits</p>
              <ul className="mt-3 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2 text-charcoal">
                    <span
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gold-dark"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={blockIndex} className={blockIndex > 0 ? "mt-4 list-disc pl-5 space-y-2 text-charcoal" : "list-disc pl-5 space-y-2 text-charcoal"}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-charcoal">{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={blockIndex}
            className={
              blockIndex > 0 ? "mt-4 max-w-2xl text-base text-graphite sm:text-lg" : "max-w-2xl text-base text-graphite sm:text-lg"
            }
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
