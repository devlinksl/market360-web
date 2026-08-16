import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Gift } from "lucide-react";
import { GIFT_CARDS } from "@/components/giftcards/data";
import { GIFT_CARD_HREF } from "@/components/giftcards/GiftCardCarousel";

/* =============================================================================
   EDIT THIS ARTICLE HERE. Everything (text, image, SEO) lives in this file.
   ============================================================================= */
const SLUG = "market360-gift-card-collection";
const TITLE = "A closer look at the Market360 Gift Card collection";
const HEADLINE = "A closer look at the Market360 Gift Card collection";
const EXCERPT =
  "Bronze to M360 Super: a visual tour of all six Market360 e-gift cards, what each one is designed for, and how the denominations were chosen.";
const IMAGE = "/brand/market360-gift-card-collection-landscape.webp";
const IMAGE_ALT = "Market360 M360 Super e-gift card worth Le 1,000";
const CATEGORY = "Collection";
const AUTHOR = "Market360 Team";
const DATE = "Jun 18, 2026";
const ISO_DATE = "2026-06-18";
const READ_TIME = "4 min read";

const URL = `https://market360.shop/news/${SLUG}`;
const IMAGE_URL = `https://market360.shop${IMAGE}`;

export const Route = createFileRoute("/news/market360-gift-card-collection")({
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
          image: [IMAGE_URL, "https://market360.shop/brand/market360-gift-card-collection-landscape.webp"],
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
            <img src={IMAGE} alt={IMAGE_ALT} width={1200} height={800} fetchPriority="high" decoding="async" className="mx-auto w-full max-w-3xl" />
            <figcaption className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
              M360 Super — the flagship card in the collection.
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="space-y-6 text-[17px] leading-relaxed text-muted-foreground">
              <p className="text-xl leading-relaxed text-foreground">
                Six cards. Six moments. The Market360 Gift Card collection was designed so there's a
                natural choice whether you're saying a quick thank-you or marking something significant.
              </p>
              <p>
                Each card carries the same mechanics — instant digital delivery, a single-use redemption
                code, and a balance that lands in the Market360 wallet. What changes is the value, and the
                occasion it suits.
              </p>
              <h2 className="!mt-12 text-2xl font-bold tracking-tight text-foreground">The full collection</h2>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GIFT_CARDS.map((c) => (
              <Link key={c.slug} to={GIFT_CARD_HREF[c.slug]} className="surface-card surface-card-hover overflow-hidden p-0">
                <div className={`bg-gradient-to-br ${c.accent} p-4`}>
                  <img src={c.image} alt={c.alt} width={900} height={600} loading="lazy" decoding="async" className="w-full" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.name}</p>
                  <p className="mt-1 text-xl font-bold">{c.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[17px] leading-relaxed text-muted-foreground">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Why these denominations</h2>
            <p>
              The range starts at Le 100 because most gifting on Market360 is everyday gifting — a
              thank-you, a small congratulations, a nudge towards something someone has been eyeing. From
              there the steps widen: Le 300 and Le 600 cover birthdays, weddings and milestones, while
              Le 800 and Le 1,000 are built for corporate gifting and staff rewards, where the recipient
              genuinely needs room to choose.
            </p>

            <blockquote className="border-l-4 border-primary bg-surface px-6 py-5 text-lg italic text-foreground">
              "The value should match the moment — and the choice should always stay with the person
              receiving it."
            </blockquote>

            <h3 className="!mt-10 text-xl font-semibold text-foreground">Reading the artwork</h3>
            <p>
              Each card in the collection uses a distinct finish — warm bronze, brushed silver, polished
              gold, rose platinum, crystal diamond and the signature black M360 Super — so tiers are
              recognisable at a glance both in the app and in a shared preview.
            </p>

            <h3 className="!mt-10 text-xl font-semibold text-foreground">Get started</h3>
            <p>
              Read the{" "}
              <Link to="/news/market360-gift-cards-launch" className="font-semibold text-primary hover:underline">launch announcement</Link>{" "}
              for how redemption works, or jump straight to the{" "}
              <Link to="/gift-cards" className="font-semibold text-primary hover:underline">gift cards page</Link>.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap gap-3">
            <Link to="/gift-cards" className="btn-primary"><Gift className="h-4 w-4" /> Browse gift cards</Link>
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
  { slug: "market360-testers-program", to: "/news/market360-testers-program" as const, title: "Inside the Market360 Testers Program", image: "/brand/market360-testers-program.jpg", category: "Community" },
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
