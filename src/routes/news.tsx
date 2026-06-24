import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { newsPosts } from "@/lib/news-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — Market360" },
      { name: "description", content: "Latest product updates, announcements, and roadmap news from the Market360 team." },
      { property: "og:title", content: "Market360 News & Updates" },
      { property: "og:description", content: "Stay in the loop with the latest from Market360." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [featured, ...posts] = newsPosts;
  return (
    <SiteLayout>
      <PageHero
        eyebrow="News & Updates"
        title={<>Fresh from <span className="gradient-text">Market360.</span></>}
        description="Announcements, product updates, and what's next."
      />

      <section className="section-pad">
        <div className="container-pro">
          <Link to="/news/$slug" params={{ slug: featured.slug }} className="block">
            <article className="surface-card surface-card-hover overflow-hidden p-0">
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-surface">
                  <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
                </div>
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured · {featured.category}</span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">{featured.title}</h2>
                  <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{featured.date} · {featured.readTime}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </div>
            </article>
          </Link>

          <div className="mt-12">
            <h2 className="text-2xl font-bold">All updates</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="block">
                  <article className="surface-card surface-card-hover overflow-hidden p-0 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                      <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                      <h3 className="mt-2 font-semibold text-lg leading-snug">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{p.date}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
