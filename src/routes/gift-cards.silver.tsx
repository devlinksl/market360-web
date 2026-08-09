import { createFileRoute } from "@tanstack/react-router";
import { GiftCardDetail, giftCardSchema } from "@/components/giftcards/GiftCardDetail";
import { getGiftCard } from "@/components/giftcards/data";

const card = getGiftCard("silver");
const TITLE = `Market360 Silver E-Gift Card — ${card.price}`;
const URL = "https://market360.shop/gift-cards/silver";

export const Route = createFileRoute("/gift-cards/silver")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: card.description },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: card.description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `https://market360.shop${card.image}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://market360.shop${card.image}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(giftCardSchema("silver")) }],
  }),
  component: () => <GiftCardDetail slug="silver" />,
});
