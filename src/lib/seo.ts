/**
 * Canonical site metadata helpers.
 *
 * Every public URL Google sees — canonical, og:url, og:image, twitter:image —
 * must be an absolute URL on the production domain, never a relative path and
 * never a preview/staging host.
 */

export const SITE_URL = "https://market360.shop";
export const SITE_NAME = "Market360";

/** 1200×630 JPEG — the format every social crawler understands. */
export const DEFAULT_OG_IMAGE = "/brand/market360-social-preview.jpg";
export const DEFAULT_OG_IMAGE_ALT = "Market360 — Sierra Leone's #1 online marketplace";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

type LinkTag = { rel: string; href: string; type?: string; sizes?: string; title?: string };

export interface SeoOptions {
  title: string;
  description: string;
  /** Path of the page on the production domain, e.g. "/wallet". */
  path: string;
  /** Absolute URL or public path of the social share image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  /** Article-only metadata. */
  publishedTime?: string;
  modifiedTime?: string;
}

export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoOptions): { meta: MetaTag[]; links: LinkTag[] } {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });

  return { meta, links: [{ rel: "canonical", href: url }] };
}
