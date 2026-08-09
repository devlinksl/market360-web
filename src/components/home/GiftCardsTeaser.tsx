import { Link } from "@tanstack/react-router";
import { Gift, ArrowRight } from "lucide-react";
import { GIFT_CARDS } from "@/components/giftcards/data";
import { GIFT_CARD_HREF } from "@/components/giftcards/GiftCardCarousel";

/** Homepage teaser — "Give Something Special". */
export function GiftCardsTeaser() {
  const featured = GIFT_CARDS.slice(0, 4);
  return (
    <section className="section-pad bg-surface border-y border-border">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><Gift className="h-3 w-3" /> E-Gift Cards</span>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
              Give something special.
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Market360 e-gift cards from Le 100 to Le 1,000 — delivered instantly, spendable on anything
              in the marketplace.
            </p>
          </div>
          <Link to="/gift-cards" className="btn-primary">
            Explore gift cards <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((c) => (
            <Link
              key={c.slug}
              to={GIFT_CARD_HREF[c.slug]}
              className="group surface-card surface-card-hover overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${c.accent} p-3`}>
                <img
                  src={c.image}
                  alt={c.alt}
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.name}</p>
                <p className="text-lg font-bold">{c.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
