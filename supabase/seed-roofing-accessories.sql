-- Roofing Accessories seed (run after migration-roofing-accessories.sql)

insert into public.product_categories (name, slug, description, sort_order, image_url)
values (
  'Roofing Accessories',
  'roofing-accessories',
  'Flashings, fasteners, ventilators, sealants, and structural accessories that complete metal roofing and cladding systems across Tamil Nadu.',
  9,
  '/products/roofing-sheets.jpg'
)
on conflict (slug) do nothing;

-- Helper defaults reused across accessories
-- related_items / applications / faqs are CMS-editable after seed

with cat as (
  select id from public.product_categories where slug = 'roofing-accessories' limit 1
),
items (name, slug, short_description, description, sort_order, material, purpose) as (
  values
  ('Ridge Cap', 'ridge-cap', 'Weather-tight ridge closure for metal roofing systems.', 'Ridge caps seal the peak of metal roofs, shedding water while finishing the ridge line on industrial and commercial buildings.', 1, 'Pre-painted / Galvalume steel', 'Close and weatherproof roof ridges'),
  ('Valley Gutter', 'valley-gutter', 'Channel flashings for roof valley junctions.', 'Valley gutters collect and redirect runoff at intersecting roof planes for warehouses, factories, and large-span sheds.', 2, 'Galvalume / GI steel', 'Drain intersecting roof planes'),
  ('Barge Flashing', 'barge-flashing', 'Edge flashing for gable and barge ends.', 'Barge flashings protect roof edges from wind-driven rain and give a clean finish along gable ends.', 3, 'Pre-painted steel', 'Seal barge / gable edges'),
  ('Corner Flashing', 'corner-flashing', 'Corner closures for wall and roof junctions.', 'Corner flashings finish external and internal corners on cladding and roof transitions.', 4, 'Pre-painted / Galvalume steel', 'Seal cladding corners'),
  ('Apron Flashing', 'apron-flashing', 'Wall-to-roof junction flashing.', 'Apron flashings weatherproof the junction where a roof meets a higher wall or parapet.', 5, 'Galvalume / coated steel', 'Waterproof wall–roof junctions'),
  ('Gutter', 'gutter', 'Rainwater collection gutters for metal roofs.', 'Gutters collect roof runoff and feed downpipes — sized for industrial sheds, warehouses, and commercial roofs.', 6, 'GI / colour-coated steel', 'Collect and convey rainwater'),
  ('Down Take Pipe', 'down-take-pipe', 'Vertical downpipes for roof drainage.', 'Down take pipes carry gutter discharge safely to ground drains or collection points.', 7, 'GI / PVC / coated steel', 'Vertical rainwater discharge'),
  ('Turbo Ventilator', 'turbo-ventilator', 'Wind-driven roof exhaust ventilators.', 'Turbo ventilators improve natural ventilation in factories, warehouses, and workshops without powered fans.', 8, 'Aluminium / SS / FRP', 'Natural roof ventilation'),
  ('Ridge Ventilator', 'ridge-ventilator', 'Continuous ridge ventilation units.', 'Ridge ventilators exhaust hot air along the ridge line for large industrial buildings.', 9, 'Galvalume / aluminium', 'Continuous ridge exhaust'),
  ('Self Drilling Screws', 'self-drilling-screws', 'Fasteners for metal roofing and cladding.', 'Self-drilling screws fix sheets to purlins with sealed washers for weather-tight connections.', 10, 'Carbon steel with coating', 'Fix sheets to structure'),
  ('Aluminium Coated Screws', 'aluminium-coated-screws', 'Corrosion-resistant coated fasteners.', 'Aluminium-coated screws suit coastal and high-humidity sites where fastener corrosion is a risk.', 11, 'Aluminium-coated steel', 'Corrosion-resistant fixing'),
  ('Screw Caps', 'screw-caps', 'Protective colour caps for screw heads.', 'Screw caps cover fastener heads for UV protection and a matched colour finish.', 12, 'UV-stabilised polymer', 'Protect and finish screw heads'),
  ('EPDM Washers', 'epdm-washers', 'Sealing washers for roofing fasteners.', 'EPDM washers compress under screw heads to keep fixings watertight through thermal movement.', 13, 'EPDM rubber', 'Seal fastener penetrations'),
  ('Aluminium Tape Roll', 'aluminium-tape-roll', 'Metallic sealing tape for joints and overlaps.', 'Aluminium tape seals overlaps, ducts, and accessory joints on metal roofing systems.', 14, 'Aluminium foil adhesive', 'Seal joints and overlaps'),
  ('Silicon Sealant', 'silicon-sealant', 'Weatherproof silicone for flashing joints.', 'Neutral-cure silicone sealant bonds flashings, gutters, and penetrations against wind and rain.', 15, 'Neutral silicone', 'Seal joints and penetrations'),
  ('Foam Closers', 'foam-closers', 'Profile-matched foam fillers.', 'Foam closers block dust, birds, and weather at eaves, ridges, and profile ends.', 16, 'Closed-cell foam', 'Close profile voids'),
  ('Louvers', 'louvers', 'Ventilation and façade louvers.', 'Louvers provide controlled airflow and weather protection on industrial façades and plant rooms.', 17, 'GI / aluminium', 'Façade & plant ventilation'),
  ('L Angle', 'l-angle', 'L-section structural / cladding angles.', 'L angles support cladding edges, trims, and light structural framing around openings.', 18, 'Mild steel / GI', 'Edge and framing support'),
  ('Z Angle', 'z-angle', 'Z-section purlin and cladding members.', 'Z angles act as secondary members and cladding supports in PEB and shed framing.', 19, 'Cold-formed GI / steel', 'Secondary framing members'),
  ('Cleats', 'cleats', 'Connection cleats for purlins and frames.', 'Cleats connect purlins, rails, and accessories to primary steel with bolted joints.', 20, 'Mild steel / GI', 'Structural connections'),
  ('Sag Rod', 'sag-rod', 'Sag rods for purlin bracing.', 'Sag rods restrain purlin deflection and keep secondary framing true under load.', 21, 'Mild steel rod', 'Control purlin sag'),
  ('Bracing Rod', 'bracing-rod', 'Rod bracing for shed stability.', 'Bracing rods form tension systems that stabilise frames against wind and crane loads.', 22, 'Mild steel / HT rod', 'Frame lateral bracing')
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
  null,
  '[]'::jsonb,
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
    jsonb_build_object('name', 'Turbo Ventilators', 'href', '/products/roofing-accessories/turbo-ventilator', 'image_url', null)
  ),
  i.name || ' | Roofing Accessories · Velzon Coimbatore',
  i.short_description || ' Supply & fabrication support across Tamil Nadu from Velzon Trade Enterprise, Coimbatore.',
  lower(i.name) || ', roofing accessories, Coimbatore, Tamil Nadu, Velzon',
  i.name || ' — Velzon Trade Enterprise',
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
  is_active = true;
