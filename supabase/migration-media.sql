-- Velzon — media bucket + local product image seed
-- Review before running in Supabase SQL Editor.
-- image_url already exists on products, product_categories, projects, gallery_images.

-- ─────────────────────────────────────────────
-- Storage: public `media` bucket (admin upload target)
-- Keeps existing `gallery` bucket for any legacy objects.
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media bucket" on storage.objects;
create policy "Public read media bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "Admin upload media" on storage.objects;
create policy "Admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Admin update media" on storage.objects;
create policy "Admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "Admin delete media" on storage.objects;
create policy "Admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ─────────────────────────────────────────────
-- One-time: map public/products/* → image_url when empty
-- Only sets rows with no image yet (won't overwrite admin uploads).
-- ─────────────────────────────────────────────

-- Categories (slug ↔ filename)
update public.product_categories
set image_url = '/products/' || slug || '.jpg'
where slug in (
  'roofing-sheets',
  'puff-sheets',
  'decking-sheet-gi',
  'mangalore-tile-sheet',
  'spanish-tile-sheet',
  'liner-sheet',
  'aluminium-sheet',
  'upvc-sheet'
)
and (image_url is null or image_url = '');

-- Products (slug ↔ filename)
update public.products
set image_url = '/products/' || slug || '.jpg'
where slug in (
  'galvalume-roofing-sheets',
  'puff-roof-panel',
  'puff-wall-panel',
  'gi-decking-sheet',
  'mangalore-tile-profile',
  'spanish-tile-profile',
  'liner-sheet-product',
  'aluminium-sheet-071',
  'upvc-tile-sheets'
)
and (image_url is null or image_url = '');

-- Projects: local files under public/projects/
update public.projects
set image_url = case slug
  when 'government' then '/projects/photorealistic_industrial_photography_of_a_large_public_sector_building_under.png'
  when 'warehouse' then '/projects/photorealistic_photography_of_a_large_modern_warehouse_exterior_with_a_long.png'
  when 'retail-work-home' then '/projects/photorealistic_photography_of_a_small_modern_commercial_residential_building.png'
  when 'shops-franchisee' then '/projects/photorealistic_photography_of_a_row_of_retail_storefronts_with_matching_metal.png'
  else image_url
end
where slug in ('government', 'warehouse', 'retail-work-home', 'shops-franchisee');
