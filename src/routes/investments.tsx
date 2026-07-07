import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { investments, holdings, getInvestment, type Risk } from "@/lib/investments-data";
import {
  TrendingUp, Clock, Wallet, ShieldCheck, ArrowRight, Sparkles,
  PieChart, DollarSign, Activity, BadgeCheck, GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investments — Grow your money with Market360" },
      { name: "description", content: "Discover carefully managed investment opportunities on Market360. Track your portfolio, monitor returns, and invest with confidence." },
      { property: "og:title", content: "Market360 Investments — Grow your money" },
      { property: "og:description", content: "Curated investment opportunities and a live portfolio dashboard on Sierra Leone's #1 marketplace." },
      { property: "og:url", content: "/investments" },
    ],
    links: [{ rel: "canonical", href: "/investments" }],
  }),
  component: InvestmentsPage,
});

const riskTone: Record<Risk, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-rose-50 text-rose-700 border-rose-200",
};

function fmt(n: number) {
  return "NLE " + n.toLocaleString();
}

function StatCard({ icon: Icon, label, value, hint }: { icon: any; label: string; value: string; hint?: string }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function OpportunityCard({ i }: { i: (typeof investments)[number] }) {
  return (
    <Link
      to="/investments/$slug"
      params={{ slug: i.slug }}
      className="group surface-card surface-card-hover flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={i.image}
          alt={i.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">{i.category}</span>
          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskTone[i.risk]}`}>{i.risk} risk</span>
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-[12px] font-bold text-primary-foreground shadow-glow">
          {i.roi}% ROI
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight">{i.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{i.tagline}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-secondary p-3">
            <dt className="text-muted-foreground">Duration</dt>
            <dd className="mt-0.5 font-semibold">{i.durationMonths} months</dd>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <dt className="text-muted-foreground">Minimum</dt>
            <dd className="mt-0.5 font-semibold">{fmt(i.minInvestment)}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Funded</span>
            <span className="font-semibold">{i.fundingProgress}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${i.fundingProgress}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">{fmt(i.raised)} of {fmt(i.target)}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-primary group-hover:underline">View opportunity</span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 120, h = 36, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-28">
      <polyline points={pts} fill="none" stroke="url(#g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.17 152)" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 150)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HoldingCard({ h }: { h: (typeof holdings)[number] }) {
  const inv = getInvestment(h.slug);
  if (!inv) return null;
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{inv.category}</p>
          <h4 className="truncate text-base font-bold">{inv.title}</h4>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          h.status === "Active" ? "bg-emerald-50 text-emerald-700" :
          h.status === "Maturing" ? "bg-amber-50 text-amber-700" :
          "bg-slate-100 text-slate-700"
        }`}>{h.status}</span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Current value</p>
          <p className="text-2xl font-bold tracking-tight">{fmt(h.currentValue)}</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +{h.growthPct}% · +{fmt(h.earnings)}
          </p>
        </div>
        <Sparkline data={h.spark} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-secondary p-2.5">
          <dt className="text-muted-foreground">Invested</dt>
          <dd className="font-semibold">{fmt(h.invested)}</dd>
        </div>
        <div className="rounded-lg bg-secondary p-2.5">
          <dt className="text-muted-foreground">Time left</dt>
          <dd className="font-semibold">{h.remainingMonths} mo</dd>
        </div>
      </dl>

      <Link to="/investments/$slug" params={{ slug: h.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        Manage <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function InvestmentsPage() {
  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalValue = holdings.reduce((s, h) => s + h.currentValue, 0);
  const totalEarnings = holdings.reduce((s, h) => s + h.earnings, 0);
  const avgRoi = holdings.length
    ? (holdings.reduce((s, h) => s + h.growthPct, 0) / holdings.length).toFixed(1)
    : "0";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={<><Sparkles className="h-3 w-3" /> Market360 Invest</>}
        title={<>Grow your money with <span className="gradient-text">Market360</span></>}
        description="Discover carefully vetted investment opportunities across retail, fintech, logistics, and agriculture. Track your portfolio and returns in real time — with the same trust you get across the marketplace."
      >
        <a href="#opportunities" className="btn-primary">Explore opportunities</a>
        <a href="#portfolio" className="btn-ghost">View portfolio</a>
      </PageHero>

      <section className="container-pro -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard icon={Wallet} label="Total invested" value={fmt(totalInvested)} />
          <StatCard icon={PieChart} label="Portfolio value" value={fmt(totalValue)} hint="Updated live" />
          <StatCard icon={DollarSign} label="Total returns" value={fmt(totalEarnings)} hint="Since inception" />
          <StatCard icon={Activity} label="Avg growth" value={`${avgRoi}%`} />
        </div>
      </section>

      <section id="opportunities" className="section-pad">
        <div className="container-pro">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow"><TrendingUp className="h-3 w-3" /> Live opportunities</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Curated investments</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">Every opportunity is vetted by our credit team, transparently structured, and settled through Market360 Wallet.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {investments.map((i) => <OpportunityCard key={i.slug} i={i} />)}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <span className="eyebrow"><PieChart className="h-3 w-3" /> Your portfolio</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Live holdings</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Monitor each investment's performance, earnings, and remaining duration at a glance.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {holdings.map((h) => <HoldingCard key={h.slug} h={h} />)}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro">
          <div className="surface-card grid gap-6 p-8 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Vetted opportunities", body: "Every deal passes credit, legal, and operational review before it goes live." },
              { icon: BadgeCheck, title: "Transparent settlement", body: "Returns are settled through Market360 Wallet with a full audit trail." },
              { icon: GraduationCap, title: "Learn as you invest", body: "Bite-sized lessons in the app teach you the basics of investing safely." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
