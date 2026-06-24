import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import {
  Search, Book, ShoppingBag, Store, Wallet, Shield, MessageCircle, ArrowRight,
  CreditCard, Smartphone, Truck, AlertTriangle, Mail, Phone, Clock,
} from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Market360" },
      { name: "description", content: "Find answers about buying, selling, the wallet, security, and your account on Market360. Step-by-step guides, FAQs, and 24/7 support." },
      { property: "og:title", content: "Market360 Help Center" },
      { property: "og:description", content: "Guides, FAQs, and support for Market360." },
      { property: "og:url", content: "/help" },
    ],
    links: [{ rel: "canonical", href: "/help" }],
  }),
  component: HelpPage,
});

const categories = [
  { icon: ShoppingBag, t: "Buying", n: 18, anchor: "buying" },
  { icon: Store, t: "Selling", n: 24, anchor: "selling" },
  { icon: Wallet, t: "Wallet & payments", n: 14, anchor: "wallet" },
  { icon: Shield, t: "Trust & safety", n: 11, anchor: "safety" },
  { icon: Book, t: "Account", n: 9, anchor: "account" },
  { icon: MessageCircle, t: "Disputes", n: 7, anchor: "disputes" },
];

const sections: { id: string; icon: typeof ShoppingBag; title: string; items: { q: string; a: string }[] }[] = [
  {
    id: "buying",
    icon: ShoppingBag,
    title: "Buying on Market360",
    items: [
      { q: "How do I place my first order?", a: "Open the app, browse or search for a product, tap 'Buy now', choose a payment method, and confirm your delivery address. You'll see the seller's profile, verified status, and ratings before checkout." },
      { q: "What happens if my order is delayed?", a: "All orders have a clear delivery window. If a seller misses it, message them through the in-app chat. If there's no response within 48 hours, open a dispute from the order page and our team will mediate within 24 hours." },
      { q: "Can I cancel an order?", a: "Yes — orders can be cancelled before the seller marks them as 'shipped'. Open the order, tap 'Cancel order', and your escrowed funds will return to your wallet within minutes." },
      { q: "What if the item arrives damaged or wrong?", a: "Don't confirm receipt. Take photos of the item and the packaging, then open a dispute from the order page. Our team reviews evidence from both sides and resolves disputes within 7 business days." },
      { q: "Do I need to pay upfront?", a: "Yes, but your money is held in escrow — released to the seller only after you confirm delivery. This protects you on every order." },
    ],
  },
  {
    id: "selling",
    icon: Store,
    title: "Selling on Market360",
    items: [
      { q: "How do I open a store?", a: "Tap 'Sell' in the app, complete the seller profile, and submit your KYC documents. Verification usually takes under 24 hours. Once approved, you can add listings and start receiving orders." },
      { q: "What does it cost to sell?", a: "Listing is free. Market360 charges a small commission per completed sale (typically 4–6% depending on category), plus standard payment processing fees. Full details are in your seller dashboard." },
      { q: "How do I add a product?", a: "From your seller dashboard, tap 'Add product'. Upload clear photos, write an honest description, set the price and stock level, then publish. Listings appear in search within minutes." },
      { q: "When do I get paid?", a: "Funds land in your Market360 wallet the moment a buyer confirms delivery. You can withdraw to Orange Money, Africell Money, or a bank account any time — withdrawals typically settle in under 3 minutes." },
      { q: "How do I become a Top Seller?", a: "Consistently maintain a 4.5+ rating, fulfil orders within the promised window, and respond to buyer messages quickly. The Top Seller badge boosts your visibility in search." },
    ],
  },
  {
    id: "wallet",
    icon: Wallet,
    title: "Wallet & payments",
    items: [
      { q: "How does the Market360 wallet work?", a: "Your wallet is created automatically when you sign up. Top it up from mobile money or card, use it to pay for orders, receive earnings as a seller, and withdraw to your preferred payout method." },
      { q: "What payment methods are supported?", a: "Orange Money, Africell Money, bank transfer, and major debit/credit cards. You can also pay directly from your Market360 wallet balance." },
      { q: "Are there fees for transferring inside Market360?", a: "Internal wallet-to-wallet transfers between Market360 users are free. Withdrawals to external mobile money or banks have a small fee (shown before you confirm)." },
      { q: "How long do withdrawals take?", a: "Most withdrawals complete in under 3 minutes. During peak hours or bank holidays it can take up to 1 business day." },
      { q: "Is my wallet money insured?", a: "Wallet funds are held in segregated accounts at a regulated partner bank. Your balance is never used for Market360's operations." },
    ],
  },
  {
    id: "safety",
    icon: Shield,
    title: "Trust & safety",
    items: [
      { q: "How do I report a suspicious listing or user?", a: "Tap the '⋯' menu on any listing or profile and choose 'Report'. Our trust and safety team reviews every report — usually within a few hours." },
      { q: "How do I know a seller is legitimate?", a: "Look for the blue 'Verified' badge. Verified sellers have completed KYC. Also check ratings, review count, and how long the store has been active." },
      { q: "What should I never do?", a: "Never pay outside the app, never share your password or login code, and never click suspicious links in messages claiming to be from Market360. We will never ask for your password." },
      { q: "What is escrow?", a: "Escrow holds your payment safely until you confirm the order arrived as described. Sellers only get paid after a successful delivery — protecting both sides on every transaction." },
    ],
  },
  {
    id: "account",
    icon: Book,
    title: "Account & profile",
    items: [
      { q: "How do I change my password?", a: "Open Settings → Security → Change password. We'll send a verification code to your registered email or phone first." },
      { q: "I forgot my password. How do I reset it?", a: "On the login screen, tap 'Forgot password'. We'll send a reset link to your registered email and an SMS code to your phone." },
      { q: "How do I enable biometric login?", a: "Settings → Security → Biometric login. Once enabled, fingerprint or Face ID will unlock the app and authorise wallet actions." },
      { q: "How do I delete my account?", a: "Settings → Privacy → Delete account. We'll walk you through the steps and confirm by email. Pending balances must be withdrawn first." },
    ],
  },
  {
    id: "disputes",
    icon: AlertTriangle,
    title: "Disputes & refunds",
    items: [
      { q: "How do I open a dispute?", a: "On the order page, tap 'Report a problem'. Describe what happened, attach photos or screenshots, and submit. Our team acknowledges every dispute within 24 hours." },
      { q: "How long does a dispute take?", a: "Most disputes are resolved within 3 business days. Complex cases involving multiple parties can take up to 7." },
      { q: "When do I get a refund?", a: "If the dispute is resolved in your favour, the funds return to your Market360 wallet immediately. From there you can withdraw or spend them as usual." },
    ],
  },
];

function HelpPage() {
  const popular = [
    "How do I create my first store?",
    "How does the Market360 wallet work?",
    "What happens if my order is delayed?",
    "How do I report a suspicious listing?",
    "How are seller fees calculated?",
    "How can I become a tester?",
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help Center"
        title={<>How can we <span className="gradient-text">help?</span></>}
        description="Browse guides and FAQs, or reach out anytime. Most answers are one click away."
      >
        <div className="w-full max-w-xl">
          <div className="surface-card flex items-center gap-3 px-4 py-2.5">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input placeholder="Search articles, e.g. 'wallet withdrawal'" className="flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-pro">
          <h2 className="text-2xl font-bold">Browse by category</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <a href={`#${c.anchor}`} key={c.t} className="surface-card surface-card-hover p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><c.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold">{c.t}</p>
                    <p className="text-xs text-muted-foreground">{c.n} articles</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <h2 className="text-2xl font-bold">Popular questions</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {popular.map((q) => (
              <a key={q} href="#buying" className="surface-card p-5 flex items-center justify-between text-sm font-medium hover:border-primary/40 transition-colors">
                {q}
                <ArrowRight className="h-4 w-4 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {sections.map((sec, i) => (
        <section key={sec.id} id={sec.id} className={`section-pad ${i % 2 ? "bg-surface border-y border-border" : ""}`}>
          <div className="container-pro max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><sec.icon className="h-5 w-5" /></div>
              <h2 className="text-2xl md:text-3xl font-bold">{sec.title}</h2>
            </div>
            <div className="mt-6 space-y-3">
              {sec.items.map((f) => (
                <details key={f.q} className="surface-card group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad">
        <div className="container-pro">
          <div className="surface-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold">Still need help?</h2>
                <p className="mt-3 text-muted-foreground">Our team responds within hours, every day of the week.</p>
                <div className="mt-6 space-y-3 text-sm">
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@market360.shop</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +232 (0) 76 000 000</p>
                  <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon–Sun · 8am – 10pm GMT</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">Contact support</Link>
                  <Link to="/safety" className="btn-ghost">Marketplace safety</Link>
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Smartphone, t: "Inside the app", d: "Settings → Help & Support" },
                  { icon: CreditCard, t: "Payment issues?", d: "We can lift wallet holds and review failed payouts." },
                  { icon: Truck, t: "Delivery problems?", d: "Open a dispute on the order page for fastest resolution." },
                ].map((c) => (
                  <div key={c.t} className="surface-card p-5 flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary"><c.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-semibold text-sm">{c.t}</p>
                      <p className="text-xs text-muted-foreground">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
