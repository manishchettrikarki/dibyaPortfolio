-- ============================================================================
-- Portfolio backend schema for Supabase
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- ============================================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ─── updated_at helper ──────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- 1. admin_users  — who is allowed to write content
-- ============================================================================
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "admin can read own row"
  on public.admin_users for select
  using (id = auth.uid());

-- Helper used by every other policy below.
-- security definer so it can read admin_users regardless of caller's RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

-- ============================================================================
-- 2. site_content — singleton row: site config, about, skills, counters, CV
-- ============================================================================
create table if not exists public.site_content (
  id smallint primary key default 1 check (id = 1), -- enforce single row
  name text not null default '',
  role text not null default '',
  tagline text not null default '',
  email text not null default '',
  phone text not null default '',
  location text not null default '',
  social jsonb not null default '[]',       -- SocialLink[]
  about_bio text not null default '',
  short_info jsonb not null default '[]',   -- ShortInfoItem[]
  counters jsonb not null default '[]',     -- CounterItem[]
  skills jsonb not null default '[]',       -- Skill[]
  skill_list jsonb not null default '[]',   -- string[]
  cv_url text,
  cv_filename text,
  updated_at timestamptz not null default now()
);

insert into public.site_content (id) values (1) on conflict (id) do nothing;

alter table public.site_content enable row level security;

create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

create policy "public can read site content"
  on public.site_content for select
  using (true);

create policy "admin can update site content"
  on public.site_content for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 3. experience
-- ============================================================================
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  period text not null default '',
  title text not null default '',
  subtitle text not null default '',
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.experience enable row level security;

create policy "public can read experience"
  on public.experience for select using (true);

create policy "admin can write experience"
  on public.experience for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 4. education (same shape as experience)
-- ============================================================================
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  period text not null default '',
  title text not null default '',
  subtitle text not null default '',
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.education enable row level security;

create policy "public can read education"
  on public.education for select using (true);

create policy "admin can write education"
  on public.education for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 5. testimonials
-- ============================================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text not null default '',
  text text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "public can read testimonials"
  on public.testimonials for select using (true);

create policy "admin can write testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 6. portfolio_items
-- ============================================================================
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  category text not null default '',
  category_label text not null default '',
  type text not null default 'image' check (type in ('image', 'video', 'audio')),
  client text not null default '',
  project_date text not null default '',
  url text,
  image_url text,
  description text not null default '',
  technologies text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;

create policy "public can read portfolio_items"
  on public.portfolio_items for select using (true);

create policy "admin can write portfolio_items"
  on public.portfolio_items for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 7. blogs  (the "news"/blog CRUD)
-- ============================================================================
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  date_label text not null default '',
  category text not null default '',
  author text not null default '',
  read_time text not null default '',
  quote text,
  tags text[] not null default '{}',
  cover_image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

create policy "public can read published blogs"
  on public.blogs for select
  using (published = true or public.is_admin());

create policy "admin can write blogs"
  on public.blogs for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- 8. contact_messages — submissions from the public contact form
-- ============================================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

create policy "admin can read contact messages"
  on public.contact_messages for select
  using (public.is_admin());

create policy "admin can update contact messages"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin can delete contact messages"
  on public.contact_messages for delete
  using (public.is_admin());

-- ============================================================================
-- 9. Storage buckets — CV file + portfolio/blog media
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('cv', 'cv', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "public can read cv bucket"
  on storage.objects for select
  using (bucket_id = 'cv');

create policy "admin can write cv bucket"
  on storage.objects for all
  using (bucket_id = 'cv' and public.is_admin())
  with check (bucket_id = 'cv' and public.is_admin());

create policy "public can read portfolio-media bucket"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "admin can write portfolio-media bucket"
  on storage.objects for all
  using (bucket_id = 'portfolio-media' and public.is_admin())
  with check (bucket_id = 'portfolio-media' and public.is_admin());

-- ============================================================================
-- Done. Next steps (see SETUP.md):
--   1. Create an admin user in Supabase Auth (dashboard > Authentication > Users).
--   2. Insert that user's id/email into public.admin_users.
--   3. Disable public sign-ups in Authentication > Settings.
-- ============================================================================
