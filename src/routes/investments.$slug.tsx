import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getInvestment, investments, type Investment, type Risk } from "@/lib/investments-data";
import {
  TrendingUp, Clock, Wallet, ShieldCheck, ArrowRight, FileText,
  CheckCircle2, AlertTriangle, Users, ChevronLeft,
} from "lucide-react";

export const Route = createFileRoute("/investments/$slug")({
  loader: ({ params }): Investment => {
    const inv = getInvestment(params.slug);
    if (!inv) throw notFound();
    return inv;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Investment not found" }, { name: "robots", content: "noindex" }] };
    }
    const url = `/investments/${params.slug}`;
    return {
      meta: [
        { title: `${loaderData.title} — Market360 Invest` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:image", content: loaderData.image },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-pro section-pad text-center">
        <h1 className="text-3xl font-bold">Investment not found</h1>
        <Link to="/investments" className="btn-primary mt-6 inline-flex">Back to investments</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container-pro section-pad text-center">
        <h1 className="text-2xl font-bold">Couldn't load this investment</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: InvestmentDetail,
});

const riskTone: Record<Risk, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-rose-50 text-rose-700 border-rose-200",
};

function fmt(n: number) { return "NLE " + n.toLocaleString(); }

function InvestmentDetail() {
  const i = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img src={i.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="container-pro relative py-12 md:py-20">
          <Link to="/investments" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> All investments
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">{i.category}</span>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${riskTone[i.risk]}`}>{i.risk} risk</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{i.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{i.tagline}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Target ROI", value: `${i.roi}%`, Icon: TrendingUp },
              { label: "Duration", value: `${i.durationMonths} mo`, Icon: Clock },
              { label: "Minimum", value: fmt(i.minInvestment), Icon: Wallet },
              { label: "Funded", value: `${i.fundingProgress}%`, Icon: ShieldCheck },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="surface-card p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </div>
                <p className="mt-1 text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{i.overview}</p>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">How it works</h2>
              <ol className="mt-4 space-y-3">
                {i.howItWorks.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">{idx + 1}</span>
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">Returns breakdown</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {i.returns.map((r) => (
                  <div key={r.label} className="rounded-xl bg-secondary p-4">
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">{r.label}</dt>
                    <dd className="mt-1 text-lg font-bold">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">Managed by</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{i.operator.name}</p>
                  <p className="text-sm text-muted-foreground">{i.operator.role}</p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" /> Risks & disclosures
              </h2>
              <ul className="mt-4 space-y-2">
                {i.risks.map((r, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-amber-600">•</span> {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Returns are projections, not guarantees. Only invest what you can afford to lose.
              </p>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">Documents</h2>
              <ul className="mt-4 divide-y divide-border">
                {i.documents.map((d) => (
                  <li key={d.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{d.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{d.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Funding progress</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${i.fundingProgress}%` }} />
              </div>
              <p className="mt-2 text-sm"><span className="font-bold">{fmt(i.raised)}</span> <span className="text-muted-foreground">of {fmt(i.target)}</span></p>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Minimum</span><span className="font-semibold">{fmt(i.minInvestment)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Target ROI</span><span className="font-semibold">{i.roi}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{i.durationMonths} mo</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Risk</span><span className="font-semibold">{i.risk}</span></div>
              </div>

              <Link to="/download" className="btn-primary mt-5 w-full justify-center">
                Invest in the app <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Settled via Market360 Wallet
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-surface border-t border-border">
        <div className="container-pro">
          <h2 className="text-2xl font-bold">More opportunities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investments.filter((x) => x.slug !== i.slug).slice(0, 3).map((x) => (
              <Link key={x.slug} to="/investments/$slug" params={{ slug: x.slug }} className="surface-card surface-card-hover overflow-hidden">
                <img src={x.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{x.category}</p>
                  <h3 className="mt-1 font-bold">{x.title}</h3>
                  <p className="mt-2 text-sm text-primary font-semibold">{x.roi}% ROI · {x.durationMonths} mo</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
