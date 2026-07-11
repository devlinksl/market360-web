import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { newsPosts } from "@/lib/news-data";

/* =============================================================================
   News article: New fraud protection layer goes live
   Edit the title, image, and body text directly below.
   ============================================================================= */

const POST = {
  slug: "fraud-protection-update",
  category: "Trust",
  title: "New fraud protection layer goes live",
  excerpt: "Our updated AI model flags risky activity in real-time.",
  date: "Apr 28, 2026",
  author: "Trust & Safety",
  readTime: "4 min read",
  image: "/brand/news-fraud.jpg",
};

const CANONICAL = "https://market360-web.lovable.app/news/fraud-protection-update";
const IMAGE_ABS = "https://market360-web.lovable.app/brand/news-fraud.jpg";

export const Route = createFileRoute("/news/fraud-protection-update")({
  head: () => ({
    meta: [
      { title: `${POST.title} — Market360 News` },
      { name: "description", content: POST.excerpt },
      { name: "author", content: POST.author },
      { name: "news_keywords", content: POST.category },
      { property: "og:title", content: POST.title },
      { property: "og:description", content: POST.excerpt },
      { property: "og:image", content: IMAGE_ABS },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Market360" },
      { property: "article:published_time", content: POST.date },
      { property: "article:section", content: POST.category },
      { property: "article:author", content: POST.author },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: POST.title },
      { name: "twitter:description", content: POST.excerpt },
      { name: "twitter:image", content: IMAGE_ABS },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{
      type: "application/ld+json",
      children: "{\"@context\":\"https://schema.org\",\"@type\":\"NewsArticle\",\"headline\":\"New fraud protection layer goes live\",\"description\":\"Our updated AI model flags risky activity in real-time.\",\"image\":[\"https://market360-web.lovable.app/brand/news-fraud.jpg\"],\"datePublished\":\"Apr 28, 2026\",\"dateModified\":\"Apr 28, 2026\",\"author\":{\"@type\":\"Organization\",\"name\":\"Trust & Safety\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Market360\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://market360-web.lovable.app/brand/market360-logo.png\"}},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://market360-web.lovable.app/news/fraud-protection-update\"},\"articleSection\":\"Trust\"}",
    }],
  }),
  component: Article,
});

function Article() {
  const related = newsPosts.filter((p) => p.slug !== POST.slug).slice(0, 3);
  return (
    <SiteLayout>
      <article>
        <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-surface">
          <img src={POST.image} alt={POST.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/0" />
        </div>

        <div className="container-pro -mt-24 relative pb-16">
          <div className="surface-card p-8 md:p-12 max-w-3xl mx-auto">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> All updates
            </Link>
            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary">{POST.category}</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{POST.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {POST.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {POST.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {POST.readTime}</span>
            </div>

            <p className="mt-6 text-lg text-foreground leading-relaxed">{POST.excerpt}</p>

            <div className="mt-8 space-y-2">
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">We&#39;ve deployed a new fraud-detection model that scores every transaction in milliseconds — blocking suspicious activity before money moves.</p>
      <h2 className="text-2xl font-bold mt-10 mb-3">What's new</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">The model evaluates dozens of behavioural signals: device fingerprint, location consistency, account age, and unusual purchase patterns. Combined, they catch roughly 98% of fraud attempts in the test set with under 0.2% false positives.</p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/tester" className="btn-primary">Join the Tester Program <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/download" className="btn-ghost">Download the App</Link>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold">Keep reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((rp) => (
                <Link key={rp.slug} to="/news/$slug" params={{ slug: rp.slug }} className="surface-card surface-card-hover overflow-hidden p-0 flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                    <img src={rp.image} alt={rp.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{rp.category}</span>
                    <h3 className="mt-2 font-semibold leading-snug">{rp.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground flex-1">{rp.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
