import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useMemo, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket, Target, Globe, Sparkles, TrendingUp, ShieldCheck, Layers, Building2,
  ArrowRight, Download, Mail, Phone, MapPin, Clock, FileText, CheckCircle2,
  Users, Award, Zap, LineChart, Wallet, Store, Truck, GraduationCap, ChevronRight,
} from "lucide-react";

const IR_HERO = "/images/ir-hero.jpg";
const IR_TEAM = "/images/ir-team.jpg";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investor Relations — Invest in Market360" },
      { name: "description", content: "Market360 is Sierra Leone's #1 online marketplace, integrating commerce, payments, and logistics. Explore our investor deck, funding rounds, KPIs, leadership, and how to invest." },
      { property: "og:title", content: "Market360 Investor Relations" },
      { property: "og:description", content: "Institutional-grade investor relations for Market360 — West Africa's fastest-growing commerce platform." },
      { property: "og:image", content: "/images/ir-hero.jpg" },
      { property: "og:url", content: "/investments" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/investments" }],
  }),
  component: InvestorRelationsPage,
});

/* ---------- data ---------- */

const kpis = [
  { label: "Active users", value: "180K+", hint: "Monthly, YoY +142%" },
  { label: "GMV run-rate", value: "$42M", hint: "Annualized, Q1 2026" },
  { label: "Verified sellers", value: "12,400", hint: "Across 14 districts" },
  { label: "Wallet transactions", value: "3.6M / mo", hint: "+38% QoQ" },
  { label: "Take rate", value: "6.4%", hint: "Blended" },
  { label: "Gross margin", value: "68%", hint: "Software + fintech" },
];

const growthChart = [
  { q: "Q1 24", v: 18 },
  { q: "Q2 24", v: 24 },
  { q: "Q3 24", v: 33 },
  { q: "Q4 24", v: 44 },
  { q: "Q1 25", v: 58 },
  { q: "Q2 25", v: 71 },
  { q: "Q3 25", v: 88 },
  { q: "Q4 25", v: 104 },
  { q: "Q1 26", v: 126 },
];

const whyInvest = [
  { icon: Globe, title: "Underserved market", body: "8M+ people in Sierra Leone with <8% e-commerce penetration — a decade of compounding tailwinds." },
  { icon: LineChart, title: "Efficient growth", body: "3.4x YoY GMV growth with a CAC payback under 4 months. Unit economics improve quarterly." },
  { icon: Wallet, title: "Fintech flywheel", body: "Integrated wallet turns every transaction into recurring float, take rate, and cross-sell." },
  { icon: ShieldCheck, title: "Trust moat", body: "Verified sellers, escrow, and dispute resolution create a defensible network effect." },
  { icon: Layers, title: "Platform, not app", body: "Commerce, payments, and logistics on one stack — a true category-defining super-app." },
  { icon: Award, title: "Award-winning team", body: "Founders and operators from Sub-Saharan tech, ex-fintech, ex-marketplace leaders." },
];

const revenueStreams = [
  { icon: Store, title: "Marketplace commissions", body: "6–9% take rate on verified transactions across 40+ categories.", share: "48%" },
  { icon: Wallet, title: "Wallet & payments", body: "Interchange, transfer fees, and float income from the Market360 Wallet.", share: "27%" },
  { icon: Truck, title: "Logistics", body: "Last-mile delivery fees and fleet leasing across greater Freetown.", share: "14%" },
  { icon: Sparkles, title: "Seller subscriptions", body: "Storefront upgrades, analytics, and promoted listings for Pro sellers.", share: "8%" },
  { icon: Building2, title: "Enterprise & B2B", body: "APIs for banks, telcos, and enterprise resellers.", share: "3%" },
];

const strategy = [
  { icon: Zap, title: "Density before geography", body: "Own Freetown end-to-end, then replicate the model district by district." },
  { icon: Users, title: "Seller-led growth", body: "Every empowered seller onboards 40+ buyers. We invest in seller success first." },
  { icon: Wallet, title: "Payments as a wedge", body: "The wallet expands beyond marketplace into peer-to-peer and bill payments." },
  { icon: Globe, title: "Regional expansion", body: "Liberia and Guinea-Conakry launch planned within 18 months of Series A." },
];

const advantages = [
  "First-mover with verified seller network and integrated wallet in Sierra Leone",
  "Proprietary fraud & KYC stack tuned for West African identity documents",
  "Native low-bandwidth Android build reaching 2G/3G devices reliably",
  "Direct relationships with Sierra Leone banks and mobile money operators",
  "Local logistics fleet with 40+ trained delivery partners",
  "Category-leading NPS of 71 across buyers, sellers, and riders",
];

const roadmap = [
  { period: "Q3 2026", title: "Series A close", body: "Complete $6M raise; expand engineering and credit teams." },
  { period: "Q4 2026", title: "Wallet 2.0", body: "Bill payments, payroll, and merchant credit lines go live." },
  { period: "Q1 2027", title: "Liberia launch", body: "Enter Monrovia with a lean playbook adapted from Freetown." },
  { period: "Q3 2027", title: "SME lending", body: "Underwrite verified sellers using on-platform sales history." },
  { period: "Q1 2028", title: "Guinea-Conakry", body: "Third country, first Francophone market for Market360." },
];

const leadership = [
  { name: "Abdulai Kamara", role: "Co-founder & CEO", bio: "Ex-marketplace lead, MBA London Business School. 12 years scaling commerce across Africa." },
  { name: "Fatmata Sesay", role: "Co-founder & COO", bio: "Former operations director at a pan-African fintech. Led Freetown's largest retail expansion." },
  { name: "Ibrahim Bangura", role: "CTO", bio: "15 years in payments infrastructure. Previously staff engineer at a Nigerian unicorn." },
  { name: "Isatu Kargbo", role: "Chief Financial Officer", bio: "Chartered accountant. Ex-Big Four; led two Series A raises in Sub-Saharan tech." },
  { name: "Mohamed Turay", role: "VP Growth", bio: "Growth marketing veteran with a track record scaling apps from 10K to 5M users." },
  { name: "Aminata Jalloh", role: "General Counsel", bio: "Regulatory expert across Sierra Leone, Liberia, and Guinea; 10 years in fintech law." },
];

type Round = {
  id: string; stage: string; status: "Open" | "Upcoming" | "Closed"; target: string;
  minimum: string; equity: string; use: string; progress: number; raised: string;
};

const rounds: Round[] = [
  {
    id: "series-a", stage: "Series A", status: "Open", target: "$6,000,000",
    minimum: "$50,000", equity: "12–15%", raised: "$3,900,000", progress: 65,
    use: "Engineering, credit team, Wallet 2.0, Liberia launch capital reserves.",
  },
  {
    id: "strategic-partners", stage: "Strategic Partnership", status: "Open", target: "$2,500,000",
    minimum: "$250,000", equity: "Negotiable", raised: "$1,100,000", progress: 44,
    use: "Enterprise integrations for banks, telcos, and remittance corridors.",
  },
  {
    id: "seed-extension", stage: "Seed Extension", status: "Closed", target: "$1,800,000",
    minimum: "$25,000", equity: "8%", raised: "$1,800,000", progress: 100,
    use: "Product-market fit expansion — closed 2025.",
  },
];

const resources = [
  { name: "Company Profile", size: "PDF · 1.2 MB", href: "#" },
  { name: "Investor Deck 2026", size: "PDF · 6.4 MB", href: "#" },
  { name: "Business Plan", size: "PDF · 3.1 MB", href: "#" },
  { name: "Financial Highlights", size: "PDF · 900 KB", href: "#" },
  { name: "2025 Annual Report", size: "PDF · 4.8 MB", href: "#" },
  { name: "Press Kit", size: "ZIP · 22 MB", href: "#" },
];

const faqs = [
  { q: "Is Market360 currently raising?", a: "Yes. Our Series A round is open with $2.1M of the $6M target remaining. Strategic and institutional investors welcome." },
  { q: "What is the minimum ticket size?", a: "Series A minimums start at $50,000 for accredited investors. Strategic partnerships start at $250,000." },
  { q: "How is Market360 regulated?", a: "The wallet operates under Sierra Leone's Fintech Sandbox with the Bank of Sierra Leone. Marketplace operations are registered under commerce licenses in every district we serve." },
  { q: "Can I invest from outside Sierra Leone?", a: "Yes. We accept international investment via our Delaware C-Corp holding entity and support USD, EUR, and GBP wires." },
  { q: "Do you share monthly investor updates?", a: "Confirmed investors receive monthly KPI updates, quarterly board decks, and audited annual financials." },
  { q: "How do I request the full investor deck?", a: "Click Request Investor Deck at the top of this page. We reply within 2 business days after a brief accreditation check." },
];

/* ---------- small components ---------- */

function GrowthBars() {
  const max = Math.max(...growthChart.map((d) => d.v));
  return (
    <div className="surface-card p-6 md:p-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow"><LineChart className="h-3 w-3" /> Quarterly GMV (USD, millions)</p>
          <h3 className="mt-2 text-2xl font-bold">7.0x growth in 9 quarters</h3>
        </div>
        <span className="hidden md:inline text-sm font-semibold text-emerald-600">▲ +142% YoY</span>
      </div>
      <div className="mt-6 flex items-end gap-2 h-40 md:h-52">
        {growthChart.map((d, i) => (
          <div key={d.q} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-primary/70 to-primary transition-all"
              style={{ height: `${(d.v / max) * 100}%`, animation: `grow .8s ease-out ${i * 60}ms both` }}
              aria-label={`${d.q}: $${d.v}M`}
            />
            <span className="text-[10px] md:text-xs text-muted-foreground">{d.q}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes grow { from { transform: scaleY(0.05); transform-origin: bottom;} to { transform: scaleY(1);} }`}</style>
    </div>
  );
}

function Section({ id, eyebrow, title, kicker, children }: {
  id?: string; eyebrow?: React.ReactNode; title: React.ReactNode; kicker?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-pad">
      <div className="container-pro">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {kicker && <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{kicker}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ---------- investor interest form ---------- */

type FormState = {
  fullName: string; company: string; investorType: string; country: string;
  email: string; phone: string; amount: string; message: string; agree: boolean;
};
const initialForm: FormState = {
  fullName: "", company: "", investorType: "Angel", country: "",
  email: "", phone: "", amount: "", message: "", agree: false,
};

function InvestorForm({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/investor-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ ok: false, message: data.error || "Something went wrong." });
      } else {
        setResult({ ok: true, message: data.message });
      }
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="py-6 text-center">
        {result.ok ? (
          <>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Interest received</h3>
            <p className="mt-2 text-muted-foreground">{result.message}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              This submission is an expression of interest and does not constitute an investment agreement.
            </p>
            <button className="btn-primary mt-6" onClick={() => { setResult(null); setForm(initialForm); setStep(1); onDone?.(); }}>
              Close
            </button>
          </>
        ) : (
          <>
            <p className="text-rose-600 font-semibold">{result.message}</p>
            <button className="btn-ghost mt-4" onClick={() => setResult(null)}>Try again</button>
          </>
        )}
      </div>
    );
  }

  const canNext1 = form.fullName.trim().length >= 2 && form.investorType && form.country.trim().length >= 2;
  const canNext2 = /.+@.+\..+/.test(form.email) && form.phone.trim().length >= 4 && form.amount.trim().length >= 1;
  const canSubmit = form.agree;

  return (
    <div>
      {/* stepper */}
      <div className="mb-6 flex items-center gap-2 text-xs">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex-1">
            <div className={`h-1.5 rounded-full ${step >= n ? "bg-primary" : "bg-secondary"}`} />
            <p className={`mt-2 ${step >= n ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              Step {n} of 3
            </p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="grid gap-4">
          <Field label="Full name *">
            <input className="input-pro" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={120} />
          </Field>
          <Field label="Company (optional)">
            <input className="input-pro" value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={160} />
          </Field>
          <Field label="Investor type *">
            <select className="input-pro" value={form.investorType} onChange={(e) => update("investorType", e.target.value)}>
              {["Angel", "VC", "Institution", "Strategic Partner", "Individual", "Other"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Country *">
            <input className="input-pro" value={form.country} onChange={(e) => update("country", e.target.value)} maxLength={80} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <Field label="Email *">
            <input type="email" className="input-pro" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={200} />
          </Field>
          <Field label="Phone *">
            <input type="tel" className="input-pro" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} />
          </Field>
          <Field label="Investment amount or range (USD) *">
            <input className="input-pro" placeholder="e.g. $100,000 – $250,000" value={form.amount} onChange={(e) => update("amount", e.target.value)} maxLength={80} />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4">
          <Field label="Message to the Market360 team">
            <textarea rows={5} className="input-pro" value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={2000} />
          </Field>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} />
            <span className="text-muted-foreground">
              I understand this is an expression of interest, not an investment agreement, and I agree to Market360's{" "}
              <a className="text-primary hover:underline" href="/privacy">Privacy Policy</a> and{" "}
              <a className="text-primary hover:underline" href="/terms">Terms</a>.
            </span>
          </label>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          className="btn-ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            className="btn-primary"
            disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
            onClick={() => setStep((s) => s + 1)}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button className="btn-primary" disabled={!canSubmit || submitting} onClick={submit}>
            {submitting ? "Submitting…" : "Submit interest"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      {children}
    </label>
  );
}

/* ---------- page ---------- */

function InvestorRelationsPage() {
  const [open, setOpen] = useState(false);
  const kpiCards = useMemo(() => kpis, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={IR_HERO}
          alt="Business district skyline with growth chart overlay"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="container-pro relative py-16 md:py-28">
          <span className="eyebrow"><Sparkles className="h-3 w-3" /> Market360 Investor Relations</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl leading-[1.05]">
            Invest in the commerce infrastructure of <span className="gradient-text">West Africa</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Market360 is Sierra Leone's #1 online marketplace — a super-app combining commerce,
            wallet, and logistics. We're building the operating system for African retail.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="btn-primary">Become an Investor <ArrowRight className="h-4 w-4" /></button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Express your interest</DialogTitle>
                  <DialogDescription>Our Investor Relations team will reach out within 2 business days.</DialogDescription>
                </DialogHeader>
                <InvestorForm onDone={() => setOpen(false)} />
                <DialogFooter />
              </DialogContent>
            </Dialog>
            <a href="#resources" className="btn-ghost"><Download className="h-4 w-4" /> Request Investor Deck</a>
            <a href="#contact" className="btn-ghost"><Mail className="h-4 w-4" /> Contact Investor Relations</a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 max-w-3xl">
            {[
              { k: "Founded", v: "2023" },
              { k: "HQ", v: "Freetown, SL" },
              { k: "Stage", v: "Series A" },
              { k: "Employees", v: "60+" },
            ].map((s) => (
              <div key={s.k} className="surface-card p-4">
                <dt className="text-xs text-muted-foreground">{s.k}</dt>
                <dd className="mt-1 text-lg font-bold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WHO WE ARE */}
      <Section
        id="about"
        eyebrow={<><Building2 className="h-3 w-3" /> Who we are</>}
        title={<>The super-app powering commerce across Sierra Leone</>}
        kicker="Market360 unifies buying, selling, payments, and delivery for millions of Sierra Leoneans. What Shopify, Stripe, and DoorDash do separately in the West, we do together, natively for West Africa."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Target, title: "Mission", body: "Empower every African entrepreneur with the tools to sell online, get paid, and grow." },
            { Icon: Rocket, title: "Vision", body: "Become the default commerce and payments layer for 100M consumers across West Africa by 2030." },
            { Icon: ShieldCheck, title: "Values", body: "Trust, transparency, and long-term thinking. We treat every seller and buyer like a partner." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="surface-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MARKET OPPORTUNITY */}
      <Section
        eyebrow={<><Globe className="h-3 w-3" /> Market opportunity</>}
        title={<>A <span className="gradient-text">$28B</span> underserved commerce market</>}
        kicker="West Africa has 400M+ consumers, mobile penetration above 90%, and e-commerce penetration under 8%. The gap is our opportunity."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "$28B", k: "TAM by 2030 (West Africa e-commerce)" },
            { v: "8M+", k: "Sierra Leone population" },
            { v: "<8%", k: "Current e-commerce penetration" },
            { v: "92%", k: "Mobile phone penetration" },
          ].map((x) => (
            <div key={x.k} className="surface-card p-6">
              <p className="text-4xl font-bold gradient-text">{x.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{x.k}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY INVEST */}
      <Section
        eyebrow={<><TrendingUp className="h-3 w-3" /> Why invest</>}
        title={<>Six reasons investors back Market360</>}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyInvest.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card surface-card-hover p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BUSINESS MODEL + REVENUE STREAMS */}
      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow"><Layers className="h-3 w-3" /> Business model</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Marketplace + fintech, one integrated stack</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Buyers and sellers transact through Market360 with our built-in wallet. Every transaction generates
              a marketplace commission, a payment fee, and — through logistics — a delivery fee. This vertical integration
              lets us capture significantly more revenue per user than any single-purpose competitor.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Take rate expands as buyers use Wallet across the full transaction",
                "Zero-margin verticals subsidised by high-margin fintech",
                "Every seller is a distribution channel for new buyers",
              ].map((x) => (
                <li key={x} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow"><Wallet className="h-3 w-3" /> Revenue streams</span>
            <h2 className="mt-3 text-2xl font-bold">FY26 revenue mix</h2>
            <div className="mt-6 space-y-3">
              {revenueStreams.map(({ icon: Icon, title, body, share }) => (
                <div key={title} className="surface-card p-4 flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold">{title}</h4>
                      <span className="text-sm font-semibold text-primary">{share}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROWTH STRATEGY */}
      <Section
        eyebrow={<><Rocket className="h-3 w-3" /> Growth strategy</>}
        title="How we grow from #1 in Sierra Leone to regional leader"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strategy.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPETITIVE ADVANTAGES */}
      <Section
        eyebrow={<><ShieldCheck className="h-3 w-3" /> Competitive advantages</>}
        title="What makes Market360 defensible"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {advantages.map((a) => (
            <li key={a} className="surface-card p-4 flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm">{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FUTURE ROADMAP */}
      <Section
        eyebrow={<><Target className="h-3 w-3" /> Future roadmap</>}
        title="Where Market360 is going next"
      >
        <ol className="relative border-l-2 border-border pl-6 space-y-6">
          {roadmap.map((r) => (
            <li key={r.period} className="relative">
              <span className="absolute -left-[35px] top-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                ●
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{r.period}</p>
              <h3 className="mt-1 text-lg font-bold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* KPIs + CHART */}
      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <span className="eyebrow"><LineChart className="h-3 w-3" /> Key performance indicators</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">The numbers behind the story</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {kpiCards.map((k) => (
                <div key={k.label} className="surface-card p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <p className="mt-2 text-2xl font-bold gradient-text">{k.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
                </div>
              ))}
            </div>
            <GrowthBars />
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <Section
        eyebrow={<><Users className="h-3 w-3" /> Leadership</>}
        title="Backed by operators who've built at scale"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] items-start">
          <div className="surface-card overflow-hidden">
            <img
              src={IR_TEAM}
              alt="Market360 leadership team in the Freetown office"
              width={1600}
              height={1008}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {leadership.map((p) => (
              <div key={p.name} className="surface-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-bold text-primary">
                    {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{p.name}</p>
                    <p className="text-xs text-primary font-semibold">{p.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* INVESTMENT OPPORTUNITIES / FUNDING ROUNDS */}
      <section id="opportunities" className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <span className="eyebrow"><TrendingUp className="h-3 w-3" /> Investment opportunities</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Current funding rounds</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Qualified investors can participate in the rounds below. Express your interest and our team
            will schedule a call, share the full data room, and walk you through terms.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {rounds.map((r) => (
              <article key={r.id} className="surface-card p-6 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold">{r.stage}</h3>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                    r.status === "Open" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    r.status === "Upcoming" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>{r.status}</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-xs text-muted-foreground">Target</dt><dd className="font-semibold">{r.target}</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Minimum</dt><dd className="font-semibold">{r.minimum}</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Equity</dt><dd className="font-semibold">{r.equity}</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Raised</dt><dd className="font-semibold">{r.raised}</dd></div>
                </dl>
                <p className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Use of funds:</span> {r.use}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-semibold">{r.progress}%</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${r.progress}%` }} />
                  </div>
                </div>
                <button
                  className="btn-primary mt-6 w-full justify-center disabled:opacity-40"
                  onClick={() => setOpen(true)}
                  disabled={r.status === "Closed"}
                >
                  {r.status === "Closed" ? "Round closed" : "Express interest"} {r.status !== "Closed" && <ArrowRight className="h-4 w-4" />}
                </button>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
            Expressing interest does not constitute an investment agreement. All investments are subject
            to accreditation checks, due diligence, and signed definitive documents.
          </p>
        </div>
      </section>

      {/* INVESTOR RESOURCES */}
      <Section
        id="resources"
        eyebrow={<><FileText className="h-3 w-3" /> Investor resources</>}
        title="Documents & data room"
        kicker="Download our public materials below. Confirmed investors receive full access to the private data room."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <a key={r.name} href={r.href} className="surface-card surface-card-hover p-5 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.size}</p>
              </div>
              <Download className="h-4 w-4 text-primary" />
            </a>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow={<><GraduationCap className="h-3 w-3" /> Investor FAQ</>}
        title="Common investor questions"
      >
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="surface-card px-5">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CONTACT IR */}
      <section id="contact" className="section-pad bg-surface border-t border-border">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface-card p-6 md:p-8">
            <span className="eyebrow"><Mail className="h-3 w-3" /> Investor Relations</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Speak with our team</h2>
            <p className="mt-3 text-muted-foreground">
              For deck requests, diligence coordination, and partnership inquiries.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> investors@market360.shop</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +232 76 000 000</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> 4th Floor, Wilkinson Road, Freetown, Sierra Leone</li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary" /> Mon–Fri · 09:00–18:00 GMT</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-50 p-5">
              <p className="text-sm font-semibold">Prefer to get started right now?</p>
              <button className="btn-primary mt-3" onClick={() => setOpen(true)}>
                Become an Investor <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="surface-card p-6 md:p-8">
            <h3 className="text-xl font-bold">Send a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">Same form powers our investor pipeline.</p>
            <div className="mt-6">
              <InvestorForm />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
