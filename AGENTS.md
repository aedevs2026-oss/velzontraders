## Token & Usage Optimization Rules

- Before editing, only read the specific files/functions relevant to the task — never scan the whole repo unless explicitly asked to.
- Prefer targeted diffs/patches over rewriting entire files. Only regenerate a full file if more than ~60% of it is changing.
- Don't re-read a file you've already read in this session unless it may have changed.
- Keep explanations short — a 1-3 line summary of what changed and why, not a full walkthrough, unless I ask for detail.
- Don't restate my instructions back to me before acting — just act, then report results briefly.
- Batch related changes into a single edit pass instead of multiple back-and-forth small edits.
- Default to Auto/cheaper model routing for routine tasks (styling tweaks, boilerplate, CRUD scaffolding). Only use a premium/frontier model for genuinely complex logic, architecture decisions, or debugging tricky bugs.
- When scaffolding repetitive structures (e.g. multiple similar CRUD admin pages), generate one clean reference implementation first, confirm it's correct, then replicate the pattern rather than reasoning through each one from scratch.
- Avoid speculative extra features I didn't ask for — implement exactly the scope requested, and suggest extras in one short line rather than building them.
- If a task is ambiguous, ask one short clarifying question instead of generating multiple exploratory versions.

---

## Project Overview

**Velzon Trade Enterprises** — roofing & fabrication materials trading company based in Coimbatore, Tamil Nadu.

- **Stack:** Next.js (App Router), JavaScript (no TypeScript), Tailwind CSS v4, Supabase (Auth, DB, Storage)
- **No** `src/` directory, **no** React Compiler
- **Business model:** Source → fabricate/customize → supply (does **not** manufacture). Also assists with wiring/electrical coordination for house builds.
- **Logo asset:** `public/logo.jpg` (prefer this path; do not assume `.png`)
- **Phone:** +91 96000 65505 / +91 96000 65503 · **Tagline:** Confidence | Growth | Trust · **Est.** 11 June 2024 · **Service area:** Supply & Fabrication Across Tamil Nadu

---

## Brand Palette (CSS variables → Tailwind `@theme`)

Define in `app/globals.css` as `:root` variables and map into `@theme inline` for utility classes.

| CSS (`:root`) | Tailwind utility | Hex | Usage |
| --- | --- | --- | --- |
| `--velzon-ivory` | `bg-ivory` / `text-ivory` | `#FAF8F3` | Page background |
| `--velzon-white` | `bg-white` | `#FFFFFF` | Panels on ivory |
| `--velzon-gold-dark` | `bg-gold-dark` | `#B8860B` | Gradient start, hover |
| `--velzon-gold` | `bg-gold` / `text-gold` | `#D4AF37` | Primary gold mid |
| `--velzon-gold-light` | `bg-gold-light` | `#F0C75E` | Gradient end |
| `--velzon-silver` | `text-silver` | `#9CA3AF` | Crescent accents |
| `--velzon-graphite` | `text-graphite` | `#4B5563` | Secondary text |
| `--velzon-charcoal` | `text-charcoal` | `#1F2937` | Body text |
| `--velzon-ink` | `text-ink` | `#111827` | Headings |

Helper classes: `bg-gradient-gold`, `text-gradient-gold`, `rule-gold`, `font-display` (Cormorant Garamond). Body: Source Sans 3.

**Gradients (named utilities / CSS):**

- `--gradient-gold`: `linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F0C75E 100%)` — CTAs, headings accent, icons, rule lines
- Gold foil feel: use gradient text (`background-clip: text`) sparingly on hero brand/headings only

**Shadows:** soft, warm (`rgba(184, 134, 11, 0.12)`-tinted), not heavy multi-layer SaaS glow.

**Typography:**

- **Display / headings:** high-contrast serif (e.g. `Cormorant Garamond` or `Playfair Display` via `next/font/google`) — evokes engraved logo lettering
- **Body:** clean sans (e.g. `Source Sans 3` or `DM Sans`) — never default Inter/Roboto/Arial stacks for public marketing pages
- Admin can reuse the same fonts at slightly tighter scale

**Theme feel:** light, premium industrial/trading — warm ivory + metallic gold + brushed silver. Avoid flat purple SaaS templates and dark-mode-default looks.

---

## Folder Structure & Naming

```
app/
  layout.js                 # Root layout (fonts, metadata, public shell)
  page.js                   # Home
  about/page.js
  projects/page.js
  products/
    page.js                 # Category grid
    [slug]/page.js         # Product/category detail
  gallery/page.js
  contact/page.js
  admin/
    layout.js               # Admin shell + sidebar (auth-gated)
    login/page.js           # Public within /admin (no sidebar)
    dashboard/page.js
    products/page.js
    projects/page.js
    gallery/page.js
    enquiries/page.js
    settings/page.js
  api/                      # Only if Server Actions are insufficient
components/
  layout/                   # Navbar, Footer, MobileNav, Container
  home/                     # Home-section components
  products/                 # Product cards, filters
  admin/                    # AdminSidebar, DataTable wrappers, forms
  ui/                       # Shared primitives (Button, Input, SectionHeading)
lib/
  supabase/
    client.js               # Browser client (createBrowserClient)
    server.js               # Server client (createServerClient + cookies)
    admin.js                # Optional service helpers (server-only)
  data/                     # Fetch helpers (products, projects, etc.)
  constants.js              # Site defaults, project-type slugs, status enums
middleware.js               # Protect /admin/* except /admin/login
supabase/
  schema.sql                # Full schema + RLS + seed defaults
  seed.sql                  # Optional product/category seed data
public/
  logo.jpg                  # Brand logo (OG/SEO images reference this)
  placeholders/             # Labeled placeholder images until real photos land
```

**Naming conventions:**

- Files/folders: `kebab-case` routes; components `PascalCase.js`
- Product/project slugs: `kebab-case` matching DB `slug` column
- Prefer **Server Components** by default; `"use client"` only for interactive UI (forms, mobile nav, filters, admin CRUD)
- Mutations: **Server Actions** in `app/admin/*/actions.js` (or colocated `actions.js`) — avoid gratuitous API routes
- Imports: use `@/` alias (`@/components/...`, `@/lib/...`)

---

## Component Patterns

- **Container:** max-width wrapper (`max-w-6xl` / `max-w-7xl`) + horizontal padding for all public sections
- **SectionHeading:** serif title + optional gold rule underline + short supporting sentence
- **Button:** primary = gold gradient fill + dark text; secondary = silver/graphite outline; ghost for tertiary
- **Cards:** allowed for project types, product tiles, and interactive/admin surfaces — keep elevation soft; no cards in hero
- **Hero:** logo + brand, tagline, one short line, CTA group (Get a Quote / Call Now) — no stats/schedules clutter
- Placeholders: use `public/placeholders/*` with descriptive filenames until real assets arrive

---

## SEO (Local / Coimbatore)

Root `app/layout.js` (and page-level overrides) should include:

- Title pattern: `Velzon Trade Enterprises | Roofing & Fabrication Materials · Coimbatore`
- Meta description mentioning Coimbatore, Tamil Nadu, roofing/fabrication supply
- `openGraph` / `twitter` images pointing at `/logo.jpg`
- `metadataBase` set to the production URL when known
- JSON-LD `LocalBusiness` / `Organization` on Home (name, phone, address region Coimbatore, logo `/logo.jpg`)
- Prefer accessible `alt` text on logo: “Velzon Trade Enterprises — Coimbatore”

---

## Supabase Setup

### Packages

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Environment

Copy `.env.local.example` → `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Never commit `.env.local`. No public signup — admin users are created manually.

### Clients

| File | Use |
| --- | --- |
| `lib/supabase/client.js` | Client Components only |
| `lib/supabase/server.js` | Server Components, Server Actions, Route Handlers |
| Middleware | Refresh session cookies; gate `/admin/*` |

Pattern: `@supabase/ssr` `createBrowserClient` / `createServerClient` with Next.js cookies API (App Router).

### Schema (`supabase/schema.sql`)

Tables (minimum):

| Table | Purpose |
| --- | --- |
| `product_categories` | Material category (name, slug, description, image, sort, active) |
| `products` | SKUs under a category (name, slug, description, thickness options JSON/array, image, category_id, active) |
| `projects` | Fabrication project types (4 rows: government, warehouse, retail-work-home, shops-franchisee) |
| `gallery_images` | Gallery (storage path/url, caption, sort, active) |
| `enquiries` | Contact form (name, phone, project_type, message, product_name?, status) |
| `settings` | Key/value site settings (phone, address, tagline, etc.) |

**Thickness options:** store as `text[]` or JSONB array of strings (e.g. `["0.35 mm","0.40 mm"]`).

**Enquiry status enum:** `new` | `contacted` | `closed`

### RLS Policies

| Resource | Anon (public) | Authenticated (admin) |
| --- | --- | --- |
| `product_categories`, `products`, `projects`, `gallery_images`, `settings` | SELECT where active / publishable | ALL |
| `enquiries` | INSERT only | SELECT, UPDATE, DELETE |
| Storage `media` bucket (primary) | public read | authenticated upload/update/delete |
| Storage `gallery` bucket (legacy) | public read | authenticated upload/update/delete |

### Running migrations

1. Create a Supabase project
2. In SQL Editor, run `supabase/schema.sql` (then `supabase/seed.sql` if present)
3. Create Storage bucket `media` (public read); optional legacy `gallery` bucket
4. Auth → create first admin user (email/password) — **no** open registration on the site
5. Fill `.env.local` and restart `npm run dev`
6. For existing DBs: run `supabase/migration-media.sql` (media policies + local image_url seed)

### Creating the first admin user

1. Supabase Dashboard → Authentication → Users → Add user
2. Set email + password; confirm email if required by project settings
3. Log in at `/admin/login` — middleware redirects unauthenticated users from `/admin/*`

---

## Public Content Rules

- Write **original** marketing copy; specs (thickness lists, panel sizes) are the only factual data source
- Material categories and products are **Supabase-managed** on public pages (placeholder data only until schema is wired)
- Fabrication project types (always these four): Government · Warehouse · Retail / Work-from-home · Shops & Franchisee
- Contact form writes to `enquiries`; CTAs deep-link with pre-filled product name when coming from product pages

---

## Admin Conventions

- Utilitarian ivory/gold theme (same tokens, denser layout, sidebar nav)
- CRUD reference: build **products** first, then replicate pattern for projects → gallery → enquiries → settings
- Images: Supabase Storage bucket `media`; store public URL on `image_url`
- Image replace: update `image_url` pointer only — keep prior Storage objects (simpler than delete-on-replace)
- Local `public/products/*` paths are ok for seeded/dev assets shipped with the app; admin uploads always go to Storage
- Logout via Supabase Auth `signOut` then redirect to `/admin/login`

---

## Build Status Checklist

- [x] Step 1 — AGENTS.md conventions (this file)
- [x] Step 2 — Tailwind theme + typography in `globals.css` / root layout
- [x] Step 3 — Supabase clients + `schema.sql` + `.env.local.example`
- [x] Step 4 — Shared layout: Navbar, Footer, MobileNav, Container
- [x] Step 5 — Public pages (placeholder data → wire Supabase)
- [x] Step 6 — Admin auth + layout/sidebar
- [x] Step 7 — Admin CRUD (products → projects → gallery → enquiries → settings)
- [x] Step 8 — Responsive / a11y pass (gold-on-white contrast)

**Images:** product/category photos live under `public/products/` (seeded into `image_url`) or via admin upload to Storage `media`. Projects without photos use a labeled gray placeholder — do not use stock/Unsplash stand-ins. Logo is at `public/logo.jpg`.

**Go-live:** copy `.env.local.example` → `.env.local`, run `supabase/schema.sql` then `supabase/seed.sql`, run `supabase/migration-media.sql` if the project already existed, create an Auth user, ensure public Storage bucket `media` exists.
