export const SITE = {
  name: "Velzon Trade Enterprise",
  tagline: "Confidence | Growth | Trust",
  phone: "9080937360",
  phoneHref: "tel:+919080937360",
  whatsappHref: "https://wa.me/919080937360",
  address: "No 36/48,Thudiyalur Road ,Velappanaikan Pudur,Saravanampatty,Coimbatore, 641035",
  shortLocation: "Coimbatore, Tamil Nadu",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const PROJECT_TYPES = [
  {
    slug: "government",
    name: "Government Projects",
    description:
      "Specified materials, documented thicknesses, and reliable delivery windows for tenders and public works. Velzon coordinates sourcing and on-site-ready fabrication so project timelines stay intact.",
    teaser: "Tender-ready supply with documented specs.",
    image_url:
      "/projects/photorealistic_industrial_photography_of_a_large_public_sector_building_under.png",
  },
  {
    slug: "warehouse",
    name: "Warehouse Projects",
    description:
      "Large-span roofing, decking, and insulated panel packages for logistics and manufacturing sheds. We match sheet profiles and gauges to structural drawings and builder schedules.",
    teaser: "Large-span roofing and decking packages.",
    image_url:
      "/projects/photorealistic_photography_of_a_large_modern_warehouse_exterior_with_a_long.png",
  },
  {
    slug: "retail-work-home",
    name: "Retail / Work-from-home",
    description:
      "Compact commercial and home-office builds need neat finishes without over-engineering. Velzon supplies scaled roofing and cladding packages suited to shops-in-homes, studios, and small retail extensions.",
    teaser: "Right-sized packages for shops and studios.",
    image_url:
      "/projects/photorealistic_photography_of_a_small_modern_commercial_residential_building.png",
  },
  {
    slug: "shops-franchisee",
    name: "Shops & Franchisee",
    description:
      "Repeatable material specs for multi-outlet rollouts — brand-consistent colours, profiles, and lead times so franchisees open on schedule across the region.",
    teaser: "Repeatable specs for multi-outlet rollouts.",
    image_url:
      "/projects/photorealistic_photography_of_a_row_of_retail_storefronts_with_matching_metal.png",
  },
];

export const CATEGORIES = [
  {
    slug: "roofing-sheets",
    name: "Roofing Sheets",
    description:
      "Colour and non-colour galvalume roofing sheets stocked in multiple thicknesses for residential, commercial, and industrial roofs across Coimbatore and beyond.",
    teaser: "0.35–0.60 mm galvalume",
    sort_order: 1,
    image_url: "/products/roofing-sheets.jpg",
  },
  {
    slug: "puff-sheets",
    name: "PUFF Sheets",
    description:
      "Insulated PUFF roof and wall panels that balance thermal comfort with structural finish — available as 30 mm and 50 mm roof and wall options.",
    teaser: "Roof & wall · 30 / 50 mm",
    sort_order: 2,
    image_url: "/products/puff-sheets.jpg",
  },
  {
    slug: "decking-sheet-gi",
    name: "Decking Sheet (GI)",
    description:
      "Galvanised iron decking sheets engineered for composite floor and roof deck systems on warehouses, mezzanines, and multi-storey builds.",
    teaser: "0.80 / 1.0 / 1.2 mm",
    sort_order: 3,
    image_url: "/products/decking-sheet-gi.jpg",
  },
  {
    slug: "mangalore-tile-sheet",
    name: "Mangalore Tile Sheet",
    description:
      "Tile-profile metal sheets that echo classic Mangalore tile silhouettes with the durability of modern coated steel.",
    teaser: "0.45 / 0.47 mm",
    sort_order: 4,
    image_url: "/products/mangalore-tile-sheet.jpg",
  },
  {
    slug: "spanish-tile-sheet",
    name: "Spanish Tile Sheet",
    description:
      "Spanish-profile metal sheets for residences and light commercial roofs seeking a Mediterranean tile look without heavy clay.",
    teaser: "0.45 / 0.47 mm",
    sort_order: 5,
    image_url: "/products/spanish-tile-sheet.jpg",
  },
  {
    slug: "liner-sheet",
    name: "Liner Sheet",
    description:
      "Interior liner sheets for false ceilings, wall lining, and underside finishes in industrial and commercial buildings.",
    teaser: "0.35–0.50 mm",
    sort_order: 6,
    image_url: "/products/liner-sheet.jpg",
  },
  {
    slug: "aluminium-sheet",
    name: "Aluminium Sheet",
    description:
      "Lightweight aluminium sheets suited to coastal exposure, façades, and specialty cladding where corrosion resistance matters.",
    teaser: "0.71 mm",
    sort_order: 7,
    image_url: "/products/aluminium-sheet.jpg",
  },
  {
    slug: "upvc-sheet",
    name: "UPVC Sheet",
    description:
      "UPVC sheets in Spanish and Mangalore tile profiles — light, weather-resistant covering for homes, sheds, and extensions.",
    teaser: "1.5–2.5 mm tile profiles",
    sort_order: 8,
    image_url: "/products/upvc-sheet.jpg",
  },
];

export const PRODUCTS = [
  {
    slug: "galvalume-roofing-sheets",
    category_slug: "roofing-sheets",
    name: "Colour & Non-colour Galvalume Sheets",
    description:
      "Factory-coated and plain galvalume roofing sheets supplied to your thickness and colour preference. Velzon sources from trusted mills, then cuts and fabricates to site measures for sellers, builders, and end clients.",
    thickness_options: [
      "0.35 mm",
      "0.40 mm",
      "0.45 mm",
      "0.47 mm",
      "0.50 mm",
      "0.60 mm",
    ],
    use_cases:
      "Industrial sheds, warehouses, residential roofs, retail canopies, and government project structures.",
    image_url: "/products/galvalume-roofing-sheets.jpg",
  },
  {
    slug: "puff-roof-panel",
    category_slug: "puff-sheets",
    name: "PUFF Roof Panel",
    description:
      "Insulated roof sandwich panels with polyurethane core for cooler interiors and a clean exterior line. Supplied in 30 mm and 50 mm cores to match climate and span needs.",
    thickness_options: ["30 mm", "50 mm"],
    use_cases:
      "Cold storage ancillary roofs, offices, warehouses, and temperature-sensitive workspaces.",
    image_url: "/products/puff-roof-panel.jpg",
  },
  {
    slug: "puff-wall-panel",
    category_slug: "puff-sheets",
    name: "PUFF Wall Panel",
    description:
      "Matching insulated wall panels for partition and external cladding — align roof and wall systems from a single supply partner.",
    thickness_options: ["30 mm", "50 mm"],
    use_cases:
      "Industrial halls, clean rooms, site offices, and retail fit-outs.",
    image_url: "/products/puff-wall-panel.jpg",
  },
  {
    slug: "gi-decking-sheet",
    category_slug: "decking-sheet-gi",
    name: "GI Decking Sheet",
    description:
      "High-strength GI decking profiles for composite slabs and roof decks. Thickness options cover light mezzanines through heavier industrial loadings.",
    thickness_options: ["0.80 mm", "1.0 mm", "1.2 mm"],
    use_cases:
      "Warehouses, commercial floors, multi-level industrial buildings, and mezzanine platforms.",
    image_url: "/products/gi-decking-sheet.jpg",
  },
  {
    slug: "mangalore-tile-profile",
    category_slug: "mangalore-tile-sheet",
    name: "Mangalore Tile Profile Sheet",
    description:
      "Metal sheets pressed in the familiar Mangalore tile rhythm — heritage curb appeal with faster installation and lower dead load.",
    thickness_options: ["0.45 mm", "0.47 mm"],
    use_cases:
      "Homes, villa roofs, temples and institutional buildings seeking a traditional silhouette.",
    image_url: "/products/mangalore-tile-profile.jpg",
  },
  {
    slug: "spanish-tile-profile",
    category_slug: "spanish-tile-sheet",
    name: "Spanish Tile Profile Sheet",
    description:
      "Spanish barrel-tile metal sheets that deliver depth and shadow lines without clay tile weight or breakage risk.",
    thickness_options: ["0.45 mm", "0.47 mm"],
    use_cases: "Premium residences, resorts, farms, and feature roofs.",
    image_url: "/products/spanish-tile-profile.jpg",
  },
  {
    slug: "liner-sheet-product",
    category_slug: "liner-sheet",
    name: "Liner Sheet",
    description:
      "Smooth or lightly profiled liner sheets for ceilings and wall interiors — finish the underside of your metal building system.",
    thickness_options: [
      "0.35 mm",
      "0.40 mm",
      "0.45 mm",
      "0.47 mm",
      "0.50 mm",
    ],
    use_cases:
      "Industrial false ceilings, PEB liners, and commercial wall lining.",
    image_url: "/products/liner-sheet-product.jpg",
  },
  {
    slug: "aluminium-sheet-071",
    category_slug: "aluminium-sheet",
    name: "Aluminium Sheet 0.71 mm",
    description:
      "Purpose-grade aluminium sheeting at 0.71 mm for projects that prioritise light weight and corrosion performance.",
    thickness_options: ["0.71 mm"],
    use_cases:
      "Coastal installations, façades, canopies, and specialty cladding.",
    image_url: "/products/aluminium-sheet-071.jpg",
  },
  {
    slug: "upvc-tile-sheets",
    category_slug: "upvc-sheet",
    name: "UPVC Spanish & Mangalore Tile",
    description:
      "UPVC sheets in Spanish and Mangalore tile profiles. Choose thickness for span, insulation feel, and budget — ideal where metal is not preferred.",
    thickness_options: ["1.5 mm", "1.8 mm", "2.0 mm", "2.5 mm"],
    use_cases:
      "Residential extensions, farm sheds, carports, and lightweight commercial covers.",
    image_url: "/products/upvc-tile-sheets.jpg",
  },
];

export const GALLERY = [
  {
    id: "1",
    title: "Warehouse roof package",
    caption: "Large-span roofing supply — warehouse segment",
    image_url: "/gallery/warehouse-roof.png",
  },
  {
    id: "2",
    title: "Fabrication panel prep",
    caption: "Insulated panel package before dispatch",
    image_url: "/gallery/fabrication-panels.png",
  },
  {
    id: "3",
    title: "Retail canopy finish",
    caption: "Colour galvalume canopy — shops & retail",
    image_url: "/gallery/retail-canopy.png",
  },
  {
    id: "4",
    title: "PUFF wall cladding",
    caption: "Insulated wall panels on a commercial shell",
    image_url: "/gallery/puff-wall.png",
  },
  {
    id: "5",
    title: "Mangalore tile residence",
    caption: "Tile-profile sheet for a villa / WFH build",
    image_url: "/gallery/mangalore-tile-roof.png",
  },
  {
    id: "6",
    title: "GI decking mezzanine",
    caption: "Decking laid for a warehouse mezzanine floor",
    image_url: "/gallery/decking-mezzanine.png",
  },
  {
    id: "7",
    title: "Government cladding supply",
    caption: "Documented aluminium cladding for public works",
    image_url: "/gallery/government-cladding.png",
  },
  {
    id: "8",
    title: "Franchisee roof cover",
    caption: "UPVC tile profile — multi-outlet rollout",
    image_url: "/gallery/shops-franchisee-cover.png",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Velzon delivered our warehouse sheets on schedule and cut to our drawings. Clear communication from quote to dispatch.",
    name: "R. Krishnan",
    role: "Builder · Tiruppur",
  },
  {
    quote:
      "We needed matching roof and wall PUFF panels for a franchise rollout. One supplier, consistent thickness, no surprises.",
    name: "Meera S.",
    role: "Franchise coordinator · Coimbatore",
  },
  {
    quote:
      "From Mangalore tile profile to liner sheets, they understood the residential brief and supplied what the site needed.",
    name: "Arun V.",
    role: "Homeowner · Pollachi",
  },
];

export const ENQUIRY_STATUSES = ["new", "contacted", "closed"];

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("YOUR_PROJECT") && key !== "YOUR_ANON_KEY");
}
