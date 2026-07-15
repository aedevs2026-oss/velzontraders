-- Seed material categories, products, and fabrication project types
-- Run after schema.sql

-- Categories
insert into public.product_categories (name, slug, description, sort_order, image_url) values
(
  'Roofing Sheets',
  'roofing-sheets',
  'Colour and non-colour galvalume roofing sheets stocked in multiple thicknesses for residential, commercial, and industrial roofs across Coimbatore and beyond.',
  1,
  '/products/roofing-sheets.jpg'
),
(
  'PUFF Sheets',
  'puff-sheets',
  'Insulated PUFF roof and wall panels that balance thermal comfort with structural finish — available as 30 mm and 50 mm roof and wall options.',
  2,
  '/products/puff-sheets.jpg'
),
(
  'Decking Sheet (GI)',
  'decking-sheet-gi',
  'Galvanised iron decking sheets engineered for composite floor and roof deck systems on warehouses, mezzanines, and multi-storey builds.',
  3,
  '/products/decking-sheet-gi.jpg'
),
(
  'Mangalore Tile Sheet',
  'mangalore-tile-sheet',
  'Tile-profile metal sheets that echo classic Mangalore tile silhouettes with the durability of modern coated steel.',
  4,
  '/products/mangalore-tile-sheet.jpg'
),
(
  'Spanish Tile Sheet',
  'spanish-tile-sheet',
  'Spanish-profile metal sheets for residences and light commercial roofs seeking a Mediterranean tile look without heavy clay.',
  5,
  '/products/spanish-tile-sheet.jpg'
),
(
  'Liner Sheet',
  'liner-sheet',
  'Interior liner sheets for false ceilings, wall lining, and underside finishes in industrial and commercial buildings.',
  6,
  '/products/liner-sheet.jpg'
),
(
  'Aluminium Sheet',
  'aluminium-sheet',
  'Lightweight aluminium sheets suited to coastal exposure, façades, and specialty cladding where corrosion resistance matters.',
  7,
  '/products/aluminium-sheet.jpg'
),
(
  'UPVC Sheet',
  'upvc-sheet',
  'UPVC sheets in Spanish and Mangalore tile profiles — light, weather-resistant covering for homes, sheds, and extensions.',
  8,
  '/products/upvc-sheet.jpg'
)
on conflict (slug) do nothing;

-- Products (keyed by category slug)
insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'Colour & Non-colour Galvalume Sheets',
  'galvalume-roofing-sheets',
  'Factory-coated and plain galvalume roofing sheets supplied to your thickness and colour preference. Velzon sources from trusted mills, then cuts and fabricates to site measures for sellers, builders, and end clients.',
  array['0.35 mm','0.40 mm','0.45 mm','0.47 mm','0.50 mm','0.60 mm'],
  'Industrial sheds, warehouses, residential roofs, retail canopies, and government project structures.',
  1,
  '/products/galvalume-roofing-sheets.jpg'
from public.product_categories c where c.slug = 'roofing-sheets'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'PUFF Roof Panel',
  'puff-roof-panel',
  'Insulated roof sandwich panels with polyurethane core for cooler interiors and a clean exterior line. Supplied in 30 mm and 50 mm cores to match climate and span needs.',
  array['30 mm','50 mm'],
  'Cold storage ancillary roofs, offices, warehouses, and temperature-sensitive workspaces.',
  1,
  '/products/puff-roof-panel.jpg'
from public.product_categories c where c.slug = 'puff-sheets'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'PUFF Wall Panel',
  'puff-wall-panel',
  'Matching insulated wall panels for partition and external cladding — align roof and wall systems from a single supply partner.',
  array['30 mm','50 mm'],
  'Industrial halls, clean rooms, site offices, and retail fit-outs.',
  2,
  '/products/puff-wall-panel.jpg'
from public.product_categories c where c.slug = 'puff-sheets'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'GI Decking Sheet',
  'gi-decking-sheet',
  'High-strength GI decking profiles for composite slabs and roof decks. Thickness options cover light mezzanines through heavier industrial loadings.',
  array['0.80 mm','1.0 mm','1.2 mm'],
  'Warehouses, commercial floors, multi-level industrial buildings, and mezzanine platforms.',
  1,
  '/products/gi-decking-sheet.jpg'
from public.product_categories c where c.slug = 'decking-sheet-gi'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'Mangalore Tile Profile Sheet',
  'mangalore-tile-profile',
  'Metal sheets pressed in the familiar Mangalore tile rhythm — heritage curb appeal with faster installation and lower dead load.',
  array['0.45 mm','0.47 mm'],
  'Homes, villa roofs, temples and institutional buildings seeking a traditional silhouette.',
  1,
  '/products/mangalore-tile-profile.jpg'
from public.product_categories c where c.slug = 'mangalore-tile-sheet'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'Spanish Tile Profile Sheet',
  'spanish-tile-profile',
  'Spanish barrel-tile metal sheets that deliver depth and shadow lines without clay tile weight or breakage risk.',
  array['0.45 mm','0.47 mm'],
  'Premium residences, resorts, farms, and feature roofs.',
  1,
  '/products/spanish-tile-profile.jpg'
from public.product_categories c where c.slug = 'spanish-tile-sheet'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'Liner Sheet',
  'liner-sheet-product',
  'Smooth or lightly profiled liner sheets for ceilings and wall interiors — finish the underside of your metal building system.',
  array['0.35 mm','0.40 mm','0.45 mm','0.47 mm','0.50 mm'],
  'Industrial false ceilings, PEB liners, and commercial wall lining.',
  1,
  '/products/liner-sheet-product.jpg'
from public.product_categories c where c.slug = 'liner-sheet'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'Aluminium Sheet 0.71 mm',
  'aluminium-sheet-071',
  'Purpose-grade aluminium sheeting at 0.71 mm for projects that prioritise light weight and corrosion performance.',
  array['0.71 mm'],
  'Coastal installations, façades, canopies, and specialty cladding.',
  1,
  '/products/aluminium-sheet-071.jpg'
from public.product_categories c where c.slug = 'aluminium-sheet'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, thickness_options, use_cases, sort_order, image_url)
select c.id,
  'UPVC Spanish & Mangalore Tile',
  'upvc-tile-sheets',
  'UPVC sheets in Spanish and Mangalore tile profiles. Choose thickness for span, insulation feel, and budget — ideal where metal is not preferred.',
  array['1.5 mm','1.8 mm','2.0 mm','2.5 mm'],
  'Residential extensions, farm sheds, carports, and lightweight commercial covers.',
  1,
  '/products/upvc-tile-sheets.jpg'
from public.product_categories c where c.slug = 'upvc-sheet'
on conflict (slug) do nothing;

-- Fabrication project types (images under public/projects/ — actual filenames only)
insert into public.projects (name, slug, description, sort_order, image_url) values
(
  'Government Projects',
  'government',
  'Specified materials, documented thicknesses, and reliable delivery windows for tenders and public works. Velzon coordinates sourcing and on-site-ready fabrication so project timelines stay intact.',
  1,
  '/projects/photorealistic_industrial_photography_of_a_large_public_sector_building_under.png'
),
(
  'Warehouse Projects',
  'warehouse',
  'Large-span roofing, decking, and insulated panel packages for logistics and manufacturing sheds. We match sheet profiles and gauges to structural drawings and builder schedules.',
  2,
  '/projects/photorealistic_photography_of_a_large_modern_warehouse_exterior_with_a_long.png'
),
(
  'Retail / Work-from-home Projects',
  'retail-work-home',
  'Compact commercial and home-office builds need neat finishes without over-engineering. Velzon supplies scaled roofing and cladding packages suited to shops-in-homes, studios, and small retail extensions.',
  3,
  '/projects/photorealistic_photography_of_a_small_modern_commercial_residential_building.png'
),
(
  'Shops & Franchisee Projects',
  'shops-franchisee',
  'Repeatable material specs for multi-outlet rollouts — brand-consistent colours, profiles, and lead times so franchisees open on schedule across the region.',
  4,
  '/projects/photorealistic_photography_of_a_row_of_retail_storefronts_with_matching_metal.png'
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  image_url = excluded.image_url;

-- Gallery: paths must match files in public/gallery/
-- Clear placeholder SVG rows and prior local /gallery/ seed rows, then re-insert
delete from public.gallery_images
where image_url like '/placeholders/%'
   or image_url like '/gallery/%';

insert into public.gallery_images (title, caption, image_url, sort_order, is_active) values
  ('Warehouse roof package', 'Large-span roofing supply — warehouse segment', '/gallery/warehouse-roof.png', 1, true),
  ('Fabrication panel prep', 'Insulated panel package before dispatch', '/gallery/fabrication-panels.png', 2, true),
  ('Retail canopy finish', 'Colour galvalume canopy — shops & retail', '/gallery/retail-canopy.png', 3, true),
  ('PUFF wall cladding', 'Insulated wall panels on a commercial shell', '/gallery/puff-wall.png', 4, true),
  ('Mangalore tile residence', 'Tile-profile sheet for a villa / WFH build', '/gallery/mangalore-tile-roof.png', 5, true),
  ('GI decking mezzanine', 'Decking laid for a warehouse mezzanine floor', '/gallery/decking-mezzanine.png', 6, true),
  ('Government cladding supply', 'Documented aluminium cladding for public works', '/gallery/government-cladding.png', 7, true),
  ('Franchisee roof cover', 'UPVC tile profile — multi-outlet rollout', '/gallery/shops-franchisee-cover.png', 8, true);
