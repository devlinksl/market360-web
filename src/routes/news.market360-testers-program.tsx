import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Users } from "lucide-react";

/* =============================================================================
   EDIT THIS ARTICLE HERE. Everything (text, image, SEO) lives in this file.
   ============================================================================= */
const SLUG = "market360-testers-program";
const TITLE = "Inside the Market360 Testers Program";
const HEADLINE = "Inside the Market360 Testers Program: how your feedback ships";
const EXCERPT =
  "The Testers Program gives everyday shoppers and sellers early access to Market360 features — and a direct line into what we build next.";
const IMAGE = "/brand/news-tester-launch.jpg";
const IMAGE_ALT = "Market360 testers using the marketplace app";
const CATEGORY = "Community";
const AUTHOR = "Market360 Team";
const DATE = "Jun 16, 2026";
const ISO_DATE = "2026-06-16";
const READ_TIME = "5 min read";

const URL = `https://market360.shop/news/${SLUG}`;
const IMAGE_URL = `https://market360.shop${IMAGE}`;

export const Route = createFileRoute("/news/market360-testers-program")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Market360 News` },
      { name: "description", content: EXCERPT },
      { property: "og:title", content: HEADLINE },
      { property: "og:description", content: EXCERPT },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: IMAGE_URL },
      { property: "article:published_time", content: ISO_DATE },
      { property: "article:section", content: CATEGORY },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HEADLINE },
      { name: "twitter:description", content: EXCERPT },
      { name: "twitter:image", content: IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: HEADLINE,
          description: EXCERPT,
          image: [IMAGE_URL],
          datePublished: ISO_DATE,
          dateModified: ISO_DATE,
          articleSection: CATEGORY,
          author: { "@type": "Organization", name: AUTHOR, url: "https://market360.shop" },
          publisher: {
            "@type": "Organization",
            name: "Market360",
            logo: { "@type": "ImageObject", url: "https://market360.shop/brand/market360-logo.webp" },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": URL },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://market360.shop/" },
            { "@type": "ListItem", position: 2, name: "News", item: "https://market360.shop/news" },
            { "@type": "ListItem", position: 3, name: TITLE, item: URL },
          ],
        }),
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <SiteLayout>
      <article className="pb-20">
        <header className="border-b border-border bg-surface">
          <div className="container-pro py-12 md:py-16">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">{CATEGORY}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{HEADLINE}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{EXCERPT}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {AUTHOR}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {DATE}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {READ_TIME}</span>
            </div>
          </div>
        </header>

        <div className="container-pro">
          <figure className="mt-10 overflow-hidden rounded-3xl border border-border">
            <img src={IMAGE} alt={IMAGE_ALT} width={1600} height={900} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
            <figcaption className="bg-surface px-5 py-3 text-xs text-muted-foreground">
              Testers get features before general release — and tell us what to fix.
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[17px] leading-relaxed text-muted-foreground">
            <p className="text-xl leading-relaxed text-foreground">
              Market360 is built for how people actually buy and sell in Sierra Leone — which means the
              people doing it have to be in the room. The Testers Program is how we keep them there.
            </p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">What the program is</h2>
            <p>
              Testers get access to new Market360 features before general release, then report back on what
              works and what doesn't. It's open to both sides of the marketplace: shoppers who use the app
              day to day, and sellers running a storefront on it.
            </p>
            <p>There's no cost to join, and no obligation to test everything — you pick up what's relevant to you.</p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">What testers actually do</h2>
            <ul className="space-y-3">
              <li><strong className="text-foreground">Try new releases early.</strong> Features land with testers before they roll out widely.</li>
              <li><strong className="text-foreground">Report bugs and friction.</strong> Anything from a broken flow to a confusing label.</li>
              <li><strong className="text-foreground">Answer short questions.</strong> Occasional prompts about a specific screen or decision.</li>
              <li><strong className="text-foreground">Shape priorities.</strong> Recurring feedback moves items up the roadmap.</li>
            </ul>

            <blockquote className="border-l-4 border-primary bg-surface px-6 py-5 text-lg italic text-foreground">
              "The fastest way to build the right thing is to hand an unfinished version to someone who
              will actually use it — and listen carefully to what annoys them."
            </blockquote>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">How feedback becomes a change</h2>
            <ol className="space-y-3">
              <li><strong className="text-foreground">1. Collect.</strong> Reports come in from testers using the live build.</li>
              <li><strong className="text-foreground">2. Group.</strong> We cluster reports so repeated pain points surface clearly.</li>
              <li><strong className="text-foreground">3. Fix or design.</strong> Bugs go straight to the queue; friction goes back to design.</li>
              <li><strong className="text-foreground">4. Ship and follow up.</strong> The change goes out and the same testers verify it.</li>
            </ol>

            <h3 className="!mt-10 text-xl font-semibold text-foreground">Who should join</h3>
            <p>
              If you shop online regularly, sell anything at all, or simply notice when an app gets in your
              way — you're the right person. Curiosity matters more than technical experience.
            </p>

            <h3 className="!mt-10 text-xl font-semibold text-foreground">How to join</h3>
            <p>
              Sign up on the{" "}
              <Link to="/tester" className="font-semibold text-primary hover:underline">Market360 Testers Program page</Link>. You'll need the app
              too — grab it from the{" "}
              <Link to="/download" className="font-semibold text-primary hover:underline">download page</Link>.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap gap-3">
            <Link to="/tester" className="btn-primary"><Users className="h-4 w-4" /> Join the tester program</Link>
            <Link to="/download" className="btn-ghost">Get the app <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mx-auto max-w-2xl">
            <ShareRow url={URL} title={HEADLINE} />
          </div>
        </div>

        <RelatedArticles exclude={SLUG} />
      </article>
    </SiteLayout>
  );
}

function ShareRow({ url, title }: { url: string; title: string }) {
  const enc = encodeURIComponent;
  return (
    <div className="mt-12 border-t border-border pt-6">
      <p className="text-sm font-semibold">Share this story</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a className="btn-ghost text-sm" href={`https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener noreferrer">X</a>
        <a className="btn-ghost text-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a className="btn-ghost text-sm" href={`https://api.whatsapp.com/send?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn-ghost text-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}

const ALL = [
  { slug: "market360-gift-cards-launch", to: "/news/market360-gift-cards-launch" as const, title: "Introducing Market360 Gift Cards", image: "/brand/market360-gift-card-collection-landscape.webp", category: "Announcement" },
  { slug: "market360-gift-card-collection", to: "/news/market360-gift-card-collection" as const, title: "A closer look at the Market360 Gift Card collection", image: "/brand/market360-gift-card-collection-landscape.webp", category: "Collection" },
  { slug: "market360-testers-program", to: "/news/market360-testers-program" as const, title: "Inside the Market360 Testers Program", image: "/brand/news-tester-launch.jpg", category: "Community" },
  { slug: "market360-android-app-live", to: "/news/market360-android-app-live" as const, title: "The Market360 Android app is live", image: "/brand/market360-android-app.webp", category: "Product" },
];

function RelatedArticles({ exclude }: { exclude: string }) {
  const items = ALL.filter((a) => a.slug !== exclude).slice(0, 3);
  return (
    <section className="mt-16 border-t border-border bg-surface py-14">
      <div className="container-pro">
        <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {items.map((a) => (
            <Link key={a.slug} to={a.to} className="surface-card surface-card-hover overflow-hidden p-0">
              <div className="relative aspect-[16/9] overflow-hidden bg-background">
                <img src={a.image} alt={a.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{a.category}</span>
                <p className="mt-2 font-semibold leading-snug">{a.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
