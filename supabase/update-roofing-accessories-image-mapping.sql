-- Update roofing accessory products to use local accessory image filenames
-- Run this in Supabase SQL Editor after the roofing accessories data is present.

update public.product_categories
set image_url = '/accessories/1784260568694-z5755wnv.png'
where slug = 'roofing-accessories';

with mappings (slug, image_url) as (
  values
  ('ridge-cap', '/accessories/1784260568694-z5755wnv.png'),
  ('valley-gutter', '/accessories/1784260861458-wtcrtwom.jpg'),
  ('barge-flashing', '/accessories/1784362559510-k06dz7qo.png'),
  ('corner-flashing', '/accessories/1784362743294-pdl55ba0.png'),
  ('apron-flashing', '/accessories/1784362993894-d3zd5uxb.png'),
  ('gutter', '/accessories/1784363025811-5oq4lzhr.png'),
  ('down-take-pipe', '/accessories/1784363052194-21h45gqi.png'),
  ('turbo-ventilator', '/accessories/1784363077656-9cmi00fb.png'),
  ('ridge-ventilator', '/accessories/1784363171577-33kg5ijs.png'),
  ('screws-patta', '/accessories/1784363282970-bn130xit.png'),
  ('aluminium-coated-screws', '/accessories/1784363311555-np8jdxrf.png'),
  ('screw-caps', '/accessories/1784363346093-vx6rilsc.png'),
  ('epdm-washers', '/accessories/1784363373859-kwg5g72z.png'),
  ('pet-bolt', '/accessories/1784363422146-gdw1fw0q.png'),
  ('aluminium-tape-roll', '/accessories/1784363473318-tx7i2joq.png'),
  ('silicon-sealant', '/accessories/1784363655957-86v2caei.png'),
  ('foam-closers', '/accessories/1784363889773-oaz0dkws.png'),
  ('louvers', '/accessories/1784363957889-4g99ehnr.webp'),
  ('l-angle', '/accessories/1784364076812-gdr4mwzt.jpg'),
  ('z-angle', '/accessories/1784364149945-3i0mcpsc.jpg'),
  ('cleats', '/accessories/1784364223644-sz36ikur.webp'),
  ('sag-rod', '/accessories/1784364284050-jxsfl8cr.jpg'),
  ('bracing-rod', '/accessories/1784364412106-1zyrbciu.png')
)
update public.products p
set
  image_url = m.image_url,
  images = jsonb_build_array(
    jsonb_build_object(
      'url', m.image_url,
      'alt', coalesce(nullif(p.alt_text, ''), p.name || ' — Velzon Trade Enterprises')
    )
  )
from mappings m, public.product_categories c
where c.id = p.category_id
  and c.slug = 'roofing-accessories'
  and p.slug = m.slug;
