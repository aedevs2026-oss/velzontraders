const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "products", "accessories");
fs.mkdirSync(dir, { recursive: true });

const items = [
  ["ridge-cap", "Ridge Cap"],
  ["valley-gutter", "Valley Gutter"],
  ["barge-flashing", "Barge Flashing"],
  ["corner-flashing", "Corner Flashing"],
  ["apron-flashing", "Apron Flashing"],
  ["gutter", "Gutter"],
  ["down-take-pipe", "Down Take Pipe"],
  ["turbo-ventilator", "Turbo Ventilator"],
  ["ridge-ventilator", "Ridge Ventilator"],
  ["screws-patta", "Screws Patta"],
  ["aluminium-coated-screws", "Aluminium Coated Screws"],
  ["screw-caps", "Screw Caps"],
  ["epdm-washers", "EPDM Washers"],
  ["pet-bolt", "PET Bolt"],
  ["aluminium-tape-roll", "Aluminium Tape Roll"],
  ["silicon-sealant", "Silicon Sealant"],
  ["foam-closers", "Foam Closers"],
  ["louvers", "Louvers"],
  ["l-angle", "L Angle"],
  ["z-angle", "Z Angle"],
  ["cleats", "Cleats"],
  ["sag-rod", "Sag Rod"],
  ["bracing-rod", "Bracing Rod"],
];

for (const [slug, name] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" role="img" aria-label="${name} — Velzon Trade Enterprise">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#B8860B"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#F0C75E"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="#FAF8F3"/>
  <rect x="32" y="32" width="736" height="436" fill="#FFFFFF" stroke="url(#g)" stroke-width="3"/>
  <rect x="32" y="32" width="736" height="8" fill="url(#g)"/>
  <text x="400" y="220" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#111827">${name}</text>
  <text x="400" y="265" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#B8860B">Roofing Accessories</text>
  <text x="400" y="310" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4B5563">Velzon Trade Enterprise · Coimbatore</text>
  <text x="400" y="350" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9CA3AF">Original placeholder — replace with your photo</text>
</svg>
`;
  fs.writeFileSync(path.join(dir, `${slug}.svg`), svg);
}

console.log(`Wrote ${items.length} SVGs to ${dir}`);
