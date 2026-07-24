-- Steel Products seed only
-- Run this file to seed the dedicated steel products category and home slider gallery.

insert into public.product_categories (name, slug, description, teaser, sort_order, image_url, images, is_active)
values (
  'Steel Products',
  'steel-products',
  'Project-ready steel materials for fabrication, structural support, cladding and industrial assembly. This catalogue range includes steel sections, plates, flats, channels, angles, pipes and allied steel items that can be sourced and coordinated for site-specific requirements.',
  'Fabrication-ready steel sections, plates, pipes and profiles',
  9,
  '/steel-products/steel-products-category.svg',
  jsonb_build_array(
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 160931.png',
      'alt', 'Structural steel sections and angles',
      'name', 'Structural steel sections',
      'description', 'Angles, channels and beams used for fabricated frames, load-bearing supports and industrial assemblies.',
      'pdf_reference', 'Structural sections',
      'sort_order', 0
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 160954.png',
      'alt', 'Steel plates for fabrication',
      'name', 'Steel plates',
      'description', 'Plate stock for brackets, base plates, custom fabrication and workshop cutting requirements.',
      'pdf_reference', 'Plate stock',
      'sort_order', 1
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161013.png',
      'alt', 'Steel flats and bars',
      'name', 'Flats and bars',
      'description', 'Flat and bar stock for reinforcements, support members and fabrication work that needs precise cut lengths.',
      'pdf_reference', 'Flats & bars',
      'sort_order', 2
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161031.png',
      'alt', 'Mild steel pipes',
      'name', 'Mild steel pipes',
      'description', 'Round pipe material used for structure support work, utility runs and fabrication assemblies.',
      'pdf_reference', 'Pipe range',
      'sort_order', 3
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161054.png',
      'alt', 'ERW pipe range',
      'name', 'ERW pipe options',
      'description', 'Welded pipe options suitable for fabrication and site-ready steel assembly workflows.',
      'pdf_reference', 'ERW pipe',
      'sort_order', 4
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161157.png',
      'alt', 'Hollow steel sections',
      'name', 'Hollow sections',
      'description', 'Square and rectangular hollow sections for frames, supports and light structural assemblies.',
      'pdf_reference', 'Hollow sections',
      'sort_order', 5
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161223.png',
      'alt', 'Fabrication-ready flats',
      'name', 'Fabrication-ready flats',
      'description', 'Ready-to-cut flat stock arranged for workshop fabrication, repairs and custom steel jobs.',
      'pdf_reference', 'Fabrication stock',
      'sort_order', 6
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161244.png',
      'alt', 'Plate cutting support',
      'name', 'Plate cutting support',
      'description', 'Plate material and cutting support for projects that need exact dimensions and fast turnaround.',
      'pdf_reference', 'Plate cutting',
      'sort_order', 7
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161311.png',
      'alt', 'Custom steel profiles',
      'name', 'Custom steel profiles',
      'description', 'Profile references that help with custom fabrication planning and project-specific steel sourcing.',
      'pdf_reference', 'Custom profiles',
      'sort_order', 8
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161333.png',
      'alt', 'Cladding support steel',
      'name', 'Cladding support steel',
      'description', 'Support steel and framing material used alongside roofing and cladding systems.',
      'pdf_reference', 'Support steel',
      'sort_order', 9
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161354.png',
      'alt', 'Industrial assembly steel',
      'name', 'Industrial assembly steel',
      'description', 'Material references aligned to factory and industrial assembly demands for reliable supply coordination.',
      'pdf_reference', 'Industrial range',
      'sort_order', 10
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161414.png',
      'alt', 'Site-ready steel supply planning',
      'name', 'Site-ready steel supply',
      'description', 'Quotation-ready steel references that help contractors plan site delivery and fabrication schedules.',
      'pdf_reference', 'Supply planning',
      'sort_order', 11
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161432.png',
      'alt', 'Steel catalog product reference',
      'name', 'Catalogued product range',
      'description', 'A compact product family view for quick comparison and selection from the broader steel catalogue.',
      'pdf_reference', 'Product reference',
      'sort_order', 12
    ),
    jsonb_build_object(
      'url', '/steel-products/Screenshot 2026-07-24 161454.png',
      'alt', 'Quotation support for steel sourcing',
      'name', 'Quotation-ready sourcing',
      'description', 'Detailed product references and project support for enquiries that need steel sourcing and fabrication coordination.',
      'pdf_reference', 'Quotation support',
      'sort_order', 13
    )
  ),
  true
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  teaser = excluded.teaser,
  sort_order = excluded.sort_order,
  image_url = excluded.image_url,
  images = excluded.images,
  is_active = excluded.is_active;

with steel_cat as (
  select id from public.product_categories where slug = 'steel-products' limit 1
)
insert into public.products (category_id, name, slug, description, thickness_options, use_cases, features, sort_order, image_url, is_active)
select
  steel_cat.id,
  data.name,
  data.slug,
  data.description,
  data.thickness_options,
  data.use_cases,
  data.features,
  data.sort_order,
  data.image_url,
  true
from steel_cat,
  (values
    (
      'Round GP Pipe',
      'round-gp-pipe',
      'Round GP Pipes are manufactured from high-quality galvanized steel with a protective zinc coating that provides excellent resistance against rust and corrosion.',
      array['1.0 mm','1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Construction, fencing, roofing, water supply, greenhouse structures, and industrial fabrication.',
      '["Excellent corrosion resistance", "Long service life", "Low maintenance", "High strength and durability", "Easy to fabricate and weld", "Suitable for indoor and outdoor applications"]',
      1,
      '/steel-products/Screenshot 2026-07-24 160931.png'
    ),
    (
      'Square GP Pipe',
      'square-gp-pipe',
      'Square GP Pipes are galvanized steel hollow sections designed for structural strength and durability.',
      array['1.0 mm','1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Gates, railings, furniture, roofing, and fabrication work.',
      '["Zinc-coated for corrosion protection", "Strong structural support", "Smooth surface finish", "Lightweight construction", "Easy fabrication", "Long-lasting performance"]',
      2,
      '/steel-products/Screenshot 2026-07-24 160954.png'
    ),
    (
      'Rectangular GP Pipe',
      'rectangular-gp-pipe',
      'Rectangular GP Pipes provide superior load-bearing capacity and corrosion resistance, making them suitable for industrial sheds, roofing structures, and fabrication projects.',
      array['1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Industrial sheds, roofing structures, and fabrication projects.',
      '["High structural stability", "Corrosion-resistant coating", "Easy installation", "Cost-effective", "Durable finish", "Suitable for heavy-duty applications"]',
      3,
      '/steel-products/Screenshot 2026-07-24 161013.png'
    ),
    (
      'Round MS Pipe',
      'round-ms-pipe',
      'Round MS Pipes are manufactured from premium mild steel and are widely used in construction, engineering, industrial fabrication, and mechanical applications.',
      array['1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm','5.0 mm','6.0 mm'],
      'Construction, engineering, fabrication, and mechanical applications.',
      '["High tensile strength", "Easy welding and fabrication", "Excellent durability", "Cost-effective", "Heavy load capacity", "Available in multiple sizes"]',
      4,
      '/steel-products/Screenshot 2026-07-24 161031.png'
    ),
    (
      'Square MS Pipe',
      'square-ms-pipe',
      'Square MS Pipes are widely used for structural frameworks, gates, furniture, machinery, and industrial construction due to their superior strength and versatility.',
      array['1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm','5.0 mm','6.0 mm'],
      'Structural frameworks, gates, furniture, machinery, and industrial construction.',
      '["Excellent structural performance", "Easy machining", "High durability", "Strong load-bearing capability", "Economical solution", "Long service life"]',
      5,
      '/steel-products/Screenshot 2026-07-24 161054.png'
    ),
    (
      'Rectangular MS Pipe',
      'rectangular-ms-pipe',
      'Rectangular MS Pipes are ideal for roofing, bridges, industrial buildings, fabrication, and commercial construction projects requiring excellent strength.',
      array['1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm','5.0 mm','6.0 mm'],
      'Roofing, bridges, industrial buildings, and commercial construction.',
      '["High mechanical strength", "Excellent weldability", "Smooth finish", "Easy installation", "Durable construction", "Cost-efficient"]',
      6,
      '/steel-products/Screenshot 2026-07-24 161157.png'
    ),
    (
      'Round SS Pipe',
      'round-ss-pipe',
      'Round Stainless Steel Pipes are manufactured using premium SS grades such as 304 and 316, offering exceptional corrosion resistance and attractive finishes.',
      array['0.8 mm','1.0 mm','1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Architectural, hygienic, and industrial fabrication applications.',
      '["Rust resistant", "Hygienic surface", "Attractive appearance", "Heat resistant", "Long service life", "Minimal maintenance"]',
      7,
      '/steel-products/Screenshot 2026-07-24 161223.png'
    ),
    (
      'Square SS Pipe',
      'square-ss-pipe',
      'Square Stainless Steel Pipes are commonly used in architectural projects, railings, food industries, pharmaceutical plants, and decorative applications.',
      array['0.8 mm','1.0 mm','1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Architectural, food, pharmaceutical, and decorative applications.',
      '["Premium polished finish", "Superior corrosion resistance", "High durability", "Easy cleaning", "Strong structural support", "Modern appearance"]',
      8,
      '/steel-products/Screenshot 2026-07-24 161244.png'
    ),
    (
      'Rectangular SS Pipe',
      'rectangular-ss-pipe',
      'Rectangular Stainless Steel Pipes provide excellent strength and corrosion resistance for industrial, commercial, and decorative applications.',
      array['1.0 mm','1.2 mm','1.5 mm','2.0 mm','2.5 mm','3.0 mm','4.0 mm'],
      'Industrial, commercial, and decorative structural applications.',
      '["Excellent weather resistance", "High strength", "Attractive finish", "Easy fabrication", "Long-lasting performance", "Low maintenance"]',
      9,
      '/steel-products/Screenshot 2026-07-24 161311.png'
    ),
    (
      'C Purlin',
      'c-purlin',
      'C Purlins are cold-formed steel sections widely used as roof and wall support members in industrial buildings, warehouses, and commercial structures.',
      array['1.6 mm','2.0 mm','2.5 mm','3.0 mm'],
      'Roof and wall support members for industrial buildings, warehouses, and commercial structures.',
      '["Lightweight design", "High load capacity", "Easy installation", "Corrosion-resistant options", "Cost-effective", "Excellent structural performance"]',
      10,
      '/steel-products/Screenshot 2026-07-24 161333.png'
    ),
    (
      'Z Purlin',
      'z-purlin',
      'Z Purlins are engineered structural members designed for long-span roofing systems, offering superior strength and efficient load distribution.',
      array['1.6 mm','2.0 mm','2.5 mm','3.0 mm'],
      'Long-span roofing systems and structural roof framing.',
      '["Longer span capability", "Reduced structural weight", "Excellent durability", "Easy overlapping installation", "High strength", "Low maintenance"]',
      11,
      '/steel-products/Screenshot 2026-07-24 161354.png'
    ),
    (
      'Steel Plate',
      'steel-plate',
      'Steel Plates are flat rolled steel products suitable for construction, fabrication, heavy engineering, pressure vessels, bridges, and industrial machinery.',
      array['2 mm','3 mm','4 mm','5 mm','6 mm','8 mm','10 mm','12 mm','15 mm','20 mm','25 mm'],
      'Construction, fabrication, heavy engineering, pressure vessels, bridges, and industrial machinery.',
      '["High strength", "Excellent durability", "Easy fabrication", "Wear resistant", "Reliable performance", "Wide industrial applications"]',
      12,
      '/steel-products/Screenshot 2026-07-24 161414.png'
    ),
    (
      'MS Channel',
      'ms-channel',
      'MS Channels are structural steel sections used in construction, industrial fabrication, machinery supports, warehouses, and infrastructure projects.',
      array['4 mm','5 mm','6 mm','8 mm','10 mm','12 mm'],
      'Construction, fabrication, machinery supports, warehouses, and infrastructure projects.',
      '["Strong structural support", "Excellent load-bearing capacity", "Easy fabrication", "Durable construction", "Cost-effective", "Versatile applications"]',
      13,
      '/steel-products/Screenshot 2026-07-24 161432.png'
    ),
    (
      'Steel Beam',
      'steel-beam',
      'Steel Beams, including I Beams and H Beams, are heavy structural members used in commercial buildings, factories, bridges, warehouses, and infrastructure projects where maximum load-bearing strength is required.',
      array['Web: 5 mm','Web: 6 mm','Web: 8 mm','Web: 10 mm','Web: 12 mm','Web: 16 mm','Web: 20 mm','Flange: 7 mm','Flange: 10 mm','Flange: 12 mm','Flange: 14 mm','Flange: 16 mm','Flange: 18 mm','Flange: 20 mm','Flange: 25 mm','Flange: 30 mm','Flange: 35 mm'],
      'Commercial buildings, factories, bridges, warehouses, and heavy infrastructure.',
      '["Exceptional structural strength", "High load-bearing capacity", "Suitable for long spans", "Excellent durability", "Earthquake-resistant performance", "Ideal for heavy construction"]',
      14,
      '/steel-products/Screenshot 2026-07-24 161454.png'
    )
  ) as data(name, slug, description, thickness_options, use_cases, features, sort_order, image_url)
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  thickness_options = excluded.thickness_options,
  use_cases = excluded.use_cases,
  features = excluded.features,
  sort_order = excluded.sort_order,
  image_url = excluded.image_url,
  is_active = excluded.is_active;
