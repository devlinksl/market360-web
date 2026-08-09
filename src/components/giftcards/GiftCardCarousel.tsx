import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { GIFT_CARDS, type GiftCard } from "./data";

/** Route map — keeps TanStack's typed links happy without a dynamic segment. */
export const GIFT_CARD_HREF = {
  bronze: "/gift-cards/bronze",
  silver: "/gift-cards/silver",
  gold: "/gift-cards/gold",
  platinum: "/gift-cards/platinum",
  diamond: "/gift-cards/diamond",
  "m360-super": "/gift-cards/m360-super",
} as const;

export function GiftCardArt({
  card,
  className = "",
  eager = false,
}: {
  card: GiftCard;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.accent} p-4 ${className}`}
    >
      <img
        src={card.image}
        alt={card.alt}
        width={900}
        height={600}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="w-full transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
      />
    </div>
  );
}

/** Premium snap carousel: arrows, dots, swipe, keyboard. */
export function GiftCardCarousel({ heading }: { heading?: ReactNode }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const count = GIFT_CARDS.length;

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const dx = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * dx, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max / (count - 1)) * i, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-4">
        {heading}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous gift cards"
            onClick={() => step(-1)}
            disabled={!canPrev}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-primary disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next gift cards"
            onClick={() => step(1)}
            disabled={!canNext}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-primary disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Market360 e-gift cards"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {GIFT_CARDS.map((card) => (
          <article
            key={card.slug}
            data-card
            className="group w-[78%] shrink-0 snap-start sm:w-[52%] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="surface-card surface-card-hover flex h-full flex-col overflow-hidden">
              <GiftCardArt card={card} className="rounded-none" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {card.name}
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight">{card.price}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.tagline}</p>
                <Link to={GIFT_CARD_HREF[card.slug]} className="btn-primary mt-4 w-full justify-center text-sm">
                  View Card <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {GIFT_CARDS.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            aria-label={`Go to ${c.name} gift card`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-2 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
