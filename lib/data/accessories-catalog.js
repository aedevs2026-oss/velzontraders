/**
 * Roofing accessories catalogue for public pages, seed SQL alignment,
 * and admin demo fallback. Product types mirror common industry lines
 * (flashings, fasteners, ventilators, sealants) with original Velzon copy.
 * Images are Velzon-owned labeled assets under /public/accessories/
 * and are used as the public fallback when Supabase is not configured.
 */

const ACCESSORY_IMAGE_BY_SLUG = {
  "ridge-cap": "/accessories/ridge-cap.png",
  "valley-gutter": "/accessories/valley-gutter.png",
  "barge-flashing": "/accessories/barge-flashing.jpg",
  "corner-flashing": "/accessories/corner-flashing.png",
  "apron-flashing": "/accessories/apron-flashing.png",
  "gutter": "/accessories/gutter.png",
  "down-take-pipe": "/accessories/down-take-pipe.png",
  "turbo-ventilator": "/accessories/ventilator.jpg",
  "ridge-ventilator": "/accessories/ridge-ventilator.png",
  "screws-patta": "/accessories/screw-patta.jpg",
  "aluminium-coated-screws": "/accessories/aluminium-coated-screw.jpg",
  "screw-caps": "/accessories/screw-caps.webp",
  "epdm-washers": "/accessories/epdm-washer.jpg",
  "pet-bolt": "/accessories/pet-bolt.png",
  "aluminium-tape-roll": "/accessories/aluminium-tape-role.png",
  "silicon-sealant": "/accessories/silicone-sealant.png",
  "foam-closers": "/accessories/foam-closer.png",
  "louvers": "/accessories/1784363957889-4g99ehnr.webp",
  "l-angle": "/accessories/l-angle.png",
  "z-angle": "/accessories/z-angle.jpg",
  "sag-rod": "/accessories/sag-rod.jpg",
  "bracing-rod": "/accessories/barcing-rod.jpg",
};

export function getAccessoryImageUrl(slug) {
  return ACCESSORY_IMAGE_BY_SLUG[slug] || null;
}

export const ACCESSORIES_CATALOG = [
  {
    slug: "ridge-cap",
    name: "Ridge Cap",
    short_description: "Weather-tight ridge closure for metal roofing systems.",
    description:
      "Ridge caps seal the peak of metal roofs, shedding water while finishing the ridge line on industrial and commercial buildings.",
    sort_order: 1,
    material: "Pre-painted / Galvalume steel",
    purpose: "Close and weatherproof roof ridges",
    image_url: getAccessoryImageUrl("ridge-cap"),
  },
  {
    slug: "valley-gutter",
    name: "Valley Gutter",
    short_description: "Channel flashings for roof valley junctions.",
    description:
      "Valley gutters collect and redirect runoff at intersecting roof planes for warehouses, factories, and large-span sheds.",
    sort_order: 2,
    material: "Galvalume / GI steel",
    purpose: "Drain intersecting roof planes",
    image_url: getAccessoryImageUrl("valley-gutter"),
  },
  {
    slug: "barge-flashing",
    name: "Barge Flashing",
    short_description: "Edge flashing for gable and barge ends.",
    description:
      "Barge flashings protect roof edges from wind-driven rain and give a clean finish along gable ends.",
    sort_order: 3,
    material: "Pre-painted steel",
    purpose: "Seal barge / gable edges",
    image_url: getAccessoryImageUrl("barge-flashing"),
  },
  {
    slug: "corner-flashing",
    name: "Corner Flashing",
    short_description: "Corner closures for wall and roof junctions.",
    description:
      "Corner flashings finish external and internal corners on cladding and roof transitions.",
    sort_order: 4,
    material: "Pre-painted / Galvalume steel",
    purpose: "Seal cladding corners",
    image_url: getAccessoryImageUrl("corner-flashing"),
  },
  {
    slug: "apron-flashing",
    name: "Apron Flashing",
    short_description: "Wall-to-roof junction flashing.",
    description:
      "Apron flashings weatherproof the junction where a roof meets a higher wall or parapet.",
    sort_order: 5,
    material: "Galvalume / coated steel",
    purpose: "Waterproof wall–roof junctions",
    image_url: getAccessoryImageUrl("apron-flashing"),
  },
  {
    slug: "gutter",
    name: "Gutter",
    short_description: "Rainwater collection gutters for metal roofs.",
    description:
      "Gutters collect roof runoff and feed downpipes — sized for industrial sheds, warehouses, and commercial roofs.",
    sort_order: 6,
    material: "GI / colour-coated steel",
    purpose: "Collect and convey rainwater",
    image_url: getAccessoryImageUrl("gutter"),
  },
  {
    slug: "down-take-pipe",
    name: "Down Take Pipe",
    short_description: "Vertical downpipes for roof drainage.",
    description:
      "Down take pipes carry gutter discharge safely to ground drains or collection points.",
    sort_order: 7,
    material: "GI / PVC / coated steel",
    purpose: "Vertical rainwater discharge",
    image_url: getAccessoryImageUrl("down-take-pipe"),
  },
  {
    slug: "turbo-ventilator",
    name: "Turbo Ventilator",
    short_description: "Wind-driven roof exhaust ventilators.",
    description:
      "Turbo ventilators improve natural ventilation in factories, warehouses, and workshops without powered fans.",
    sort_order: 8,
    material: "Aluminium / SS / FRP",
    purpose: "Natural roof ventilation",
    image_url: getAccessoryImageUrl("turbo-ventilator"),
  },
  {
    slug: "ridge-ventilator",
    name: "Ridge Ventilator",
    short_description: "Continuous ridge ventilation units.",
    description:
      "Ridge ventilators exhaust hot air along the ridge line for large industrial buildings.",
    sort_order: 9,
    material: "Galvalume / aluminium",
    purpose: "Continuous ridge exhaust",
    image_url: getAccessoryImageUrl("ridge-ventilator"),
  },
  {
    slug: "screws-patta",
    name: "Screws Patta",
    short_description: "Self-drilling fasteners for metal roofing and cladding.",
    description:
      "Screws patta fix sheets to purlins with sealed washers for weather-tight connections on industrial and commercial roofs.",
    sort_order: 10,
    material: "Carbon steel with coating",
    purpose: "Fix sheets to structure",
    image_url: getAccessoryImageUrl("screws-patta"),
  },
  {
    slug: "aluminium-coated-screws",
    name: "Aluminium Coated Screws",
    short_description: "Corrosion-resistant coated fasteners.",
    description:
      "Aluminium-coated screws suit coastal and high-humidity sites where fastener corrosion is a risk.",
    sort_order: 11,
    material: "Aluminium-coated steel",
    purpose: "Corrosion-resistant fixing",
    image_url: getAccessoryImageUrl("aluminium-coated-screws"),
  },
  {
    slug: "screw-caps",
    name: "Screw Caps",
    short_description: "Protective colour caps for screw heads.",
    description:
      "Screw caps cover fastener heads for UV protection and a matched colour finish.",
    sort_order: 12,
    material: "UV-stabilised polymer",
    purpose: "Protect and finish screw heads",
    image_url: getAccessoryImageUrl("screw-caps"),
  },
  {
    slug: "epdm-washers",
    name: "EPDM Washers",
    short_description: "Sealing washers for roofing fasteners.",
    description:
      "EPDM washers compress under screw heads to keep fixings watertight through thermal movement.",
    sort_order: 13,
    material: "EPDM rubber",
    purpose: "Seal fastener penetrations",
    image_url: getAccessoryImageUrl("epdm-washers"),
  },
  {
    slug: "pet-bolt",
    name: "PET Bolt (L & J Type)",
    short_description: "L and J type bolts for structural roofing fixings.",
    description:
      "PET bolts in L and J profiles provide strong, corrosion-resistant fastening for roofing and structural installations.",
    sort_order: 14,
    material: "Mild steel / coated steel",
    purpose: "Structural bolt connections",
    image_url: getAccessoryImageUrl("pet-bolt"),
  },
  {
    slug: "aluminium-tape-roll",
    name: "Aluminium Tape Roll",
    short_description: "Metallic sealing tape for joints and overlaps.",
    description:
      "Aluminium tape seals overlaps, ducts, and accessory joints on metal roofing systems.",
    sort_order: 15,
    material: "Aluminium foil adhesive",
    purpose: "Seal joints and overlaps",
    image_url: getAccessoryImageUrl("aluminium-tape-roll"),
  },
  {
    slug: "silicon-sealant",
    name: "Silicon Sealant",
    short_description: "Weatherproof silicone for flashing joints.",
    description:
      "Neutral-cure silicone sealant bonds flashings, gutters, and penetrations against wind and rain.",
    sort_order: 16,
    material: "Neutral silicone",
    purpose: "Seal joints and penetrations",
    image_url: getAccessoryImageUrl("silicon-sealant"),
  },
  {
    slug: "foam-closers",
    name: "Foam Closers",
    short_description: "Profile-matched foam fillers.",
    description:
      "Foam closers block dust, birds, and weather at eaves, ridges, and profile ends.",
    sort_order: 17,
    material: "Closed-cell foam",
    purpose: "Close profile voids",
    image_url: getAccessoryImageUrl("foam-closers"),
  },
  {
    slug: "l-angle",
    name: "L Angle",
    short_description: "L-section structural / cladding angles.",
    description:
      "L angles support cladding edges, trims, and light structural framing around openings.",
    sort_order: 19,
    material: "Mild steel / GI",
    purpose: "Edge and framing support",
    image_url: getAccessoryImageUrl("l-angle"),
  },
  {
    slug: "z-angle",
    name: "Z Angle",
    short_description: "Z-section purlin and cladding members.",
    description:
      "Z angles act as secondary members and cladding supports in PEB and shed framing.",
    sort_order: 20,
    material: "Cold-formed GI / steel",
    purpose: "Secondary framing members",
    image_url: getAccessoryImageUrl("z-angle"),
  },
  {
    slug: "sag-rod",
    name: "Sag Rod",
    short_description: "Sag rods for purlin bracing.",
    description:
      "Sag rods restrain purlin deflection and keep secondary framing true under load.",
    sort_order: 22,
    material: "Mild steel rod",
    purpose: "Control purlin sag",
    image_url: getAccessoryImageUrl("sag-rod"),
  },
  {
    slug: "bracing-rod",
    name: "Bracing Rod",
    short_description: "Rod bracing for shed stability.",
    description:
      "Bracing rods form tension systems that stabilise frames against wind and crane loads.",
    sort_order: 23,
    material: "Mild steel / HT rod",
    purpose: "Frame lateral bracing",
    image_url: getAccessoryImageUrl("bracing-rod"),
  },
];

/** Products-shaped rows for getProducts / admin demo fallback */
export function accessoriesAsProducts() {
  return ACCESSORIES_CATALOG.map((a) => ({
    slug: a.slug,
    category_slug: "roofing-accessories",
    category_name: "Roofing Accessories",
    name: a.name,
    description: a.description,
    short_description: a.short_description,
    thickness_options: [],
    use_cases:
      "Industrial sheds, warehouses, factories, PEB buildings, commercial roofs, and residential metal roofing across Tamil Nadu.",
    image_url: a.image_url,
    images: [{ url: a.image_url, alt: `${a.name} — Velzon Trade Enterprises` }],
    alt_text: `${a.name} — Velzon Trade Enterprises`,
    sort_order: a.sort_order,
    is_active: true,
    specifications: {
      material: a.material,
      thickness: "As per project specification",
      dimensions: "Cut / supplied to site measures",
      finish: "Mill / colour-coated / coated as applicable",
      purpose: a.purpose,
    },
    description_detail: {
      overview: a.description,
      purpose: a.purpose,
    },
  }));
}
