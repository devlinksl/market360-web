import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Gift, Newspaper } from "lucide-react";

/* =============================================================================
   News index — the Market360 newsroom.
   To add an article: create src/routes/news.<slug>.tsx and add an entry below.
   No shared data file, no dynamic route — everything is editable in place.
   ============================================================================= */

const ARTICLES = [
  {
    to: "/news/market360-gift-cards-launch" as const,
    category: "Announcement",
    title: "Introducing Market360 Gift Cards",
    excerpt:
      "Six e-gift card tiers — from Le 100 to Le 1,000 — are now part of Market360. Delivered digitally, redeemed in the app, spendable across the whole marketplace.",
    date: "Jun 20, 2026",
    readTime: "5 min read",
    image: "/brand/market360-gift-cards-hero.webp",
    alt: "The Market360 e-gift card collection on a green diagonal backdrop",
  },
  {
    to: "/news/market360-gift-card-collection" as const,
    category: "Collection",
    title: "A closer look at the Market360 Gift Card collection",
    excerpt:
      "Bronze to M360 Super: a visual tour of all six cards, what each is designed for, and how the denominations were chosen.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
    image: "/brand/market360-m360-super-gift-card.webp",
    alt: "Market360 M360 Super e-gift card worth Le 1,000",
  },
  {
    to: "/news/market360-testers-program" as const,
    category: "Community",
    title: "Inside the Market360 Testers Program",
    excerpt:
      "Early access for shoppers and sellers — and a direct line into what Market360 builds next.",
    date: "Jun 16, 2026",
    readTime: "5 min read",
    image: "/brand/news-tester-launch.jpg",
    alt: "Market360 testers using the marketplace app",
  },
  {
    to: "/news/market360-android-app-live" as const,
    category: "Product",
    title: "The Market360 Android app is live on Google Play",
    excerpt:
      "The full marketplace — browsing, selling, the wallet and gift cards — now fits in your pocket.",
    date: "Jun 14, 2026",
    readTime: "4 min read",
    image: "/brand/market360-android-app.webp",
    alt: "Download Market360 today — the Android app on a phone",
  },
];

const TITLE = "Market360 Newsroom — Official announcements & updates";
const DESC =
  "Official Market360 announcements: gift cards, the Testers Program, and the Android app. Straight from the team building Sierra Leone's online shopping marketplace.";
const URL = "https://market360.shop/news";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Market360 Newsroom" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://market360.shop/brand/market360-gift-cards-hero.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://market360.shop/brand/market360-gift-cards-hero.webp" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Market360 Newsroom",
          description: DESC,
          url: URL,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ARTICLES.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: a.title,
              url: `https://market360.shop${a.to}`,
            })),
          },
        }),
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <SiteLayout>
      {/* Masthead */}
      <section className="border-b border-border bg-surface">
        <div className="container-pro py-14 md:py-20">
          <span className="eyebrow"><Newspaper className="h-3 w-3" /> Newsroom</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Official news from <span className="gradient-text">Market360.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Product launches, program announcements and platform updates — published by the team
            building Sierra Leone's online shopping marketplace.
          </p>
        </div>
      </section>

      {/* Featured story */}
      <section className="section-pad">
        <div className="container-pro">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Featured story</p>
          <Link to={featured.to} className="group mt-5 block">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-surface">
                <img
                  src={featured.image}
                  alt={featured.alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{featured.category}</span>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-5 text-sm text-muted-foreground">{featured.date} · {featured.readTime}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary group-hover:underline">
                  Read the story <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Editorial grid */}
      <section className="section-pad pt-0">
        <div className="container-pro">
          <div className="flex items-end justify-between border-t border-border pt-10">
            <h2 className="text-2xl font-bold tracking-tight">Latest stories</h2>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.to} to={p.to} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">{p.category}</span>
                <h3 className="mt-2 text-xl font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">{p.date} · {p.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem links */}
      <section className="section-pad pt-0">
        <div className="container-pro grid gap-6 md:grid-cols-3">
          <Link to="/gift-cards" className="surface-card surface-card-hover p-6">
            <Gift className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold">Market360 Gift Cards</p>
            <p className="mt-1 text-sm text-muted-foreground">Six denominations, delivered instantly.</p>
          </Link>
          <Link to="/tester" className="surface-card surface-card-hover p-6">
            <Newspaper className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold">Testers Program</p>
            <p className="mt-1 text-sm text-muted-foreground">Get early access and shape the roadmap.</p>
          </Link>
          <Link to="/download" className="surface-card surface-card-hover p-6">
            <ArrowRight className="h-5 w-5 text-primary" />
            <p className="mt-3 font-semibold">Download the app</p>
            <p className="mt-1 text-sm text-muted-foreground">Market360 for Android on Google Play.</p>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
