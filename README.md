# Hector's Car Wash — hectorcarwash.com (v2)

A complete editorial rebuild of hectorcarwash.com. Astro 5 + Tailwind 4 + Vercel.

**7 pages**, ~3,500 lines of code, built to win Palm Beach County local SEO and look nothing like a generic service-business landing page.

---

## What's in this build

### Pages
- `/` — Homepage with the "two pillars" positioning
- `/locations/north-palm-beach` — Hand wash menu, NPB story, real reviews
- `/locations/jupiter` — Express wash, four differentiators, memberships
- `/locations/riviera-beach` — Hand wash, "Now open" energy
- `/services/car-detailing` — 2,000+ words, 8 FAQs with schema, Calendly CTA
- `/services/ceramic-coating` — 2,000+ words, 10 FAQs with schema, 3 tiers
- `/about` — 5-chapter editorial story + 30-year timeline
- `/reviews` — All 5 Google reviews in editorial grid
- `/404` — Branded not-found page

### Strategic decisions (locked into the copy)

1. **Brand positioning: "Real car care, not luxury exclusively"** — Bentleys come because the work is good, not because the brand is exclusive. No more "white-glove" language. No more "for your finest vehicle."

2. **Hand wash vs. machine wash tension resolved** — Two equal pillars, not better/worse. The "automatic washes scratch paint" line is dead. New framing: "Two ways to keep your car right. Pick the one that fits your week."

3. **Jupiter's four real differentiators** — Owner-operated, hand prep before conveyor, local family business, human inspection at dry-off. All four appear on the Jupiter location page. Tagline: *"The express wash with hands on it. Every car checked before you drive away."*

4. **Visual direction: Old Florida coastal editorial** — Asymmetric layouts (no centered hero), Fraunces italic display type, drop caps, gold horizontal rule ornaments, numbered table-of-contents service lists (not card grids), subtle paper texture. Differentiated specifically from growpalmbeach.com aesthetic.

5. **SEO architecture** — Service pages exist as separate URLs (`/services/car-detailing`, `/services/ceramic-coating`) because they target different keyword clusters with different intent. Each has FAQ schema. Each has 2,000+ words of original copy.

---

## Quick start

### Requirements
- Node 22+
- npm, pnpm, or yarn

### Install + run

```bash
unzip hectors-astro-v2.zip
cd hectors-astro-v2
npm install
npm run dev
```

Open http://localhost:4321. Every page should render. Test navigation, the pricing tabs on location pages, the FAQ accordions, all internal links.

### Available commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload at localhost:4321 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Editing content — no code skills needed

### Where everything lives

All editable content is in `src/data/` as plain JSON files. Edit them directly through GitHub's web UI without ever opening a code editor:

| File | What's in it |
|---|---|
| `site.json` | Brand name, primary phone, Calendly URL, social links, announcement bar |
| `locations.json` | All 3 locations — addresses, phones, hours, geo coordinates, area-served lists, location-specific intro copy |
| `pricing.json` | Hand wash tiers (NPB + Riviera) and Jupiter machine wash tiers + memberships |
| `reviews.json` | All Google reviews — change which appear on homepage, which appear on each location, full quote vs. short quote |

Edit these and everything else updates automatically — homepage cards, location pages, schema, footer, all of it.

### Examples

**Change a phone number across the entire site:**
- Edit `locations.json`, find the location, change `phone` and `phoneE164`
- That propagates to: location page, homepage shops section, footer, schema, click-to-call links

**Update pricing:**
- Edit `pricing.json`, change any `price`, `includes`, or `memberPrice`
- Reflects on homepage pricing teaser, both location pages with that menu, and on /pricing schema

**Hide/show the announcement bar:**
- In `site.json`, set `"announcement.show": false`

**Add a new featured Google review:**
```json
{
  "id": "unique-slug",
  "author": "First Last",
  "source": "Google Reviews · X reviews",
  "rating": 5,
  "featured": true,
  "homepage": true,
  "quote": "The full quote from Google.",
  "shortQuote": "A trimmed version for cards.",
  "location": "north-palm-beach"
}
```

Set `homepage: true` to feature on homepage. Set `location` to control which location page it appears under. Add a `service` field (e.g. `"service": "detailing"`) to make it appear on the detailing page.

---

## Editing through GitHub (the "Hector or his manager can do this" workflow)

After deployment, content updates take 60 seconds end-to-end:

1. Go to `github.com/YOUR-USERNAME/hectors-carwash/blob/main/src/data/locations.json`
2. Click the pencil icon (top right)
3. Make the edit in the browser
4. Scroll down, click "Commit changes"
5. Vercel auto-deploys within ~60 seconds
6. Live site updates

No local development environment, no terminal, no git knowledge required.

---

## Deploying to Vercel

### Initial deploy

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial Astro v2 build"
git branch -M main
# Create repo at github.com/new
git remote add origin https://github.com/YOUR-USERNAME/hectors-carwash.git
git push -u origin main

# 2. Go to vercel.com/new
# 3. Import the GitHub repo
# 4. Vercel auto-detects Astro — click Deploy
# 5. First deploy ~60 seconds → preview URL ready
```

### Cutting over the production domain

Once the Vercel preview looks right:

1. Vercel → Project → Settings → Domains → Add `hectorcarwash.com` and `www.hectorcarwash.com`
2. Vercel shows DNS records to set at the domain registrar (currently Shopify DNS)
3. Update DNS records
4. SSL provisions automatically within ~10 minutes
5. The Shopify site goes dark the moment DNS propagates — Astro takes over

The `vercel.json` in this project has 301 redirects pre-configured for:
- All old Shopify `/pages/*` URLs → new `/locations/*` and `/services/*` URLs
- All `/cart`, `/account`, `/products`, `/collections`, `/blogs/news` paths → home

Existing Google rankings transfer cleanly.

---

## SEO checklist for post-launch

In priority order:

- [ ] Submit `https://hectorcarwash.com/sitemap-index.xml` to Google Search Console
- [ ] Request indexing for each new URL via Search Console URL Inspection
- [ ] Validate JSON-LD schema at https://search.google.com/test/rich-results
  - Homepage schema = Organization + 3 CarWash entities
  - Each location page = Organization + 1 CarWash entity
  - Each service page = Organization + Service + FAQPage
  - About page = Organization + AboutPage
- [ ] Run PageSpeed audit at https://pagespeed.web.dev — Astro static sites typically score 95+
- [ ] Update Google Business Profile for each location to point to the new URLs
- [ ] Apply for Riviera Beach Google Business Profile if not already submitted
- [ ] Update Instagram bio with canonical phone numbers
- [ ] Update Yelp, Facebook, Apple Maps, Bing Places, Nextdoor with consistent NAP info

---

## Photography — image slots are now pre-wired

Every image slot is already built into the pages. Each one shows a styled navy gradient until you drop in a real photo — there are **no broken-image icons** if a file is missing, so you can add photos one at a time as you get them.

**To add a photo: drop a correctly-named JPG into `/public/images/`. That's it.** No code editing. The page automatically picks it up.

The exact filenames and dimensions are listed in `/public/images/README.txt` and in the separate shoot-list file. The full set:

| Filename | Size | Where it appears |
|---|---|---|
| `hero-hector-portrait.jpg` | 1200×1600 | Homepage hero |
| `story-hector-working.jpg` | 1200×1500 | Homepage story section |
| `location-north-palm-beach.jpg` | 2400×1200 | NPB location page banner |
| `location-jupiter.jpg` | 2400×1200 | Jupiter location page banner |
| `location-riviera-beach.jpg` | 2400×1200 | Riviera location page banner |
| `detail-hero.jpg` | 2400×1200 | Detailing page banner |
| `detail-interior-before-after.jpg` | 1600×1200 | Detailing page gallery |
| `detail-paint-correction.jpg` | 1200×1200 | Detailing page gallery |
| `ceramic-water-beading.jpg` | 1200×1200 | Ceramic page |
| `about-hector-portrait.jpg` | 1600×2000 | About page portrait |
| `about-shop-archival.jpg` | 1600×1200 | About page (after Chapter IV) |
| `og-image.jpg` (1200×630) | 1200×630 | Goes in `/public/` (not `/images/`) — social share card |

The location banners use the pattern `location-{slug}.jpg`, so all three activate from their filenames automatically.

**How the slots work technically:** most use a small reusable `Figure.astro` component (`src/components/Figure.astro`) that frames the image with the gold inset border and falls back to the gradient if the file is missing. The homepage hero/story and the ceramic image use inline `<img>` tags with the same fallback behavior. To move a photo to a different spot or change a filename, edit the `src="..."` on the relevant page.

**Prep tips:** lowercase filenames, dashes not spaces, compress to under 500KB each (tinypng.com), and the dimensions above are targets — close is fine, the CSS crops to fit with `object-fit: cover`.
You chose static-only for now. Future enhancement: install a Google Places API integration on the `/reviews` page that pulls fresh reviews daily. Not blocking for launch.

---

## Architecture and file organization

```
hectors-carwash/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── (og-image.jpg — to add)
│
├── src/
│   ├── components/                  ← reusable pieces
│   │   ├── Announcement.astro       ← top announcement bar
│   │   ├── Nav.astro                ← sticky header
│   │   ├── Footer.astro             ← site footer
│   │   ├── PageHero.astro           ← editorial hero for inner pages
│   │   ├── PricingMenu.astro        ← shared pricing card grid
│   │   ├── ReviewCard.astro         ← review with stars
│   │   └── FAQ.astro                ← accordion with schema
│   │
│   ├── data/                        ← all content lives here
│   │   ├── site.json
│   │   ├── locations.json
│   │   ├── pricing.json
│   │   └── reviews.json
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro         ← head, meta, schema, nav, footer
│   │
│   ├── lib/
│   │   └── schema.ts                ← JSON-LD generators
│   │
│   ├── pages/                       ← each = a URL
│   │   ├── index.astro              ← /
│   │   ├── about.astro              ← /about
│   │   ├── reviews.astro            ← /reviews
│   │   ├── 404.astro
│   │   ├── locations/
│   │   │   └── [slug].astro         ← /locations/* (dynamic)
│   │   └── services/
│   │       ├── car-detailing.astro
│   │       └── ceramic-coating.astro
│   │
│   └── styles/
│       └── global.css               ← Tailwind 4 + design tokens + components
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json                      ← 301 redirects from old Shopify URLs
```

---

## What makes this v2 better than v1

The first build (`hectors-astro.zip`) was structurally fine but stylistically too close to the generic "service business landing page" template family. Key changes in v2:

| v1 | v2 |
|---|---|
| Centered hero, gradient overlay | Asymmetric editorial hero, no overlay |
| 4-card services grid | Numbered table-of-contents list |
| "Trusted with your finest vehicle" (luxury class signal) | "Almost 30 years. The same hands." (honest, specific) |
| "Automatic washes scratch paint. We don't." (hurts Jupiter) | "Two ways to keep your car right." (honest two-pillars) |
| 4 pages (homepage + 3 locations) | 7 pages (added /about, /reviews, /services/car-detailing, /services/ceramic-coating) |
| Generic four-stat trust strip | Large editorial pull quote |
| No FAQ pages | Two service pages with 18 total FAQs + schema |
| One narrow keyword target | Multiple keyword clusters (each service page targets its own SEO universe) |
| Plain section dividers | Gold rule ornaments with diamond markers |
| Inter for body, Fraunces sparingly | Fraunces in italic everywhere, drop caps, larger optical sizes |

---

## Troubleshooting

**Build errors:** Run `npm run build` locally before pushing.

**Type errors:** Run `npm run astro -- sync` to regenerate types after content changes.

**Tailwind classes not working:** Confirm `global.css` is imported in `BaseLayout.astro` (it is). The Tailwind 4 `@theme` block is at the top of that file.

**Astro/Tailwind compatibility:** This build pins Astro 5.17.x (not Astro 6) because of a known compatibility bug with Tailwind 4's Vite plugin in Astro 6's rolldown-vite. If you need to upgrade to Astro 6 later, switch to `@tailwindcss/postcss` instead of `@tailwindcss/vite`.

**Calendly link broken:** Update `primary.calendly` in `src/data/site.json`.
