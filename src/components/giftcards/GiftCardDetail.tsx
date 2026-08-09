import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Gift, ShieldCheck, Zap, Smartphone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { GIFT_CARDS, getGiftCard, type GiftCardSlug } from "./data";
import { GiftCardArt, GIFT_CARD_HREF } from "./GiftCardCarousel";

/** Shared detail body used by every /gift-cards/<tier> route. */
export function GiftCardDetail({ slug }: { slug: GiftCardSlug }) {
  const card = getGiftCard(slug);
  const others = GIFT_CARDS.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="container-pro section-pad">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/gift-cards" className="hover:text-primary">E-Gift Cards</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">{card.name}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <GiftCardArt card={card} eager className="shadow-soft" />
            <div>
              <span className="eyebrow"><Gift className="h-3 w-3" /> Market360 E-Gift Card</span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {card.name} — {card.price}
              </h1>
              <p className="mt-3 text-lg text-primary font-semibold">{card.tagline}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{card.description}</p>

              <ul className="mt-6 space-y-3">
                {card.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/download" className="btn-primary">
                  Get this card in the app <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/gift-cards" className="btn-ghost">See all cards</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pro grid gap-6 md:grid-cols-3">
          {[
            { Icon: Zap, title: "Instant delivery", body: "Buy it now, and it lands in their inbox or Market360 app within seconds — no shipping, no waiting." },
            { Icon: ShieldCheck, title: "Secure by design", body: "Every card carries a unique, single-use redemption code protected by Market360's fraud systems." },
            { Icon: Smartphone, title: "Redeemed in one tap", body: "The balance drops straight into the Market360 wallet and can be spent across any verified seller." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="surface-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-pro">
          <h2 className="text-2xl font-bold tracking-tight">How to send the {card.name} card</h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-4">
            {[
              "Open Market360 and tap Gift Cards.",
              `Choose ${card.name} (${card.price}).`,
              "Add the recipient and a personal message.",
              "Pay with your wallet — it sends instantly.",
            ].map((stepText, i) => (
              <li key={stepText} className="surface-card p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{stepText}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-pro">
          <h2 className="text-2xl font-bold tracking-tight">Other Market360 gift cards</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((c) => (
              <Link key={c.slug} to={GIFT_CARD_HREF[c.slug]} className="group surface-card surface-card-hover overflow-hidden">
                <GiftCardArt card={c} className="rounded-none" />
                <div className="p-5">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-lg font-bold">{c.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/** Product structured data for a single card. */
export function giftCardSchema(slug: GiftCardSlug) {
  const card = getGiftCard(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Market360 ${card.name} E-Gift Card`,
    image: `https://market360.shop${card.image}`,
    description: card.description,
    brand: { "@type": "Brand", name: "Market360" },
    category: "Gift Cards",
    offers: {
      "@type": "Offer",
      url: `https://market360.shop${GIFT_CARD_HREF[card.slug]}`,
      price: String(card.amount),
      priceCurrency: "SLE",
      availability: "https://schema.org/InStock",
    },
  };
}
