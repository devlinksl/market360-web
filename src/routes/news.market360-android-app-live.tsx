import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Calendar, Clock, Smartphone, User } from "lucide-react";

/* =============================================================================
   EDIT THIS ARTICLE HERE. Everything (text, image, SEO) lives in this file.
   ============================================================================= */
const SLUG = "market360-android-app-live";
const TITLE = "The Market360 Android app is live";
const HEADLINE = "The Market360 Android app is live on Google Play";
const EXCERPT =
  "Market360 is now in your pocket. The Android app brings the full marketplace — browsing, selling, the wallet and gift cards — to your phone.";
const IMAGE = "/brand/market360-android-app.webp";
const IMAGE_ALT = "Download Market360 today — the Market360 Android app on a phone";
const CATEGORY = "Product";
const AUTHOR = "Market360 Team";
const DATE = "Jun 14, 2026";
const ISO_DATE = "2026-06-14";
const READ_TIME = "4 min read";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.market360.devlink";
const URL = `https://market360.shop/news/${SLUG}`;
const IMAGE_URL = `https://market360.shop${IMAGE}`;

export const Route = createFileRoute("/news/market360-android-app-live")({
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
          <figure className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface">
            <img src={IMAGE} alt={IMAGE_ALT} width={1400} height={933} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
            <figcaption className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
              Market360 for Android — the full marketplace on your phone.
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[17px] leading-relaxed text-muted-foreground">
            <p className="text-xl leading-relaxed text-foreground">
              The Market360 Android app is available on Google Play. It's the same marketplace you use on
              the web, rebuilt for the way people actually shop — on a phone, on the move, often on a
              slower connection.
            </p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">The app and the website work together</h2>
            <p>
              This site remains the place to discover Market360, read announcements, browse the{" "}
              <Link to="/gift-cards" className="font-semibold text-primary hover:underline">gift card collection</Link> and learn what the platform
              does. The app is where you do the actual shopping and selling: your account, orders, wallet
              balance and messages all live there.
            </p>
            <p>Anything you start on the web continues in the app under the same account.</p>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">What you can do in the app</h2>
            <ul className="space-y-3">
              <li><strong className="text-foreground">Browse and search listings</strong> across every Market360 category.</li>
              <li><strong className="text-foreground">Buy from verified sellers</strong> with order tracking from checkout to delivery.</li>
              <li><strong className="text-foreground">Sell your own items</strong> — list from your phone and manage your storefront.</li>
              <li><strong className="text-foreground">Use the Market360 wallet</strong> for payments, balances and payouts.</li>
              <li><strong className="text-foreground">Send and redeem e-gift cards</strong> straight from the Gift Cards tab.</li>
              <li><strong className="text-foreground">Message buyers and sellers</strong> without leaving the marketplace.</li>
            </ul>

            <blockquote className="border-l-4 border-primary bg-surface px-6 py-5 text-lg italic text-foreground">
              "Mobile isn't a companion to the marketplace here — it is the marketplace."
            </blockquote>

            <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">Built for real conditions</h2>
            <p>
              The app is designed to stay usable on modest hardware and patchy networks: light image
              payloads, fast lists, and screens that stay responsive while data loads in the background.
            </p>

            <h3 className="!mt-10 text-xl font-semibold text-foreground">Get it now</h3>
            <p>
              Install Market360 from Google Play, or see requirements and everything else on the{" "}
              <Link to="/download" className="font-semibold text-primary hover:underline">download page</Link>. Want to help shape what comes next?
              Join the{" "}
              <Link to="/tester" className="font-semibold text-primary hover:underline">Testers Program</Link>.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap gap-3">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Smartphone className="h-4 w-4" /> Get it on Google Play
            </a>
            <Link to="/download" className="btn-ghost">Download page <ArrowRight className="h-4 w-4" /></Link>
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
