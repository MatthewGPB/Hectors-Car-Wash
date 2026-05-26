# Hector's Car Wash — hectorcarwash.com

Astro 5 + Tailwind 4 + Vercel. Built to win Palm Beach County local SEO for North Palm Beach, Jupiter, and Riviera Beach.

---

## Quick start

### Requirements
- Node 22 or higher (`node --version` to check)
- npm, pnpm, or yarn

### First-time setup

```bash
# Clone or extract this project, then:
cd hectors-carwash
npm install
npm run dev
```

Open http://localhost:4321 — you'll see the homepage live.

### Available commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project structure

```
hectors-carwash/
├── public/                          ← static assets (favicon, robots.txt)
├── src/
│   ├── components/                  ← reusable .astro components
│   │   ├── Announcement.astro
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── TrustStrip.astro
│   │   ├── Story.astro
│   │   ├── Locations.astro
│   │   ├── Services.astro
│   │   ├── Pricing.astro
│   │   ├── Reviews.astro
│   │   ├── FinalCTA.astro
│   │   ├── Footer.astro
│   │   └── SectionHead.astro
│   ├── data/                        ← ALL editable content lives here
│   │   ├── site.json                ← brand, phones, social
│   │   ├── locations.json           ← addresses, hours, geo
│   │   ├── pricing.json             ← wash tiers and memberships
│   │   └── reviews.json             ← Google reviews
│   ├── layouts/
│   │   └── BaseLayout.astro         ← head, meta, schema, footer
│   ├── lib/
│   │   └── schema.ts                ← JSON-LD generator
│   ├── pages/                       ← each file = a route
│   │   ├── index.astro              ← /
│   │   ├── 404.astro
│   │   └── locations/[slug].astro   ← /locations/north-palm-beach, etc
│   └── styles/
│       └── global.css               ← Tailwind + brand tokens
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json                      ← 301 redirects from old Shopify URLs
```

---

## Editing content — for non-developers

**99% of your content lives in `src/data/` as JSON files.** No code knowledge needed.

### Change a phone number, address, or hours

1. Open `src/data/locations.json`
2. Find the location (look for `"slug": "north-palm-beach"`)
3. Edit the field you want — `phone`, `hours.monSat`, `address.street`, etc.
4. Save. The dev server hot-reloads instantly. The change appears everywhere on the site automatically — homepage cards, location pages, schema, footer, all of it.

### Update pricing

Edit `src/data/pricing.json`. Two menus: `handwash` (NPB + Riviera) and `machine` (Jupiter). Change `price`, add or remove tiers, edit includes — all reflects on the homepage and the relevant location pages.

### Add a real Google review

Edit `src/data/reviews.json`. Copy the existing pattern:

```json
{
  "id": "unique-slug",
  "author": "First Last",
  "source": "Google Reviews · 4 reviews",
  "rating": 5,
  "featured": true,
  "quote": "The actual review text from Google.",
  "location": "north-palm-beach"
}
```

Set `featured: true` if you want it on the homepage. Set `location` to control which location page it shows under. The 3 most recent featured reviews appear on the homepage.

### Change a phone number on the entire site at once

In `src/data/site.json`, update `primary.phone` and `primary.phoneE164`. This propagates to: footer, schema, nav CTAs, click-to-call links.

### Toggle the announcement bar

In `src/data/site.json`:
```json
"announcement": {
  "show": true,         ← set false to hide the bar
  "badge": "Now open",
  "message": "Riviera Beach location now welcoming walk-ins at 2520 Broadway",
  "link": "/locations/riviera-beach"
}
```

### Edit hero, story, services copy

These live inside the components (`src/components/Hero.astro`, etc) — they're written in plain HTML between `---` markers. To edit:
1. Open the component file
2. Find the text (it's plain HTML, no special syntax needed for text changes)
3. Change it, save

You can do this directly through GitHub's web editor without ever opening VS Code — just navigate to the file on github.com, click the pencil icon, edit, click commit.

---

## Editing content through GitHub (no local setup needed)

After deploying to Vercel and pushing to GitHub, anyone with repo access can edit content without a local development environment:

1. Go to `github.com/your-username/hectors-carwash`
2. Navigate to `src/data/locations.json` (or whichever file)
3. Click the pencil icon
4. Edit in the browser
5. Scroll down, click "Commit changes"
6. Vercel auto-deploys within 60 seconds

This is the "Hector or his manager can edit the site" workflow.

---

## Deploying to Vercel

### Initial deployment

1. Push this project to a GitHub repo (`git init`, commit, push)
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Vercel auto-detects Astro — just click "Deploy"
5. First deploy takes about 60 seconds

You'll get a URL like `hectors-carwash.vercel.app` immediately.

### Connecting the production domain

Once you're happy with the preview:

1. In Vercel project settings → Domains → Add `hectorcarwash.com`
2. Vercel gives you DNS records to set (an A record and a CNAME)
3. Update those in your domain registrar's DNS settings
4. SSL provisions automatically within ~10 minutes
5. The Shopify site goes dark the moment DNS propagates — your Astro site replaces it

**Important:** the `vercel.json` file in this project already has 301 redirects from the old Shopify URLs (`/pages/north-palm-beach` → `/locations/north-palm-beach`, etc) so existing Google rankings transfer cleanly.

---

## SEO checklist for post-deploy

In order of priority:

- [ ] Submit `https://hectorcarwash.com/sitemap-index.xml` to Google Search Console
- [ ] Submit each new location URL via Search Console URL Inspection → Request Indexing
- [ ] Validate JSON-LD schema at https://search.google.com/test/rich-results
- [ ] Run a PageSpeed audit at https://pagespeed.web.dev — Astro static sites typically score 95+
- [ ] Update Google Business Profile for each location to point to the new URLs
- [ ] Apply for Riviera Beach Google Business Profile if not already submitted
- [ ] Update Instagram bio with canonical phone numbers
- [ ] Update Yelp, Facebook, Apple Maps, Bing Places, Nextdoor with consistent NAP

---

## What's NOT included that you should add

- **Real photography** — currently using brand-color gradients as placeholders. Story image is a styled gradient with overlay.
- **Open Graph image** (`/public/og-image.jpg`) — currently referenced but not created. Generate a 1200×630 image with the logo on the navy background, save to `public/og-image.jpg`.
- **About page** (`/about` is referenced in nav but not created yet — coming next)
- **Service pillar pages** (`/services/ceramic-coating`, etc — not yet built; homepage `#services` jump-links work for now)
- **Blog** — the content engine is part of the overhaul plan but not in this initial build
- **Google Business Profile review pull** — currently using static review data. Can be replaced with a live pull via the Google Places API later.

---

## Why Astro for this site

- **Static HTML output:** every page is pre-rendered at build time. Page loads are nearly instant.
- **Near-zero JavaScript:** only the pricing tabs and announcement use any client JS. Better Core Web Vitals = better local SEO.
- **No editor strips your code** (looking at you, Shopify).
- **Built-in image optimization** via Vercel's image service.
- **Free hosting** on Vercel for a site this size.
- **Git-native workflow:** every change is version-controlled, every deploy is a rollback-able event.

---

## Support / troubleshooting

**Build errors:** Run `npm run build` locally before pushing — it'll catch issues early.

**Type errors in IDE:** Run `npm run astro -- sync` to regenerate Astro's TypeScript types after content changes.

**Styles not applying:** Make sure `global.css` is imported in `BaseLayout.astro` (it already is).

**Calendly not loading:** Verify the URL in `src/data/site.json` `primary.calendly`.
