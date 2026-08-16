import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// News articles — mirror this list when adding a new news.<slug>.tsx file.
const newsPosts = [
  { slug: "market360-gift-cards-launch", title: "Introducing Market360 Gift Cards", excerpt: "Six e-gift card tiers, delivered digitally and redeemed in the Market360 app.", date: "2026-06-20", image: "/brand/market360-gift-card-collection-landscape.webp" },
  { slug: "market360-gift-card-collection", title: "A closer look at the Market360 Gift Card collection", excerpt: "A visual tour of all six Market360 e-gift cards.", date: "2026-06-18", image: "/brand/market360-gift-card-collection-landscape.webp" },
  { slug: "market360-testers-program", title: "Inside the Market360 Testers Program", excerpt: "Early access for shoppers and sellers, and a direct line into the roadmap.", date: "2026-06-16", image: "/brand/market360-testers-program.jpg" },
  { slug: "market360-android-app-live", title: "The Market360 Android app is live on Google Play", excerpt: "The full marketplace on your phone.", date: "2026-06-14", image: "/brand/market360-android-app.webp" },
];

const BASE_URL = "https://market360.shop";
const NOW = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  images?: { loc: string; caption?: string; title?: string }[];
}

// Public pages with per-page imagery for image sitemap discovery
const HOMEPAGE_IMAGES = [
  { loc: `${BASE_URL}/brand/market360-logo.webp`, title: "Market360 logo", caption: "Market360 — Sierra Leone's #1 online marketplace" },
  { loc: `${BASE_URL}/brand/market360-app-marketplace-home.jpg`, title: "Market360 marketplace hero", caption: "Buy, sell, pay, and grow with Market360" },
  { loc: `${BASE_URL}/brand/market360-flyer-endless-opportunities.webp`, title: "One App. Endless Opportunities.", caption: "Discover thousands of listings on Market360" },
  { loc: `${BASE_URL}/brand/market360-flyer-download-app.webp`, title: "Download Market360 Today", caption: "Available on Google Play and the App Store" },
  { loc: `${BASE_URL}/brand/market360-flyer-everything-you-need.webp`, title: "Everything you need. One powerful marketplace.", caption: "Delivery, wallet, storefronts and more" },
  { loc: `${BASE_URL}/brand/market360-flyer-buy-sell-pay-grow.webp`, title: "Buy. Sell. Pay. Grow.", caption: "The Market360 digital wallet and seller dashboard" },
];

const PAGE_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", images: HOMEPAGE_IMAGES },
  { path: "/features", changefreq: "monthly", priority: "0.9" },
  { path: "/for-buyers", changefreq: "monthly", priority: "0.9" },
  { path: "/for-sellers", changefreq: "monthly", priority: "0.9" },
  { path: "/wallet", changefreq: "monthly", priority: "0.9" },
  { path: "/investments", changefreq: "weekly", priority: "0.95" },
  { path: "/download", changefreq: "monthly", priority: "0.9", images: [{ loc: `${BASE_URL}/brand/market360-android-app.webp`, title: "Download the Market360 Android app" }] },
  { path: "/gift-cards", changefreq: "weekly", priority: "0.9", images: [
    { loc: `${BASE_URL}/brand/market360-gift-card-collection-landscape.webp`, title: "The Market360 E-Gift Card collection", caption: "All six Market360 e-gift cards — Bronze to M360 Super" },
    { loc: `${BASE_URL}/brand/market360-gift-cards-hero.webp`, title: "Market360 E-Gift Cards", caption: "Give more. Share more." },
    { loc: `${BASE_URL}/brand/market360-bronze-gift-card.webp`, title: "Bronze e-gift card — Le 100" },
    { loc: `${BASE_URL}/brand/market360-silver-gift-card.webp`, title: "Silver e-gift card — Le 120" },
    { loc: `${BASE_URL}/brand/market360-gold-gift-card.webp`, title: "Gold e-gift card — Le 300" },
    { loc: `${BASE_URL}/brand/market360-platinum-gift-card.webp`, title: "Platinum e-gift card — Le 600" },
    { loc: `${BASE_URL}/brand/market360-diamond-gift-card.webp`, title: "Diamond e-gift card — Le 800" },
    { loc: `${BASE_URL}/brand/market360-m360-super-gift-card.webp`, title: "M360 Super e-gift card — Le 1,000" },
  ] },
  { path: "/gift-cards/bronze", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-bronze-gift-card.webp`, title: "Bronze e-gift card — Le 100" }] },
  { path: "/gift-cards/silver", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-silver-gift-card.webp`, title: "Silver e-gift card — Le 120" }] },
  { path: "/gift-cards/gold", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-gold-gift-card.webp`, title: "Gold e-gift card — Le 300" }] },
  { path: "/gift-cards/platinum", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-platinum-gift-card.webp`, title: "Platinum e-gift card — Le 600" }] },
  { path: "/gift-cards/diamond", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-diamond-gift-card.webp`, title: "Diamond e-gift card — Le 800" }] },
  { path: "/gift-cards/m360-super", changefreq: "monthly", priority: "0.7", images: [{ loc: `${BASE_URL}/brand/market360-m360-super-gift-card.webp`, title: "M360 Super e-gift card — Le 1,000" }] },
  { path: "/tester", changefreq: "weekly", priority: "0.9" },
  { path: "/seller-solutions", changefreq: "monthly", priority: "0.9" },
  { path: "/safety", changefreq: "monthly", priority: "0.8" },
  { path: "/news", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/help", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.4" },
];

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

function urlBlock(e: SitemapEntry) {
  const lastmod = e.lastmod ?? NOW;
  const imageBlocks = (e.images ?? [])
    .map(
      (img) =>
        `    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>${
          img.title ? `\n      <image:title>${escapeXml(img.title)}</image:title>` : ""
        }${img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ""}\n    </image:image>`
    )
    .join("\n");
  return `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${imageBlocks ? `\n${imageBlocks}` : ""}\n  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const newsEntries: SitemapEntry[] = newsPosts.map((p: typeof newsPosts[number]) => ({
          path: `/news/${p.slug}`,
          changefreq: "monthly",
          priority: "0.6",
          lastmod: p.date,
          images: p.image ? [{ loc: p.image.startsWith("http") ? p.image : `${BASE_URL}${p.image}`, title: p.title, caption: p.excerpt }] : undefined,
        }));

        const entries = [...PAGE_ENTRIES, ...newsEntries];
        const urls = entries.map(urlBlock).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=300",
            "X-Robots-Tag": "noindex",
          },
        });
      },
    },
  },
});
