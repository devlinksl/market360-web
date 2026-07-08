import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HScroll } from "@/components/home/HScroll";
import { Counter } from "@/components/home/Counter";
import { Marquee } from "@/components/home/Marquee";
import { investments } from "@/lib/investments-data";
import { newsPosts } from "@/lib/news-data";
const imgHero = "/brand/img-hero.jpg";
const imgBuyer = "/brand/img-buyer.jpg";
const imgSeller = "/brand/img-seller.jpg";
const imgWallet = "/brand/img-wallet.jpg";
const imgDelivery = "/brand/img-delivery.jpg";
import {
  ShieldCheck, Zap, BadgeCheck, Sparkles, Users, LayoutGrid, ArrowRight,
  Smartphone, ShoppingBag, Wallet, TrendingUp, GraduationCap, PlayCircle,
  Star, Heart, Eye, ChevronDown, Store, Truck, MessageCircle, BarChart3,
  Bell, CheckCircle2, Download as DownloadIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Market360 — Sierra Leone's #1 Online Marketplace" },
      { name: "description", content: "Buy, sell, invest, and grow on Market360 — Sierra Leone's #1 online marketplace with an integrated wallet, curated investments, and trusted sellers." },
      { property: "og:title", content: "Market360 — Sierra Leone's #1 Online Marketplace" },
      { property: "og:description", content: "The marketplace, wallet, and investment platform trusted across Sierra Leone." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />
      <div className="container-pro relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <span className="eyebrow"><Sparkles className="h-3 w-3" /> Sierra Leone's #1 Online Marketplace</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Buy. Sell. Pay. <span className="gradient-text">Grow.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
            One app for the entire marketplace — trusted sellers, instant wallet transfers, curated investments, and delivery across the country.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/download" className="btn-primary">
              <DownloadIcon className="h-4 w-4" /> Download App
            </Link>
            <Link to="/features" className="btn-ghost">
              Explore Marketplace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.8 average rating</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> 25,000+ users</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Verified merchants</span>
          </div>
        </div>

        {/* Right — mockup + floating cards */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-[2.5rem] border-8 border-foreground/90 bg-foreground shadow-elevated overflow-hidden">
            <img src={imgHero} alt="Market360 app preview" className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
              <span className="h-1.5 w-16 rounded-full bg-background/40" />
            </div>
          </div>

          <div className="absolute -left-3 top-16 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent"><Wallet className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wallet</p>
                <p className="text-sm font-bold">NLE 12,480</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-40 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50"><TrendingUp className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Portfolio</p>
                <p className="text-sm font-bold text-emerald-600">+9.6%</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-3 left-6 hidden sm:block rounded-2xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur float-y" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent"><BadgeCheck className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Order</p>
                <p className="text-sm font-bold">Delivered ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Secure payments" },
    { icon: Zap, label: "Fast transfers" },
    { icon: BadgeCheck, label: "Verified merchants" },
    { icon: Sparkles, label: "AI-powered investing" },
    { icon: Users, label: "Thousands of users" },
    { icon: LayoutGrid, label: "Multi-category marketplace" },
  ];
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-pro py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const categories = [
  { name: "Electronics", count: "2.4k listings", img: imgBuyer },
  { name: "Fashion", count: "3.1k listings", img: imgSeller },
  { name: "Phones", count: "1.8k listings", img: imgHero },
  { name: "Cars", count: "620 listings", img: imgDelivery },
  { name: "Property", count: "410 listings", img: imgWallet },
  { name: "Services", count: "990 listings", img: imgSeller },
  { name: "Food", count: "1.2k listings", img: imgBuyer },
  { name: "Beauty", count: "870 listings", img: imgHero },
  { name: "Gaming", count: "540 listings", img: imgDelivery },
  { name: "Home & Garden", count: "1.5k listings", img: imgWallet },
];

function Categories() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><LayoutGrid className="h-3 w-3" /> Marketplace</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Shop by category</h2>
          </div>
          <Link to="/features" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex items-center gap-1">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6">
          <HScroll ariaLabel="Marketplace categories">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/features"
                className="snap-card group w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1 sm:w-56"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.count}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </HScroll>
        </div>
      </div>
    </section>
  );
}

const products = [
  { name: "Wireless Earbuds Pro", price: "NLE 890", seller: "AudioMax SL", rating: 4.8, img: imgBuyer },
  { name: "Silk Wrap Dress", price: "NLE 1,250", seller: "Freetown Threads", rating: 4.7, img: imgSeller },
  { name: "Smart Watch S9", price: "NLE 2,150", seller: "TechHub", rating: 4.9, img: imgHero },
  { name: "Solar Home Kit", price: "NLE 4,800", seller: "GreenPower SL", rating: 4.6, img: imgWallet },
  { name: "Fresh Cassava (10kg)", price: "NLE 120", seller: "Farm Direct", rating: 4.5, img: imgDelivery },
  { name: "Leather Backpack", price: "NLE 980", seller: "Kono Leather Co", rating: 4.8, img: imgSeller },
];

function FeaturedProducts() {
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><ShoppingBag className="h-3 w-3" /> Featured</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Trending products</h2>
          </div>
        </div>

        <div className="mt-6">
          <HScroll ariaLabel="Featured products">
            {products.map((p) => (
              <div key={p.name} className="snap-card w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className="relative aspect-square bg-secondary">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  <button aria-label="Favorite" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-muted-foreground shadow-soft hover:text-rose-500">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button aria-label="Quick view" className="absolute left-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-muted-foreground shadow-soft hover:text-primary">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-amber-500"><Star className="h-3.5 w-3.5 fill-amber-400" /> {p.rating}</div>
                  <p className="mt-1 font-semibold leading-tight line-clamp-2">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">by {p.seller}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-bold text-primary">{p.price}</p>
                    <Link to="/download" className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-105">
                      Buy
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </HScroll>
        </div>
      </div>
    </section>
  );
}

function InvestOpps() {
  const top = investments.slice(0, 3);
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><TrendingUp className="h-3 w-3" /> Invest</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Grow your money</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Curated opportunities across retail, fintech, and logistics — vetted by our team and settled through Market360 Wallet.</p>
          </div>
          <Link to="/investments" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex items-center gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {top.map((i) => (
            <Link key={i.slug} to="/investments" className="surface-card surface-card-hover overflow-hidden">
              <img src={i.image} alt={i.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{i.roi}% ROI</span>
                  <span className="text-muted-foreground">· {i.durationMonths} mo · {i.risk} risk</span>
                </div>
                <h3 className="mt-3 font-bold">{i.title}</h3>
                <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${i.fundingProgress}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">Invest now</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const lessons = [
  { title: "Understanding ROI", difficulty: "Beginner", duration: "6 min", img: imgWallet },
  { title: "Diversification 101", difficulty: "Intermediate", duration: "9 min", img: imgHero },
  { title: "Reading a fund prospectus", difficulty: "Advanced", duration: "12 min", img: imgSeller },
];

function LearnTrading() {
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <span className="eyebrow"><GraduationCap className="h-3 w-3" /> Academy</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Learn as you invest</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {lessons.map((l) => (
            <div key={l.title} className="surface-card overflow-hidden">
              <div className="relative aspect-[16/9] bg-secondary">
                <img src={l.img} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 grid place-items-center bg-black/25">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary">
                    <PlayCircle className="h-7 w-7" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-0.5">{l.difficulty}</span>
                  <span>· {l.duration}</span>
                </div>
                <h3 className="mt-2 font-bold">{l.title}</h3>
                <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Continue learning <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const features = [
    { icon: ShoppingBag, title: "Marketplace", body: "Thousands of listings across every category." },
    { icon: TrendingUp, title: "Investing", body: "Grow your money with vetted opportunities." },
    { icon: Wallet, title: "Secure Wallet", body: "Store, send, and receive money instantly." },
    { icon: Zap, title: "Fast Transfers", body: "Settlements in seconds, not days." },
    { icon: Sparkles, title: "AI Insights", body: "Smart recommendations tailored to you." },
    { icon: BadgeCheck, title: "Verified Sellers", body: "Every seller passes ID verification." },
  ];
  return (
    <section className="section-pad">
      <div className="container-pro grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img src={imgSeller} alt="Market360 seller experience" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card p-4 shadow-elevated">
            <p className="text-xs text-muted-foreground">This month</p>
            <p className="text-xl font-bold">+38% growth</p>
          </div>
        </div>
        <div>
          <span className="eyebrow"><Sparkles className="h-3 w-3" /> Why Market360</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">One app. Every advantage.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="surface-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const appFeatures = [
  { title: "The marketplace in your pocket", body: "Browse thousands of listings, chat with sellers, and place orders in seconds.", img: imgBuyer, icon: ShoppingBag },
  { title: "Your Market360 Wallet", body: "Get paid, send money, and pay merchants — instantly, with full audit trails.", img: imgWallet, icon: Wallet },
  { title: "Grow your money", body: "Explore curated investments and monitor your portfolio right from the app.", img: imgHero, icon: TrendingUp },
];

function AppFeatures() {
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <span className="eyebrow"><Smartphone className="h-3 w-3" /> App</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Everything, in one app.</h2>
        <div className="mt-12 space-y-16">
          {appFeatures.map((f, idx) => (
            <div key={f.title} className={`grid gap-8 items-center lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative mx-auto max-w-xs">
                <div className="rounded-[2rem] border-8 border-foreground/90 bg-foreground overflow-hidden shadow-elevated">
                  <img src={f.img} alt={f.title} loading="lazy" className="aspect-[9/16] w-full object-cover" />
                </div>
              </div>
              <div>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><f.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-2xl font-bold md:text-3xl">{f.title}</h3>
                <p className="mt-3 max-w-lg text-muted-foreground">{f.body}</p>
                <Link to="/download" className="btn-primary mt-6">Get the App <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCta() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-primary-glow/10 p-8 md:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow"><DownloadIcon className="h-3 w-3" /> Get the app</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Download Market360</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">The complete marketplace, wallet, and investment platform for Sierra Leone — free to download.</p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Instant wallet transfers", "Verified sellers & buyer protection", "Curated investment opportunities", "Delivery across the country"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {b}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://play.google.com/store/apps/details?id=app.market360.devlink" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background hover:opacity-90">
                  <PlayCircle className="h-6 w-6" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
                    <span className="block text-base font-semibold">Google Play</span>
                  </span>
                </a>
                <button disabled className="inline-flex items-center gap-3 rounded-2xl bg-secondary px-5 py-3 text-muted-foreground cursor-not-allowed border border-border">
                  <Smartphone className="h-6 w-6" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Coming soon on</span>
                    <span className="block text-base font-semibold">App Store</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative mx-auto max-w-xs">
              <div className="rounded-[2rem] border-8 border-foreground/90 bg-foreground overflow-hidden shadow-elevated">
                <img src={imgHero} alt="Market360 app" loading="lazy" className="aspect-[9/16] w-full object-cover" />
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl border border-border bg-card p-3 shadow-elevated">
                <div className="grid h-20 w-20 place-items-center rounded-lg bg-white">
                  {/* Placeholder QR */}
                  <div className="grid h-16 w-16 grid-cols-6 gap-[2px]">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span key={i} className={`h-full w-full ${((i * 7 + 3) % 3 === 0) ? "bg-foreground" : "bg-transparent"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-center text-[10px] font-semibold text-muted-foreground">Scan to install</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            <BarChart3 className="h-3 w-3" /> By the numbers
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Trusted at scale</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
              {s.note && <p className="text-xs text-white/50">{s.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Aminata K.", role: "Seller · Freetown Threads", rating: 5, quote: "Market360 helped me triple my orders in three months. The wallet is a game-changer — no more waiting days for payments.", img: imgSeller },
  { name: "Mohamed S.", role: "Buyer · Bo", rating: 5, quote: "I ordered a phone from Freetown and it arrived in 48 hours. Everything felt safe from start to finish.", img: imgBuyer },
  { name: "Fatmata J.", role: "Investor", rating: 5, quote: "The Retail Growth Fund pays out monthly like clockwork. I love seeing exactly which stores my money is helping.", img: imgHero },
  { name: "Ibrahim T.", role: "Rider · Delivery Partner", rating: 5, quote: "As a delivery partner, I get more orders and reliable pay through the wallet every week.", img: imgDelivery },
  { name: "Isatu B.", role: "Buyer · Makeni", rating: 5, quote: "Best online shopping experience in Sierra Leone. The verified seller badge gives me peace of mind.", img: imgSeller },
];

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <span className="eyebrow"><Star className="h-3 w-3" /> Loved by users</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What people say</h2>
        <div className="mt-8">
          <HScroll ariaLabel="Customer testimonials">
            {testimonials.map((t) => (
              <div key={t.name} className="snap-card w-80 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <img src={t.img} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />)}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </HScroll>
        </div>
      </div>
    </section>
  );
}

const partners = ["Orange Money", "Africell", "Sierra Post", "SLCB", "UBA SL", "ecobank", "Rokel", "Vodacom"];

function Partners() {
  return (
    <section className="border-y border-border bg-surface py-10">
      <div className="container-pro">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted partners</p>
        <div className="mt-6">
          <Marquee speed={35}>
            {partners.map((p) => (
              <span key={p} className="text-2xl font-bold tracking-tight text-muted-foreground/70 whitespace-nowrap">
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function LatestNews() {
  const posts = newsPosts.slice(0, 3);
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><Bell className="h-3 w-3" /> News</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Latest articles</h2>
          </div>
          <Link to="/news" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex items-center gap-1">
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="surface-card surface-card-hover overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-accent px-2 py-0.5 font-semibold text-primary">{p.category}</span>
                  <span>· {p.readTime}</span>
                  <span>· {p.date}</span>
                </div>
                <h3 className="mt-2 font-bold leading-tight line-clamp-2">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is Market360 free to download?", a: "Yes — the app is 100% free to download on Google Play. App Store version is coming soon." },
  { q: "How does the Market360 Wallet work?", a: "The wallet lets you store, send, receive, and pay in seconds. Settlements go through in real time and every transaction has a full audit trail." },
  { q: "Are the investment opportunities regulated?", a: "Every opportunity is vetted by our credit and legal teams. Returns are projections — not guarantees — and full disclosures live on each opportunity's page." },
  { q: "How do you verify sellers?", a: "Every seller goes through ID and business verification before listing. Verified sellers earn a badge that appears on all their listings." },
  { q: "Which locations do you deliver to?", a: "We deliver across Sierra Leone, with the fastest turnaround in greater Freetown, Bo, and Makeni." },
  { q: "How do I contact support?", a: "Reach us through the in-app help center, on the Contact page, or by email at hello@market360.shop." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro max-w-3xl">
        <div className="text-center">
          <span className="eyebrow"><MessageCircle className="h-3 w-3" /> FAQ</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="surface-card overflow-hidden">
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
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-pad">
      <div className="container-pro">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-5xl leading-tight">Join Sierra Leone's #1 marketplace today.</h2>
              <p className="mt-4 max-w-xl text-white/85">Download the app, start investing, or browse the marketplace — everything you need is one tap away.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/download" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-primary hover:bg-white/90">
                  <DownloadIcon className="h-4 w-4" /> Download App
                </Link>
                <Link to="/investments" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/25">
                  <TrendingUp className="h-4 w-4" /> Start Investing
                </Link>
                <Link to="/features" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/25">
                  <ShoppingBag className="h-4 w-4" /> Browse Marketplace
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden max-w-xs lg:block">
              <div className="rounded-[2rem] border-8 border-foreground/80 bg-foreground overflow-hidden shadow-elevated rotate-3">
                <img src={imgWallet} alt="" loading="lazy" className="aspect-[9/16] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Root ---------- */

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <InvestOpps />
      <LearnTrading />
      <WhyChoose />
      <AppFeatures />
      <DownloadCta />
      <Stats />
      <Testimonials />
      <Partners />
      <LatestNews />
      <FAQ />
      <FinalCta />
    </SiteLayout>
  );
}
