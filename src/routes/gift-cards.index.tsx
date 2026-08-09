import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, ArrowRight, Sparkles, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { GIFT_CARDS, GIFT_CARD_HERO } from "@/components/giftcards/data";
import { GiftCardCarousel } from "@/components/giftcards/GiftCardCarousel";

const TITLE = "Market360 E-Gift Cards — Give more. Share more.";
const DESC =
  "Send a Market360 e-gift card in seconds. Six premium denominations from Le 100 to Le 1,000, delivered instantly and spendable across Sierra Leone's #1 online shopping marketplace.";
const URL = "https://market360.shop/gift-cards";

export const Route = createFileRoute("/gift-cards/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `https://market360.shop${GIFT_CARD_HERO}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://market360.shop${GIFT_CARD_HERO}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Market360 E-Gift Cards",
          itemListElement: GIFT_CARDS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Market360 ${c.name} E-Gift Card — ${c.price}`,
            url: `https://market360.shop/gift-cards/${c.slug}`,
          })),
        }),
      },
    ],
  }),
  component: GiftCardsLanding,
});

function GiftCardsLanding() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={GIFT_CARD_HERO}
          alt="Market360 e-gift cards arranged on a green diagonal backdrop"
          width={1200}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="container-pro relative section-pad">
          <div className="max-w-xl text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest ring-1 ring-white/25 backdrop-blur">
              <Sparkles className="h-3 w-3" /> New on Market360
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Market360 E-Gift Cards
            </h1>
            <p className="mt-3 text-2xl font-semibold text-white/90">Give more. Share more.</p>
            <p className="mt-4 max-w-lg text-white/80 leading-relaxed">
              Six premium denominations, delivered instantly, spendable on everything from fashion and
              electronics to groceries and home essentials.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cards" className="btn-primary">
                Browse the collection <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/download" className="btn-ghost !text-white !border-white/40 hover:!bg-white/10">
                Get the app
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section id="cards" className="section-pad">
        <div className="container-pro">
          <GiftCardCarousel
            heading={
              <div>
                <span className="eyebrow"><Gift className="h-3 w-3" /> The collection</span>
                <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
                  Six cards. One unforgettable gesture.
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  From a small thank-you to the flagship M360 Super, every card is redeemed straight into
                  the Market360 wallet.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Why */}
      <section className="section-pad bg-surface border-y border-border">
        <div className="container-pro grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow"><Sparkles className="h-3 w-3" /> Why gift with Market360</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The gift that always fits.
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              No guessing sizes, colours or taste. A Market360 e-gift card hands the choice to the person
              receiving it — across thousands of verified listings.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Delivered in seconds — no shipping, no delays",
                "Unique, single-use redemption codes",
                "No expiry on the gifted balance",
                "Works with promo codes and wallet top-ups",
                "Perfect for staff rewards and corporate gifting",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { n: "1", t: "Pick a card", d: "Choose from Bronze to M360 Super." },
              { n: "2", t: "Personalise", d: "Add a name and a short message." },
              { n: "3", t: "Send instantly", d: "Pay with your wallet and it's delivered." },
            ].map((s) => (
              <div key={s.n} className="surface-card p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.n}
                </span>
                <p className="mt-3 font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary-glow p-10 text-center text-white">
            <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Give more. Share more.</h2>
              <p className="mx-auto mt-3 max-w-lg text-white/85">
                Send your first Market360 e-gift card from the app today.
              </p>
              <Link to="/download" className="btn-ghost mt-7 !bg-white !text-primary !border-transparent">
                Download Market360 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
