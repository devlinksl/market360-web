import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { getNewsPost, newsPosts } from "@/lib/news-data";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = getNewsPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const BASE = "https://market360-web.lovable.app";
    const url = `${BASE}/news/${post.slug}`;
    const img = post.image.startsWith("http") ? post.image : `${BASE}${post.image}`;
    return {
      meta: [
        { title: `${post.title} — Market360 News` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: img },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          description: post.excerpt,
          image: [img],
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "Market360", logo: { "@type": "ImageObject", url: `${BASE}/brand/market360-logo.png` } },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          articleSection: post.category,
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-pro section-pad text-center">
        <h1 className="text-4xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find that update.</p>
        <Link to="/news" className="btn-primary mt-6 inline-flex">Back to news</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="container-pro section-pad text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button className="btn-primary mt-6" onClick={reset}>Try again</button>
      </div>
    </SiteLayout>
  ),
  component: NewsArticle,
});

function NewsArticle() {
  const { post } = Route.useLoaderData();
  const related = newsPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-surface">
          <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/0" />
        </div>

        <div className="container-pro -mt-24 relative pb-16">
          <div className="surface-card p-8 md:p-12 max-w-3xl mx-auto">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> All updates
            </Link>
            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>

            <p className="mt-6 text-lg text-foreground leading-relaxed">{post.excerpt}</p>

            <div className="mt-8 space-y-6">
              {post.body.map((b: { heading?: string; paragraph: string }, i: number) => (
                <div key={i}>
                  {b.heading && <h2 className="text-2xl font-bold mt-8 mb-3">{b.heading}</h2>}
                  <p className="text-base text-muted-foreground leading-relaxed">{b.paragraph}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/tester" className="btn-primary">Join the Tester Program <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/download" className="btn-ghost">Download the App</Link>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold">Keep reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="surface-card surface-card-hover overflow-hidden p-0 flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                    <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                    <h3 className="mt-2 font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground flex-1">{p.date}</p>
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
