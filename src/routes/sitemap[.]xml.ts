import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { newsPosts } from "@/lib/news-data";

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
  { loc: `${BASE_URL}/brand/market360-logo.png`, title: "Market360 logo", caption: "Market360 — Sierra Leone's #1 online marketplace" },
  { loc: `${BASE_URL}/brand/img-hero.jpg`, title: "Market360 marketplace hero", caption: "Buy, sell, pay, and grow with Market360" },
  { loc: `${BASE_URL}/brand/flyer-endless.png`, title: "One App. Endless Opportunities.", caption: "Discover thousands of listings on Market360" },
  { loc: `${BASE_URL}/brand/flyer-download.png`, title: "Download Market360 Today", caption: "Available on Google Play and the App Store" },
  { loc: `${BASE_URL}/brand/flyer-everything.png`, title: "Everything you need. One powerful marketplace.", caption: "Delivery, wallet, storefronts and more" },
  { loc: `${BASE_URL}/brand/flyer-buysell.png`, title: "Buy. Sell. Pay. Grow.", caption: "The Market360 digital wallet and seller dashboard" },
];

const PAGE_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", images: HOMEPAGE_IMAGES },
  { path: "/features", changefreq: "monthly", priority: "0.9" },
  { path: "/for-buyers", changefreq: "monthly", priority: "0.9" },
  { path: "/for-sellers", changefreq: "monthly", priority: "0.9" },
  { path: "/wallet", changefreq: "monthly", priority: "0.9" },
  { path: "/investments", changefreq: "weekly", priority: "0.95" },
  { path: "/download", changefreq: "monthly", priority: "0.9", images: [{ loc: `${BASE_URL}/brand/flyer-download.png`, title: "Download Market360" }] },
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
        const newsEntries: SitemapEntry[] = newsPosts.map((p) => ({
          path: `/news/${p.slug}`,
          changefreq: "monthly",
          priority: "0.6",
          lastmod: p.date ? new Date(p.date).toISOString().slice(0, 10) : NOW,
          images: p.image ? [{ loc: p.image.startsWith("http") ? p.image : `${BASE_URL}${p.image}`, title: p.title, caption: p.excerpt }] : undefined,
        }));

        const investmentEntries: SitemapEntry[] = investments.map((i) => ({
          path: `/investments/${i.slug}`,
          changefreq: "weekly",
          priority: "0.8",
          lastmod: NOW,
          images: i.image ? [{ loc: i.image.startsWith("http") ? i.image : `${BASE_URL}${i.image}`, title: i.title, caption: i.tagline }] : undefined,
        }));

        const entries = [...PAGE_ENTRIES, ...newsEntries, ...investmentEntries];
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
