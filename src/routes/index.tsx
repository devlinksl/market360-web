import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HScroll } from "@/components/home/HScroll";
import { Counter } from "@/components/home/Counter";
import { Marquee } from "@/components/home/Marquee";
import { newsPosts } from "@/lib/news-data";
import {
  ShieldCheck, Zap, BadgeCheck, Sparkles, Users, LayoutGrid, ArrowRight,
  ShoppingBag, Wallet, TrendingUp,
  Star, ChevronDown, Truck, MessageCircle, BarChart3,
  Bell, CheckCircle2, Download as DownloadIcon, Send, PiggyBank,
  Lock, Layers, Compass, QrCode, HeartHandshake,
  Image as ImageIcon, Copy, Check, Tag, Percent,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type ComponentType } from "react";

// ---------------------------------------------------------------------------
// Images — using your existing brand assets from /public/brand/.
// Swap the files at these paths directly in the repo to update imagery
// anywhere on the page; nothing in the component code needs to change.
// ---------------------------------------------------------------------------
const imgHero = "/brand/hero-buysellgrow.png";
const imgBuyer = "/brand/img-buyer.jpg";
const imgSeller = "/brand/img-seller.jpg";
const imgWallet = "/brand/img-wallet.jpg";
const imgDelivery = "/brand/img-delivery.jpg";
const imgCatElectronics = "/brand/cat-electronics.jpg";
const imgCatFashion = "/brand/cat-fashion.jpg";
const imgCatPhones = "/brand/cat-phones.jpg";
const imgCatVehicles = "/brand/cat-vehicles.jpg";
const imgCatProperty = "/brand/cat-property.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Market360 — Sierra Leone's Marketplace, Wallet & Investment Platform" },
      { name: "description", content: "Market360 is Sierra Leone's all-in-one marketplace, digital wallet, and investment platform. Buy, sell, pay, and grow your money — in one app, one country, one movement." },
      { property: "og:title", content: "Market360 — Buy. Pay. Grow." },
      { property: "og:description", content: "The marketplace, wallet, and investment platform trusted across Sierra Leone." },
      { property: "og:url", content: "/" },
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

/** Consistent section header — small label, confident statement, one line of support. Left-aligned by default. */
function SectionHead({
  eyebrow,
  icon: Icon,
  title,
  support,
  center = false,
}: {
  eyebrow: string;
  icon: ComponentType<{ className?: string }>;
  title: ReactNode;
  support?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <span className="eyebrow">
        <Icon className="h-3 w-3" /> {eyebrow}
      </span>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${center ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
        {title}
      </h2>
      {support && (
        <p className={`mt-3 text-muted-foreground ${center ? "mx-auto max-w-xl" : "max-w-lg"}`}>{support}</p>
      )}
    </div>
  );
}

/* =============================================================================
   Hero — one thesis, one image, minimal chrome
   ============================================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />

      <div className="container-pro relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">
              <Sparkles className="h-3 w-3" /> Sierra Leone's #1 online Marketplace
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Buy. Sell. Pay. <span className="gradient-text">Grow.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Market360 brings the marketplace, a real‑time wallet, and vetted investment
              opportunities into a single app — built for how Sierra Leone trades, pays, and
              grows money.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/download" className="btn-primary">
                <DownloadIcon className="h-4 w-4" /> Download the app
              </Link>
              <Link to="/features" className="btn-ghost">
                Explore the marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.8 average rating
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" /> 25,000+ people using Market360
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified merchants only
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — a single confident mockup, two supporting proof points (not three) */}
        <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-[2.5rem] border-8 border-foreground/90 bg-foreground shadow-elevated">
            <ImgFade src={imgHero} alt="The Market360 app showing the marketplace home feed" className="h-full w-full" loading="eager" />
            <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
              <span className="h-1.5 w-16 rounded-full bg-background/40" />
            </div>
          </div>

          <div className="absolute -left-3 top-16 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wallet</p>
                <p className="text-sm font-bold">NLE 12,480</p>
              </div>
            </div>
          </div>

          <div
            className="absolute -right-3 bottom-10 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Portfolio</p>
                <p className="text-sm font-bold text-emerald-600">+9.6% this month</p>
              </div>
            </div>
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
  { icon: Wallet, text: "Aminata K. received NLE 450 from a Freetown Threads sale" },
  { icon: ShoppingBag, text: "New order placed for a Smart Watch S9 in Bo" },
  { icon: Send, text: "Ibrahim T. cashed out NLE 1,200 to Orange Money" },
  { icon: BadgeCheck, text: "GreenPower SL just became a Verified Seller" },
  { icon: TrendingUp, text: "A monthly payout landed in an investor's wallet" },
  { icon: Truck, text: "An order from Freetown arrived in Makeni in 48 hours" },
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
              <span key={i} className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <e.icon className="h-3.5 w-3.5 shrink-0 text-primary" /> {e.text}
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
  { n: "01", icon: Compass, title: "Explore the marketplace", body: "Browse thousands of listings from verified sellers across every category, and message sellers directly in‑app.", img: imgCatElectronics },
  { n: "02", icon: Zap, title: "Pay instantly with Wallet", body: "Settle every order through your Market360 Wallet — funded from Orange Money, Africell Money, or your bank, in seconds.", img: imgWallet },
  { n: "03", icon: Truck, title: "Ship & track", body: "Nationwide delivery with real‑time tracking — from Freetown to Bo, Makeni and beyond, in as little as 48 hours.", img: imgDelivery },
  { n: "04", icon: TrendingUp, title: "Grow your money", body: "Put idle wallet balance to work in curated, vetted opportunities and watch your portfolio move with you.", img: imgSeller },
];

function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <SectionHead eyebrow="How Market360 works" icon={Layers} title="One app carries you from browsing to owning." support="Swipe through the journey — every step happens inside a single Market360 experience." />
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-10">
          <HScroll ariaLabel="How Market360 works — journey steps">
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
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </article>
            ))}
          </HScroll>
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
  { name: "Electronics", count: "2.4k listings", img: imgCatElectronics, big: true },
  { name: "Fashion", count: "3.1k listings", img: imgCatFashion },
  { name: "Phones & Tablets", count: "1.8k listings", img: imgCatPhones },
  { name: "Vehicles", count: "620 listings", img: imgCatVehicles },
  { name: "Property", count: "410 listings", img: imgCatProperty },
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
              icon={LayoutGrid}
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
                  alt={c.name}
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
  { code: "INVEST50", desc: "NLE 50 bonus on your first investment", tag: "Invest", expires: "New investors" },
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
          <SectionHead eyebrow="Promo codes" icon={Percent} title="Codes you can actually use" support="Copy a code below and apply it at checkout in the app — no sign-up required to see them." />
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <HScroll ariaLabel="Market360 promo codes">
            {promoCodes.map((p) => (
              <div key={p.code} className="snap-start shrink-0 w-[85%] sm:w-80">
                <PromoCard {...p} />
              </div>
            ))}
          </HScroll>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Wallet — the layer that makes the marketplace actually work
   ============================================================================= */

const walletFeatures = [
  { icon: Send, title: "Send & receive instantly", body: "Move money to any Market360 user in seconds — no waiting on bank clearance." },
  { icon: PiggyBank, title: "Top up your way", body: "Fund your wallet from Orange Money, Africell Money, or a linked bank card." },
  { icon: Lock, title: "Full audit trail", body: "Every transaction is logged and traceable, so disputes resolve in minutes, not weeks." },
  { icon: ShieldCheck, title: "Bank‑grade protection", body: "Encrypted transfers and fraud monitoring watch every payment around the clock." },
];

function WalletShowcase() {
  return (
    <section id="wallet" className="section-pad">
      <div className="container-pro grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <SectionHead
            eyebrow="Market360 Wallet"
            icon={Wallet}
            title="Your money moves as fast as your business does."
            support="The wallet is what turns Market360 from an app into an economy — every sale, transfer, and payout settles in real time, without a bank branch in sight."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {walletFeatures.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 90} className="surface-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </Reveal>
            ))}
          </div>
          <Link to="/download" className="btn-primary mt-8">
            Get the wallet <ArrowRight className="h-4 w-4" />
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
   Invest — a lean, confident CTA band. No cards, no clutter: state the
   opportunity, prove it with a few hard numbers, point to /investments.
   ============================================================================= */

const investStats = [
  { value: 14, suffix: "%", label: "Average projected ROI" },
  { value: 1200, suffix: "+", label: "Investments funded" },
  { value: 6, suffix: "", label: "Vetted sectors" },
];

function InvestCta() {
  return (
    <section id="invest" className="section-pad bg-foreground text-background">
      <div className="container-pro">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              <TrendingUp className="h-3 w-3" /> Invest
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
              Put your money to work — without leaving Market360.
            </h2>
            <p className="mt-3 max-w-lg text-white/70">
              Curated opportunities across retail, fintech, and logistics — vetted by our credit and
              legal teams, funded and settled straight through your wallet.
            </p>
            <Link
              to="/investments"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Explore investment opportunities <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-3 gap-4 lg:gap-6">
            {investStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center lg:p-6">
                <p className="text-2xl font-bold md:text-3xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
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
          <SectionHead eyebrow="Why Market360" icon={Sparkles} title="Built differently, for how Sierra Leone actually trades." />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="surface-card relative overflow-hidden p-8 md:col-span-2 md:row-span-2">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">Every seller is verified — before they list a single item.</h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              ID checks, business verification, and ongoing performance monitoring keep low‑quality and
              fraudulent sellers off the platform, so buyers can trust every purchase.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <ImgFade src={imgSeller} alt="A verified Market360 seller preparing an order" className="aspect-[16/9]" />
            </div>
          </Reveal>

          <Reveal delay={80} className="surface-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold">Settlements in seconds</h3>
            <p className="mt-1 text-sm text-muted-foreground">Not days like a traditional bank transfer.</p>
          </Reveal>

          <Reveal delay={140} className="surface-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold">Nationwide delivery</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fastest turnaround across Freetown, Bo, and Makeni.</p>
          </Reveal>

          <Reveal delay={200} className="surface-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold">Bank‑grade security</h3>
            <p className="mt-1 text-sm text-muted-foreground">Encrypted transfers with 24/7 fraud monitoring.</p>
          </Reveal>

          <Reveal delay={260} className="surface-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold">Real human support</h3>
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
    { value: 1200, suffix: "+", label: "Successful investments" },
    { value: 320000, suffix: "+", label: "Trades executed" },
    { value: 1, suffix: "", label: "Country served", note: "Sierra Leone" },
    { value: 2400000, suffix: "+", label: "Marketplace transactions" },
  ];
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <Reveal>
          <SectionHead eyebrow="By the numbers" icon={BarChart3} title="Trusted at scale." center />
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
          <SectionHead eyebrow="Loved by users" icon={Star} title="What people are saying." />
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <HScroll ariaLabel="Customer testimonials">
            {testimonials.map((t) => (
              <div key={t.name} className="snap-card w-80 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated">
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
          </HScroll>
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
            <SectionHead eyebrow="News" icon={Bell} title="From the newsroom" />
          </Reveal>
          <Link to="/news" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link to="/news/$slug" params={{ slug: p.slug }} className="surface-card surface-card-hover block overflow-hidden">
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
  { q: "Are the investment opportunities regulated?", a: "Every opportunity is vetted by our credit and legal teams. Returns are projections, not guarantees, and full disclosures live on each opportunity's page." },
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
          <SectionHead eyebrow="FAQ" icon={MessageCircle} title="Frequently asked questions" center />
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
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-primary-glow/10 p-8 md:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <DownloadIcon className="h-3 w-3" /> Get the app
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Download Market360</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                The complete marketplace, wallet, and investment platform for Sierra Leone — free to download.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Instant wallet transfers", "Verified sellers & buyer protection", "Curated investment opportunities", "Delivery across the country"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <PlayStoreButton />
                <AppStoreButton />
              </div>
            </div>
            <div className="relative mx-auto max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border-8 border-foreground/90 bg-foreground shadow-elevated">
                <ImgFade src={imgHero} alt="Market360 app" className="aspect-[9/16]" />
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

/* =============================================================================
   Final CTA
   ============================================================================= */

function FinalCta() {
  return (
    <section className="section-pad pt-0">
      <div className="container-pro">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">Join Sierra Leone's #1 marketplace today.</h2>
              <p className="mt-4 max-w-xl text-white/85">
                Download the app, browse the marketplace, or start growing your money — everything you need is
                one tap away.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link to="/download" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-primary hover:bg-white/90">
                <DownloadIcon className="h-4 w-4" /> Download app
              </Link>
              <Link to="/features" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/25">
                <ShoppingBag className="h-4 w-4" /> Browse marketplace
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
      <WalletShowcase />
      <InvestCta />
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
