# Plan: Homepage rebuild + Investments page + sitemap access

## 1. Sitemap — access URL + dynamic wiring

**Access URL for Google Search Console:**
- Already exposed at `https://market360-web.lovable.app/sitemap.xml` (and `/sitemap-index.xml`) via `src/routes/sitemap[.]xml.ts`. This is the URL to submit to Search Console — no other path is needed.
- Add a small link in the footer + confirm `robots.txt` references it (already done).

**Dynamic generation (already in place, confirming):**
- The route handler runs on every request and rebuilds `<url>` entries from live sources: `PAGE_ENTRIES` (static routes) + `newsPosts` from `src/lib/news-data.ts`.
- Wiring for future CRUD: when investment/product/listing data moves to Lovable Cloud, the sitemap handler will fetch them in the same GET (same pattern as `newsPosts.map(...)`). No manual regen — every request produces a fresh XML.
- Cache header lowered to `max-age=300` so search engines pick up changes within ~5 min.
- Add a `lastmod` derived from the most recent data timestamp.

No manual "regenerate" step exists or is needed — the sitemap is a live server route.

## 2. Homepage — full rebuild

Delete current `src/routes/index.tsx` body and rebuild with these sections in order. Mobile-first, semantic HTML, lazy images, framer-motion for subtle animation only.

1. **Hero** — headline "Sierra Leone's #1 Online Marketplace", subcopy, Download + Explore CTAs, phone mockup with floating UI cards (marketplace preview, wallet balance chip, ROI chip).
2. **Trust strip** — 6 icon+label pills (secure payments, fast transfers, verified merchants, AI investing, thousands of users, multi-category).
3. **Marketplace categories** — horizontal snap-scroll carousel, 10 category cards with image, name, listing count.
4. **Featured products** — horizontal snap-scroll, product cards with image, price, seller, rating, favorite, quick view, buy.
5. **Investment opportunities** — 3-card grid with ROI, duration, risk, progress bar, Invest CTA → links to `/investments`.
6. **Learn Trading** — 3 lesson cards with thumbnail, title, difficulty, duration.
7. **Why Choose Market360** — 2-col: image left, 6 feature cards right.
8. **App Features alternating** — 3 alternating rows (phone mockup + copy): Marketplace, Wallet, Investments.
9. **Download the App** — large CTA section, phone mockups, QR placeholder, Google Play (real link), App Store (Coming Soon).
10. **Statistics** — animated counters (IntersectionObserver + rAF).
11. **Testimonials** — horizontal auto-scroll carousel with manual arrows.
12. **Partner brands** — infinite marquee.
13. **Latest news** — pull top 3 from `newsPosts` — real dynamic data, not placeholder.
14. **FAQ** — Radix Accordion, 6 Qs.
15. **Final CTA banner** — Download / Start Investing / Browse Marketplace.
16. Footer stays in `SiteLayout` (already columnar); confirm columns match spec.

Reusable primitives in `src/components/home/`:
- `HScroll.tsx` — snap-scroll rail w/ mouse drag + arrow buttons.
- `Counter.tsx` — animated number.
- `Marquee.tsx` — infinite CSS marquee.

Images: reuse existing `public/brand/*` (`img-hero`, `img-buyer`, `img-seller`, `img-wallet`, `img-delivery`, flyers). Add 4 lightweight generated images for categories/products/lessons only if placeholders look bad.

## 3. Investments page (new)

New route `src/routes/investments.tsx` + detail route `src/routes/investments.$slug.tsx`.

**List page:**
- Hero with financial gradient background, headline "Grow your money with Market360 Invest", subcopy, portfolio-summary stat cards (Total invested, Active, Total returns, Avg ROI) — placeholder numbers for now (marked TODO to wire to Cloud).
- Opportunities grid: premium cards (image, title, ROI %, duration, min investment, funding progress bar, risk chip, View → detail).
- Portfolio section: each holding as a card with sparkline (inline SVG), current value, growth %, earnings, remaining duration, status chip.
- Educational strip linking to `/help`.

**Detail page** (`/investments/$slug`):
- Banner image, title, key stats row (ROI, duration, min, risk, funding %).
- Sections: Overview, How it works, Returns breakdown, Team/Operator, Documents, Risks & disclosures. Grouped in soft cards.
- Sticky invest CTA on desktop; bottom sheet on mobile.

**Data:** `src/lib/investments-data.ts` with 6 opportunities (image, slug, title, roi, duration, minInvestment, risk, fundingProgress, description, sections). Feeds both list, detail, and sitemap.

## 4. Nav + sitemap integration

- Add `Investments` link to `SiteLayout` sticky nav (desktop nav + mobile drawer featured tiles).
- Add `/investments` + dynamic `/investments/$slug` entries to `sitemap[.]xml.ts` (mapped from `investments-data.ts` — same dynamic pattern as news).
- Add `Investments` column to footer as spec'd.

## 5. Files touched

- rewrite: `src/routes/index.tsx`
- create: `src/routes/investments.tsx`, `src/routes/investments.$slug.tsx`
- create: `src/lib/investments-data.ts`
- create: `src/components/home/HScroll.tsx`, `Counter.tsx`, `Marquee.tsx`
- edit: `src/components/SiteLayout.tsx` (nav + drawer + footer columns)
- edit: `src/routes/sitemap[.]xml.ts` (add investments)
- routeTree.gen.ts regenerates automatically

## Out of scope for this turn
- Wiring investments/products/testimonials to a real DB (would require enabling Lovable Cloud — flagging as follow-up).
- Custom tester-signup emails (previously flagged, still awaits your "yes").
