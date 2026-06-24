import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import {
  ShieldCheck, Search, Truck, MessageCircle, Star, CreditCard, RefreshCw,
  Award, LayoutGrid, Lock, CheckCircle2, ArrowRight, Smartphone, Heart, Bell,
} from "lucide-react";
import imgBuyer from "@/assets/img-buyer.jpg.asset.json";

export const Route = createFileRoute("/for-buyers")({
  head: () => ({
    meta: [
      { title: "For Buyers — Shop safely on Market360" },
      { name: "description", content: "Discover thousands of verified sellers across Sierra Leone. Pay securely with escrow, track every delivery, and shop with full buyer protection on Market360." },
      { property: "og:title", content: "Market360 for Buyers" },
      { property: "og:description", content: "Verified sellers, escrow protection, and real-time tracking." },
      { property: "og:url", content: "/for-buyers" },
      { property: "og:image", content: imgBuyer.url },
    ],
    links: [{ rel: "canonical", href: "/for-buyers" }],
  }),
  component: BuyersPage,
});

function BuyersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Buyers"
        title={<>Shop with <span className="gradient-text">confidence</span> — every time.</>}
        description="Market360 connects you to thousands of verified sellers across Sierra Leone. Every purchase is backed by buyer protection, secure checkout, and real-time order tracking."
      >
        <Link to="/download" className="btn-primary"><Smartphone className="h-4 w-4" /> Get the App</Link>
        <Link to="/features" className="btn-ghost">All features <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-pro grid gap-12 lg:grid-cols-2 items-center">
          <figure className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img src={imgBuyer.url} alt="Shopper using Market360" className="aspect-[5/4] w-full object-cover" loading="eager" decoding="async" />
          </figure>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Built around how you actually shop.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From discovering a new store on the home feed to confirming delivery at your door, every interaction is designed to feel fast, transparent, and safe.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Search, t: "Smart discovery", d: "Browse by category, price, location, or seller rating with instant filters." },
                { icon: ShieldCheck, t: "Buyer protection", d: "Escrow holds your payment until you confirm delivery — every order, automatically." },
                { icon: Truck, t: "Live tracking", d: "Follow your order from dispatch to doorstep with timestamped status updates." },
                { icon: MessageCircle, t: "Direct seller chat", d: "Ask questions and resolve concerns inside the app, with a full conversation history." },
                { icon: Star, t: "Verified reviews", d: "Only buyers who completed a purchase can leave a review — so ratings stay honest." },
              ].map((b) => (
                <li key={b.t} className="flex items-start gap-4">
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary"><b.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold">{b.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why buyers stay</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A marketplace that works for you.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: LayoutGrid, t: "Curated categories", d: "Fashion, electronics, food, services — organized for fast discovery." },
              { icon: Award, t: "Seller badges", d: "Verified, Top Seller, and Featured badges identify trustworthy stores." },
              { icon: CreditCard, t: "Flexible payment", d: "Pay from your wallet, mobile money, or card with one tap." },
              { icon: RefreshCw, t: "Easy returns", d: "Structured return process with mediation if needed." },
              { icon: Lock, t: "Encrypted by default", d: "Bank-grade encryption protects your data and your money." },
              { icon: Heart, t: "Save & wishlist", d: "Bookmark items and stores you love for later." },
              { icon: Bell, t: "Real-time alerts", d: "Get notified about order updates, replies, and deals you care about." },
              { icon: Smartphone, t: "Built for mobile", d: "Lightweight, fast, and friendly on slow networks." },
            ].map((c) => (
              <div key={c.t} className="surface-card surface-card-hover p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><c.icon className="h-5 w-5" /></div>
                <p className="mt-4 font-semibold">{c.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro">
          <h2 className="text-3xl font-bold sm:text-4xl text-center">How a Market360 purchase works.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Find what you need", d: "Search, filter, and compare verified listings from sellers across Sierra Leone." },
              { n: "02", t: "Checkout in seconds", d: "Pay from your wallet, mobile money, or card. Your funds are held in escrow." },
              { n: "03", t: "Track the delivery", d: "Watch your order move from dispatch to your door with live updates." },
              { n: "04", t: "Confirm & review", d: "Confirm receipt, release the payment, and leave a verified review." },
            ].map((s) => (
              <div key={s.n} className="surface-card p-6">
                <p className="text-primary font-bold">{s.n}</p>
                <p className="mt-2 font-semibold">{s.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 surface-card p-8 md:p-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">Ready to start shopping?</h3>
            <p className="mt-2 text-muted-foreground">Download Market360 and browse thousands of verified listings.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/download" className="btn-primary"><Smartphone className="h-4 w-4" /> Get the App</Link>
              <Link to="/tester" className="btn-ghost">Join the tester program</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
