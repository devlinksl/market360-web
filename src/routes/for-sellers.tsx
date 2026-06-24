import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import {
  Store, UserCheck, Package, DollarSign, Repeat, BarChart3, Award, Megaphone,
  Zap, CheckCircle2, ArrowRight, Smartphone, FileText, Users,
} from "lucide-react";
import imgSeller from "@/assets/img-seller.jpg.asset.json";

export const Route = createFileRoute("/for-sellers")({
  head: () => ({
    meta: [
      { title: "For Sellers — Launch your store on Market360" },
      { name: "description", content: "Open a verified store on Market360 in minutes. Manage listings, fulfil orders, and get paid instantly with the built-in wallet. Tools built for Sierra Leone's sellers." },
      { property: "og:title", content: "Market360 for Sellers" },
      { property: "og:description", content: "Pro selling tools, instant payouts, verified storefronts." },
      { property: "og:url", content: "/for-sellers" },
      { property: "og:image", content: imgSeller.url },
    ],
    links: [{ rel: "canonical", href: "/for-sellers" }],
  }),
  component: SellersPage,
});

function SellersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Sellers"
        title={<>Launch your store in <span className="gradient-text">minutes.</span></>}
        description="From a small market stall to a national brand — Market360 gives every seller the same professional tools, without the technical setup or high upfront costs."
      >
        <Link to="/seller-solutions" className="btn-primary">Start selling <ArrowRight className="h-4 w-4" /></Link>
        <Link to="/download" className="btn-ghost"><Smartphone className="h-4 w-4" /> Get the App</Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-pro grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Built for serious sellers — and first-time ones.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you sell five items a week or five hundred, Market360 scales with you. List products, capture orders, message buyers, and watch the money land in your wallet — all from one place.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: UserCheck, t: "Verified status", d: "Build buyer trust with KYC-verified identity and a public seller badge." },
                { icon: Package, t: "Inventory tools", d: "Manage variants, stock levels, and product images with bulk-friendly tools." },
                { icon: DollarSign, t: "Instant earnings", d: "Funds land in your wallet the second an order is confirmed — no waiting periods." },
                { icon: Repeat, t: "Order fulfillment", d: "Update statuses, communicate with buyers, and issue receipts from your dashboard." },
                { icon: BarChart3, t: "Real-time analytics", d: "See what sells, what doesn't, and where your buyers are coming from." },
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
          <figure className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img src={imgSeller.url} alt="Sierra Leonean shop owner managing his Market360 store" className="aspect-[5/4] w-full object-cover" loading="eager" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Seller benefits</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Everything you need to grow.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Store, t: "Branded storefront", d: "Logo, banner, and curated collections that make your store stand out." },
              { icon: Award, t: "Reputation system", d: "Earn Top Seller status with consistent ratings and fast fulfillment." },
              { icon: Megaphone, t: "Built-in promotions", d: "Run flash sales, coupons, and featured placements from the dashboard." },
              { icon: Zap, t: "Lightning checkout", d: "Optimized checkout converts more browsers into paying customers." },
              { icon: FileText, t: "Tax-ready receipts", d: "Auto-generated receipts and exports keep your books in order." },
              { icon: Users, t: "Customer CRM", d: "See repeat buyers, lifetime value, and your top customers at a glance." },
            ].map((c) => (
              <div key={c.t} className="surface-card surface-card-hover p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"><c.icon className="h-5 w-5" /></div>
                <p className="mt-4 font-semibold">{c.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro max-w-4xl">
          <h2 className="text-3xl font-bold sm:text-4xl text-center">From zero to first sale.</h2>
          <div className="mt-10 space-y-4">
            {[
              { n: "01", t: "Register your seller account", d: "Sign up with your phone number or email — takes under 2 minutes." },
              { n: "02", t: "Verify your identity (KYC)", d: "Upload an ID document. Verification is usually completed within 24 hours." },
              { n: "03", t: "Set up your storefront", d: "Add a logo, banner, and a short description that introduces your brand." },
              { n: "04", t: "Add your first listings", d: "Upload products with clear photos, accurate pricing, and stock levels." },
              { n: "05", t: "Connect your payout method", d: "Link Orange Money, Africell Money, or a bank account for withdrawals." },
              { n: "06", t: "Go live and start selling", d: "Publish your store, share the link, and watch the orders roll in." },
            ].map((s) => (
              <div key={s.n} className="surface-card p-6 flex gap-5 items-start">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary font-bold">{s.n}</div>
                <div>
                  <p className="font-semibold">{s.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 surface-card p-8 md:p-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">Ready to open your store?</h3>
            <p className="mt-2 text-muted-foreground">Join thousands of sellers already growing on Market360.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/seller-solutions" className="btn-primary">Start selling</Link>
              <Link to="/contact" className="btn-ghost">Talk to our sales team</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
