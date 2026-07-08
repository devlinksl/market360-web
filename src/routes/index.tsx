import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HScroll } from "@/components/home/HScroll";
import { Counter } from "@/components/home/Counter";
import { Marquee } from "@/components/home/Marquee";
import { investments } from "@/lib/investments-data";
import { newsPosts } from "@/lib/news-data";
import {
  ShieldCheck, Zap, BadgeCheck, Sparkles, Users, LayoutGrid, ArrowRight,
  Smartphone, ShoppingBag, Wallet, TrendingUp, PlayCircle,
  Star, Heart, ChevronDown, Truck, MessageCircle, BarChart3,
  Bell, CheckCircle2, Download as DownloadIcon, Send, PiggyBank,
  Lock, Layers, Compass, ArrowUpRight, QrCode, HeartHandshake,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Images
// All imagery lives under /public/images/home so it can be swapped from the
// GitHub repo without touching component code. Replace these files with real
// photography/illustrations at the same paths — aspect ratios are preserved
// via the ImgFade wrapper below, so there is no layout shift when you do.
// ---------------------------------------------------------------------------
const img = {
  heroApp: "/images/home/hero-app.jpg",
  heroBuyer: "/images/home/buyer-unboxing.jpg",
  seller: "/images/home/seller-workshop.jpg",
  wallet: "/images/home/wallet-transfer.jpg",
  delivery: "/images/home/rider-delivery.jpg",
  invest: "/images/home/investor-dashboard.jpg",
  categoryElectronics: "/images/home/category-electronics.jpg",
  categoryFashion: "/images/home/category-fashion.jpg",
  categoryPhones: "/images/home/category-phones.jpg",
  categoryCars: "/images/home/category-cars.jpg",
  categoryProperty: "/images/home/category-property.jpg",
  categoryFood: "/images/home/category-food.jpg",
  productEarbuds: "/images/home/product-earbuds.jpg",
  productDress: "/images/home/product-dress.jpg",
  productWatch: "/images/home/product-watch.jpg",
  productSolar: "/images/home/product-solar.jpg",
  testimonialSeller: "/images/home/testimonial-seller.jpg",
  testimonialBuyer: "/images/home/testimonial-buyer.jpg",
  testimonialInvestor: "/images/home/testimonial-investor.jpg",
  testimonialRider: "/images/home/testimonial-rider.jpg",
};

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
   Shared primitives — scroll reveals, count-up-on-view, skeleton image loader
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
  y = 24,
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

/** Image with a shimmering skeleton placeholder — no layout shift, graceful fade-in. */
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
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,theme(colors.secondary)_8%,theme(colors.border)_18%,theme(colors.secondary)_33%)] bg-[length:200%_100%]" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* =============================================================================
   Hero — the thesis: one app, three verbs, real proof underneath
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
              <Sparkles className="h-3 w-3" /> Sierra Leone's all‑in‑one commerce platform
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
              opportunities into a single app — built for how Sierra Leone actually trades,
              pays, and grows money.
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

        {/* Right — mockup + floating proof cards */}
        <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-[2.5rem] border-8 border-foreground/90 bg-foreground shadow-elevated">
            <ImgFade src={img.heroApp} alt="The Market360 app showing the marketplace home feed" className="h-full w-full" loading="eager" />
            <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
              <span className="h-1.5 w-16 rounded-full bg-background/40" />
            </div>
          </div>

          <div className="absolute -left-3 top-14 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y">
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
            className="absolute -right-2 top-40 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y"
            style={{ animationDelay: "1s" }}
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

          <div
            className="absolute -bottom-3 left-6 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent">
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Order</p>
                <p className="text-sm font-bold">Delivered to Bo ✓</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Live Ledger — signature strip. Market360's whole pitch is that money and
   goods actually move on this platform, in real time. Show it, don't say it.
   ============================================================================= */

const ledgerEvents = [
  { icon: Wallet, text: "Aminata K. received NLE 450 from a Freetown Threads sale" },
  { icon: TrendingUp, text: "Retail Growth Fund just crossed 92% funded" },
  { icon: ShoppingBag, text: "New order placed for a Smart Watch S9 in Bo" },
  { icon: Send, text: "Ibrahim T. cashed out NLE 1,200 to Orange Money" },
  { icon: BadgeCheck, text: "GreenPower SL just became a Verified Seller" },
  { icon: TrendingUp, text: "A Logistics Fund II payout landed in an investor's wallet" },
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
   How it works — a genuine 3-step sequence, so numbering earns its place
   ============================================================================= */

const journeySteps = [
  {
    n: "01",
    icon: Compass,
    title: "Explore",
    body: "Browse thousands of listings from verified sellers across every category, and message sellers directly in‑app.",
  },
  {
    n: "02",
    icon: Zap,
    title: "Pay instantly",
    body: "Settle every order through your Market360 Wallet — funded from Orange Money, Africell Money, or your bank, in seconds.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Grow your money",
    body: "Put idle wallet balance to work in curated, vetted opportunities and watch your portfolio move with you.",
  },
];

function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <span className="eyebrow">
            <Layers className="h-3 w-3" /> How Market360 works
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            One app carries you from browsing to owning.
          </h2>
        </Reveal>

        <div className="relative mt-12 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute top-10 left-[16.66%] right-[16.66%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" aria-hidden />
          {journeySteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black tracking-tight text-border">{s.n}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Marketplace — categories + trending products, one cohesive discovery block
   ============================================================================= */

const categories = [
  { name: "Electronics", count: "2.4k listings", img: img.categoryElectronics },
  { name: "Fashion", count: "3.1k listings", img: img.categoryFashion },
  { name: "Phones & Tablets", count: "1.8k listings", img: img.categoryPhones },
  { name: "Vehicles", count: "620 listings", img: img.categoryCars },
  { name: "Property", count: "410 listings", img: img.categoryProperty },
  { name: "Food & Groceries", count: "1.2k listings", img: img.categoryFood },
];

const products = [
  { name: "Wireless Earbuds Pro", price: "NLE 890", seller: "AudioMax SL", rating: 4.8, img: img.productEarbuds },
  { name: "Silk Wrap Dress", price: "NLE 1,250", seller: "Freetown Threads", rating: 4.7, img: img.productDress },
  { name: "Smart Watch S9", price: "NLE 2,150", seller: "TechHub", rating: 4.9, img: img.productWatch },
  { name: "Solar Home Kit", price: "NLE 4,800", seller: "GreenPower SL", rating: 4.6, img: img.productSolar },
];

function Marketplace() {
  return (
    <section id="marketplace" className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="eyebrow">
              <LayoutGrid className="h-3 w-3" /> Marketplace
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Discover the marketplace</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Every category, every corner of Sierra Leone — from Freetown workshops to Bo farms — listed by
              sellers who've been through ID and business verification.
            </p>
          </Reveal>
          <Link to="/features" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            Browse all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Reveal delay={100} className="mt-8">
          <HScroll ariaLabel="Marketplace categories">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/features"
                className="snap-card group w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated sm:w-56"
              >
                <ImgFade src={c.img} alt={c.name} className="aspect-[4/3] transition-transform duration-500 group-hover:scale-110" />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.count}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </HScroll>
        </Reveal>

        <Reveal delay={160} className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight">Trending right now</h3>
            <Link to="/download" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
              Shop the app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5">
            <HScroll ariaLabel="Trending products">
              {products.map((p) => (
                <div
                  key={p.name}
                  className="snap-card group w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated"
                >
                  <div className="relative">
                    <ImgFade src={p.img} alt={p.name} className="aspect-square" />
                    <button
                      aria-label="Save to favorites"
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-muted-foreground shadow-soft transition-colors hover:text-rose-500"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400" /> {p.rating}
                    </div>
                    <p className="mt-1 font-semibold leading-tight line-clamp-2">{p.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">by {p.seller}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-bold text-primary">{p.price}</p>
                      <Link
                        to="/download"
                        className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:brightness-105 group-hover:scale-105"
                      >
                        Buy now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </HScroll>
          </div>
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
          <span className="eyebrow">
            <Wallet className="h-3 w-3" /> Market360 Wallet
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Your money moves as fast as your business does.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            The wallet is what turns Market360 from an app into an economy — every sale, transfer, and
            payout settles in real time, without a bank branch in sight.
          </p>
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
            <ImgFade src={img.wallet} alt="A Market360 user sending a wallet transfer" className="aspect-[9/16]" />
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
   Investment overview — grow tab, revamped
   ============================================================================= */

function InvestmentOverview() {
  const top = investments.slice(0, 3);
  const investStats = [
    { value: 1200, suffix: "+", label: "Investments funded" },
    { value: 14, suffix: "%", label: "Average projected ROI" },
    { value: 6, suffix: "", label: "Vetted sectors" },
  ];
  return (
    <section id="invest" className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <TrendingUp className="h-3 w-3" /> Invest
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Make your money do more.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Curated opportunities across retail, fintech, and logistics — vetted by our credit and legal
              teams, funded and settled straight through your Market360 Wallet.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {investStats.map((s) => (
                <div key={s.label} className="surface-card p-4 text-center">
                  <p className="text-2xl font-bold text-primary md:text-3xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/investments" className="btn-primary mt-8">
              Explore investments <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5 sm:grid-cols-2">
              {top.map((inv, i) => (
                <Link
                  key={inv.slug}
                  to="/investments"
                  className={`surface-card surface-card-hover overflow-hidden ${i === 0 ? "sm:col-span-2" : ""}`}
                >
                  <ImgFade src={inv.image} alt={inv.title} className={i === 0 ? "aspect-[21/9]" : "aspect-[16/10]"} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{inv.roi}% ROI</span>
                      <span className="text-muted-foreground">
                        · {inv.durationMonths} mo · {inv.risk} risk
                      </span>
                    </div>
                    <h3 className="mt-3 font-bold">{inv.title}</h3>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
                        style={{ width: `${inv.fundingProgress}%` }}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">Invest now</span>
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Why Market360 — bento grid of differentiators (single, non-repetitive)
   ============================================================================= */

function WhyMarket360() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <span className="eyebrow">
            <Sparkles className="h-3 w-3" /> Why Market360
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Built differently, for how Sierra Leone actually trades.
          </h2>
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
              <ImgFade src={img.seller} alt="A verified Market360 seller preparing an order" className="aspect-[16/9]" />
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
    <section className="section-pad bg-foreground text-background">
      <div className="container-pro">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            <BarChart3 className="h-3 w-3" /> By the numbers
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Trusted at scale.</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
              {s.note && <p className="text-xs text-white/50">{s.note}</p>}
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
  { name: "Aminata K.", role: "Seller · Freetown Threads", rating: 5, quote: "Market360 helped me triple my orders in three months. The wallet means I'm never waiting days to get paid.", img: img.testimonialSeller },
  { name: "Mohamed S.", role: "Buyer · Bo", rating: 5, quote: "I ordered a phone from Freetown and it arrived in 48 hours. Everything felt safe from start to finish.", img: img.testimonialBuyer },
  { name: "Fatmata J.", role: "Investor", rating: 5, quote: "The Retail Growth Fund pays out monthly like clockwork. I love seeing exactly which stores my money supports.", img: img.testimonialInvestor },
  { name: "Ibrahim T.", role: "Rider · Delivery Partner", rating: 5, quote: "As a delivery partner, I get more orders and reliable pay through the wallet every single week.", img: img.testimonialRider },
];

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <Reveal>
          <span className="eyebrow">
            <Star className="h-3 w-3" /> Loved by users
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What people are saying.</h2>
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
            <span className="eyebrow">
              <Bell className="h-3 w-3" /> News
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">From the newsroom</h2>
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
        <Reveal className="text-center">
          <span className="eyebrow">
            <MessageCircle className="h-3 w-3" /> FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
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
                <a
                  href="https://play.google.com/store/apps/details?id=app.market360.devlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-90"
                >
                  <PlayCircle className="h-6 w-6" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
                    <span className="block text-base font-semibold">Google Play</span>
                  </span>
                </a>
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl border border-border bg-secondary px-5 py-3 text-muted-foreground"
                >
                  <Smartphone className="h-6 w-6" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Coming soon on</span>
                    <span className="block text-base font-semibold">App Store</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative mx-auto max-w-xs">
              <div className="overflow-hidden rounded-[2rem] border-8 border-foreground/90 bg-foreground shadow-elevated">
                <ImgFade src={img.heroBuyer} alt="A Market360 buyer unboxing an order" className="aspect-[9/16]" />
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl border border-border bg-card p-3 shadow-elevated">
                <div className="grid h-20 w-20 place-items-center rounded-lg bg-white">
                  <QrCode className="h-14 w-14 text-foreground" strokeWidth={1.25} />
                </div>
                <p className="mt-2 text-center text-[10px] font-semibold text-muted-foreground">Scan to install</p>
              </div>
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
   Root — the journey: understand → marketplace → wallet → invest →
   differentiate → prove it → convert.
   ============================================================================= */

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <LiveLedger />
      <HowItWorks />
      <Marketplace />
      <WalletShowcase />
      <InvestmentOverview />
      <WhyMarket360 />
      <Stats />
      <Testimonials />
      <Partners />
      <LatestNews />
      <FAQ />
      <DownloadApp />
      <FinalCta />
    </SiteLayout>
  );
}
