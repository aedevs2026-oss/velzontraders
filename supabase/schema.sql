-- Velzon Trade Enterprise — schema + RLS
-- Run in Supabase SQL Editor (Project → SQL → New query)

-- Extensions
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_categories (id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text not null default '',
  thickness_options text[] not null default '{}',
  use_cases text not null default '',
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  caption text not null default '',
  image_url text not null,
  storage_path text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  project_type text not null default '',
  message text not null default '',
  product_name text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_products_category on public.products (category_id);
create index if not exists idx_products_active on public.products (is_active);
create index if not exists idx_categories_active on public.product_categories (is_active);
create index if not exists idx_enquiries_status on public.enquiries (status);
create index if not exists idx_enquiries_created on public.enquiries (created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_categories_updated on public.product_categories;
create trigger trg_categories_updated
  before update on public.product_categories
  for each row execute function public.set_updated_at();

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists trg_enquiries_updated on public.enquiries;
create trigger trg_enquiries_updated
  before update on public.enquiries
  for each row execute function public.set_updated_at();

drop trigger if exists trg_settings_updated on public.settings;
create trigger trg_settings_updated
  before update on public.settings
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────

alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.gallery_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.settings enable row level security;

-- Public read (active rows)
drop policy if exists "Public read active categories" on public.product_categories;
create policy "Public read active categories"
  on public.product_categories for select
  to anon, authenticated
  using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Public read active projects" on public.projects;
create policy "Public read active projects"
  on public.projects for select
  to anon, authenticated
  using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Public read active gallery" on public.gallery_images;
create policy "Public read active gallery"
  on public.gallery_images for select
  to anon, authenticated
  using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Public read settings" on public.settings;
create policy "Public read settings"
  on public.settings for select
  to anon, authenticated
  using (true);

-- Public insert enquiries only
drop policy if exists "Public insert enquiries" on public.enquiries;
create policy "Public insert enquiries"
  on public.enquiries for insert
  to anon, authenticated
  with check (true);

-- Authenticated admin full access
drop policy if exists "Admin all categories" on public.product_categories;
create policy "Admin all categories"
  on public.product_categories for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all products" on public.products;
create policy "Admin all products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all projects" on public.projects;
create policy "Admin all projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin all gallery" on public.gallery_images;
create policy "Admin all gallery"
  on public.gallery_images for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin read enquiries" on public.enquiries;
create policy "Admin read enquiries"
  on public.enquiries for select
  to authenticated
  using (true);

drop policy if exists "Admin update enquiries" on public.enquiries;
create policy "Admin update enquiries"
  on public.enquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin delete enquiries" on public.enquiries;
create policy "Admin delete enquiries"
  on public.enquiries for delete
  to authenticated
  using (true);

drop policy if exists "Admin all settings" on public.settings;
create policy "Admin all settings"
  on public.settings for all
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
-- Storage buckets (run after creating in dashboard,
-- or use the inserts below if storage.buckets is writable)
-- Admin uploads target `media`. Legacy `gallery` kept for old objects.
-- On image replace: update image_url pointer only; keep prior Storage objects.
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
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

drop policy if exists "Public read gallery bucket" on storage.objects;
create policy "Public read gallery bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Admin upload gallery" on storage.objects;
create policy "Admin upload gallery"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

drop policy if exists "Admin update gallery" on storage.objects;
create policy "Admin update gallery"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');

drop policy if exists "Admin delete gallery" on storage.objects;
create policy "Admin delete gallery"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');

-- ─────────────────────────────────────────────
-- Default settings
-- ─────────────────────────────────────────────

insert into public.settings (key, value) values
  ('phone', '9080937360'),
  ('address', 'Coimbatore, Tamil Nadu, India'),
  ('tagline', 'Confidence | Growth | Trust'),
  ('company_name', 'Velzon Trade Enterprise'),
  ('email', '')
on conflict (key) do nothing;
