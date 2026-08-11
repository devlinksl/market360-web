/**
 * Market360 E-Gift Cards — single source of truth.
 * Card names, prices and artwork are official assets: do not alter.
 */

export type GiftCardSlug =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "m360-super";

export interface GiftCard {
  slug: GiftCardSlug;
  name: string;
  price: string;
  amount: number;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  accent: string;
  benefits: string[];
}

export const GIFT_CARDS: GiftCard[] = [
  {
    slug: "bronze",
    name: "Bronze",
    price: "Le 100",
    amount: 100,
    tagline: "Perfect for everyday gifting.",
    description:
      "A warm little thank-you. The Bronze e-gift card is the easiest way to say you appreciate someone — small in value, big in thought, and spendable across the whole Market360 marketplace.",
    image: "/brand/market360-bronze-gift-card.webp",
    alt: "Market360 Bronze e-gift card worth Le 100",
    accent: "from-amber-100 to-orange-50",
    benefits: [
      "Delivered instantly by email or in-app",
      "Spend across any Market360 category",
      "No expiry on the gifted balance",
    ],
  },
  {
    slug: "silver",
    name: "Silver",
    price: "Le 120",
    amount: 120,
    tagline: "Simple. Elegant. Thoughtful.",
    description:
      "Clean, classic and always welcome. Silver is the go-to card for birthdays, congratulations and small celebrations that still deserve something real.",
    image: "/brand/market360-silver-gift-card.webp",
    alt: "Market360 Silver e-gift card worth Le 120",
    accent: "from-slate-100 to-slate-50",
    benefits: [
      "Instant digital delivery",
      "Personalised message with every card",
      "Redeemable in one tap in the Market360 app",
    ],
  },
  {
    slug: "gold",
    name: "Gold",
    price: "Le 300",
    amount: 300,
    tagline: "Make the occasion special.",
    description:
      "Luxury gifting without the guesswork. Gold gives the person you're gifting real freedom to choose from thousands of listings — fashion, electronics, home and more.",
    image: "/brand/market360-gold-gift-card.webp",
    alt: "Market360 Gold e-gift card worth Le 300",
    accent: "from-yellow-100 to-amber-50",
    benefits: [
      "Popular choice for birthdays and weddings",
      "Balance can be split across multiple orders",
      "Track redemption from your account",
    ],
  },
  {
    slug: "platinum",
    name: "Platinum",
    price: "Le 600",
    amount: 600,
    tagline: "A premium way to give.",
    description:
      "Refined and premium. Platinum is built for the moments that matter — a milestone, a promotion, or a thank-you that needs to land properly.",
    image: "/brand/market360-platinum-gift-card.webp",
    alt: "Market360 Platinum e-gift card worth Le 600",
    accent: "from-rose-100 to-pink-50",
    benefits: [
      "Premium presentation for special occasions",
      "Works with every verified Market360 seller",
      "Combine with promo codes at checkout",
    ],
  },
  {
    slug: "diamond",
    name: "Diamond",
    price: "Le 800",
    amount: 800,
    tagline: "For unforgettable gifting.",
    description:
      "Crystal-clear class. Diamond carries enough value for a genuinely memorable gift, while still leaving the choice entirely in the recipient's hands.",
    image: "/brand/market360-diamond-gift-card.webp",
    alt: "Market360 Diamond e-gift card worth Le 800",
    accent: "from-sky-100 to-slate-50",
    benefits: [
      "High-value gifting with full flexibility",
      "Ideal for corporate and team rewards",
      "Secure, single-use redemption code",
    ],
  },
  {
    slug: "m360-super",
    name: "M360 Super",
    price: "Le 1,000",
    amount: 1000,
    tagline: "The ultimate Market360 gift.",
    description:
      "The signature Market360 card. M360 Super is our flagship denomination — the most generous way to give someone the run of the marketplace.",
    image: "/brand/market360-m360-super-gift-card.webp",
    alt: "Market360 M360 Super e-gift card worth Le 1,000",
    accent: "from-emerald-100 to-emerald-50",
    benefits: [
      "Our highest denomination",
      "Perfect for staff rewards and big occasions",
      "Full balance visible in the Market360 wallet",
    ],
  },
];

export const GIFT_CARD_HERO = "/brand/market360-gift-cards-hero.webp";

export function getGiftCard(slug: GiftCardSlug): GiftCard {
  return GIFT_CARDS.find((c) => c.slug === slug)!;
}
