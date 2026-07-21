# Portfolio Website

A personal portfolio site built with **Next.js 16** and **Supabase**, with a
full admin dashboard for managing every piece of content — site info, about,
skills, experience, education, testimonials, portfolio projects, blog posts,
CV, and contact messages — without touching code.

The app is single-tenant by design (one site, one admin, one Supabase
project), which makes it easy to reuse: point a fresh deployment of this
same codebase at a new, independent Supabase project and you get a
completely separate portfolio site with its own content and its own admin
login — no shared data, no forking required.

## Tech stack

- **Next.js 16** (App Router, Turbopack, Server Actions)
- **Tailwind CSS v4**
- **Supabase** — Postgres database, Auth (email/password), Storage (CV +
  media uploads), Row Level Security
- `@supabase/ssr` for server/browser Supabase clients

## Features

- Public site: home, about, portfolio, blog, contact — all content-driven
- Admin dashboard with full CRUD for every section
- Image uploads for portfolio projects, blog covers, and profile picture
- CV upload, instantly downloadable from the site
- Contact form submissions saved to a database inbox
- Auth-gated admin routes, backed by Postgres Row Level Security as the
  real enforcement layer (not just app-level checks)

## Project structure

```
src/
  app/
    (pages)/            → public site routes (home, about, portfolio, blog, contact)
    admin/login/         → admin login (Supabase Auth)
    admin/dashboard/      → protected admin dashboard (one folder per content section)
    api/contact/           → public contact form endpoint → Supabase
  components/
    views/                → public-facing sections (home, about, portfolio, blogs, contact)
    admin/                 → reusable admin CRUD list managers
  lib/
    supabase/              → browser/server Supabase clients + session proxy
    data/                  → typed data-access layer (one file per entity)
    auth.ts                → requireAdmin() guard used by every write action
  utils/
    usePortfolioContent.tsx → client provider that loads all public content from Supabase
    constants.ts            → static fallback content (used only if Supabase is unreachable)
  proxy.ts                 → Next.js proxy (session refresh + route protection)
supabase/
  migrations/               → SQL schema, run in order against a Supabase project
```

## Security model

- `src/proxy.ts` refreshes the Supabase session and redirects unauthenticated
  visitors away from `/admin/dashboard/*`.
- Every server action that writes data calls `requireAdmin()`
  (`src/lib/auth.ts`), which re-checks the session **and** admin membership.
- Row Level Security in Postgres is the real backstop: the database itself
  refuses writes from anyone not explicitly listed as an admin, regardless
  of application-level bugs. Storage buckets are public-read, admin-write
  under the same policy.
- The Supabase anon key is safe to expose client-side by design — RLS means
  it alone can never write data.

## Getting started

1. Create a Supabase project.
2. Run the SQL files in `supabase/migrations/` (in order) in its SQL Editor.
3. Create your admin user in Authentication → Users, then add their user ID
   to `public.admin_users`.
4. Copy `.env.example` to `.env.local` and fill in your project's URL and
   anon key.
5. Install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

Public site: `/` · Admin login: `/admin/login` · Dashboard: `/admin/dashboard`

See `SETUP.md` for the full walkthrough, including reusing this repo for
additional independent deployments.

## License

Add a license of your choice if you intend for others to reuse this template.
