import imgWallet from "@/assets/img-wallet.jpg.asset.json";
import imgSeller from "@/assets/img-seller.jpg.asset.json";
import imgDelivery from "@/assets/img-delivery.jpg.asset.json";
import imgHero from "@/assets/img-hero.jpg.asset.json";
import imgBuyer from "@/assets/img-buyer.jpg.asset.json";

export type Risk = "Low" | "Medium" | "High";

export interface Investment {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  roi: number; // percent
  durationMonths: number;
  minInvestment: number; // NLE
  risk: Risk;
  fundingProgress: number; // 0-100
  raised: number;
  target: number;
  overview: string;
  howItWorks: string[];
  returns: { label: string; value: string }[];
  operator: { name: string; role: string };
  risks: string[];
  documents: { name: string; type: string }[];
}

export const investments: Investment[] = [
  {
    slug: "freetown-retail-fund",
    title: "Freetown Retail Growth Fund",
    tagline: "Back a curated basket of Freetown's fastest-growing retail stores.",
    category: "Retail",
    image: imgSeller.url,
    roi: 18,
    durationMonths: 12,
    minInvestment: 500,
    risk: "Medium",
    fundingProgress: 72,
    raised: 720000,
    target: 1000000,
    overview:
      "The Freetown Retail Growth Fund pools capital into 24 top-performing Market360 sellers, funding inventory expansion, storefront upgrades, and delivery logistics. Returns are paid monthly from verified sales performance.",
    howItWorks: [
      "Your capital is allocated across 24 verified merchants selected by our credit team.",
      "Merchants use funds to expand inventory ahead of peak seasons.",
      "Sales are settled through Market360 Wallet, so returns are transparent and auditable.",
      "Principal + returns are distributed monthly to your wallet.",
    ],
    returns: [
      { label: "Target annual ROI", value: "18%" },
      { label: "Payout cadence", value: "Monthly" },
      { label: "Lock-up", value: "12 months" },
      { label: "Early exit fee", value: "2%" },
    ],
    operator: { name: "Market360 Capital", role: "Fund manager" },
    risks: [
      "Retail demand can vary seasonally.",
      "Individual merchants may underperform — mitigated through diversification.",
      "Returns are not guaranteed and past performance does not predict future results.",
    ],
    documents: [
      { name: "Fund Prospectus", type: "PDF" },
      { name: "Risk Disclosure", type: "PDF" },
      { name: "Q1 2026 Performance", type: "PDF" },
    ],
  },
  {
    slug: "wallet-liquidity-pool",
    title: "Wallet Liquidity Pool",
    tagline: "Earn stable yield by supporting instant transfers on Market360 Wallet.",
    category: "Fintech",
    image: imgWallet.url,
    roi: 11,
    durationMonths: 6,
    minInvestment: 250,
    risk: "Low",
    fundingProgress: 88,
    raised: 880000,
    target: 1000000,
    overview:
      "Supply liquidity to Market360's instant-transfer engine and earn a share of settlement fees. Backed by our reserve and settled daily.",
    howItWorks: [
      "Deposit stablecoin-equivalent NLE into the pool.",
      "The engine draws liquidity to settle transfers instantly across the network.",
      "You earn a proportional share of the transfer fees.",
      "Withdraw anytime after the 6-month soft-lock.",
    ],
    returns: [
      { label: "Target annual yield", value: "11%" },
      { label: "Payout cadence", value: "Daily" },
      { label: "Soft-lock", value: "6 months" },
      { label: "Reserve cover", value: "125%" },
    ],
    operator: { name: "Market360 Treasury", role: "Custodian" },
    risks: [
      "Yield fluctuates with transfer volume.",
      "Withdrawing before soft-lock forfeits accrued fees.",
    ],
    documents: [
      { name: "Pool Terms", type: "PDF" },
      { name: "Reserve Attestation", type: "PDF" },
    ],
  },
  {
    slug: "logistics-fleet-expansion",
    title: "Last-Mile Logistics Fleet",
    tagline: "Fund the next 40 delivery riders serving greater Freetown.",
    category: "Logistics",
    image: imgDelivery.url,
    roi: 22,
    durationMonths: 18,
    minInvestment: 1000,
    risk: "High",
    fundingProgress: 41,
    raised: 410000,
    target: 1000000,
    overview:
      "Finance motorbikes, safety gear, and training for 40 new Market360 delivery partners. Returns come from a per-delivery revenue share.",
    howItWorks: [
      "Capital acquires vehicles and equipment leased to vetted riders.",
      "Riders earn per delivery; a fixed share flows to investors.",
      "At month 18, assets are sold or refinanced and principal returned.",
    ],
    returns: [
      { label: "Target ROI", value: "22%" },
      { label: "Payout cadence", value: "Quarterly" },
      { label: "Lock-up", value: "18 months" },
    ],
    operator: { name: "Market360 Logistics", role: "Fleet operator" },
    risks: [
      "Higher-risk category — vehicle downtime, accidents, or fuel volatility can impact returns.",
      "Asset resale value at exit is not guaranteed.",
    ],
    documents: [
      { name: "Operating Plan", type: "PDF" },
      { name: "Insurance Coverage", type: "PDF" },
    ],
  },
  {
    slug: "agri-supply-chain",
    title: "Agri Supply Chain Note",
    tagline: "Short-term financing for verified agricultural sellers.",
    category: "Agriculture",
    image: imgHero.url,
    roi: 14,
    durationMonths: 4,
    minInvestment: 300,
    risk: "Medium",
    fundingProgress: 63,
    raised: 315000,
    target: 500000,
    overview:
      "Provide working capital to farmers and produce distributors listed on Market360. Notes are secured against verified purchase orders.",
    howItWorks: [
      "Farmers submit purchase orders from Market360 buyers.",
      "Notes are issued against those receivables.",
      "You are repaid when the buyer settles — typically 60–120 days.",
    ],
    returns: [
      { label: "Target ROI", value: "14%" },
      { label: "Term", value: "4 months" },
      { label: "Collateral", value: "Verified POs" },
    ],
    operator: { name: "Market360 Agri Desk", role: "Note issuer" },
    risks: ["Buyer default risk — mitigated by KYC and buyer credit checks."],
    documents: [{ name: "Note Structure", type: "PDF" }],
  },
  {
    slug: "electronics-inventory-fund",
    title: "Electronics Inventory Fund",
    tagline: "Finance seasonal electronics stock for top-rated stores.",
    category: "Retail",
    image: imgBuyer.url,
    roi: 16,
    durationMonths: 9,
    minInvestment: 500,
    risk: "Medium",
    fundingProgress: 55,
    raised: 275000,
    target: 500000,
    overview:
      "Bulk-buy electronics inventory ahead of high-demand seasons and repay from verified sell-through on Market360.",
    howItWorks: [
      "Fund purchases bulk inventory at wholesale prices.",
      "Sellers list and move stock through Market360.",
      "Returns come from margin on sold-through units.",
    ],
    returns: [
      { label: "Target ROI", value: "16%" },
      { label: "Term", value: "9 months" },
    ],
    operator: { name: "Market360 Capital", role: "Inventory manager" },
    risks: ["Slow-moving inventory can extend hold period."],
    documents: [{ name: "Inventory Plan", type: "PDF" }],
  },
  {
    slug: "seller-academy-scholarship",
    title: "Seller Academy Scholarship",
    tagline: "Impact-linked note funding training for 100 new sellers.",
    category: "Education",
    image: imgSeller.url,
    roi: 9,
    durationMonths: 24,
    minInvestment: 200,
    risk: "Low",
    fundingProgress: 34,
    raised: 68000,
    target: 200000,
    overview:
      "Sponsor training and onboarding for 100 aspiring Market360 sellers. Returns are impact-linked to their first-year sales performance.",
    howItWorks: [
      "Scholarships cover training, kit, and first listings.",
      "Graduated sellers pay back a small revenue share for 24 months.",
      "Impact + modest yield distributed quarterly.",
    ],
    returns: [
      { label: "Target ROI", value: "9%" },
      { label: "Impact", value: "100 new sellers" },
    ],
    operator: { name: "Market360 Academy", role: "Program lead" },
    risks: ["Impact-linked — returns depend on graduate performance."],
    documents: [{ name: "Program Brief", type: "PDF" }],
  },
];

export function getInvestment(slug: string) {
  return investments.find((i) => i.slug === slug);
}

// Placeholder portfolio holdings — will be wired to Lovable Cloud once auth is enabled.
export interface Holding {
  slug: string;
  invested: number;
  currentValue: number;
  earnings: number;
  growthPct: number;
  remainingMonths: number;
  status: "Active" | "Maturing" | "Completed";
  spark: number[];
}

export const holdings: Holding[] = [
  {
    slug: "freetown-retail-fund",
    invested: 5000,
    currentValue: 5480,
    earnings: 480,
    growthPct: 9.6,
    remainingMonths: 7,
    status: "Active",
    spark: [40, 42, 45, 44, 48, 52, 55, 58, 60, 63, 66, 70],
  },
  {
    slug: "wallet-liquidity-pool",
    invested: 2500,
    currentValue: 2612,
    earnings: 112,
    growthPct: 4.5,
    remainingMonths: 3,
    status: "Active",
    spark: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
  },
  {
    slug: "agri-supply-chain",
    invested: 1000,
    currentValue: 1080,
    earnings: 80,
    growthPct: 8.0,
    remainingMonths: 1,
    status: "Maturing",
    spark: [20, 22, 24, 25, 27, 30, 32, 34, 36, 38, 39, 40],
  },
];
