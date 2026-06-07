# PinDealsHub

A modern, responsive Pinterest affiliate marketing website built with Next.js, React, Tailwind CSS, TypeScript, Supabase, and Prisma.

## Features

- Pinterest-style masonry grid with infinite scroll
- 11 product categories with clean SEO URLs
- Product detail pages with pros/cons, affiliate links, and Pinterest sharing
- Admin dashboard with CMS, AI SEO generator, and analytics
- Blog with table of contents and affiliate CTAs
- Dark mode, newsletter popup, and glassmorphism UI
- Full SEO: meta tags, OpenGraph, Twitter Cards, JSON-LD, sitemap, robots.txt
- Google Analytics & Search Console integration
- Affiliate click tracking
- Image compression and drag-and-drop upload
- Supabase authentication with role management

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Database:** PostgreSQL via Supabase + Prisma ORM
- **Auth:** Supabase Auth
- **Deployment:** Vercel-ready

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

The app works out of the box with mock data when Supabase/Database are not configured.

### 3. Set up database (optional)

```bash
npm run db:push
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── [category]/       # Category pages
│   ├── pin/[slug]/       # Product detail pages
│   ├── blog/             # Blog pages
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── admin/            # Admin components
│   ├── blog/             # Blog components
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, Footer, Newsletter
│   ├── pins/             # Pin cards and detail
│   ├── providers/        # Theme, Analytics, Toast
│   └── ui/               # Reusable UI components
├── lib/
│   ├── data/             # Data access layer
│   ├── supabase/         # Supabase clients
│   └── ...               # Utils, SEO, constants
└── types/                # TypeScript types
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Deploy

## Admin Access

Navigate to `/admin` to manage pins, view analytics, and edit CMS content. Configure Supabase auth for production protection.

## License

Private — All rights reserved.
