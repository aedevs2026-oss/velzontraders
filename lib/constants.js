export const SITE = {
  name: "Velzon Trade Enterprises",
  tagline: "Confidence | Growth | Trust",
  phone: "9600065505",
  phoneSecondary: "9600065503",
  phoneHref: "tel:+919600065505",
  whatsappHref: "https://wa.me/919600065505",
  address:
    "Velzon Trade Enterprises, No 36/48, Thudiyalur Road, Velappanaikan Pudur, Saravanampatty, Coimbatore, 641035",
  shortLocation: "Velzon Trade Enterprises, No 36/48, Thudiyalur Road, Velappanaikan Pudur, Saravanampatty, Coimbatore, 641035",
  serviceArea: "Supply & Fabrication Services Across Tamil Nadu",
  established: "11 June 2024",
  establishedIso: "2024-06-11",
};

/** Specs shown on roofing / PUF category & product pages (DB may override thicknesses). */
export const MATERIAL_SPECS = {
  "roofing-sheets": {
    thicknesses: ["0.35 mm", "0.40 mm", "0.45 mm", "0.50 mm", "0.60 mm"],
    brands: [
      {
        name: "JSW",
        lines: ["Silveron", "Colouron+", "JSW Steel", "Pragati", "Pragati+"],
      },
      {
        name: "Tata",
        lines: ["Tata Steel", "Tata BlueScope", "Tata Busion"],
      },
      { name: "AMNS India" },
      { name: "Jindal" },
    ],
    note: "Metal roofing sheets for industrial roofing solutions, warehouse roofing, and residential covers — cut and fabricated to site measures.",
  },
  "puff-sheets": {
    thicknesses: ["30 mm", "50 mm"],
    brands: [
      "Metecno India Pvt. Ltd.",
      "Alfaa India Pvt. Ltd.",
      "Mount India Pvt. Ltd.",
    ],
    note: "PUF panel supply and fabrication for cooler interiors on warehouses, factories, and commercial shells.",
  },
};

export const FAQS = [
  {
    question: "Where does Velzon supply and fabricate?",
    answer:
      "We provide supply and fabrication work across Tamil Nadu — from our Coimbatore desk through industrial corridors including Chennai. Share your site location when you enquire so we can plan lead times for roofing installation and material delivery.",
  },
  {
    question: "When was Velzon Trade Enterprises established?",
    answer:
      "Velzon Trade Enterprises was established on 11 June 2024. We source premium branded materials, fabricate to drawings, and supply sellers, builders, and end clients.",
  },
  {
    question: "What metal roofing sheet thicknesses do you stock?",
    answer:
      "Our roofing sheets are available in 0.35 mm, 0.40 mm, 0.45 mm, 0.50 mm, and 0.60 mm. As a roofing material supplier in Tamil Nadu, we match gauges to warehouse roofing, factory roofing, and lighter commercial covers.",
  },
  {
    question: "Which roofing sheet brands do you supply?",
    answer:
      "We supply premium metal roofing sheets from JSW (Silveron, Colouron+, JSW Steel, Pragati, Pragati+), Tata (Tata Steel, Tata BlueScope, Tata Busion), AMNS India, and Jindal — suitable for projects that need documented mill-backed specs.",
  },
  {
    question: "What PUF panel options and brands are available?",
    answer:
      "PUF / PUFF panels are available in 30 mm and 50 mm cores for roof and wall. We work with Metecno India Pvt. Ltd., Alfaa India Pvt. Ltd., and Mount India Pvt. Ltd. for PUF panel supply and fabrication.",
  },
  {
    question: "Do you only serve Coimbatore, or also Chennai?",
    answer:
      "Coimbatore is our base, but we support roofing contractors across Tamil Nadu — including Chennai and other industrial towns — with roofing sheet fabrication, PUF panels, and coordinated supply for industrial roofing solutions.",
  },
  {
    question: "How can I get a quote?",
    answer:
      "Call +91 96000 65505 or +91 96000 65503, WhatsApp the primary number, or send an enquiry on our contact page with project type, product name, and site location.",
  },
];

/** Short set for the home page — material/brand detail lives on /contact and category pages. */
export const HOME_FAQS = [FAQS[0], FAQS[1], FAQS[6]];

/** Contact-page FAQs — skips the home trio to avoid repeating the same answers. */
export const CONTACT_FAQS = [FAQS[2], FAQS[3], FAQS[4], FAQS[5], FAQS[6]];

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
      "Warehouse roofing and factory roofing packages — large-span metal roofing sheets, decking, and insulated PUF panels matched to structural drawings and builder schedules across Tamil Nadu.",
    teaser: "Warehouse & factory roofing packages.",
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
      "Premium branded metal roofing sheets in colour and non-colour finishes — a trusted choice for industrial roofing solutions, warehouse covers, and residential work across Tamil Nadu.",
    teaser: "0.35–0.60 mm · JSW, Tata & more",
    sort_order: 1,
    image_url: "/products/roofing-sheets.jpg",
  },
  
  {
    slug: "puff-sheets",
    name: "PUFF Sheets",
    description:
      "Insulated PUF panel supply and fabrication for roof and wall — 30 mm and 50 mm cores from Metecno, Alfaa, and Mount India for cooler interiors and a clean structural finish.",
    teaser: "30 / 50 mm · Metecno, Alfaa, Mount",
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
  {
    slug: "steel-products",
    name: "Steel Products",
    description:
      "Project-ready steel materials for fabrication, structural support, cladding and industrial assembly. This catalogue range includes steel sections, plates, flats, channels, angles, pipes and allied steel items that can be sourced and coordinated for site-specific requirements.",
    teaser: "Fabrication-ready steel sections, plates, pipes and profiles",
    sort_order: 9,
    image_url: "/steel-products/steel-products-category.svg",
    catalogue_items: [
      "Structural steel sections",
      "Steel plates",
      "Flats and bars",
      "Mild steel pipes",
      "ERW pipe options",
      "Hollow sections",
      "Fabrication-ready flats",
      "Plate cutting support",
      "Custom steel profiles",
      "Cladding support steel",
      "Industrial assembly steel",
      "Site-ready steel supply",
      "Catalogued product range",
      "Quotation-ready sourcing",
    ],
    images: [
      {
        url: "/steel-products/Screenshot 2026-07-24 160931.png",
        alt: "Structural steel sections and angles",
        name: "Structural steel sections",
        description:
          "Angles, channels and beams used for fabricated frames, load-bearing supports and industrial assemblies.",
        pdf_reference: "Structural sections",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 160954.png",
        alt: "Steel plates for fabrication",
        name: "Steel plates",
        description:
          "Plate stock for brackets, base plates, custom fabrication and workshop cutting requirements.",
        pdf_reference: "Plate stock",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161013.png",
        alt: "Steel flats and bars",
        name: "Flats and bars",
        description:
          "Flat and bar stock for reinforcements, support members and fabrication work that needs precise cut lengths.",
        pdf_reference: "Flats & bars",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161031.png",
        alt: "Mild steel pipes",
        name: "Mild steel pipes",
        description:
          "Round pipe material used for structure support work, utility runs and fabrication assemblies.",
        pdf_reference: "Pipe range",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161054.png",
        alt: "ERW pipe range",
        name: "ERW pipe options",
        description:
          "Welded pipe options suitable for fabrication and site-ready steel assembly workflows.",
        pdf_reference: "ERW pipe",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161157.png",
        alt: "Hollow steel sections",
        name: "Hollow sections",
        description:
          "Square and rectangular hollow sections for frames, supports and light structural assemblies.",
        pdf_reference: "Hollow sections",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161223.png",
        alt: "Fabrication-ready flats",
        name: "Fabrication-ready flats",
        description:
          "Ready-to-cut flat stock arranged for workshop fabrication, repairs and custom steel jobs.",
        pdf_reference: "Fabrication stock",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161244.png",
        alt: "Plate cutting support",
        name: "Plate cutting support",
        description:
          "Plate material and cutting support for projects that need exact dimensions and fast turnaround.",
        pdf_reference: "Plate cutting",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161311.png",
        alt: "Custom steel profiles",
        name: "Custom steel profiles",
        description:
          "Profile references that help with custom fabrication planning and project-specific steel sourcing.",
        pdf_reference: "Custom profiles",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161333.png",
        alt: "Cladding support steel",
        name: "Cladding support steel",
        description:
          "Support steel and framing material used alongside roofing and cladding systems.",
        pdf_reference: "Support steel",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161354.png",
        alt: "Industrial assembly steel",
        name: "Industrial assembly steel",
        description:
          "Material references aligned to factory and industrial assembly demands for reliable supply coordination.",
        pdf_reference: "Industrial range",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161414.png",
        alt: "Site-ready steel supply planning",
        name: "Site-ready steel supply",
        description:
          "Quotation-ready steel references that help contractors plan site delivery and fabrication schedules.",
        pdf_reference: "Supply planning",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161432.png",
        alt: "Steel catalog product reference",
        name: "Catalogued product range",
        description:
          "A compact product family view for quick comparison and selection from the broader steel catalogue.",
        pdf_reference: "Product reference",
      },
      {
        url: "/steel-products/Screenshot 2026-07-24 161454.png",
        alt: "Quotation support for steel sourcing",
        name: "Quotation-ready sourcing",
        description:
          "Detailed product references and project support for enquiries that need steel sourcing and fabrication coordination.",
        pdf_reference: "Quotation support",
      },
    ],
  },
  {
    slug: "roofing-accessories",
    name: "Roofing Accessories",
    description:
      "Flashings, fasteners, ventilators, sealants, and structural accessories that complete metal roofing and cladding systems across Tamil Nadu.",
    teaser: "Ridge · gutters · screws · vents",
    sort_order: 9,
    image_url: "/products/accessories/ridge-cap.svg",
  },
];

export const PRODUCTS = [
  {
    slug: "galvalume-roofing-sheets",
    category_slug: "roofing-sheets",
    name: "Colour & Non-colour Galvalume Sheets",
    description:
      "Factory-coated and plain metal roofing sheets from premium mills (JSW, Tata, AMNS India, Jindal). We cut and fabricate to site measures for sellers, builders, and end clients — including roofing sheet fabrication for Chennai and Tamil Nadu sites.",
    thickness_options: [
      "0.35 mm",
      "0.40 mm",
      "0.45 mm",
      "0.50 mm",
      "0.60 mm",
    ],
    use_cases:
      "Warehouse roofing, factory roofing, industrial sheds, residential covers, retail canopies, and government structures.",
    image_url: "/products/galvalume-roofing-sheets.jpg",
  },
  {
    slug: "puff-roof-panel",
    category_slug: "puff-sheets",
    name: "PUFF Roof Panel",
    description:
      "Insulated PUF roof sandwich panels with polyurethane core — 30 mm and 50 mm options from Metecno India, Alfaa India, and Mount India. Ideal where thermal comfort and a clean exterior line matter.",
    thickness_options: ["30 mm", "50 mm"],
    use_cases:
      "Warehouse roofs, factory shells, cold-storage ancillary roofs, offices, and temperature-sensitive workspaces.",
    image_url: "/products/puff-roof-panel.jpg",
  },
  {
    slug: "puff-wall-panel",
    category_slug: "puff-sheets",
    name: "PUFF Wall Panel",
    description:
      "Matching PUF wall panels for partition and external cladding — align roof and wall systems from one PUF panel supplier with Metecno, Alfaa, or Mount India cores.",
    thickness_options: ["30 mm", "50 mm"],
    use_cases:
      "Industrial halls, clean rooms, site offices, and retail fit-outs across Tamil Nadu.",
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
  {
    slug: "round-gp-pipe",
    category_slug: "steel-products",
    name: "Round GP Pipe",
    description:
      "Round GP Pipes are manufactured from high-quality galvanized steel with a protective zinc coating that provides excellent resistance against rust and corrosion.",
    thickness_options: ["1.0 mm", "1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases:
      "Construction, fencing, roofing, water supply, greenhouse structures, and industrial fabrication.",
    features: [
      "Excellent corrosion resistance",
      "Long service life",
      "Low maintenance",
      "High strength and durability",
      "Easy to fabricate and weld",
      "Suitable for indoor and outdoor applications",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 160931.png",
  },
  {
    slug: "square-gp-pipe",
    category_slug: "steel-products",
    name: "Square GP Pipe",
    description:
      "Square GP Pipes are galvanized steel hollow sections designed for structural strength and durability.",
    thickness_options: ["1.0 mm", "1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases: "Gates, railings, furniture, roofing, and fabrication work.",
    features: [
      "Zinc-coated for corrosion protection",
      "Strong structural support",
      "Smooth surface finish",
      "Lightweight construction",
      "Easy fabrication",
      "Long-lasting performance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 160954.png",
  },
  {
    slug: "rectangular-gp-pipe",
    category_slug: "steel-products",
    name: "Rectangular GP Pipe",
    description:
      "Rectangular GP Pipes provide superior load-bearing capacity and corrosion resistance, making them suitable for industrial sheds, roofing structures, and fabrication projects.",
    thickness_options: ["1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases: "Industrial sheds, roofing structures, and fabricated assemblies.",
    features: [
      "High structural stability",
      "Corrosion-resistant coating",
      "Easy installation",
      "Cost-effective",
      "Durable finish",
      "Suitable for heavy-duty applications",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161013.png",
  },
  {
    slug: "round-ms-pipe",
    category_slug: "steel-products",
    name: "Round MS Pipe",
    description:
      "Round MS Pipes are manufactured from premium mild steel and are widely used in construction, engineering, industrial fabrication, and mechanical applications.",
    thickness_options: ["1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm", "5.0 mm", "6.0 mm"],
    use_cases: "Construction, engineering, fabrication, and mechanical systems.",
    features: [
      "High tensile strength",
      "Easy welding and fabrication",
      "Excellent durability",
      "Cost-effective",
      "Heavy load capacity",
      "Available in multiple sizes",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161031.png",
  },
  {
    slug: "square-ms-pipe",
    category_slug: "steel-products",
    name: "Square MS Pipe",
    description:
      "Square MS Pipes are widely used for structural frameworks, gates, furniture, machinery, and industrial construction due to their superior strength and versatility.",
    thickness_options: ["1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm", "5.0 mm", "6.0 mm"],
    use_cases: "Structural frameworks, gates, furniture, machinery, and industrial construction.",
    features: [
      "Excellent structural performance",
      "Easy machining",
      "High durability",
      "Strong load-bearing capability",
      "Economical solution",
      "Long service life",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161054.png",
  },
  {
    slug: "rectangular-ms-pipe",
    category_slug: "steel-products",
    name: "Rectangular MS Pipe",
    description:
      "Rectangular MS Pipes are ideal for roofing, bridges, industrial buildings, fabrication, and commercial construction projects requiring excellent strength.",
    thickness_options: ["1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm", "5.0 mm", "6.0 mm"],
    use_cases: "Roofing, bridges, industrial buildings, and commercial construction.",
    features: [
      "High mechanical strength",
      "Excellent weldability",
      "Smooth finish",
      "Easy installation",
      "Durable construction",
      "Cost-efficient",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161157.png",
  },
  {
    slug: "round-ss-pipe",
    category_slug: "steel-products",
    name: "Round SS Pipe",
    description:
      "Round Stainless Steel Pipes are manufactured using premium SS grades such as 304 and 316, offering exceptional corrosion resistance and attractive finishes.",
    thickness_options: ["0.8 mm", "1.0 mm", "1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases: "Architectural, hygienic, and industrial fabrication applications.",
    features: [
      "Rust resistant",
      "Hygienic surface",
      "Attractive appearance",
      "Heat resistant",
      "Long service life",
      "Minimal maintenance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161223.png",
  },
  {
    slug: "square-ss-pipe",
    category_slug: "steel-products",
    name: "Square SS Pipe",
    description:
      "Square Stainless Steel Pipes are commonly used in architectural projects, railings, food industries, pharmaceutical plants, and decorative applications.",
    thickness_options: ["0.8 mm", "1.0 mm", "1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases: "Architectural, food, pharmaceutical, and decorative applications.",
    features: [
      "Premium polished finish",
      "Superior corrosion resistance",
      "High durability",
      "Easy cleaning",
      "Strong structural support",
      "Modern appearance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161244.png",
  },
  {
    slug: "rectangular-ss-pipe",
    category_slug: "steel-products",
    name: "Rectangular SS Pipe",
    description:
      "Rectangular Stainless Steel Pipes provide excellent strength and corrosion resistance for industrial, commercial, and decorative applications.",
    thickness_options: ["1.0 mm", "1.2 mm", "1.5 mm", "2.0 mm", "2.5 mm", "3.0 mm", "4.0 mm"],
    use_cases: "Industrial, commercial, and decorative structural applications.",
    features: [
      "Excellent weather resistance",
      "High strength",
      "Attractive finish",
      "Easy fabrication",
      "Long-lasting performance",
      "Low maintenance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161311.png",
  },
  {
    slug: "c-purlin",
    category_slug: "steel-products",
    name: "C Purlin",
    description:
      "C Purlins are cold-formed steel sections widely used as roof and wall support members in industrial buildings, warehouses, and commercial structures.",
    thickness_options: ["1.6 mm", "2.0 mm", "2.5 mm", "3.0 mm"],
    use_cases: "Roof and wall support members for industrial buildings, warehouses, and commercial structures.",
    features: [
      "Lightweight design",
      "High load capacity",
      "Easy installation",
      "Corrosion-resistant options",
      "Cost-effective",
      "Excellent structural performance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161333.png",
  },
  {
    slug: "z-purlin",
    category_slug: "steel-products",
    name: "Z Purlin",
    description:
      "Z Purlins are engineered structural members designed for long-span roofing systems, offering superior strength and efficient load distribution.",
    thickness_options: ["1.6 mm", "2.0 mm", "2.5 mm", "3.0 mm"],
    use_cases: "Long-span roofing systems and structural roof framing.",
    features: [
      "Longer span capability",
      "Reduced structural weight",
      "Excellent durability",
      "Easy overlapping installation",
      "High strength",
      "Low maintenance",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161354.png",
  },
  {
    slug: "steel-plate",
    category_slug: "steel-products",
    name: "Steel Plate",
    description:
      "Steel Plates are flat rolled steel products suitable for construction, fabrication, heavy engineering, pressure vessels, bridges, and industrial machinery.",
    thickness_options: ["2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "8 mm", "10 mm", "12 mm", "15 mm", "20 mm", "25 mm"],
    use_cases: "Construction, fabrication, heavy engineering, pressure vessels, bridges, and industrial machinery.",
    features: [
      "High strength",
      "Excellent durability",
      "Easy fabrication",
      "Wear resistant",
      "Reliable performance",
      "Wide industrial applications",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161414.png",
  },
  {
    slug: "ms-channel",
    category_slug: "steel-products",
    name: "MS Channel",
    description:
      "MS Channels are structural steel sections used in construction, industrial fabrication, machinery supports, warehouses, and infrastructure projects.",
    thickness_options: ["4 mm", "5 mm", "6 mm", "8 mm", "10 mm", "12 mm"],
    use_cases: "Construction, fabrication, machinery supports, warehouses, and infrastructure projects.",
    features: [
      "Strong structural support",
      "Excellent load-bearing capacity",
      "Easy fabrication",
      "Durable construction",
      "Cost-effective",
      "Versatile applications",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161432.png",
  },
  {
    slug: "steel-beam",
    category_slug: "steel-products",
    name: "Steel Beam",
    description:
      "Steel Beams, including I Beams and H Beams, are heavy structural members used in commercial buildings, factories, bridges, warehouses, and infrastructure projects where maximum load-bearing strength is required.",
    thickness_options: ["Web: 5 mm", "Web: 6 mm", "Web: 8 mm", "Web: 10 mm", "Web: 12 mm", "Web: 16 mm", "Web: 20 mm", "Flange: 7 mm", "Flange: 10 mm", "Flange: 12 mm", "Flange: 14 mm", "Flange: 16 mm", "Flange: 18 mm", "Flange: 20 mm", "Flange: 25 mm", "Flange: 30 mm", "Flange: 35 mm"],
    use_cases: "Commercial buildings, factories, bridges, warehouses, and heavy infrastructure.",
    features: [
      "Exceptional structural strength",
      "High load-bearing capacity",
      "Suitable for long spans",
      "Excellent durability",
      "Earthquake-resistant performance",
      "Ideal for heavy construction",
    ],
    image_url: "/steel-products/Screenshot 2026-07-24 161454.png",
  },
];

// Accessories appended at runtime via accessoriesAsProducts() in queries
export { ACCESSORIES_CATALOG, accessoriesAsProducts } from "@/lib/data/accessories-catalog";

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
