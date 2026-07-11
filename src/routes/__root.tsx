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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
const logoAsset = "/brand/market360-logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mx-auto">404</p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://market360.shop";
const SITE_DESC = "Market360 is Sierra Leone's #1 online shopping marketplace to buy and sell electronics, fashion, phones, vehicles, and more — with a built-in wallet, secure payments, verified sellers, and delivery.";
const OG_IMAGE = `${SITE_URL}/brand/flyer-endless.png`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Market360 — Sierra Leone's #1 Online Marketplace" },
      { name: "description", content: SITE_DESC },
      { name: "author", content: "Market360" },
      { name: "publisher", content: "Market360" },
      { name: "application-name", content: "Market360" },
      { name: "theme-color", content: "#00A859" },
      { name: "color-scheme", content: "light" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
      { name: "googlebot", content: "index,follow" },
      { httpEquiv: "content-language", content: "en" },
      { property: "og:site_name", content: "Market360" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_SL" },
      { property: "og:title", content: "Market360 — Sierra Leone's #1 Online Marketplace" },
      { property: "og:description", content: SITE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Market360 — One App. Endless Opportunities." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Market360" },
      { name: "twitter:creator", content: "@Market360" },
      { name: "twitter:title", content: "Market360 — Sierra Leone's #1 Online Marketplace" },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: logoAsset },
      { rel: "apple-touch-icon", href: logoAsset },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
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
                url: `${SITE_URL}/brand/market360-logo.png`,
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
