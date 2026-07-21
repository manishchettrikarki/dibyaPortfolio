-- Adds a dashboard-editable profile picture, matching the CV pattern.
alter table public.site_content
  add column if not exists profile_image_url text;