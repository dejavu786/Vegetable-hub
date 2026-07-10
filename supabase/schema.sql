-- Fresh Fields - Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- vegetables: the public catalog shown on the homepage and /vegetables
-- ---------------------------------------------------------------------------
create table if not exists public.vegetables (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  unit text not null default 'kg',
  category text not null default 'vegetable',
  image_url text,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.vegetables is 'Public produce catalog managed directly in Supabase Studio.';

create index if not exists vegetables_available_idx on public.vegetables (is_available, sort_order);
create index if not exists vegetables_featured_idx on public.vegetables (is_featured) where is_featured = true;

alter table public.vegetables enable row level security;

-- Anyone (including anonymous website visitors) can read the catalog.
drop policy if exists "Public can read vegetables" on public.vegetables;
create policy "Public can read vegetables"
  on public.vegetables
  for select
  to anon, authenticated
  using (true);

-- No public insert/update/delete: manage rows via Supabase Studio with your
-- own account, which uses the privileged service role and bypasses RLS.

-- ---------------------------------------------------------------------------
-- subscribers: newsletter sign-ups from the homepage footer form
-- ---------------------------------------------------------------------------
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Visitors can subscribe (insert only) but can never read the list back.
drop policy if exists "Anyone can subscribe" on public.subscribers;
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- seed data so the catalog isn't empty on first run
-- ---------------------------------------------------------------------------
insert into public.vegetables (name, slug, description, price, unit, category, is_featured, sort_order)
values
  ('Desi Tomatoes', 'desi-tomatoes', 'Vine-ripened tomatoes, hand-picked at first light.', 180, 'kg', 'vegetable', true, 1),
  ('Baby Spinach', 'baby-spinach', 'Tender leaves, washed and ready for the pan.', 90, 'bunch', 'leafy', true, 2),
  ('Farm Carrots', 'farm-carrots', 'Sweet, crunchy carrots straight from the field.', 120, 'kg', 'root', true, 3),
  ('Broccoli Crowns', 'broccoli-crowns', 'Firm, deep-green heads packed with flavour.', 220, 'kg', 'vegetable', true, 4),
  ('Bell Peppers (Mixed)', 'bell-peppers-mixed', 'A colourful mix of red, yellow and green peppers.', 260, 'kg', 'vegetable', false, 5),
  ('Green Okra (Bhindi)', 'green-okra-bhindi', 'Young, tender okra picked small for the best bite.', 140, 'kg', 'vegetable', false, 6),
  ('Red Onions', 'red-onions', 'Everyday kitchen staple, sold loose by the kilo.', 100, 'kg', 'root', false, 7),
  ('Potatoes', 'potatoes', 'All-purpose potatoes, great for roasting or curry.', 95, 'kg', 'root', false, 8),
  ('Cauliflower', 'cauliflower', 'Whole heads, tight and creamy-white.', 160, 'kg', 'vegetable', false, 9),
  ('Fresh Coriander', 'fresh-coriander', 'Fragrant coriander bunches cut same morning.', 40, 'bunch', 'leafy', false, 10),
  ('Cucumbers', 'cucumbers', 'Crisp, cooling cucumbers for salads and raita.', 110, 'kg', 'vegetable', false, 11),
  ('Garden Peas', 'garden-peas', 'Sweet peas, shelled or in the pod on request.', 190, 'kg', 'vegetable', false, 12)
on conflict (slug) do nothing;
