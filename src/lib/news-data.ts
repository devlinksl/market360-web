const imgTester = "/brand/news-tester-launch.jpg";
const imgWallet = "/brand/news-wallet.jpg";
const imgSearch = "/brand/news-search.jpg";
const imgRoadmap = "/brand/news-roadmap.jpg";
const imgFraud = "/brand/news-fraud.jpg";
const imgCommunity = "/brand/news-community.jpg";
const imgDashboard = "/brand/news-dashboard.jpg";

export interface NewsPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  body: { heading?: string; paragraph: string }[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "tester-program-launch",
    category: "Announcement",
    title: "Market360 opens its public tester program",
    excerpt: "We're inviting the community to help shape the next era of Market360 — with early access, perks, and direct influence on the roadmap.",
    date: "Jun 12, 2026",
    author: "Market360 Team",
    readTime: "4 min read",
    image: imgTester,
    body: [
      { paragraph: "Today we're opening up the Market360 Tester Program to the public. After months of running it privately with a small group of sellers and power-buyers, we're ready to invite anyone in Sierra Leone who wants to help shape what comes next." },
      { heading: "Why we're doing this", paragraph: "The best products are built with the people who use them. Our private testers caught dozens of bugs, suggested the redesigned checkout flow, and helped us prioritise wallet improvements over flashier features. Opening the program means we can capture even more of that wisdom." },
      { heading: "What testers get", paragraph: "Early access to every feature, a private community to talk directly with the product team, wallet credit when bugs are reproduced, and an exclusive tester badge on your profile. It's our way of saying thank you for the work you put in." },
      { heading: "How to join", paragraph: "Head to the Tester Program page, enter your name and email, and we'll send an invite link the same day. There's no commitment — leave the program any time from settings." },
    ],
  },
  {
    slug: "wallet-2-launch",
    category: "Product",
    title: "Wallet 2.0 ships: faster settlements, lower fees",
    excerpt: "Get paid in minutes with our re-engineered wallet.",
    date: "Jun 04, 2026",
    author: "Engineering",
    readTime: "5 min read",
    image: imgWallet,
    body: [
      { paragraph: "Wallet 2.0 is now rolling out to every Market360 account. The headline change: payouts land in your linked mobile money account in under three minutes on average — down from up to 24 hours." },
      { heading: "What changed", paragraph: "We rebuilt the settlement layer end-to-end. Instead of batching withdrawals overnight, they now stream as they're requested. We've also cut internal transfer fees to zero and reduced merchant withdrawal fees by roughly 30%." },
      { heading: "What you need to do", paragraph: "Nothing. Open the app and your wallet is already upgraded. If you've never linked a payout method, head to Wallet → Settings → Payout to add one." },
    ],
  },
  {
    slug: "smarter-search",
    category: "Update",
    title: "Smarter search rolls out to all users",
    excerpt: "A redesigned discovery engine helps buyers find exactly what they want.",
    date: "May 22, 2026",
    author: "Product",
    readTime: "3 min read",
    image: imgSearch,
    body: [
      { paragraph: "Search now understands what you mean, not just what you type. Whether you spell it 'kafutay' or 'kaftan', Market360 will surface the right results." },
      { heading: "Under the hood", paragraph: "We've added typo tolerance, synonym expansion for local terms, and a relevance model trained on millions of real Sierra Leone queries. Filters are faster, and category suggestions appear as you type." },
    ],
  },
  {
    slug: "roadmap-q3",
    category: "Roadmap",
    title: "What's coming this quarter",
    excerpt: "Storefronts, bulk uploads, smarter analytics, and more.",
    date: "May 10, 2026",
    author: "Market360 Team",
    readTime: "6 min read",
    image: imgRoadmap,
    body: [
      { paragraph: "Here's a peek at what the team is building over the next three months." },
      { heading: "Storefront 2.0", paragraph: "Branded storefronts with custom banners, featured collections, and shareable links that work great on WhatsApp and Instagram." },
      { heading: "Bulk product upload", paragraph: "Upload hundreds of products at once with a CSV or spreadsheet. Ideal for established sellers migrating their catalogue." },
      { heading: "Analytics deep-dives", paragraph: "Cohort analysis, repeat-buyer tracking, and per-product profit margins — surfaced inside the seller dashboard." },
    ],
  },
  {
    slug: "fraud-protection-update",
    category: "Trust",
    title: "New fraud protection layer goes live",
    excerpt: "Our updated AI model flags risky activity in real-time.",
    date: "Apr 28, 2026",
    author: "Trust & Safety",
    readTime: "4 min read",
    image: imgWallet,
    body: [
      { paragraph: "We've deployed a new fraud-detection model that scores every transaction in milliseconds — blocking suspicious activity before money moves." },
      { heading: "What's new", paragraph: "The model evaluates dozens of behavioural signals: device fingerprint, location consistency, account age, and unusual purchase patterns. Combined, they catch roughly 98% of fraud attempts in the test set with under 0.2% false positives." },
    ],
  },
  {
    slug: "tester-spotlights",
    category: "Community",
    title: "Tester spotlights: meet 5 of our top contributors",
    excerpt: "The people helping us ship better, faster.",
    date: "Apr 15, 2026",
    author: "Community",
    readTime: "5 min read",
    image: imgTester,
    body: [
      { paragraph: "Our tester community has reported over 800 bugs and suggested more than 200 improvements in the last six months. Today we're shining a light on five of the people behind that work." },
      { heading: "Why we share these stories", paragraph: "Building a marketplace is a team sport. Every tip, every reproduction step, every UX nit pushes the platform forward. We want the wider community to see who they have to thank." },
    ],
  },
  {
    slug: "seller-dashboard-refresh",
    category: "Product",
    title: "Seller dashboard gets a refresh",
    excerpt: "Cleaner layout, faster insights, smoother workflows.",
    date: "Apr 02, 2026",
    author: "Design",
    readTime: "3 min read",
    image: imgSearch,
    body: [
      { paragraph: "The seller dashboard just got a major design refresh — focused on speed, clarity, and the workflows sellers tell us they touch most often." },
      { heading: "Top changes", paragraph: "A new sticky sidebar, a redesigned overview with live KPIs, faster order management, and a 40% reduction in time-to-first-paint on mid-range Android devices." },
    ],
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug);
}
