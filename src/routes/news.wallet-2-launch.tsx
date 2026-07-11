import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { newsPosts } from "@/lib/news-data";

/* =============================================================================
   News article: Wallet 2.0 ships: faster settlements, lower fees
   Edit the title, image, and body text directly below.
   ============================================================================= */

const POST = {
  slug: "wallet-2-launch",
  category: "Product",
  title: "Wallet 2.0 ships: faster settlements, lower fees",
  excerpt: "Get paid in minutes with our re-engineered wallet.",
  date: "Jun 04, 2026",
  author: "Engineering",
  readTime: "5 min read",
  image: "/brand/news-wallet.jpg",
};

const CANONICAL = "https://market360-web.lovable.app/news/wallet-2-launch";
const IMAGE_ABS = "https://market360-web.lovable.app/brand/news-wallet.jpg";

export const Route = createFileRoute("/news/wallet-2-launch")({
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
      children: "{\"@context\":\"https://schema.org\",\"@type\":\"NewsArticle\",\"headline\":\"Wallet 2.0 ships: faster settlements, lower fees\",\"description\":\"Get paid in minutes with our re-engineered wallet.\",\"image\":[\"https://market360-web.lovable.app/brand/news-wallet.jpg\"],\"datePublished\":\"Jun 04, 2026\",\"dateModified\":\"Jun 04, 2026\",\"author\":{\"@type\":\"Organization\",\"name\":\"Engineering\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Market360\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://market360-web.lovable.app/brand/market360-logo.png\"}},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://market360-web.lovable.app/news/wallet-2-launch\"},\"articleSection\":\"Product\"}",
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
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">Wallet 2.0 is now rolling out to every Market360 account. The headline change: payouts land in your linked mobile money account in under three minutes on average — down from up to 24 hours.</p>
      <h2 className="text-2xl font-bold mt-10 mb-3">What changed</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">We rebuilt the settlement layer end-to-end. Instead of batching withdrawals overnight, they now stream as they&#39;re requested. We&#39;ve also cut internal transfer fees to zero and reduced merchant withdrawal fees by roughly 30%.</p>
      <h2 className="text-2xl font-bold mt-10 mb-3">What you need to do</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">Nothing. Open the app and your wallet is already upgraded. If you&#39;ve never linked a payout method, head to Wallet → Settings → Payout to add one.</p>
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
