# Fresh Fields

Farm-fresh vegetable delivery site for Fresh Fields (DHA Phase 5, Karachi).
Built with Next.js (App Router), Tailwind CSS, and Supabase — deployed on
Vercel.

## Stack

- **Next.js 16** (App Router, React Server Components) — static/ISR pages
  for fast loading, minimal client JS.
- **Tailwind CSS** — utility-first styling, small shipped CSS.
- **Supabase** — Postgres database for the vegetable catalog and newsletter
  sign-ups, accessed with the public anon key under row-level security (no
  service-role key needed anywhere in this app).
- **Vercel** — zero-config deployment target for Next.js.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project at https://supabase.com, then in the SQL
   editor run, in order:
   1. [`supabase/schema.sql`](supabase/schema.sql) — creates the
      `vegetables` and `subscribers` tables, sets up row-level security,
      and seeds a starter catalog.
   2. [`supabase/migrations/0002_admin_backend.sql`](supabase/migrations/0002_admin_backend.sql)
      — adds the admin backend: extra product fields (type, quality, size,
      imported/local, gallery photos), write access for logged-in admins,
      and a `product-images` Storage bucket for photo uploads.

3. Copy the env template and fill in your project's API keys (Project
   Settings → API in the Supabase dashboard):

   ```bash
   cp .env.local.example .env.local
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Without Supabase env vars configured, the site still runs — the
   vegetables catalog shows a friendly "not connected yet" message instead
   of erroring.

## Managing the catalog: the /admin backend

There's now a lightweight admin backend at **`/admin`** — log in and
manage the vegetable/fruit catalog (photos, pricing, quality, size,
imported-vs-local) without touching Supabase Studio. It's built directly
into this Next.js app, backed by Supabase Auth + Postgres RLS (no extra
service or service-role key required).

### One-time setup: create your admin account

There is no public sign-up page (by design). Create your own login in
Supabase Studio:

1. Go to **Authentication → Users → Add user** in your Supabase dashboard.
2. Enter your email and a password, and confirm the user (or enable
   "Auto Confirm User").
3. That's it — any confirmed user in Supabase Auth can sign in at
   `/admin/login` and manage the catalog. Only create accounts for people
   you trust with edit access, since there's no separate roles/permissions
   system — every logged-in user has full admin rights.

### Using it

- `/admin/login` — sign in.
- `/admin` — dashboard with quick stats (total, available, local,
  imported).
- `/admin/products` — full product list: toggle availability/featured
  inline, edit, or delete.
- `/admin/products/new` and `/admin/products/:id/edit` — the product form:
  name, slug, description, type (vegetable/fruit), category, price, unit,
  quality/freshness grade, size, imported vs. local (+ optional origin
  country), cover photo, gallery photos, availability, and featured flag.
  Photos upload straight to a public Supabase Storage bucket
  (`product-images`) from the form.

Changes made in `/admin` show up on the public site within a minute (ISR
`revalidate = 60`) without a redeploy.

### Product columns

| Column | Purpose |
| --- | --- |
| `name`, `slug` | Display name and a unique URL-safe key |
| `description` | Short line shown on the card |
| `price`, `unit` | e.g. `180`, `kg` → "Rs. 180 / kg" |
| `category` | Free text, e.g. `vegetable`, `leafy`, `root` (drives the filter chips on `/vegetables`) |
| `type` | `vegetable` or `fruit` |
| `quality` | Free-text grade shown to shoppers, e.g. "Premium", "Grade A" |
| `size` | Free-text size/pack info, e.g. "Medium", "250g bunch" |
| `is_imported` | Imported produce vs. local — shown as a badge on the product card |
| `origin_country` | Optional, mainly useful for imported items |
| `image_url` | Cover photo. Leave blank to use the built-in placeholder graphic |
| `gallery_urls` | Additional photos beyond the cover image |
| `is_available` | Uncheck to hide from the site instantly |
| `is_featured` | Shown in the homepage "This week's fresh picks" |
| `sort_order` | Lower numbers appear first |

You can still fall back to **Supabase Studio → Table Editor → vegetables**
for bulk edits if that's ever faster than the UI.

## Replacing placeholder imagery

The hero banner, category tile, and vegetable cards currently use inline
SVG placeholder graphics (`components/icons/Illustrations.tsx`) in the
brand palette, since no product photography was available yet. To swap in
real photos:

- Upload images to a public Supabase Storage bucket and set each
  vegetable's `image_url` — cards automatically switch from the placeholder
  icon to `next/image` once `image_url` is set.
- For the hero/banner sections, replace `<HeroIllustration />` /
  `<BannerIllustration />` / `<StoryIllustration />` in
  `components/home/*.tsx` with `next/image` pointed at your real photos.

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it detects Next.js automatically, no config needed.
3. In the Vercel project's Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Every push to the production branch redeploys automatically.

## Performance notes

- Pages are statically generated with a 60s ISR revalidate, so most
  requests are served from Vercel's edge cache rather than hitting
  Supabase per-request.
- Fonts (Playfair Display, Inter) are self-hosted via `next/font` — no
  render-blocking third-party font requests.
- No client-side data fetching library or animation/carousel dependency is
  used; the only client components are the mobile menu, the vegetables
  search/filter, and the newsletter form.

## Known items to revisit

- `npm audit` reports a moderate-severity advisory in a `postcss` version
  bundled *inside* Next.js's own build tooling (not a direct dependency of
  this app). It will clear on a future Next.js patch release — no action
  needed on this project's end.
