-- Roofing Accessories seed (run after migration-roofing-accessories.sql)
-- Images: Velzon-owned labeled placeholders in /public/products/accessories/
-- Do not use competitor product photography.

insert into public.product_categories (name, slug, description, sort_order, image_url)
values (
  'Roofing Accessories',
  'roofing-accessories',
  'Flashings, fasteners, ventilators, sealants, and structural accessories that complete metal roofing and cladding systems across Tamil Nadu.',
  9,
  '/products/accessories/ridge-cap.svg'
)
on conflict (slug) do update set
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order;

-- Remove legacy slug renamed to screws-patta
delete from public.products where slug = 'self-drilling-screws';

with cat as (
  select id from public.product_categories where slug = 'roofing-accessories' limit 1
),
items (name, slug, short_description, description, sort_order, material, purpose, image_url) as (
  values
  ('Ridge Cap', 'ridge-cap', 'Weather-tight ridge closure for metal roofing systems.', 'Ridge caps seal the peak of metal roofs, shedding water while finishing the ridge line on industrial and commercial buildings.', 1, 'Pre-painted / Galvalume steel', 'Close and weatherproof roof ridges', '/products/accessories/ridge-cap.svg'),
  ('Valley Gutter', 'valley-gutter', 'Channel flashings for roof valley junctions.', 'Valley gutters collect and redirect runoff at intersecting roof planes for warehouses, factories, and large-span sheds.', 2, 'Galvalume / GI steel', 'Drain intersecting roof planes', '/products/accessories/valley-gutter.svg'),
  ('Barge Flashing', 'barge-flashing', 'Edge flashing for gable and barge ends.', 'Barge flashings protect roof edges from wind-driven rain and give a clean finish along gable ends.', 3, 'Pre-painted steel', 'Seal barge / gable edges', '/products/accessories/barge-flashing.svg'),
  ('Corner Flashing', 'corner-flashing', 'Corner closures for wall and roof junctions.', 'Corner flashings finish external and internal corners on cladding and roof transitions.', 4, 'Pre-painted / Galvalume steel', 'Seal cladding corners', '/products/accessories/corner-flashing.svg'),
  ('Apron Flashing', 'apron-flashing', 'Wall-to-roof junction flashing.', 'Apron flashings weatherproof the junction where a roof meets a higher wall or parapet.', 5, 'Galvalume / coated steel', 'Waterproof wall–roof junctions', '/products/accessories/apron-flashing.svg'),
  ('Gutter', 'gutter', 'Rainwater collection gutters for metal roofs.', 'Gutters collect roof runoff and feed downpipes — sized for industrial sheds, warehouses, and commercial roofs.', 6, 'GI / colour-coated steel', 'Collect and convey rainwater', '/products/accessories/gutter.svg'),
  ('Down Take Pipe', 'down-take-pipe', 'Vertical downpipes for roof drainage.', 'Down take pipes carry gutter discharge safely to ground drains or collection points.', 7, 'GI / PVC / coated steel', 'Vertical rainwater discharge', '/products/accessories/down-take-pipe.svg'),
  ('Turbo Ventilator', 'turbo-ventilator', 'Wind-driven roof exhaust ventilators.', 'Turbo ventilators improve natural ventilation in factories, warehouses, and workshops without powered fans.', 8, 'Aluminium / SS / FRP', 'Natural roof ventilation', '/products/accessories/turbo-ventilator.svg'),
  ('Ridge Ventilator', 'ridge-ventilator', 'Continuous ridge ventilation units.', 'Ridge ventilators exhaust hot air along the ridge line for large industrial buildings.', 9, 'Galvalume / aluminium', 'Continuous ridge exhaust', '/products/accessories/ridge-ventilator.svg'),
  ('Screws Patta', 'screws-patta', 'Self-drilling fasteners for metal roofing and cladding.', 'Screws patta fix sheets to purlins with sealed washers for weather-tight connections on industrial and commercial roofs.', 10, 'Carbon steel with coating', 'Fix sheets to structure', '/products/accessories/screws-patta.svg'),
  ('Aluminium Coated Screws', 'aluminium-coated-screws', 'Corrosion-resistant coated fasteners.', 'Aluminium-coated screws suit coastal and high-humidity sites where fastener corrosion is a risk.', 11, 'Aluminium-coated steel', 'Corrosion-resistant fixing', '/products/accessories/aluminium-coated-screws.svg'),
  ('Screw Caps', 'screw-caps', 'Protective colour caps for screw heads.', 'Screw caps cover fastener heads for UV protection and a matched colour finish.', 12, 'UV-stabilised polymer', 'Protect and finish screw heads', '/products/accessories/screw-caps.svg'),
  ('EPDM Washers', 'epdm-washers', 'Sealing washers for roofing fasteners.', 'EPDM washers compress under screw heads to keep fixings watertight through thermal movement.', 13, 'EPDM rubber', 'Seal fastener penetrations', '/products/accessories/epdm-washers.svg'),
  ('PET Bolt (L & J Type)', 'pet-bolt', 'L and J type bolts for structural roofing fixings.', 'PET bolts in L and J profiles provide strong, corrosion-resistant fastening for roofing and structural installations.', 14, 'Mild steel / coated steel', 'Structural bolt connections', '/products/accessories/pet-bolt.svg'),
  ('Aluminium Tape Roll', 'aluminium-tape-roll', 'Metallic sealing tape for joints and overlaps.', 'Aluminium tape seals overlaps, ducts, and accessory joints on metal roofing systems.', 15, 'Aluminium foil adhesive', 'Seal joints and overlaps', '/products/accessories/aluminium-tape-roll.svg'),
  ('Silicon Sealant', 'silicon-sealant', 'Weatherproof silicone for flashing joints.', 'Neutral-cure silicone sealant bonds flashings, gutters, and penetrations against wind and rain.', 16, 'Neutral silicone', 'Seal joints and penetrations', '/products/accessories/silicon-sealant.svg'),
  ('Foam Closers', 'foam-closers', 'Profile-matched foam fillers.', 'Foam closers block dust, birds, and weather at eaves, ridges, and profile ends.', 17, 'Closed-cell foam', 'Close profile voids', '/products/accessories/foam-closers.svg'),
  ('Louvers', 'louvers', 'Ventilation and façade louvers.', 'Louvers provide controlled airflow and weather protection on industrial façades and plant rooms.', 18, 'GI / aluminium', 'Façade & plant ventilation', '/products/accessories/louvers.svg'),
  ('L Angle', 'l-angle', 'L-section structural / cladding angles.', 'L angles support cladding edges, trims, and light structural framing around openings.', 19, 'Mild steel / GI', 'Edge and framing support', '/products/accessories/l-angle.svg'),
  ('Z Angle', 'z-angle', 'Z-section purlin and cladding members.', 'Z angles act as secondary members and cladding supports in PEB and shed framing.', 20, 'Cold-formed GI / steel', 'Secondary framing members', '/products/accessories/z-angle.svg'),
  ('Cleats', 'cleats', 'Connection cleats for purlins and frames.', 'Cleats connect purlins, rails, and accessories to primary steel with bolted joints.', 21, 'Mild steel / GI', 'Structural connections', '/products/accessories/cleats.svg'),
  ('Sag Rod', 'sag-rod', 'Sag rods for purlin bracing.', 'Sag rods restrain purlin deflection and keep secondary framing true under load.', 22, 'Mild steel rod', 'Control purlin sag', '/products/accessories/sag-rod.svg'),
  ('Bracing Rod', 'bracing-rod', 'Rod bracing for shed stability.', 'Bracing rods form tension systems that stabilise frames against wind and crane loads.', 23, 'Mild steel / HT rod', 'Frame lateral bracing', '/products/accessories/bracing-rod.svg')
)
insert into public.products (
  category_id, name, slug, description, short_description, use_cases, sort_order, image_url,
  images, description_detail, specifications, colors, profiles, features, applications,
  downloads, related_items, seo_title, meta_description, keywords, alt_text, faqs, is_active
)
select
  cat.id,
  i.name,
  i.slug,
  i.description,
  i.short_description,
  'Industrial sheds, warehouses, factories, PEB buildings, commercial roofs, and residential metal roofing across Tamil Nadu.',
  i.sort_order,
  i.image_url,
  jsonb_build_array(
    jsonb_build_object('url', i.image_url, 'alt', i.name || ' — Velzon Trade Enterprises')
  ),
  jsonb_build_object(
    'overview', i.description,
    'purpose', i.purpose,
    'benefits', 'Site-matched supply from Velzon, compatible with common metal roofing profiles, and finished for industrial weather exposure.',
    'installation', 'Install with compatible fasteners, sealants, and flashings per site drawings. Velzon can advise on accessory packages with sheet supply.',
    'compatibility', 'Designed for use with Galvalume, colour-coated, and related metal roofing / cladding systems.',
    'corrosion_resistance', 'Base materials and coatings selected for typical industrial and coastal Tamil Nadu exposure when correctly specified.',
    'weather_resistance', 'Profiled and sealed to shed rain and resist wind-driven weather at ridges, edges, and penetrations.',
    'industrial_commercial_usage', 'Specified on warehouses, factories, PEB halls, cold stores, workshops, and commercial roofs.'
  ),
  jsonb_build_object(
    'material', i.material,
    'thickness', 'As per project specification',
    'dimensions', 'Cut / supplied to site measures',
    'finish', 'Mill / colour-coated / coated as applicable',
    'coating', 'System-matched coating where applicable',
    'surface_finish', 'Smooth / profiled per accessory type',
    'weight', 'Varies by gauge and length',
    'uv_resistance', 'Suitable for exposed roof applications when specified',
    'weather_resistance', 'Designed for exterior roofing exposure',
    'water_resistance', 'Weather-sealed when installed with correct fasteners and sealants',
    'heat_resistance', 'Suitable for typical roof surface temperatures',
    'fastening', 'Self-drilling screws / cleats / welds as per detail',
    'compatible_roofing_sheets', 'Galvalume, colour-coated, decking, tile-profile, and PUF roof systems',
    'maintenance', 'Periodic inspection of fixings, sealants, and coatings',
    'warranty', 'As per manufacturer / supply terms',
    'manufacturing_standard', 'Industry-standard roofing accessory practice'
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'Bare / Mill', 'hex', '#C0C0C0'),
    jsonb_build_object('name', 'Off White', 'hex', '#F5F2E8'),
    jsonb_build_object('name', 'Blue', 'hex', '#2F5F8A'),
    jsonb_build_object('name', 'Brick Red', 'hex', '#8B3A2A')
  ),
  '[]'::jsonb,
  jsonb_build_array(
    jsonb_build_object('title', 'System matched', 'description', 'Supplied to suit common metal roofing profiles and gauges.', 'icon', 'layers'),
    jsonb_build_object('title', 'Site ready', 'description', 'Cut and packaged for Tamil Nadu project schedules.', 'icon', 'truck'),
    jsonb_build_object('title', 'Weather focused', 'description', 'Details aimed at rain, wind, and thermal movement.', 'icon', 'shield')
  ),
  array[
    'Industrial', 'Commercial', 'Warehouse', 'Factory', 'Residential',
    'PEB', 'Agricultural', 'Cold storage', 'Workshops', 'Parking structures'
  ],
  jsonb_build_object(
    'brochure', '',
    'datasheet', '',
    'installation_guide', '',
    'warranty', ''
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'Roofing Sheets', 'href', '/products/roofing-sheets', 'image_url', '/products/roofing-sheets.jpg'),
    jsonb_build_object('name', 'PUF Panels', 'href', '/products/puff-sheets', 'image_url', '/products/puff-sheets.jpg'),
    jsonb_build_object('name', 'Decking Sheets', 'href', '/products/decking-sheet-gi', 'image_url', '/products/decking-sheet-gi.jpg'),
    jsonb_build_object('name', 'Turbo Ventilators', 'href', '/products/roofing-accessories/turbo-ventilator', 'image_url', '/products/accessories/turbo-ventilator.svg')
  ),
  i.name || ' | Roofing Accessories · Velzon Coimbatore',
  i.short_description || ' Supply & fabrication support across Tamil Nadu from Velzon Trade Enterprises, Coimbatore.',
  lower(i.name) || ', roofing accessories, Coimbatore, Tamil Nadu, Velzon',
  i.name || ' — Velzon Trade Enterprises',
  jsonb_build_array(
    jsonb_build_object(
      'question', 'Do you supply ' || i.name || ' with roofing sheets?',
      'answer', 'Yes. Velzon supplies ' || i.name || ' as part of complete metal roofing accessory packages with sheets and fabrication support across Tamil Nadu.'
    ),
    jsonb_build_object(
      'question', 'Can accessories be matched to sheet colour?',
      'answer', 'Colour-coated flashings and caps can be matched to common roofing shades when specified at enquiry.'
    )
  ),
  true
from cat, items i
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  short_description = excluded.short_description,
  description_detail = excluded.description_detail,
  specifications = excluded.specifications,
  colors = excluded.colors,
  features = excluded.features,
  applications = excluded.applications,
  related_items = excluded.related_items,
  seo_title = excluded.seo_title,
  meta_description = excluded.meta_description,
  keywords = excluded.keywords,
  alt_text = excluded.alt_text,
  faqs = excluded.faqs,
  sort_order = excluded.sort_order,
  image_url = excluded.image_url,
  images = excluded.images,
  category_id = excluded.category_id,
  is_active = true;
