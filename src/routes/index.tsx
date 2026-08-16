import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Counter } from "@/components/home/Counter";
import { Marquee } from "@/components/home/Marquee";
import { GiftCardsTeaser } from "@/components/home/GiftCardsTeaser";
// Latest news cards — edit slugs/titles/images directly here.
const newsPosts = [
  { slug: "market360-gift-cards-launch" as const, href: "/news/market360-gift-cards-launch" as const, category: "Announcement", title: "Introducing Market360 Gift Cards", excerpt: "Six e-gift card tiers, from Le 100 to Le 1,000, delivered instantly.", date: "Jun 20, 2026", readTime: "5 min read", image: "/brand/market360-gift-card-collection-landscape.webp" },
  { slug: "market360-testers-program" as const, href: "/news/market360-testers-program" as const, category: "Community", title: "Inside the Market360 Testers Program", excerpt: "Early access for shoppers and sellers, plus a direct line into the roadmap.", date: "Jun 16, 2026", readTime: "5 min read", image: "/brand/market360-testers-program.jpg" },
  { slug: "market360-android-app-live" as const, href: "/news/market360-android-app-live" as const, category: "Product", title: "The Market360 Android app is live", excerpt: "The full marketplace, now in your pocket on Google Play.", date: "Jun 14, 2026", readTime: "4 min read", image: "/brand/market360-android-app.webp" },
];
import {
  ArrowRight, Star, ChevronDown, ChevronLeft, ChevronRight,
  Download as DownloadIcon, QrCode, Image as ImageIcon, Copy, Check, Tag,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// =============================================================================
// IMAGES — every image on this page lives here, and only here.
// To change any picture on the site, just edit the src string below —
// nothing else in the file needs to change.
//   e.g. hero: "/brand/hero-image.jpg"  →  hero: "/brand/my-new-hero.jpg"
// Drop new files in /public/brand/ (or point at a full https:// URL) and
// update the matching line. Keep the same aspect ratio as the original
// for the best fit (see the note next to each image).
// =============================================================================
const IMAGES = {
  // --- Hero — the phone mockup carousel at the very top of the page ---------
  // Portrait, ~9:16. Add/remove entries to change how many slides rotate.
  heroSlides: [
    { src: "/brand/market360-app-marketplace-home.jpg", alt: "The Market360 app showing the marketplace home feed" },
    { src: "/brand/market360-wallet-app.webp", alt: "The Market360 wallet screen with a live balance" },
    { src: "/brand/market360-seller-dashboard.webp", alt: "A verified Market360 seller managing their store" },
  ],
  // Phone mockup used in the "Download the app" section. Portrait, ~9:16.
  heroSecondary: "/brand/market360-buy-sell-pay-grow.webp",

  // --- People / lifestyle shots — used in "How it works", Wallet, Why -------
  buyer: "/brand/market360-buyer-shopping.jpg",       // 4:3 or 16:9 — a buyer using the app
  seller: "/brand/market360-seller-store.webp",     // 16:9 — a verified seller at work
  wallet: "/brand/market360-wallet-app.webp",     // 9:16 — wallet / transfer screen
  delivery: "/brand/market360-delivery-tracking.jpg", // 16:10 — delivery / logistics shot

  // --- Category tiles — the bento grid in "Explore every category" ---------
  catElectronics: "/brand/market360-category-electronics.webp", // 16:9 (this one is the big tile)
  catFashion: "/brand/market360-category-fashion.webp",         // 4:3
  catPhones: "/brand/market360-category-phones-tablets.webp",           // 4:3
  catVehicles: "/brand/market360-category-vehicles.webp",       // 4:3
  catProperty: "/brand/market360-category-property.webp",       // 4:3

  // --- "How Market360 works" journey carousel — 3D icon renders -------------
  // 16:10, transparent or brand-colored background, consistent 3D render
  // style. Drop files in /public/brand/3d-crousel/ using these exact names.
  journeyExplore: "/brand/3d-crousel/01-explore-marketplace.webp",
  journeyPay: "/brand/3d-crousel/02-pay-wallet.webp",
  journeyShip: "/brand/3d-crousel/03-ship-track.webp",
  journeySell: "/brand/3d-crousel/04-sell-grow.webp",
} as const;

// Back-compat aliases so the rest of the page reads naturally — these just
// point at the IMAGES object above, so you still only ever edit one place.
const imgHero = IMAGES.heroSlides[0].src;
const imgHeroSecondary = IMAGES.heroSecondary;
const imgBuyer = IMAGES.buyer;
const imgSeller = IMAGES.seller;
const imgWallet = IMAGES.wallet;
const imgDelivery = IMAGES.delivery;
const imgCatElectronics = IMAGES.catElectronics;
const imgCatFashion = IMAGES.catFashion;
const imgCatPhones = IMAGES.catPhones;
const imgCatVehicles = IMAGES.catVehicles;
const imgCatProperty = IMAGES.catProperty;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Market360 Sl" },
      { name: "description", content: "Sierra Leone's #1 online marketplace" },
      { property: "og:title", content: "Market360 Sl" },
      { property: "og:description", content: "Sierra Leone's #1 online marketplace" },
      { property: "og:url", content: "https://market360-web.lovable.app/" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/uaTGTTTP6CZvDiW0j9X2wXr0ezW2/social-images/social-1783796844307-5448f48a-5176-48e7-8f87-50bf9c4934e5-1_all_31722.webp" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* =============================================================================
   Shared primitives — scroll reveals and a skeleton-loading image
   ============================================================================= */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      }}
      className={`opacity-0 transition-all duration-700 ease-out will-change-transform ${inView ? "!opacity-100" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Image with a subtle skeleton placeholder — no layout shift, quiet fade-in. */
function ImgFade({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // If the browser already has this image cached, the `load` event can fire
  // (or may already have fired) before React attaches the onLoad handler
  // below — that race is what made images "sometimes" fail to appear.
  // Checking `.complete` on mount/ref-attach catches that case every time.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setStatus("loaded");
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,theme(colors.secondary)_8%,theme(colors.border)_18%,theme(colors.secondary)_33%)] bg-[length:200%_100%]" />
      )}
      {status === "error" ? (
        // Graceful fallback: if the file at `src` is missing/404s, never show a
        // broken image or a stuck skeleton — show a tasteful branded tile instead.
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-secondary">
          <ImageIcon className="h-7 w-7 text-primary/50" />
        </div>
      ) : (
        <img
          ref={(node) => {
            imgRef.current = node;
            // Handles the case where the image is already complete by the
            // time this ref callback runs (e.g. instant cache hit).
            if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
          }}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-opacity duration-700 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

/** Consistent section header — a quiet typographic kicker, a confident statement,
 *  one line of support. No icon badge, no pill — the label does the work on its own. */
function SectionHead({
  eyebrow,
  title,
  support,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  support?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <span className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-primary/40" aria-hidden />
        {eyebrow}
      </span>
      <h2 className={`mt-4 text-3xl font-bold tracking-tight md:text-4xl ${center ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
        {title}
      </h2>
      {support && (
        <p className={`mt-3 text-muted-foreground ${center ? "mx-auto max-w-xl" : "max-w-lg"}`}>{support}</p>
      )}
    </div>
  );
}

/* =============================================================================
   Carousel — a real carousel: arrow controls on desktop, swipe on touch,
   dot indicators everywhere, and snap-scrolling so it never lands mid-card.
   Drop-in replacement for the old bare-scroll HScroll: pass the same
   pre-wrapped snap-item children, plus a `count` so dots/arrows know how
   many stops there are.
   ============================================================================= */

function Carousel({
  ariaLabel,
  count,
  children,
  className = "",
}: {
  ariaLabel: string;
  count: number;
  children: ReactNode;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(count > 1);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
  };

  useEffect(() => {
    updateEdges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function scrollByDir(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85 * dir, behavior: "smooth" });
  }

  function scrollToIndex(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: max * (i / Math.max(count - 1, 1)), behavior: "smooth" });
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        onScroll={updateEdges}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            aria-label="Scroll to previous"
            className="absolute -left-4 top-[calc(50%-1rem)] hidden -translate-y-1/2 rounded-full border border-border bg-card p-2.5 shadow-elevated transition-all hover:bg-accent disabled:pointer-events-none disabled:opacity-0 lg:grid lg:place-items-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canNext}
            aria-label="Scroll to next"
            className="absolute -right-4 top-[calc(50%-1rem)] hidden -translate-y-1/2 rounded-full border border-border bg-card p-2.5 shadow-elevated transition-all hover:bg-accent disabled:pointer-events-none disabled:opacity-0 lg:grid lg:place-items-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-4 flex justify-center gap-1.5 lg:hidden">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to item ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* =============================================================================
   Hero — solid, confident ground + a properly framed product shot. The
   screenshots in /brand are portrait app captures, not wide photography, so
   they're shown contained in a device frame here rather than stretched as a
   full-bleed background (which is what produced the muddy banding before).
   ============================================================================= */

const heroCategories = ["Electronics", "Fashion", "Phones & Tablets", "Vehicles", "Property"];

function HeroSearchBar() {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-stretch overflow-hidden rounded-full bg-white shadow-elevated ring-1 ring-black/5"
    >
      <label htmlFor="hero-search" className="sr-only">
        Search Market360
      </label>
      <input
        id="hero-search"
        type="text"
        placeholder="Search products, brands, or sellers"
        className="min-w-0 flex-1 bg-transparent px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="container-pro relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              Sierra Leone's marketplace
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Everything to buy and sell, in one place.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-background/70">
              Thousands of listings from verified sellers, secure wallet payments, and
              delivery across the country.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <HeroSearchBar />
            <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
              {heroCategories.map((c) => (
                <Link
                  key={c}
                  to="/features"
                  className="rounded-full px-3 py-1.5 text-background/70 transition-colors hover:bg-background/10 hover:text-background"
                >
                  {c}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/download" className="btn-primary">
                Download the app
              </Link>
              <Link to="/features" className="rounded-full border border-background/25 px-5 py-3 text-sm font-semibold transition-colors hover:bg-background/10">
                Become a seller
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-9 text-sm text-background/55">
              4.8 average rating · 25,000+ people using Market360 · Verified merchants only
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2.5rem] border-8 border-background/15 bg-background/5 shadow-elevated">
            <ImgFade src={imgHero} alt="The Market360 app showing the marketplace home feed" loading="eager" className="h-full w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Live Ledger — a quiet, precise proof strip. Real activity, not icon soup.
   ============================================================================= */

const ledgerEvents = [
  { text: "Aminata K. received NLE 450 from a Freetown Threads sale" },
  { text: "New order placed for a Smart Watch S9 in Bo" },
  { text: "Ibrahim T. cashed out NLE 1,200 to Orange Money" },
  { text: "GreenPower SL just became a Verified Seller" },
  { text: "A protected payment was released after delivery" },
  { text: "An order from Freetown arrived in Makeni in 48 hours" },
];

function LiveLedger() {
  return (
    <section aria-label="Live activity on Market360" className="relative overflow-hidden border-b border-border bg-surface py-4">
      <div className="flex items-center">
        <span className="relative z-10 ml-4 flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Live on Market360
        </span>
        <div className="min-w-0 flex-1">
          <Marquee speed={30}>
            {ledgerEvents.map((e, i) => (
              <span key={i} className="mx-5 whitespace-nowrap text-sm text-muted-foreground">
                {e.text}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   How it works — a genuine 3-step sequence
   ============================================================================= */

const journeySteps = [
  { n: "01", title: "Explore the marketplace", body: "Browse thousands of listings from verified sellers across every category, and message sellers directly in‑app.", img: IMAGES.journeyExplore },
  { n: "02", title: "Pay instantly with Wallet", body: "Settle every order through your Market360 Wallet — funded from Orange Money, Africell Money, or your bank, in seconds.", img: IMAGES.journeyPay },
  { n: "03", title: "Ship & track", body: "Nationwide delivery with real‑time tracking — from Freetown to Bo, Makeni and beyond, in as little as 48 hours.", img: IMAGES.journeyShip },
  { n: "04", title: "Sell and grow", body: "Open a storefront, manage orders, and reach shoppers across Sierra Leone from one simple dashboard.", img: IMAGES.journeySell },
];

function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <SectionHead eyebrow="How Market360 works" title="One app carries you from browsing to owning." support="Swipe through the journey — every step happens inside a single Market360 experience." />
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-10">
          <Carousel ariaLabel="How Market360 works — journey steps" count={journeySteps.length}>
            {journeySteps.map((s, i) => (
              <article
                key={s.title}
                className="snap-start shrink-0 w-[85%] sm:w-[420px] rounded-2xl border border-border bg-card shadow-soft overflow-hidden flex flex-col"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <ImgFade src={s.img} alt={s.title} className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black tracking-wider text-primary">STEP {s.n}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Categories — a single premium bento grid. Replaces the old category rail +
   "trending products" scroller with one confident, image-led showcase.
   ============================================================================= */

const categories = [
  { name: "Electronics", count: "2.4k listings", img: imgCatElectronics, big: true, alt: "Market360 Electronics & Computing category — laptop, smartphone, gaming controller and smartwatch on a green backdrop" },
  { name: "Fashion", count: "3.1k listings", img: imgCatFashion, alt: "Market360 Fashion category — folded knitwear, leather handbag, sneakers and a wristwatch" },
  { name: "Phones & Tablets", count: "1.8k listings", img: imgCatPhones, alt: "Market360 Phones & Tablets category — smartphone, tablet, foldable phone and wireless earbuds" },
  { name: "Vehicles", count: "620 listings", img: imgCatVehicles, alt: "Market360 Vehicles category — matte green helmet, model sports car and a tyre" },
  { name: "Property", count: "410 listings", img: imgCatProperty, alt: "Market360 Property category — modern apartment model with keys and a blueprint" },
];


function DownloadPromptModal({ open, onClose, category }: { open: boolean; onClose: () => void; category: string | null }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="dl-title">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elevated animate-in zoom-in-95 duration-300">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
          <DownloadIcon className="h-7 w-7" />
        </div>
        <h3 id="dl-title" className="mt-5 text-center text-2xl font-bold">Download Market360 to browse {category ?? "this category"}</h3>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          The full catalogue, seller messaging, wallet payments and delivery tracking all live inside the Market360 app.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link to="/download" onClick={onClose} className="btn-primary w-full justify-center">
            <DownloadIcon className="h-4 w-4" /> Get the app
          </Link>
          <button type="button" onClick={onClose} className="btn-ghost w-full justify-center">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoriesShowcase() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="marketplace" className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <SectionHead
              eyebrow="Marketplace"
              title="Explore every category"
              support="From electronics to property — listed by sellers who've been through ID and business verification."
            />
          </Reveal>
          <button type="button" onClick={() => setOpen("all categories")} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            Browse all categories <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className={c.big ? "md:col-span-2 md:row-span-2" : ""}>
              <button
                type="button"
                onClick={() => setOpen(c.name)}
                aria-label={`Open ${c.name} — download app`}
                className="surface-card surface-card-hover group relative block h-full w-full overflow-hidden text-left"
              >
                <ImgFade
                  src={c.img}
                  alt={c.alt}

                  className={`${c.big ? "aspect-[16/9] md:aspect-auto md:h-full" : "aspect-[4/3]"} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className={`font-bold text-white ${c.big ? "text-2xl" : "text-lg"}`}>{c.name}</p>
                    <p className="text-sm text-white/75">{c.count}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 text-foreground transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <DownloadPromptModal open={open !== null} onClose={() => setOpen(null)} category={open} />
    </section>
  );
}

/* =============================================================================
   Promo codes — real, tap-to-copy codes. A tangible reason to open the app.
   ============================================================================= */

const promoCodes = [
  { code: "WELCOME20", desc: "20% off your first marketplace order", tag: "New users", expires: "Ends 31 Aug" },
  { code: "WALLET10", desc: "NLE 10 bonus on your first wallet top‑up", tag: "Wallet", expires: "Ends 31 Aug" },
  { code: "FREESHIP", desc: "Free delivery on orders over NLE 500", tag: "Marketplace", expires: "Ongoing" },
  { code: "SHOP50", desc: "NLE 50 off selected marketplace orders", tag: "Shopping", expires: "New buyers" },
];

function PromoCard({ code, desc, tag, expires }: { code: string; desc: string; tag: string; expires: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, code is still visible to copy by hand.
    }
  }

  return (
    <div className="surface-card relative overflow-hidden p-6">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10" aria-hidden />
      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          <Tag className="h-3 w-3" /> {tag}
        </span>
        <span className="text-[11px] text-muted-foreground">{expires}</span>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy promo code ${code}`}
        className="relative mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-left transition-colors hover:bg-primary/10"
      >
        <span className="font-mono text-lg font-bold tracking-widest text-primary">{code}</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy
            </>
          )}
        </span>
      </button>

      <p className="relative mt-3 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function PromoCodes() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <SectionHead eyebrow="Promo codes" title="Codes you can actually use" support="Copy a code below and apply it at checkout in the app — no sign-up required to see them." />
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <Carousel ariaLabel="Market360 promo codes" count={promoCodes.length}>
            {promoCodes.map((p) => (
              <div key={p.code} className="snap-start shrink-0 w-[85%] sm:w-80">
                <PromoCard {...p} />
              </div>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Wallet — the layer that makes the marketplace actually work
   ============================================================================= */

const walletFeatures = [
  { title: "Send & receive instantly", body: "Move money to any Market360 user in seconds — no waiting on bank clearance." },
  { title: "Top up your way", body: "Fund your wallet from Orange Money, Africell Money, or a linked bank card." },
  { title: "Full audit trail", body: "Every transaction is logged and traceable, so disputes resolve in minutes, not weeks." },
  { title: "Bank‑grade protection", body: "Encrypted transfers and fraud monitoring watch every payment around the clock." },
];

function WalletShowcase() {
  return (
    <section id="wallet" className="section-pad">
      <div className="container-pro grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <SectionHead
            eyebrow="Market360 Wallet"
            title="Your money moves as fast as your business does."
            support="The wallet is what turns Market360 from an app into an economy — every sale, transfer, and payout settles in real time, without a bank branch in sight."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {walletFeatures.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 90} className="surface-card border-t-2 border-t-primary/40 p-5">
                <p className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </Reveal>
            ))}
          </div>
          <Link to="/download" className="btn-primary mt-8">
            Get the wallet
          </Link>
        </Reveal>

        <Reveal delay={120} className="relative order-1 mx-auto max-w-xs lg:order-2 lg:max-w-sm">
          <div className="rounded-[2rem] border-8 border-foreground/90 bg-foreground shadow-elevated overflow-hidden">
            <ImgFade src={imgWallet} alt="A Market360 user sending a wallet transfer" className="aspect-[9/16]" />
          </div>
          <div className="absolute -left-6 bottom-10 hidden rounded-2xl border border-border bg-card p-4 shadow-elevated sm:block">
            <p className="text-xs text-muted-foreground">Transfer sent</p>
            <p className="text-lg font-bold text-emerald-600">+ NLE 2,000</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Why Market360 — one bento grid, no repeats
   ============================================================================= */

function WhyMarket360() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <SectionHead eyebrow="Why Market360" title="Built differently, for how Sierra Leone actually trades." />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="surface-card relative overflow-hidden p-8 md:col-span-2 md:row-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Verified sellers</p>
            <h3 className="mt-3 text-2xl font-bold">Every seller is verified — before they list a single item.</h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              ID checks, business verification, and ongoing performance monitoring keep low‑quality and
              fraudulent sellers off the platform, so buyers can trust every purchase.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <ImgFade src={imgSeller} alt="A verified Market360 seller preparing an order" className="aspect-[16/9]" />
            </div>
          </Reveal>

          <Reveal delay={80} className="surface-card border-t-2 border-t-primary/40 p-6">
            <h3 className="font-bold">Settlements in seconds</h3>
            <p className="mt-1 text-sm text-muted-foreground">Not days like a traditional bank transfer.</p>
          </Reveal>

          <Reveal delay={140} className="surface-card border-t-2 border-t-primary/40 p-6">
            <h3 className="font-bold">Nationwide delivery</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fastest turnaround across Freetown, Bo, and Makeni.</p>
          </Reveal>

          <Reveal delay={200} className="surface-card border-t-2 border-t-primary/40 p-6">
            <h3 className="font-bold">Bank‑grade security</h3>
            <p className="mt-1 text-sm text-muted-foreground">Encrypted transfers with 24/7 fraud monitoring.</p>
          </Reveal>

          <Reveal delay={260} className="surface-card border-t-2 border-t-primary/40 p-6">
            <h3 className="font-bold">Real human support</h3>
            <p className="mt-1 text-sm text-muted-foreground">In‑app help, resolved by people who know the market.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Stats — trust at scale
   ============================================================================= */

function Stats() {
  const stats = [
    { value: 25000, suffix: "+", label: "Active users" },
    { value: 84000, suffix: "+", label: "Products listed" },
    { value: 1200, suffix: "+", label: "Verified sellers" },
    { value: 320000, suffix: "+", label: "Trades executed" },
    { value: 1, suffix: "", label: "Country served", note: "Sierra Leone" },
    { value: 2400000, suffix: "+", label: "Marketplace transactions" },
  ];
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <Reveal>
          <SectionHead eyebrow="By the numbers" title="Trusted at scale." center />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="text-center">
              <p className="text-3xl font-bold text-primary md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              {s.note && <p className="text-xs text-muted-foreground/70">{s.note}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Testimonials
   ============================================================================= */

const testimonials = [
  { name: "Aminata K.", role: "Seller · Freetown Threads", rating: 5, quote: "Market360 helped me triple my orders in three months. The wallet means I'm never waiting days to get paid.", img: imgSeller },
  { name: "Mohamed S.", role: "Buyer · Bo", rating: 5, quote: "I ordered a phone from Freetown and it arrived in 48 hours. Everything felt safe from start to finish.", img: imgBuyer },
  { name: "Fatmata J.", role: "Investor", rating: 5, quote: "The Retail Growth Fund pays out monthly like clockwork. I love seeing exactly which stores my money supports.", img: imgHero },
  { name: "Ibrahim T.", role: "Rider · Delivery Partner", rating: 5, quote: "As a delivery partner, I get more orders and reliable pay through the wallet every single week.", img: imgDelivery },
];

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <SectionHead eyebrow="Loved by users" title="What people are saying." />
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <Carousel ariaLabel="Customer testimonials" count={testimonials.length}>
            {testimonials.map((t) => (
              <div key={t.name} className="snap-start shrink-0 w-80 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <ImgFade src={t.img} alt="" className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              </div>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Partners
   ============================================================================= */

const partners = ["Orange Money", "Africell", "Sierra Post", "SLCB", "UBA SL", "Ecobank", "Rokel", "Vodacom"];

function Partners() {
  return (
    <section className="border-y border-border bg-surface py-10">
      <div className="container-pro">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Integrated with the payment partners Sierra Leone already trusts
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee speed={35}>
            {partners.map((p) => (
              <span key={p} className="whitespace-nowrap text-2xl font-bold tracking-tight text-muted-foreground/70">
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Latest news — light touch, supplementary
   ============================================================================= */

function LatestNews() {
  const posts = newsPosts.slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <SectionHead eyebrow="News" title="From the newsroom" />
          </Reveal>
          <Link to="/news" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p: typeof newsPosts[number], i: number) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link to={p.href} className="surface-card surface-card-hover block overflow-hidden">
                <ImgFade src={p.image} alt={p.title} className="aspect-[16/10]" />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-accent px-2 py-0.5 font-semibold text-primary">{p.category}</span>
                    <span>· {p.readTime}</span>
                    <span>· {p.date}</span>
                  </div>
                  <h3 className="mt-2 font-bold leading-tight line-clamp-2">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   FAQ
   ============================================================================= */

const faqs = [
  { q: "Is Market360 free to download?", a: "Yes — the app is 100% free to download on Google Play. An App Store version is coming soon." },
  { q: "How does the Market360 Wallet work?", a: "The wallet lets you store, send, receive, and pay in seconds. Settlements go through in real time and every transaction has a full audit trail." },
  { q: "Are my purchases protected?", a: "Yes. Verified sellers, secure payment controls, order tracking, and dispute support help protect every eligible marketplace order." },
  { q: "How do you verify sellers?", a: "Every seller goes through ID and business verification before listing. Verified sellers earn a badge that appears on all their listings." },
  { q: "Which locations do you deliver to?", a: "We deliver across Sierra Leone, with the fastest turnaround in greater Freetown, Bo, and Makeni." },
  { q: "How do I contact support?", a: "Reach us through the in‑app help center, on the Contact page, or by email at hello@market360.shop." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="FAQ" title="Frequently asked questions" center />
        </Reveal>
        <div className="mt-8 space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={f.q} delay={idx * 50} className="surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Store badges — original inline SVG marks (no external logo assets required)
   and a real, scannable QR code that deep-links straight to the Play listing.
   ============================================================================= */

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.market360.devlink";
const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(PLAY_STORE_URL)}`;

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.9 4.3c.3-1 1.15-1.8 2.2-2 .16 1.05-.24 2.15-.85 2.85-.58.72-1.55 1.28-2.45 1.2-.15-1 .27-1.6 1.1-2.05Z" />
      <path d="M17.7 9.6c-1-1.2-2.35-1.85-3.8-1.85-1.05 0-1.85.5-2.6.5-.75 0-1.65-.5-2.7-.5-1.85 0-3.75 1.45-4.4 3.55-1.05 3.1.3 7.6 1.95 9.65.8 1 1.65 2.05 2.8 2 1.1 0 1.45-.65 2.7-.65s1.65.65 2.8.65c1.15 0 1.9-1 2.7-2.05.65-.95 1.05-1.85 1.35-2.7-2.9-1.15-3.3-5.3-.6-7.35-.78-.68-1.35-.97-2.1-1.25Z" />
    </svg>
  );
}

function PlaySymbol({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="market360-play-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="35%" stopColor="#12D18E" />
          <stop offset="68%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#FF5A5F" />
        </linearGradient>
      </defs>
      <path d="M4 3.3v17.4a1 1 0 0 0 1.53.85l14.2-8.7a1 1 0 0 0 0-1.7L5.53 2.45A1 1 0 0 0 4 3.3Z" fill="url(#market360-play-grad)" />
    </svg>
  );
}

function AppStoreButton() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-disabled="true"
      title="Coming soon to the App Store"
      className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl border border-border bg-secondary px-5 py-3 text-muted-foreground"
    >
      <AppleGlyph className="h-7 w-7 shrink-0" />
      <span>
        <span className="block text-[10px] uppercase tracking-wider opacity-70">Coming soon on the</span>
        <span className="block text-base font-semibold leading-tight">App Store</span>
      </span>
    </a>
  );
}

function PlayStoreButton() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-90"
    >
      <PlaySymbol className="h-7 w-7 shrink-0" />
      <span>
        <span className="block text-[10px] uppercase tracking-wider opacity-70">GET IT ON</span>
        <span className="block text-base font-semibold leading-tight">Google Play</span>
      </span>
    </a>
  );
}

/** A real, scannable QR — and the whole tile is also a tap target on mobile. */
function InstallQr() {
  const [broken, setBroken] = useState(false);
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scan or tap to install Market360 from Google Play"
      className="absolute -right-4 top-8 block rounded-2xl border border-border bg-card p-3 shadow-elevated transition-transform hover:-translate-y-0.5"
    >
      {broken ? (
        <div className="grid h-20 w-20 place-items-center rounded-lg bg-white">
          <QrCode className="h-12 w-12 text-foreground" strokeWidth={1.25} />
        </div>
      ) : (
        <img
          src={qrCodeSrc}
          alt="QR code linking to the Market360 Google Play listing"
          width={80}
          height={80}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-20 w-20 rounded-lg bg-white object-contain p-1"
        />
      )}
      <p className="mt-2 text-center text-[10px] font-semibold text-muted-foreground">Scan or tap to install</p>
    </a>
  );
}

/* =============================================================================
   Download app
   ============================================================================= */

function DownloadApp() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-14">
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Get the app</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Download Market360</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                The complete marketplace app for Sierra Leone — buy, sell, pay and get delivery in one place. Free to download.
              </p>
              <ul className="mt-6 max-w-md space-y-2.5 text-sm text-muted-foreground">
                {["Instant wallet transfers", "Verified sellers & buyer protection", "Thousands of live listings", "Delivery across the country"].map((b) => (
                  <li key={b} className="border-l-2 border-primary/30 pl-3">{b}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <PlayStoreButton />
                <AppStoreButton />
              </div>
            </div>
            <div className="relative mx-auto max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border-8 border-foreground/90 bg-foreground shadow-elevated">
                <ImgFade src={imgHeroSecondary} alt="Market360 app" className="aspect-[9/16]" />
              </div>
              <InstallQr />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Final CTA
   ============================================================================= */

function FinalCta() {
  return (
    <section className="section-pad pt-0">
      <div className="container-pro">
        <Reveal className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-16">
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">Join Sierra Leone's #1 marketplace today.</h2>
              <p className="mt-4 max-w-xl text-background/70">
                Download the app, discover trusted sellers, and shop across Sierra Leone — everything you need is one tap away.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link to="/download" className="rounded-full bg-background px-5 py-3 font-semibold text-foreground transition-opacity hover:opacity-90">
                Download app
              </Link>
              <Link to="/features" className="rounded-full border border-background/30 px-5 py-3 font-semibold text-background transition-colors hover:bg-background/10">
                Browse marketplace
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Root — understand → marketplace → wallet → invest (CTA) → differentiate →
   prove it → convert.
   ============================================================================= */

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <LiveLedger />
      <HowItWorks />
      <CategoriesShowcase />
      <GiftCardsTeaser />
      <WalletShowcase />
      <WhyMarket360 />
      <Stats />
      <Testimonials />
      <Partners />
      <LatestNews />
      <FAQ />
      <PromoCodes />
      <DownloadApp />
      <FinalCta />
    </SiteLayout>
  );
}
