import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, absoluteUrl } from "../lib/seo";
const logoAsset = "/brand/market360-logo.webp";

const NOT_FOUND_LINKS = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/gift-cards", label: "Gift Cards" },
  { to: "/download", label: "Download" },
  { to: "/help", label: "Help Centre" },
] as const;

function StatusShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className="relative w-full max-w-lg text-center">{children}</div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <StatusShell>
      <img
        src={logoAsset}
        alt=""
        aria-hidden
        width={56}
        height={56}
        className="mx-auto h-14 w-14 rounded-2xl shadow-soft"
      />
      <p className="eyebrow mx-auto mt-6">Error 404</p>
      <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        This page has moved on.
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        The link you followed is broken or the page no longer exists. Here's where most people go next.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <Link to="/help" className="btn-ghost">Visit the Help Centre</Link>
      </div>
      <nav aria-label="Popular pages" className="mt-10 flex flex-wrap justify-center gap-2">
        {NOT_FOUND_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </StatusShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <StatusShell>
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card text-primary shadow-soft">
        <RefreshCw className="h-6 w-6" aria-hidden />
      </div>
      <p className="eyebrow mx-auto mt-6">Something went wrong</p>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        This page didn't load.
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        The problem is on our side, not yours. Retry in a moment — if it keeps happening, our team is one message away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">
          <RefreshCw className="h-4 w-4" aria-hidden /> Try again
        </button>
        <a href="/" className="btn-ghost">Go home</a>
        <a href="/contact" className="btn-ghost">Contact support</a>
      </div>
    </StatusShell>
  );
}

const SITE_TITLE = "Market360 — Sierra Leone's #1 Online Marketplace";
const SITE_DESC = "Shop smarter with Market360, Sierra Leone's online marketplace for electronics, fashion, and more.";
const OG_IMAGE = absoluteUrl(DEFAULT_OG_IMAGE);
const OG_IMAGE_ALT = DEFAULT_OG_IMAGE_ALT;


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "author", content: "Market360" },
      { name: "publisher", content: "Market360" },
      { name: "application-name", content: "Market360" },
      { name: "apple-mobile-web-app-title", content: "Market360" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "theme-color", content: "#16a34a" },
      { name: "color-scheme", content: "light" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
      { name: "googlebot", content: "index,follow" },
      { httpEquiv: "content-language", content: "en" },
      { property: "og:site_name", content: "Market360" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_SL" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Market360" },
      { name: "twitter:creator", content: "@Market360" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Keep the supplied Market360 logo as the first, globally discoverable favicon.
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/market360-favicon.png" },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48 32x32 16x16", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/market360-favicon.png", type: "image/png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "alternate", type: "application/xml", title: "Sitemap", href: `${SITE_URL}/sitemap.xml` },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Market360",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/brand/market360-logo.webp`,
                width: 512,
                height: 512,
              },
              sameAs: [
                "https://play.google.com/store/apps/details?id=app.market360.devlink",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "support@market360.shop",
                  areaServed: "SL",
                  availableLanguage: ["English"],
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Market360",
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/help?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "MobileApplication",
              name: "Market360",
              operatingSystem: "ANDROID",
              applicationCategory: "ShoppingApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              downloadUrl: "https://play.google.com/store/apps/details?id=app.market360.devlink",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
