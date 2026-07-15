import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";

const TITLE = "Tester spotlights: meet 5 of our top contributors";
const EXCERPT = "The people helping us ship better, faster.";
const IMAGE = "/brand/news-community.jpg";
const CATEGORY = "Community";
const AUTHOR = "Community";
const DATE = "Apr 15, 2026";
const READ_TIME = "5 min read";
const CANONICAL = "https://market360-web.lovable.app/news/tester-spotlights";
const IMAGE_ABS = "https://market360-web.lovable.app/brand/news-community.jpg";

export const Route = createFileRoute("/news/tester-spotlights")({
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
              <p>Our tester community has reported over 800 bugs and suggested more than 200 improvements in the last six months. Today we're shining a light on five of the people behind that work.</p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Why we share these stories</h2>
              <p>Building a marketplace is a team sport. Every tip, every reproduction step, every UX nit pushes the platform forward. We want the wider community to see who they have to thank.</p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/tester" className="btn-primary">Become a tester <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/news" className="btn-ghost">More news</Link>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
