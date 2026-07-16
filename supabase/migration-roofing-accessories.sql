-- Roofing Accessories: rich product CMS columns + category
-- Run in Supabase SQL Editor after schema.sql (safe to re-run)

alter table public.products
  add column if not exists short_description text not null default '',
  add column if not exists images jsonb not null default '[]'::jsonb,
  add column if not exists description_detail jsonb not null default '{}'::jsonb,
  add column if not exists specifications jsonb not null default '{}'::jsonb,
  add column if not exists colors jsonb not null default '[]'::jsonb,
  add column if not exists profiles jsonb not null default '[]'::jsonb,
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists applications text[] not null default '{}',
  add column if not exists downloads jsonb not null default '{}'::jsonb,
  add column if not exists related_items jsonb not null default '[]'::jsonb,
  add column if not exists seo_title text not null default '',
  add column if not exists meta_description text not null default '',
  add column if not exists keywords text not null default '',
  add column if not exists alt_text text not null default '',
  add column if not exists faqs jsonb not null default '[]'::jsonb;

insert into public.product_categories (name, slug, description, sort_order, image_url)
values (
  'Roofing Accessories',
  'roofing-accessories',
  'Flashings, fasteners, ventilators, sealants, and structural accessories that complete metal roofing and cladding systems across Tamil Nadu.',
  9,
  '/products/accessories/ridge-cap.svg'
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  image_url = coalesce(public.product_categories.image_url, excluded.image_url);
