import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Calendar, Clock, Gift, User } from "lucide-react";

/* =============================================================================
   EDIT THIS ARTICLE HERE. Everything (text, image, SEO) lives in this file.
   ============================================================================= */
const SLUG = "market360-gift-cards-launch";
const TITLE = "Introducing Market360 Gift Cards";
const HEADLINE = "Introducing Market360 Gift Cards: a simpler way to give";
const EXCERPT =
  "Six e-gift card tiers — from Le 100 to Le 1,000 — are now part of Market360. Delivered digitally, redeemed in the app, spendable across the whole marketplace.";
const IMAGE = "/brand/market360-gift-cards-hero.webp";
const IMAGE_ALT = "The Market360 e-gift card collection on a green diagonal backdrop";
const CATEGORY = "Announcement";
const AUTHOR = "Market360 Team";
const DATE = "Jun 20, 2026";
const ISO_DATE = "2026-06-20";
const READ_TIME = "5 min read";

const URL = `https://market360.shop/news/${SLUG}`;
const IMAGE_URL = `https://market360.shop${IMAGE}`;

const TIERS = [
  { name: "Bronze", price: "Le 100", to: "/gift-cards/bronze" as const, note: "An everyday thank-you." },
  { name: "Silver", price: "Le 120", to: "/gift-cards/silver" as const, note: "Simple, elegant, thoughtful." },
  { name: "Gold", price: "Le 300", to: "/gift-cards/gold" as const, note: "For occasions that matter." },
  { name: "Platinum", price: "Le 600", to: "/gift-cards/platinum" as const, note: "A premium way to give." },
  { name: "Diamond", price: "Le 800", to: "/gift-cards/diamond" as const, note: "High-value, fully flexible." },
  { name: "M360 Super", price: "Le 1,000", to: "/gift-cards/m360-super" as const, note: "Our flagship denomination." },
];

export const Route = createFileRoute("/news/market360-gift-cards-launch")({
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
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {HEADLINE}
            </h1>
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
              The Market360 e-gift card collection — six denominations, one wallet.
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="prose-editorial space-y-6 text-[17px] leading-relaxed text-muted-foreground">
              <p className="text-xl leading-relaxed text-foreground">
                Gifting on Market360 no longer means guessing a size, a colour or someone's taste. Market360
                Gift Cards are live, and they hand the choice straight to the person receiving them.
              </p>
              <p>
                A Market360 e-gift card is a digital balance that lands in the recipient's Market360 wallet.
                Once redeemed, it can be spent on anything listed by a verified seller on the marketplace —
                fashion, electronics, home essentials, and everything in between.
              </p>

              <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">Six tiers, one simple idea</h2>
              <p>
                We launched with six denominations so the card can match the moment, from a small thank-you
                to a milestone gift.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {TIERS.map((t) => (
                <Link key={t.name} to={t.to} className="surface-card surface-card-hover flex items-center justify-between gap-3 p-4">
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.note}</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-primary">{t.price}</span>
                </Link>
              ))}
            </div>

            <div className="prose-editorial mt-10 space-y-6 text-[17px] leading-relaxed text-muted-foreground">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">How it works</h2>
              <ol className="space-y-3">
                <li><strong className="text-foreground">1. Pick a card.</strong> Choose the tier that fits the occasion.</li>
                <li><strong className="text-foreground">2. Personalise it.</strong> Add the recipient and a short message.</li>
                <li><strong className="text-foreground">3. Send it instantly.</strong> Pay from your Market360 wallet and it's delivered digitally.</li>
                <li><strong className="text-foreground">4. They redeem in one tap.</strong> The balance lands in their wallet, ready to spend.</li>
              </ol>

              <blockquote className="border-l-4 border-primary bg-surface px-6 py-5 text-lg italic text-foreground">
                "A gift card removes the hardest part of gifting — the guessing. The value is yours to give;
                the choice is theirs to make."
              </blockquote>

              <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">Built with the same protections as the rest of Market360</h2>
              <p>
                Every card carries a unique, single-use redemption code, and redemption happens inside the
                Market360 app against the same account and fraud checks that protect ordinary orders. The
                gifted balance does not expire.
              </p>

              <h3 className="!mt-10 text-xl font-semibold text-foreground">Where to find them</h3>
              <p>
                Browse the full collection on the{" "}
                <Link to="/gift-cards" className="font-semibold text-primary hover:underline">Market360 Gift Cards page</Link>, or open the
                Gift Cards tab in the app. If you don't have Market360 yet, you can{" "}
                <Link to="/download" className="font-semibold text-primary hover:underline">download it here</Link>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/gift-cards" className="btn-primary">
                <Gift className="h-4 w-4" /> Browse gift cards
              </Link>
              <Link to="/download" className="btn-ghost">Get the app <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <ShareRow url={URL} title={HEADLINE} />
          </div>
        </div>

        <RelatedArticles exclude={SLUG} />
      </article>
    </SiteLayout>
  );
}

/* --- Share row (edit the networks here) ----------------------------------- */
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

/* --- Related (edit the list here) ----------------------------------------- */
const ALL = [
  { slug: "market360-gift-cards-launch", to: "/news/market360-gift-cards-launch" as const, title: "Introducing Market360 Gift Cards", image: "/brand/market360-gift-cards-hero.webp", category: "Announcement" },
  { slug: "market360-gift-card-collection", to: "/news/market360-gift-card-collection" as const, title: "A closer look at the Market360 Gift Card collection", image: "/brand/market360-m360-super-gift-card.webp", category: "Collection" },
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
