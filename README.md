# hectorcarwash.com (v3)

Hector's Car Wash, the hand car wash at 900 US Highway 1, North Palm Beach.
Astro 5 + Tailwind 4, deployed on Vercel. Jupiter is its own brand now (jupitercarwash.com).

## Run it
    npm install
    npm run dev      # localhost:4321
    npm run build

## Where content lives
- `src/data/site.json` — brand name, rating, review count, Calendly, socials, announcement bar
- `src/data/locations.json` — the NPB shop: address, phone, hours, directions conversion label, areas served
- `src/data/pricing.json` — the five hand wash tiers (feeds the price board)
- `src/data/reviews.json` — Google review quotes
- Hours also live in `src/components/OpenStatus.astro` (the live "open now" line) and `src/lib/schema.ts`. Change all three together.

## Design system (v3)
Built from the shop itself: white building, azure stripe, round azure badge, wet blacktop, curb yellow.
- Colors (in `src/styles/global.css`): paper #FFFFFF, ink #122029, azure #2E9CD6, azure-deep #0A6DA6 (text), mist #EEF5F9, curb #F5C518 (price board + open dot only)
- Type: Archivo only. Display at font-stretch 125% / weight 800. Body at 100%.
- Pill buttons, left-aligned headings, the azure `.stripe` as the divider.
- Do not reintroduce: centered all-caps eyebrows, italic-accent words in headlines, cream/gold, 01/02 numbering on non-sequences, "since 1996".

## Spanish
`public/i18n.js` swaps whole text nodes using `public/i18n-dict.js`. Any new or edited English text needs a matching dictionary entry, keyed by the exact text. Wrap names, addresses, phone numbers and review quotes in `data-no-i18n`.

## Tracking
- Phone clicks: any `tel:` link
- Directions: any link with `data-directions-label`
- Calendly bookings: embedded widget postMessage
See `src/components/ConversionTracking.astro`.

## Redirects (vercel.json)
- `/locations/north-palm-beach` → `/` (the homepage is the location page)
- `/locations/jupiter` → jupitercarwash.com (temporary 307; set `permanent: true` once that site is confirmed live)
