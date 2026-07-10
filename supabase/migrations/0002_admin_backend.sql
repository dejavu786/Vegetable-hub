-- Fresh Fields - Admin backend migration
-- Run this once in the Supabase SQL editor, after supabase/schema.sql.
-- Adds the product fields needed for a full listing (type, quality, size,
-- imported/local, gallery), lets logged-in admin accounts manage the
-- catalog under RLS, and sets up a Storage bucket for product photos.

-- ---------------------------------------------------------------------------
-- New product columns
-- ---------------------------------------------------------------------------
alter table public.vegetables
  add column if not exists type text not null default 'vegetable',
  add column if not exists quality text,
  add column if not exists size text,
  add column if not exists is_imported boolean not null default false,
  add column if not exists origin_country text,
  add column if not exists gallery_urls text[] not null default '{}';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'vegetables_type_check'
  ) then
    alter table public.vegetables
      add constraint vegetables_type_check check (type in ('vegetable', 'fruit'));
  end if;
end $$;

comment on column public.vegetables.type is 'vegetable or fruit';
comment on column public.vegetables.quality is 'Free-text grade shown to shoppers, e.g. "Premium", "Grade A"';
comment on column public.vegetables.size is 'Free-text size/pack info, e.g. "Medium", "250g bunch"';
comment on column public.vegetables.is_imported is 'true = imported produce, false = local produce';
comment on column public.vegetables.origin_country is 'Optional country of origin, mainly for imported items';
comment on column public.vegetables.gallery_urls is 'Additional photos beyond the main image_url';

-- ---------------------------------------------------------------------------
-- Admin write access: any logged-in (authenticated) user can manage the
-- catalog. There is no public sign-up anywhere in this app, so the only way
-- to become "authenticated" is an account you create yourself in
-- Supabase Studio -> Authentication -> Users. Public visitors stay read-only
-- via the existing anon "Public can read vegetables" policy.
-- ---------------------------------------------------------------------------
drop policy if exists "Admins can insert vegetables" on public.vegetables;
create policy "Admins can insert vegetables"
  on public.vegetables
  for insert
  to authenticated
  with check (true);

drop policy if exists "Admins can update vegetables" on public.vegetables;
create policy "Admins can update vegetables"
  on public.vegetables
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete vegetables" on public.vegetables;
create policy "Admins can delete vegetables"
  on public.vegetables
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for product photos (cover image + gallery)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');
