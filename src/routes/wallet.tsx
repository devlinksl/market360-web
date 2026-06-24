import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import {
  Wallet, Zap, Globe, RefreshCw, FileText, Shield, Lock, Smartphone,
  CheckCircle2, ArrowRight, CreditCard, Bell, Fingerprint,
} from "lucide-react";
import imgWallet from "@/assets/img-wallet.jpg.asset.json";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Market360 Wallet — Instant payments for Sierra Leone" },
      { name: "description", content: "The Market360 Wallet powers every transaction on the marketplace. Instant settlement, free internal transfers, and one-tap withdrawals to Orange Money, Africell Money, or your bank." },
      { property: "og:title", content: "Market360 Wallet" },
      { property: "og:description", content: "Instant settlements, free transfers, secure payouts." },
      { property: "og:url", content: "/wallet" },
      { property: "og:image", content: imgWallet.url },
    ],
    links: [{ rel: "canonical", href: "/wallet" }],
  }),
  component: WalletPage,
});

function WalletPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Integrated Wallet"
        title={<>Your money. <span className="gradient-text">Always moving.</span></>}
        description="The Market360 Wallet is more than a balance — it's the financial layer that connects buyers, sellers, and stores in real time. Send, receive, and withdraw without ever leaving the app."
      >
        <Link to="/download" className="btn-primary"><Smartphone className="h-4 w-4" /> Get the App</Link>
        <Link to="/features" className="btn-ghost">All features <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-pro grid gap-12 lg:grid-cols-2 items-center">
          <figure className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img src={imgWallet.url} alt="Hand holding a phone showing the Market360 wallet" className="aspect-[5/4] w-full object-cover" loading="eager" decoding="async" />
          </figure>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">A wallet built for commerce, not just storage.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every Market360 user gets a wallet by default. Buyers fund purchases. Sellers receive earnings the moment an order is confirmed. Everyone benefits from instant, transparent, fee-light money movement.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Zap, t: "Instant settlement", d: "Earnings land the second an order is confirmed — no holds, no delays." },
                { icon: Globe, t: "Multiple payout methods", d: "Withdraw to Orange Money, Africell Money, or your bank in one tap." },
                { icon: RefreshCw, t: "Free internal transfers", d: "Send money to any Market360 user instantly, at no cost." },
                { icon: FileText, t: "Full transaction history", d: "Every credit, debit, and withdrawal logged and exportable." },
                { icon: Shield, t: "Bank-grade security", d: "End-to-end encryption, biometric login, and real-time fraud monitoring." },
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
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">From sale to payout in seconds.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Buyer pays", d: "Payment flows from the buyer's wallet or mobile money straight into escrow." },
              { n: "02", t: "Order confirmed", d: "When the buyer receives the order, the funds release to the seller's wallet." },
              { n: "03", t: "Use or move", d: "Spend on the platform, send to another user, or queue a withdrawal." },
              { n: "04", t: "Withdraw anywhere", d: "Cash out to Orange Money, Africell Money, or your bank — same day." },
            ].map((s) => (
              <div key={s.n} className="surface-card p-6">
                <p className="text-primary font-bold">{s.n}</p>
                <p className="mt-2 font-semibold">{s.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro">
          <h2 className="text-3xl font-bold sm:text-4xl text-center">Security at every layer.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Lock, t: "End-to-end encryption", d: "All wallet data is encrypted in transit and at rest." },
              { icon: Fingerprint, t: "Biometric login", d: "Fingerprint or Face ID unlocks the wallet — no passwords to lose." },
              { icon: Bell, t: "Real-time alerts", d: "Every transaction sends a notification, so unusual activity is caught instantly." },
              { icon: Shield, t: "Fraud monitoring", d: "AI scoring on every transaction flags suspicious patterns before they hurt you." },
              { icon: CreditCard, t: "Escrow on every order", d: "Funds are held in escrow until both sides are satisfied." },
              { icon: CheckCircle2, t: "Regulated & compliant", d: "Operated within Sierra Leone's financial-services regulatory framework." },
            ].map((c) => (
              <div key={c.t} className="surface-card surface-card-hover p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><c.icon className="h-5 w-5" /></div>
                <p className="mt-4 font-semibold">{c.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 surface-card p-8 md:p-12 text-center">
            <Wallet className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">Get your Market360 Wallet today.</h3>
            <p className="mt-2 text-muted-foreground">Install the app to set up your wallet — it takes under a minute.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/download" className="btn-primary"><Smartphone className="h-4 w-4" /> Download the App</Link>
              <Link to="/safety" className="btn-ghost">How we keep it safe</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
