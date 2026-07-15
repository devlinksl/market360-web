import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";

const TITLE = "What's coming this quarter";
const EXCERPT = "Storefronts, bulk uploads, smarter analytics, and more.";
const IMAGE = "/brand/news-roadmap.jpg";
const CATEGORY = "Roadmap";
const AUTHOR = "Market360 Team";
const DATE = "May 10, 2026";
const READ_TIME = "6 min read";
const CANONICAL = "https://market360-web.lovable.app/news/roadmap-q3";
const IMAGE_ABS = "https://market360-web.lovable.app/brand/news-roadmap.jpg";

export const Route = createFileRoute("/news/roadmap-q3")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Market360 News` },
      { name: "description", content: EXCERPT },
      { name: "author", content: AUTHOR },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: EXCERPT },
      { property: "og:image", content: IMAGE_ABS },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Market360" },
      { property: "article:published_time", content: DATE },
      { property: "article:section", content: CATEGORY },
      { property: "article:author", content: AUTHOR },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: EXCERPT },
      { name: "twitter:image", content: IMAGE_ABS },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "NewsArticle",
        headline: TITLE, description: EXCERPT, image: [IMAGE_ABS],
        datePublished: DATE, dateModified: DATE,
        author: { "@type": "Organization", name: AUTHOR },
        publisher: { "@type": "Organization", name: "Market360", logo: { "@type": "ImageObject", url: "https://market360-web.lovable.app/brand/market360-logo.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
        articleSection: CATEGORY,
      }),
    }],
  }),
  component: Article,
});

function Article() {
  return (
    <SiteLayout>
      <article>
        <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-surface">
          <img src={IMAGE} alt={TITLE} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/0" />
        </div>

        <div className="container-pro -mt-24 relative pb-16">
          <div className="surface-card p-8 md:p-12 max-w-3xl mx-auto">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> All updates
            </Link>
            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary">{CATEGORY}</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{TITLE}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {AUTHOR}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {DATE}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {READ_TIME}</span>
            </div>

            <p className="mt-6 text-lg text-foreground leading-relaxed">{EXCERPT}</p>

            <div className="mt-8 space-y-6 text-base text-muted-foreground leading-relaxed">
              <p>Here's a peek at what the team is building over the next three months.</p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Storefront 2.0</h2>
              <p>Branded storefronts with custom banners, featured collections, and shareable links that work great on WhatsApp and Instagram.</p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Bulk product upload</h2>
              <p>Upload hundreds of products at once with a CSV or spreadsheet. Ideal for established sellers migrating their catalogue.</p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Analytics deep-dives</h2>
              <p>Cohort analysis, repeat-buyer tracking, and per-product profit margins — surfaced inside the seller dashboard.</p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/for-sellers" className="btn-primary">Sell on Market360 <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/news" className="btn-ghost">More news</Link>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
