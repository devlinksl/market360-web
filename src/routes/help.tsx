import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Search, Book, ShoppingBag, Store, Wallet, Shield, MessageCircle,
  ArrowRight, CreditCard, Smartphone, Truck, AlertTriangle, Mail,
  Phone, Clock, X, ChevronRight, Star, TrendingUp, Zap, Users,
  Package, RotateCcw, Lock, Settings, FileText, ThumbsUp, ThumbsDown,
  CheckCircle, Info, AlertCircle, ExternalLink, Bookmark, Eye, Tag,
  HelpCircle, Sparkles, Globe, RefreshCw, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  steps?: string[];
  commonMistakes?: string[];
  importantNotes?: string[];
  relatedIds?: string[];
  tags: string[];
  readingTime: number; // minutes
  updatedAt: string;
  views: number;
  featured?: boolean;
  trending?: boolean;
};

type Category = {
  id: string;
  icon: typeof ShoppingBag;
  label: string;
  color: string;
  accent: string;
  articles: Article[];
};

// ─── Knowledge Base Data ────────────────────────────────────────────────────

const KB: Category[] = [
  {
    id: "getting-started",
    icon: Sparkles,
    label: "Getting Started",
    color: "#00A859",
    accent: "rgba(0,168,89,0.10)",
    articles: [
      {
        id: "what-is-market360",
        title: "What is Market360?",
        description: "An overview of Sierra Leone's premier digital marketplace.",
        content: "Market360 is Sierra Leone's leading digital commerce platform, connecting buyers and sellers across the country. Built by and for Sierra Leoneans, it supports transactions in Sierra Leonean Leones (SLL) and integrates natively with local payment providers like Orange Money and Africell Money.\n\nThe platform includes a full marketplace for physical goods, a digital wallet for secure money management, real-time seller analytics, escrow-based buyer protection, and built-in fraud prevention — all within a single mobile app.",
        tags: ["overview", "about", "introduction"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 18420,
        featured: true,
        relatedIds: ["how-market360-works", "creating-account", "becoming-tester"],
      },
      {
        id: "how-market360-works",
        title: "How Market360 works",
        description: "Understand the end-to-end flow from browsing to delivery.",
        content: "Market360 operates on a three-party model: buyers, sellers, and the platform acting as a trusted intermediary. When a buyer places an order, payment is held securely in escrow — never sent directly to the seller. The seller then prepares and ships the item. Once the buyer confirms receipt, funds are released to the seller's wallet instantly.\n\nThis escrow model is the backbone of trust on Market360. It means sellers are protected from fraudulent chargebacks, and buyers are protected from non-delivery or misrepresented products.",
        steps: [
          "Buyer browses the marketplace and adds items to cart",
          "Buyer pays — funds are held in escrow, not sent to seller yet",
          "Seller receives notification and prepares the order",
          "Seller ships and marks the order as dispatched",
          "Buyer receives the item and confirms delivery in the app",
          "Escrow releases funds to the seller's wallet immediately",
        ],
        tags: ["escrow", "how it works", "process"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 12980,
        featured: true,
        relatedIds: ["what-is-market360", "escrow-explained", "placing-orders"],
      },
      {
        id: "creating-account",
        title: "Creating your account",
        description: "Step-by-step guide to signing up on Market360.",
        content: "Creating a Market360 account takes under two minutes. You only need a phone number or email address to get started. All new accounts receive an introductory wallet balance and access to the full marketplace immediately.",
        steps: [
          "Download the Market360 app from Google Play or the App Store",
          "Tap 'Create account' on the welcome screen",
          "Enter your phone number or email address",
          "Enter the 6-digit OTP sent to your phone or email",
          "Set a strong password (minimum 8 characters, one number)",
          "Complete your basic profile — name and profile photo",
          "Agree to the Terms of Service and Privacy Policy",
          "Your account is ready — explore the marketplace",
        ],
        commonMistakes: [
          "Using a phone number you don't have consistent access to — you'll need it for future logins",
          "Skipping the profile photo — sellers and buyers with photos receive 40% more engagement",
          "Using a weak password — use a unique password not shared with other services",
        ],
        importantNotes: [
          "One account per person — duplicate accounts may be suspended",
          "You must be 18 or older to create an account and transact on Market360",
        ],
        tags: ["signup", "registration", "new account"],
        readingTime: 3,
        updatedAt: "2025-05-20",
        views: 9741,
        relatedIds: ["verifying-account", "becoming-tester"],
      },
      {
        id: "verifying-account",
        title: "Verifying your account",
        description: "Why verification matters and how to complete it.",
        content: "Account verification on Market360 has two levels: basic verification (phone or email confirmation) which happens at signup, and full KYC (Know Your Customer) verification required for withdrawals above SLL 500,000 or for opening a seller store.\n\nKYC verification involves submitting a government-issued ID and a selfie. Our team reviews submissions within 24 hours on business days.",
        steps: [
          "Open the app and go to Settings → Verification",
          "Tap 'Verify identity' to begin",
          "Select your ID type: National ID, Passport, or Driver's License",
          "Take a clear photo of the front of your ID",
          "Take a clear photo of the back (if required)",
          "Take a selfie holding your ID next to your face",
          "Submit — you'll receive confirmation within 24 hours",
        ],
        commonMistakes: [
          "Submitting blurry or poorly lit ID photos",
          "Using an expired ID",
          "Selfie not showing both your face and the ID clearly",
          "Covering the ID number or expiry date with your fingers",
        ],
        importantNotes: [
          "KYC data is encrypted and stored under our privacy policy — never shared with third parties",
          "Verification is required before you can become a seller",
        ],
        tags: ["KYC", "verification", "identity", "documents"],
        readingTime: 3,
        updatedAt: "2025-05-25",
        views: 7823,
        relatedIds: ["creating-account", "opening-store"],
      },
      {
        id: "becoming-tester",
        title: "Becoming a tester",
        description: "Join the Market360 early access program and help shape the platform.",
        content: "The Market360 Tester Program gives selected users early access to new features before public release. Testers play a vital role in finding bugs, giving feedback, and improving the platform for everyone. In return, testers receive exclusive badges, early access to new features, and periodic rewards.",
        steps: [
          "Ensure your account is at least 30 days old with at least one completed transaction",
          "Navigate to Settings → Tester Program",
          "Read and accept the Tester Code of Conduct",
          "Submit your application — include your device model and OS version",
          "Wait for approval (typically 3–7 business days)",
          "Once approved, you'll receive access to the beta channel",
        ],
        tags: ["tester", "beta", "early access"],
        readingTime: 2,
        updatedAt: "2025-06-10",
        views: 6200,
        trending: true,
        relatedIds: ["what-is-market360", "tester-requirements", "bug-reporting"],
      },
      {
        id: "understanding-marketplace",
        title: "Understanding the marketplace",
        description: "Learn how listings, categories, and search work.",
        content: "The Market360 marketplace is organized into product categories. Each listing shows the product title, photos, price in SLL, seller rating, and delivery estimate. Verified sellers are marked with a blue badge. You can filter by category, price range, location, and rating.",
        tags: ["marketplace", "listings", "categories", "browse"],
        readingTime: 2,
        updatedAt: "2025-05-15",
        views: 5400,
        relatedIds: ["searching-products", "placing-orders"],
      },
    ],
  },
  {
    id: "buying",
    icon: ShoppingBag,
    label: "Buying",
    color: "#0071E3",
    accent: "rgba(0,113,227,0.10)",
    articles: [
      {
        id: "searching-products",
        title: "How to search for products",
        description: "Find exactly what you're looking for using search and filters.",
        content: "The Market360 search engine indexes product titles, descriptions, and seller names. Type any keyword in the search bar at the top of the home screen to get instant results. Use filters to narrow down by category, price, location, and seller rating.",
        steps: [
          "Tap the search icon or the search bar at the top of the screen",
          "Type your keyword — results appear as you type",
          "Tap a result to view the listing, or use filters to refine",
          "Use 'Sort by' to order by Price, Relevance, Rating, or Newest",
          "Tap a listing to see full details, photos, and seller info",
        ],
        tags: ["search", "filter", "browse", "find"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 8900,
        relatedIds: ["placing-orders", "understanding-seller-ratings"],
      },
      {
        id: "placing-orders",
        title: "How to place an order",
        description: "A complete walkthrough from product page to order confirmation.",
        content: "Placing an order on Market360 is straightforward. Every order is protected by escrow, meaning your money is safe until you confirm receipt of the item as described.",
        steps: [
          "Find the product you want and open the listing",
          "Review the photos, description, price, and seller rating",
          "Select any variants (size, color, etc.) if available",
          "Tap 'Buy now' or 'Add to cart'",
          "Review your cart and confirm the quantity",
          "Enter or confirm your delivery address",
          "Select your payment method (Wallet, Orange Money, Africell Money, or card)",
          "Review the order summary including delivery fee",
          "Tap 'Place order' — your funds move into escrow",
          "You'll receive an order confirmation notification immediately",
        ],
        commonMistakes: [
          "Not confirming the delivery address before placing the order",
          "Paying outside the app — never pay via direct transfer to a seller",
          "Not checking the seller's estimated delivery window",
        ],
        importantNotes: [
          "Your money is never sent directly to the seller — it's held in escrow until you confirm delivery",
          "Always use the in-app payment flow — off-platform payments are not covered by buyer protection",
        ],
        tags: ["order", "buy", "checkout", "payment"],
        readingTime: 4,
        updatedAt: "2025-06-05",
        views: 14200,
        featured: true,
        relatedIds: ["escrow-explained", "cancelling-orders", "tracking-orders"],
      },
      {
        id: "escrow-explained",
        title: "Understanding escrow protection",
        description: "How Market360 keeps your money safe on every order.",
        content: "Escrow is Market360's core buyer and seller protection mechanism. When you place an order, your payment is locked in a secure escrow account — separate from both your wallet and the seller's wallet. The seller receives the funds only after you confirm that the item arrived as described.\n\nThis protects buyers from non-delivery and misrepresented items, and protects sellers from fraudulent payment chargebacks.",
        importantNotes: [
          "Escrow funds earn no interest — they are simply held securely",
          "If you don't confirm delivery within 7 days of the estimated delivery date, the system will auto-confirm and release funds",
          "Auto-confirmation can be paused by opening a dispute before the deadline",
        ],
        tags: ["escrow", "buyer protection", "payment", "security"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 11300,
        featured: true,
        trending: true,
        relatedIds: ["placing-orders", "opening-disputes", "refund-eligibility"],
      },
      {
        id: "tracking-orders",
        title: "Tracking your orders",
        description: "How to follow your order from placement to delivery.",
        content: "Once a seller marks your order as dispatched, you can track its status in the Orders section of the app. For sellers who provide tracking numbers, a direct tracking link will appear on your order page.",
        steps: [
          "Tap the profile icon → Orders",
          "Find the order you want to track",
          "Tap on the order to see its current status",
          "If a tracking number is provided, tap 'Track shipment'",
          "Contact the seller via in-app chat for updates",
        ],
        tags: ["tracking", "delivery", "order status", "shipment"],
        readingTime: 2,
        updatedAt: "2025-05-28",
        views: 7600,
        relatedIds: ["placing-orders", "delivery-timelines", "cancelling-orders"],
      },
      {
        id: "cancelling-orders",
        title: "Cancelling an order",
        description: "When and how you can cancel a placed order.",
        content: "You can cancel an order for free at any point before the seller marks it as 'Dispatched'. Once dispatched, you'll need to open a return request instead. Cancelled orders are refunded to your Market360 wallet instantly.",
        steps: [
          "Go to Orders → find the order you want to cancel",
          "Tap the order to open the detail page",
          "Tap 'Cancel order'",
          "Select a reason for cancellation",
          "Confirm — funds return to your wallet within seconds",
        ],
        commonMistakes: [
          "Trying to cancel after the seller has already dispatched — this requires a return request instead",
          "Not checking the order status before attempting to cancel",
        ],
        tags: ["cancel", "refund", "order"],
        readingTime: 2,
        updatedAt: "2025-05-20",
        views: 6800,
        relatedIds: ["tracking-orders", "returning-items", "refund-eligibility"],
      },
      {
        id: "returning-items",
        title: "Returning items",
        description: "How to return a product and get a refund.",
        content: "Market360 supports returns for items that don't match their listing description, arrive damaged, or are the wrong item entirely. Returns for personal preference (change of mind) are at the seller's discretion — check the listing's return policy before ordering.",
        steps: [
          "Go to the order and tap 'Report a problem'",
          "Select the reason: 'Item not as described', 'Damaged', or 'Wrong item'",
          "Attach photos of the item and packaging",
          "Submit the return request",
          "Wait for the seller to accept or decline within 48 hours",
          "If the seller declines or doesn't respond, escalate to a dispute",
          "Once approved, follow return shipping instructions",
          "Refund is processed after the seller confirms receipt of return",
        ],
        tags: ["return", "refund", "damaged", "wrong item"],
        readingTime: 4,
        updatedAt: "2025-06-02",
        views: 9100,
        relatedIds: ["opening-disputes", "refund-eligibility", "buyer-protection"],
      },
      {
        id: "reporting-damaged",
        title: "Reporting damaged products",
        description: "What to do if your order arrives in poor condition.",
        content: "Receiving a damaged item is frustrating, but Market360's buyer protection ensures you're not left out of pocket. Act quickly — the sooner you report it, the faster it's resolved.",
        steps: [
          "Do not confirm delivery in the app if the item is clearly damaged",
          "Take clear photos of the outer packaging and the damaged item",
          "Take photos that show the damage clearly — multiple angles",
          "Go to the order page and tap 'Report a problem'",
          "Select 'Item arrived damaged'",
          "Upload your photos and describe the damage",
          "Submit — our team will review within 24 hours",
        ],
        importantNotes: [
          "Never confirm delivery for a damaged item — this releases funds to the seller and complicates the dispute",
          "Keep all original packaging until the dispute is resolved",
        ],
        tags: ["damaged", "broken", "report", "refund"],
        readingTime: 3,
        updatedAt: "2025-05-30",
        views: 5200,
        relatedIds: ["returning-items", "opening-disputes", "buyer-protection"],
      },
      {
        id: "understanding-seller-ratings",
        title: "Understanding seller ratings",
        description: "What the rating system means and how to use it.",
        content: "Seller ratings on Market360 are based on verified purchases only. After confirming delivery, you'll be prompted to leave a rating from 1–5 stars and an optional written review. Ratings are public and permanent, and help future buyers make informed decisions.",
        tags: ["ratings", "reviews", "sellers", "trust"],
        readingTime: 2,
        updatedAt: "2025-05-15",
        views: 4800,
        relatedIds: ["fake-seller-detection", "reporting-users"],
      },
      {
        id: "buyer-protection",
        title: "Buyer protection policy",
        description: "A full overview of how Market360 protects every buyer.",
        content: "Market360 Buyer Protection covers every order placed through the in-app payment flow. If your item doesn't arrive, doesn't match the listing, or arrives damaged, you're entitled to a full refund — no questions asked, as long as you follow the reporting process.",
        importantNotes: [
          "Protection only applies to orders paid through the app — not off-platform payments",
          "You must report problems within 48 hours of the delivery deadline",
          "Providing false or misleading information in a dispute may result in account suspension",
        ],
        tags: ["buyer protection", "policy", "refund", "guarantee"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 7200,
        featured: true,
        relatedIds: ["escrow-explained", "opening-disputes", "returning-items"],
      },
    ],
  },
  {
    id: "selling",
    icon: Store,
    label: "Selling",
    color: "#9B59B6",
    accent: "rgba(155,89,182,0.10)",
    articles: [
      {
        id: "opening-store",
        title: "Opening your first store",
        description: "Create and verify a seller store on Market360.",
        content: "Opening a store on Market360 is free. All you need is a verified account and the required KYC documents. Most sellers are approved within 24 hours. Once your store is live, you can list products, receive orders, and get paid directly to your wallet.",
        steps: [
          "Open the app and tap 'Sell' in the bottom navigation",
          "Tap 'Open a store' and read the seller terms",
          "Enter your store name and choose a category",
          "Upload your store logo and banner image",
          "Complete the seller profile: description, location, contact info",
          "Submit your KYC documents (National ID or Passport + selfie)",
          "Wait for verification — typically under 24 hours",
          "Once approved, tap 'Add product' to create your first listing",
        ],
        commonMistakes: [
          "Using blurry or expired KYC documents",
          "Choosing a store name that's too similar to an existing store",
          "Skipping the store description — it builds buyer trust",
          "Missing contact information",
        ],
        importantNotes: [
          "You must be a verified user before opening a store",
          "Each user may operate up to two stores",
        ],
        tags: ["store", "seller", "open", "setup"],
        readingTime: 4,
        updatedAt: "2025-06-05",
        views: 13500,
        featured: true,
        relatedIds: ["seller-verification", "listing-products", "top-seller"],
      },
      {
        id: "seller-verification",
        title: "Seller verification",
        description: "What verification means for sellers and how to complete it.",
        content: "Seller verification on Market360 goes beyond basic account verification. It establishes that you're a legitimate business or individual seller, which unlocks higher withdrawal limits, priority in search results, and the blue Verified badge on your store.",
        steps: [
          "Go to your seller dashboard → Settings → Verification",
          "Submit government ID (front and back)",
          "Take a real-time selfie with your ID",
          "Provide business registration documents if applicable",
          "Submit and await review — typically 24 hours",
        ],
        commonMistakes: [
          "Using a borrowed or third-party ID",
          "Submitting photos taken of a screen instead of original documents",
        ],
        tags: ["verification", "KYC", "seller", "badge"],
        readingTime: 3,
        updatedAt: "2025-05-22",
        views: 8900,
        relatedIds: ["opening-store", "listing-products"],
      },
      {
        id: "listing-products",
        title: "Listing products",
        description: "How to create effective, high-converting product listings.",
        content: "A great product listing combines clear photos, an honest description, and a competitive price. Listings with at least 3 photos and a detailed description receive significantly more views and orders than listings with minimal information.",
        steps: [
          "From your seller dashboard, tap 'Add product'",
          "Upload 1–8 product photos (minimum 3 recommended)",
          "Write a clear, accurate product title",
          "Write a detailed description including condition, dimensions, and any flaws",
          "Set the price in SLL",
          "Enter the available stock quantity",
          "Select the correct category and subcategory",
          "Set estimated delivery time",
          "Add relevant tags to improve discoverability",
          "Tap 'Publish' — your listing is live within minutes",
        ],
        commonMistakes: [
          "Using stock photos instead of real photos of the actual item",
          "Vague descriptions that leave buyers with unanswered questions",
          "Setting unrealistic delivery windows you can't meet",
          "Not updating stock levels — this leads to failed orders",
        ],
        tags: ["listing", "products", "sell", "photos", "description"],
        readingTime: 4,
        updatedAt: "2025-06-05",
        views: 12100,
        featured: true,
        relatedIds: ["product-photography", "pricing-strategies", "managing-inventory"],
      },
      {
        id: "managing-inventory",
        title: "Managing inventory",
        description: "Keep your stock levels accurate to avoid order failures.",
        content: "Accurate inventory management prevents overselling, failed orders, and negative reviews. Market360 automatically pauses listings when stock reaches zero and re-activates them when you update the quantity.",
        steps: [
          "Go to your seller dashboard → Products",
          "Tap on any product to edit it",
          "Update the 'Stock quantity' field",
          "Save changes — the listing status updates instantly",
          "Enable 'Low stock alerts' in notifications to get warned when stock drops below 3",
        ],
        tags: ["inventory", "stock", "products", "manage"],
        readingTime: 2,
        updatedAt: "2025-05-18",
        views: 5800,
        relatedIds: ["listing-products", "managing-orders"],
      },
      {
        id: "product-photography",
        title: "Product photography tips",
        description: "Take better product photos with just your phone.",
        content: "Product photos are the single biggest factor in whether a buyer clicks your listing. You don't need expensive equipment — a modern smartphone, good natural light, and a neutral background are enough.",
        steps: [
          "Use natural daylight — place items near a window",
          "Use a plain white, grey, or black background",
          "Clean the item thoroughly before photographing",
          "Take photos from multiple angles: front, back, sides, close-up details",
          "Include a photo showing scale (e.g. next to a hand or ruler)",
          "Show any flaws honestly — buyers appreciate transparency",
          "Take at least 5–8 photos and choose the 3–5 best",
        ],
        tags: ["photography", "photos", "listing", "tips"],
        readingTime: 3,
        updatedAt: "2025-05-10",
        views: 6700,
        relatedIds: ["listing-products", "pricing-strategies"],
      },
      {
        id: "pricing-strategies",
        title: "Pricing strategies",
        description: "How to price your products competitively on Market360.",
        content: "Pricing on a marketplace is dynamic. Too high and buyers pass you by; too low and you erode trust. The best strategy is to research comparable listings, factor in your costs and commission, and set a price that reflects real value.",
        importantNotes: [
          "Market360 charges a commission of 4–6% on completed sales depending on the category",
          "Payment processing fees are shown in your seller dashboard",
          "All prices must be in Sierra Leonean Leones (SLL)",
        ],
        tags: ["pricing", "strategy", "sell", "commission"],
        readingTime: 3,
        updatedAt: "2025-05-15",
        views: 7200,
        relatedIds: ["listing-products", "managing-orders"],
      },
      {
        id: "managing-orders",
        title: "Managing orders",
        description: "Fulfil orders efficiently and maintain your seller rating.",
        content: "Orders land in your seller dashboard the moment a buyer pays. Responding quickly and fulfilling within your promised window is critical for your rating and for earning the Top Seller badge.",
        steps: [
          "Open your seller dashboard → Orders",
          "Review new orders promptly — aim to respond within 2 hours",
          "Tap an order to see full details: item, quantity, buyer address",
          "Prepare and package the item",
          "Mark the order as 'Dispatched' and add a tracking number if available",
          "Message the buyer with dispatch confirmation",
          "Once the buyer confirms receipt, funds are released to your wallet",
        ],
        commonMistakes: [
          "Not updating order status after dispatch — buyers will worry and open disputes",
          "Fulfilling outside the window promised in your listing",
          "Ignoring buyer messages — poor communication leads to disputes",
        ],
        tags: ["orders", "seller", "fulfil", "dispatch"],
        readingTime: 3,
        updatedAt: "2025-06-02",
        views: 9400,
        relatedIds: ["listing-products", "handling-messages", "shipping-tips"],
      },
      {
        id: "handling-messages",
        title: "Handling customer messages",
        description: "Best practices for in-app buyer communication.",
        content: "Fast, clear communication is a major factor in your seller rating. Buyers who get quick answers are far more likely to place orders and leave positive reviews. Market360's in-app chat is your primary communication tool.",
        tags: ["messages", "chat", "communication", "seller"],
        readingTime: 2,
        updatedAt: "2025-05-12",
        views: 4300,
        relatedIds: ["managing-orders", "top-seller"],
      },
      {
        id: "shipping-tips",
        title: "Shipping best practices",
        description: "Package and ship products safely and on time.",
        content: "Good packaging prevents damage, which prevents disputes. Package items carefully, use protective wrapping for fragile items, and always get a proof of dispatch when handing over to a courier.",
        steps: [
          "Use sturdy, clean boxes or padded envelopes appropriate to the item size",
          "Wrap fragile items in bubble wrap or newspaper",
          "Seal all openings with strong tape",
          "Include a printed order slip inside the package",
          "Take a photo of the packaged item before dispatch — useful if a dispute arises",
          "Use a reliable courier and keep the tracking receipt",
        ],
        tags: ["shipping", "packaging", "delivery", "courier"],
        readingTime: 3,
        updatedAt: "2025-05-20",
        views: 5500,
        relatedIds: ["managing-orders", "seller-rules"],
      },
      {
        id: "top-seller",
        title: "Becoming a Top Seller",
        description: "What the Top Seller badge is and how to earn it.",
        content: "The Top Seller badge is awarded to sellers who consistently deliver excellent experiences. It boosts your visibility in search results and search filters, and signals to buyers that your store is trustworthy. Requirements are reviewed monthly.",
        importantNotes: [
          "Rating of 4.5 stars or higher over the past 90 days",
          "Order fulfilment rate above 95%",
          "Response time under 2 hours on average",
          "Zero open unresolved disputes in the past 30 days",
          "Minimum 10 completed orders in the past 90 days",
        ],
        tags: ["top seller", "badge", "ranking", "seller"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 8100,
        trending: true,
        relatedIds: ["managing-orders", "handling-messages", "seller-verification"],
      },
      {
        id: "seller-rules",
        title: "Marketplace seller rules",
        description: "The rules all sellers must follow to trade on Market360.",
        content: "Market360 maintains a safe marketplace by enforcing seller rules. Violations result in warnings, listing removal, temporary suspension, or permanent ban depending on severity.",
        importantNotes: [
          "No prohibited products (see Prohibited Products policy)",
          "All listings must accurately represent the item — misleading descriptions are a serious violation",
          "Off-platform payments or soliciting buyers to pay outside the app is strictly prohibited",
          "Fake reviews and review manipulation are grounds for immediate suspension",
          "KYC documents must be authentic — fraudulent documents lead to permanent bans",
        ],
        tags: ["rules", "policy", "seller", "guidelines"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 5900,
        relatedIds: ["opening-store", "seller-verification", "prohibited-products"],
      },
    ],
  },
  {
    id: "wallet",
    icon: Wallet,
    label: "Wallet & Payments",
    color: "#F5A623",
    accent: "rgba(245,166,35,0.10)",
    articles: [
      {
        id: "creating-wallet",
        title: "Creating your wallet",
        description: "Your Market360 wallet is created automatically — here's what you need to know.",
        content: "Every Market360 account comes with a digital wallet automatically created at signup. You don't need to activate it separately. Your wallet can hold, send, and receive Sierra Leonean Leones, and connects to Orange Money, Africell Money, bank accounts, and cards.",
        tags: ["wallet", "setup", "account"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 7800,
        relatedIds: ["deposits", "withdrawals", "wallet-security"],
      },
      {
        id: "deposits",
        title: "Deposits",
        description: "How to top up your Market360 wallet.",
        content: "You can deposit into your Market360 wallet from Orange Money, Africell Money, a bank transfer, or a Visa/Mastercard debit or credit card. Deposits from mobile money are typically instant. Card deposits and bank transfers may take up to 10 minutes.",
        steps: [
          "Open the app and tap the Wallet icon",
          "Tap 'Deposit' or 'Add money'",
          "Select your deposit method",
          "Enter the amount in SLL",
          "Follow the prompts for your chosen method",
          "Confirm the deposit — funds appear in your wallet balance",
        ],
        importantNotes: [
          "Minimum deposit is SLL 5,000",
          "Large deposits above SLL 5,000,000 may require additional verification",
        ],
        tags: ["deposit", "top up", "wallet", "mobile money"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 10200,
        featured: true,
        relatedIds: ["orange-money", "africell-money", "card-payments"],
      },
      {
        id: "withdrawals",
        title: "Withdrawals",
        description: "How to move money from your wallet to mobile money or a bank.",
        content: "Withdrawing from your Market360 wallet is fast and straightforward. Funds typically arrive within 3 minutes for mobile money, and within 1 business day for bank transfers.",
        steps: [
          "Tap the Wallet icon",
          "Tap 'Withdraw'",
          "Select your withdrawal method",
          "Enter the amount and destination account details",
          "Review the fee summary",
          "Confirm with your PIN or biometrics",
          "Funds are sent — check your withdrawal history for status",
        ],
        commonMistakes: [
          "Entering the wrong mobile money number — double-check before confirming",
          "Not having KYC verified for withdrawals above SLL 500,000",
          "Attempting to withdraw escrow funds that haven't been released yet",
        ],
        tags: ["withdraw", "cashout", "wallet", "mobile money"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 11800,
        featured: true,
        relatedIds: ["deposits", "transaction-history", "failed-payments"],
      },
      {
        id: "orange-money",
        title: "Orange Money",
        description: "Using Orange Money with Market360.",
        content: "Orange Money is fully integrated with Market360 for both deposits and withdrawals. Transactions are processed through the official Orange Money API and are instant in most cases.",
        steps: [
          "Select 'Orange Money' as your deposit or withdrawal method",
          "Enter your Orange Money number",
          "Confirm the transaction with your Orange Money PIN when prompted",
          "Funds are transferred instantly in most cases",
        ],
        tags: ["orange money", "mobile money", "deposit", "withdraw"],
        readingTime: 2,
        updatedAt: "2025-05-20",
        views: 8400,
        relatedIds: ["africell-money", "deposits", "withdrawals"],
      },
      {
        id: "africell-money",
        title: "Africell Money",
        description: "Using Africell Money with Market360.",
        content: "Africell Money is supported on Market360 for deposits and withdrawals. The integration follows the same process as Orange Money and is equally instant for most transactions.",
        steps: [
          "Select 'Africell Money' as your payment method",
          "Enter your Africell number",
          "Confirm with your Africell Money PIN",
          "Transaction completes instantly",
        ],
        tags: ["africell", "mobile money", "deposit", "withdraw"],
        readingTime: 2,
        updatedAt: "2025-05-20",
        views: 7600,
        relatedIds: ["orange-money", "deposits", "withdrawals"],
      },
      {
        id: "card-payments",
        title: "Visa and Mastercard payments",
        description: "Pay with a debit or credit card on Market360.",
        content: "Market360 accepts Visa and Mastercard debit and credit cards for wallet top-ups. Card payments are processed via a PCI-DSS certified payment gateway and your full card number is never stored on Market360 servers.",
        steps: [
          "Select 'Card' as your deposit method",
          "Enter your card number, expiry date, and CVV",
          "Tick 'Save card' to save for future deposits (optional)",
          "Complete 3D Secure authentication if prompted by your bank",
          "Deposit confirmed",
        ],
        importantNotes: [
          "Card deposits may be subject to your bank's international transaction fees",
          "3D Secure (OTP from your bank) is required for most card transactions",
        ],
        tags: ["visa", "mastercard", "card", "payment"],
        readingTime: 2,
        updatedAt: "2025-05-28",
        views: 6900,
        relatedIds: ["deposits", "failed-payments"],
      },
      {
        id: "transaction-history",
        title: "Transaction history",
        description: "How to view and export your wallet transaction history.",
        content: "Your full transaction history is available in the Wallet section. Every deposit, withdrawal, purchase, refund, and earning is recorded with a timestamp, amount, and reference number.",
        steps: [
          "Tap the Wallet icon",
          "Scroll down to 'Transaction history'",
          "Use filters to narrow by type (deposit, withdrawal, payment, earnings)",
          "Tap any transaction for full details",
          "Tap 'Export' to download a CSV statement",
        ],
        tags: ["history", "transactions", "statement", "wallet"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 5600,
        relatedIds: ["deposits", "withdrawals"],
      },
      {
        id: "failed-payments",
        title: "Failed payments",
        description: "Why payments fail and how to resolve them.",
        content: "Payment failures are usually caused by insufficient wallet balance, a failed mobile money PIN, an incorrect card number, or a temporary network issue. Most failures are resolvable in seconds.",
        steps: [
          "Check your wallet balance first",
          "Verify the mobile money number or card details are correct",
          "Retry the transaction — most temporary failures resolve on second attempt",
          "If using a card, check with your bank for international transaction blocks",
          "If still failing, contact support with the error message shown",
        ],
        tags: ["failed", "payment", "error", "troubleshoot"],
        readingTime: 2,
        updatedAt: "2025-05-25",
        views: 6300,
        relatedIds: ["deposits", "card-payments", "transaction-history"],
      },
      {
        id: "refund-processing",
        title: "Refund processing",
        description: "How refunds work and when to expect them.",
        content: "When a refund is approved (following a dispute resolution or cancelled order), the funds are returned to the original payment method. For orders paid from your Market360 wallet, the refund lands instantly. For card or mobile money payments, funds may take 3–5 business days depending on the provider.",
        tags: ["refund", "processing", "timeline", "wallet"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 7100,
        relatedIds: ["cancelling-orders", "opening-disputes", "refund-eligibility"],
      },
      {
        id: "wallet-security",
        title: "Wallet security",
        description: "How your money is protected on Market360.",
        content: "Wallet funds are held in segregated accounts at a regulated partner bank — entirely separate from Market360's operational funds. All wallet transactions require PIN or biometric confirmation, and suspicious activity triggers automatic security holds.",
        importantNotes: [
          "Enable biometric lock for your wallet in Settings → Security",
          "Market360 will never ask for your wallet PIN via chat, email, or phone",
          "If you suspect unauthorised access, freeze your wallet immediately from Settings → Security → Freeze wallet",
        ],
        tags: ["security", "wallet", "protection", "PIN"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 8800,
        relatedIds: ["two-factor-auth", "account-security", "phishing"],
      },
      {
        id: "escrow-system",
        title: "Escrow system explained",
        description: "A deep dive into how Market360's escrow works.",
        content: "The escrow system is the financial backbone of Market360's marketplace. It creates a neutral holding state for buyer funds between payment and confirmed delivery, eliminating the primary trust barrier in peer-to-peer commerce.\n\nWhen you pay for an order, your money moves from your wallet to an escrow pool — held separately from all other funds. The seller can see the escrow is funded, which prompts them to fulfil the order. Neither party can access the escrow funds directly — only the system can release them, and only after specific conditions are met.",
        tags: ["escrow", "payment", "system", "security"],
        readingTime: 4,
        updatedAt: "2025-06-01",
        views: 9200,
        featured: true,
        relatedIds: ["placing-orders", "opening-disputes", "buyer-protection"],
      },
    ],
  },
  {
    id: "safety",
    icon: Shield,
    label: "Trust & Safety",
    color: "#E74C3C",
    accent: "rgba(231,76,60,0.10)",
    articles: [
      {
        id: "reporting-users",
        title: "Reporting users",
        description: "How to report suspicious or abusive behaviour.",
        content: "If you encounter a user behaving suspiciously — attempting to take payment off-platform, sending threatening messages, or running what appears to be a scam — report them immediately. Market360's Trust & Safety team reviews every report.",
        steps: [
          "Go to the user's profile",
          "Tap the three-dot '⋯' menu in the top right",
          "Select 'Report user'",
          "Choose the most relevant reason",
          "Add details and any screenshots",
          "Submit — you'll receive a confirmation",
        ],
        tags: ["report", "safety", "abuse", "scam"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 6900,
        relatedIds: ["reporting-products", "fake-seller-detection", "safe-communication"],
      },
      {
        id: "reporting-products",
        title: "Reporting products",
        description: "How to flag listings that violate marketplace rules.",
        content: "Prohibited, counterfeit, or misleading listings harm buyers and honest sellers alike. Reporting them takes seconds and helps keep the marketplace clean.",
        steps: [
          "Open the listing you want to report",
          "Tap the '⋯' menu",
          "Select 'Report listing'",
          "Choose a reason: Prohibited item, Counterfeit, Misleading description, Other",
          "Add optional details and submit",
        ],
        tags: ["report", "listing", "prohibited", "policy"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 4700,
        relatedIds: ["reporting-users", "prohibited-products", "seller-rules"],
      },
      {
        id: "safety-tips",
        title: "Marketplace safety tips",
        description: "Practical guidance to stay safe on Market360.",
        content: "Staying safe on Market360 is mostly about following a few core rules and recognising red flags when they appear.",
        importantNotes: [
          "Always pay through the app — never via direct mobile money transfer to a seller",
          "Never share your password, OTP, or PIN with anyone, including someone claiming to be Market360 support",
          "If a deal seems too good to be true, it usually is — very low prices on premium items are a scam signal",
          "Meet in a public place for any agreed local handoff",
          "Trust the Verified badge — unverified sellers carry more risk",
        ],
        tags: ["safety", "tips", "scam", "protect"],
        readingTime: 3,
        updatedAt: "2025-06-05",
        views: 8300,
        featured: true,
        relatedIds: ["recognising-scams", "account-security", "fake-seller-detection"],
      },
      {
        id: "recognising-scams",
        title: "Recognising scams",
        description: "How to spot common scams on the marketplace.",
        content: "Scams on marketplaces follow predictable patterns. Recognising them early protects your money.",
        importantNotes: [
          "Off-platform payment requests: any seller asking you to pay via personal mobile money outside the app is a red flag",
          "Too-good-to-be-true pricing: new iPhones for SLL 500,000, luxury bags for SLL 200,000 — these are bait listings",
          "Urgency pressure: 'This offer ends in 1 hour, pay now' — legitimate sellers don't apply pressure",
          "Unverified identity: sellers with no KYC badge, no reviews, and a brand-new account for expensive items",
          "Advance fee requests: asking for a 'deposit' before you place an official order",
        ],
        tags: ["scam", "fraud", "safety", "alert"],
        readingTime: 3,
        updatedAt: "2025-06-05",
        views: 7400,
        trending: true,
        relatedIds: ["safety-tips", "reporting-users", "fake-seller-detection"],
      },
      {
        id: "account-security",
        title: "Account security",
        description: "How to keep your Market360 account secure.",
        content: "Your account security protects both your personal data and your wallet. Following these steps makes unauthorised access extremely unlikely.",
        steps: [
          "Use a strong, unique password not used on any other service",
          "Enable two-factor authentication (2FA) in Settings → Security",
          "Enable biometric lock for the app and for your wallet",
          "Never share your OTP with anyone — not even Market360 staff",
          "Review connected devices in Settings → Security → Active sessions",
          "Sign out of devices you no longer use",
        ],
        tags: ["security", "account", "password", "protect"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 9600,
        featured: true,
        relatedIds: ["two-factor-auth", "wallet-security", "phishing"],
      },
      {
        id: "two-factor-auth",
        title: "Two-factor authentication",
        description: "Enable 2FA to add an extra layer of login security.",
        content: "Two-factor authentication (2FA) requires a one-time code in addition to your password when signing in from a new device. It's one of the most effective protections against unauthorised account access.",
        steps: [
          "Go to Settings → Security → Two-factor authentication",
          "Select your 2FA method: SMS or Authenticator App",
          "For SMS: confirm your phone number",
          "For Authenticator App: scan the QR code with your preferred app",
          "Enter the verification code to confirm setup",
          "Save your backup codes in a secure location",
        ],
        importantNotes: [
          "Save your backup codes — if you lose your phone, they're the only way to recover access",
          "SMS 2FA is convenient; Authenticator App 2FA is more secure",
        ],
        tags: ["2FA", "security", "authentication", "login"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 7700,
        relatedIds: ["account-security", "wallet-security"],
      },
      {
        id: "phishing",
        title: "Avoiding phishing attacks",
        description: "How to identify fake Market360 messages and websites.",
        content: "Phishing attacks try to trick you into giving up your password, OTP, or wallet PIN by pretending to be Market360 via SMS, email, or fake websites.",
        importantNotes: [
          "Market360 will never ask for your password or full PIN via SMS, email, or in-app chat",
          "Check the URL carefully — the real site is market360.shop; fake sites may use market-360.shop or market360.net",
          "Legitimate Market360 emails come from @market360.shop addresses only",
          "If you received a suspicious message claiming to be Market360, report it at support@market360.shop",
        ],
        tags: ["phishing", "scam", "email", "security"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 5800,
        relatedIds: ["account-security", "recognising-scams"],
      },
      {
        id: "fake-seller-detection",
        title: "Fake seller detection",
        description: "How to verify you're buying from a legitimate seller.",
        content: "Fake seller accounts typically have telltale signs. Learning to spot them protects your money.",
        importantNotes: [
          "No Verified badge — all legitimate high-volume sellers should be KYC verified",
          "Very recent account creation date with many listings",
          "All 5-star reviews from accounts created on the same day",
          "Prices dramatically lower than market rate",
          "No response to pre-purchase questions",
          "Pressure to buy quickly",
        ],
        tags: ["fake seller", "scam", "verification", "trust"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 6500,
        relatedIds: ["recognising-scams", "reporting-users", "understanding-seller-ratings"],
      },
      {
        id: "safe-communication",
        title: "Safe communication guidelines",
        description: "How to communicate safely with buyers and sellers.",
        content: "In-app chat is the safest communication channel on Market360. All messages are logged and can be reviewed in a dispute. Avoid sharing personal contact details until you're confident the transaction is legitimate.",
        importantNotes: [
          "Sharing WhatsApp or personal numbers before a transaction is complete is a risk",
          "Never agree to take payment or delivery outside the platform",
          "Any messages requesting off-platform payment should be reported immediately",
          "In-app message history is preserved and available to dispute reviewers",
        ],
        tags: ["communication", "chat", "safety", "messages"],
        readingTime: 2,
        updatedAt: "2025-05-30",
        views: 4200,
        relatedIds: ["safety-tips", "reporting-users"],
      },
    ],
  },
  {
    id: "account",
    icon: Book,
    label: "Account Management",
    color: "#00A859",
    accent: "rgba(0,168,89,0.10)",
    articles: [
      {
        id: "editing-profile",
        title: "Editing your profile",
        description: "Update your name, photo, and personal information.",
        content: "Your Market360 profile is visible to other users. Keeping it up to date builds trust, especially if you're a seller.",
        steps: [
          "Tap your profile photo or the profile icon",
          "Tap 'Edit profile'",
          "Update your name, bio, or profile photo",
          "Tap 'Save changes'",
        ],
        tags: ["profile", "edit", "account"],
        readingTime: 1,
        updatedAt: "2025-05-15",
        views: 5100,
        relatedIds: ["changing-password", "notification-settings"],
      },
      {
        id: "changing-password",
        title: "Changing your password",
        description: "How to update your password from within the app.",
        content: "You can change your password at any time from the security settings. For your protection, changing your password signs you out of all other active sessions.",
        steps: [
          "Go to Settings → Security → Change password",
          "Enter your current password",
          "Enter your new password (minimum 8 characters, at least one number)",
          "Confirm your new password",
          "Tap 'Update password'",
          "You'll receive a confirmation email",
        ],
        tags: ["password", "change", "security", "account"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 6800,
        relatedIds: ["resetting-password", "two-factor-auth", "account-security"],
      },
      {
        id: "resetting-password",
        title: "Resetting your password",
        description: "How to regain access if you've forgotten your password.",
        content: "If you've forgotten your password, you can reset it via email or SMS verification.",
        steps: [
          "On the login screen, tap 'Forgot password?'",
          "Enter your registered email address or phone number",
          "Tap 'Send reset link'",
          "Check your email or SMS for the 6-digit reset code",
          "Enter the code in the app",
          "Set your new password and confirm",
          "Log in with your new credentials",
        ],
        tags: ["password", "reset", "forgot", "login"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 8900,
        relatedIds: ["changing-password", "two-factor-auth"],
      },
      {
        id: "notification-settings",
        title: "Notification settings",
        description: "Customise which alerts you receive from Market360.",
        content: "Market360 sends notifications for orders, messages, wallet activity, and promotions. You can control each category independently.",
        steps: [
          "Go to Settings → Notifications",
          "Toggle individual notification types on or off",
          "Use 'Do Not Disturb' to silence all non-critical alerts during specific hours",
          "Save your preferences",
        ],
        tags: ["notifications", "settings", "alerts", "account"],
        readingTime: 1,
        updatedAt: "2025-05-20",
        views: 4100,
        relatedIds: ["editing-profile", "account-security"],
      },
      {
        id: "privacy-settings",
        title: "Privacy settings",
        description: "Control what information others can see about you.",
        content: "Your privacy settings let you control visibility of your profile, purchase history, and review history on Market360.",
        steps: [
          "Go to Settings → Privacy",
          "Toggle settings for profile visibility, review history, and order activity",
          "Review data sharing permissions",
          "Save your settings",
        ],
        tags: ["privacy", "settings", "account", "visibility"],
        readingTime: 2,
        updatedAt: "2025-05-25",
        views: 3700,
        relatedIds: ["editing-profile", "account-deletion"],
      },
      {
        id: "account-deletion",
        title: "Account deletion",
        description: "How to permanently delete your Market360 account.",
        content: "Account deletion is permanent and cannot be undone. Before deleting, withdraw any remaining wallet balance and resolve any open orders or disputes.",
        steps: [
          "Withdraw all wallet funds to an external account",
          "Ensure no open orders or disputes exist",
          "Go to Settings → Privacy → Delete account",
          "Read the deletion notice carefully",
          "Enter your password to confirm",
          "Tap 'Delete my account'",
          "You'll receive a final confirmation email — your account will be deleted within 24 hours",
        ],
        importantNotes: [
          "Deletion is irreversible — all data, wallet history, and reviews are permanently removed",
          "Store listings are removed immediately upon deletion",
          "Outstanding balances must be withdrawn before deletion is possible",
        ],
        tags: ["delete", "account", "close", "permanent"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 3400,
        relatedIds: ["privacy-settings", "withdrawals"],
      },
    ],
  },
  {
    id: "orders-delivery",
    icon: Truck,
    label: "Orders & Delivery",
    color: "#27AE60",
    accent: "rgba(39,174,96,0.10)",
    articles: [
      {
        id: "order-statuses",
        title: "Order statuses explained",
        description: "What each order status means throughout the fulfilment journey.",
        content: "Every order on Market360 moves through a series of statuses. Understanding what each one means helps you know exactly where things stand.",
        importantNotes: [
          "Pending Payment — payment is being processed",
          "Payment Confirmed — escrow funded, awaiting seller action",
          "Processing — seller has accepted and is preparing the order",
          "Dispatched — order is on its way, tracking may be available",
          "Delivered — seller has marked as delivered; awaiting your confirmation",
          "Completed — you've confirmed receipt, funds released to seller",
          "Cancelled — order cancelled before dispatch",
          "Disputed — a dispute is open on this order",
        ],
        tags: ["order", "status", "tracking", "delivery"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 9700,
        featured: true,
        relatedIds: ["tracking-orders", "delivery-timelines", "delivery-disputes"],
      },
      {
        id: "delivery-timelines",
        title: "Delivery timelines",
        description: "Typical delivery timeframes for orders on Market360.",
        content: "Delivery times on Market360 depend on the seller's stated delivery window and the delivery method chosen. Most sellers in Freetown offer same-day or next-day delivery. Upcountry orders typically take 2–5 business days.",
        importantNotes: [
          "Delivery windows are set by sellers and shown on every listing",
          "Public holidays and unforeseen circumstances may extend timelines",
          "If delivery hasn't occurred within the stated window, message the seller first, then open a dispute if no response",
        ],
        tags: ["delivery", "timeline", "shipping", "days"],
        readingTime: 2,
        updatedAt: "2025-05-28",
        views: 6200,
        relatedIds: ["order-statuses", "tracking-orders", "delivery-delays"],
      },
      {
        id: "delivery-delays",
        title: "Delivery delays",
        description: "What to do when your order is taking longer than expected.",
        content: "Delivery delays happen. In most cases, a quick message to the seller resolves things within hours. If not, Market360's dispute process protects your order.",
        steps: [
          "Check the expected delivery window on your order page",
          "If overdue by more than 24 hours, tap 'Message seller' and ask for an update",
          "Give the seller 48 hours to respond",
          "If no satisfactory response, tap 'Report a problem' to open a dispute",
          "Our team will mediate and either extend the deadline or issue a refund",
        ],
        tags: ["delay", "late", "delivery", "dispute"],
        readingTime: 2,
        updatedAt: "2025-05-25",
        views: 7100,
        relatedIds: ["delivery-timelines", "opening-disputes", "tracking-orders"],
      },
      {
        id: "lost-packages",
        title: "Lost packages",
        description: "What to do if your package hasn't arrived.",
        content: "Packages are rarely truly lost — in most cases they're delayed or incorrectly marked as delivered. Here's how to handle it.",
        steps: [
          "Confirm the delivery address on your order was correct",
          "Check with neighbours or building reception",
          "Message the seller for the tracking information",
          "Contact the courier directly using the tracking number",
          "If still unresolved after 48 hours, open a dispute",
          "Market360 will review and if the package is confirmed lost, a full refund is issued",
        ],
        tags: ["lost", "package", "delivery", "missing"],
        readingTime: 3,
        updatedAt: "2025-05-22",
        views: 5800,
        relatedIds: ["tracking-orders", "delivery-delays", "opening-disputes"],
      },
      {
        id: "delivery-disputes",
        title: "Delivery disputes",
        description: "How delivery disputes are handled.",
        content: "Delivery disputes arise when a seller marks an order as delivered but the buyer says they never received it, or when the wrong item was delivered. Both types are handled through the dispute process.",
        steps: [
          "Tap 'Report a problem' on the order page",
          "Select the relevant reason",
          "Provide evidence: photos, delivery confirmation contradictions, tracking info",
          "Submit — our team reviews within 24 hours",
          "Resolution issued within 3–7 business days",
        ],
        tags: ["dispute", "delivery", "not received", "wrong item"],
        readingTime: 2,
        updatedAt: "2025-05-30",
        views: 5300,
        relatedIds: ["opening-disputes", "lost-packages", "refund-eligibility"],
      },
    ],
  },
  {
    id: "disputes",
    icon: AlertTriangle,
    label: "Refunds & Disputes",
    color: "#E67E22",
    accent: "rgba(230,126,34,0.10)",
    articles: [
      {
        id: "opening-disputes",
        title: "Opening a dispute",
        description: "How to formally raise a problem with an order.",
        content: "The Market360 dispute process is designed to resolve order problems fairly and quickly. Our team reviews evidence from both sides and issues a binding resolution.",
        steps: [
          "Go to the order page",
          "Tap 'Report a problem'",
          "Select the reason from the provided list",
          "Describe the problem clearly and objectively",
          "Upload evidence: photos, screenshots, chat history",
          "Submit the dispute",
          "You'll receive a case number and acknowledgement within 24 hours",
          "Respond to any requests from the dispute team",
          "Resolution issued within 3–7 business days",
        ],
        commonMistakes: [
          "Opening a dispute without first messaging the seller — sellers can often resolve issues directly and faster",
          "Not uploading sufficient evidence",
          "Waiting too long — disputes must be opened within 7 days of the delivery deadline",
        ],
        tags: ["dispute", "report", "refund", "problem"],
        readingTime: 4,
        updatedAt: "2025-06-05",
        views: 13200,
        featured: true,
        relatedIds: ["evidence-requirements", "refund-eligibility", "refund-timelines"],
      },
      {
        id: "evidence-requirements",
        title: "Evidence requirements",
        description: "What evidence to submit when opening a dispute.",
        content: "Strong evidence makes for fast dispute resolution. The dispute team needs clear documentation to make a fair decision.",
        importantNotes: [
          "Photos of the item and packaging (required for damaged item claims)",
          "Screenshots of chat conversations with the seller",
          "Order confirmation and delivery receipts",
          "Tracking information showing non-delivery",
          "Comparison photos showing the listing vs what was received",
        ],
        tags: ["evidence", "dispute", "photos", "proof"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 7300,
        relatedIds: ["opening-disputes", "refund-eligibility"],
      },
      {
        id: "refund-eligibility",
        title: "Refund eligibility",
        description: "Which situations qualify for a full or partial refund.",
        content: "Market360 issues refunds in specific, well-defined situations. Understanding eligibility before opening a dispute helps set the right expectations.",
        importantNotes: [
          "Full refund: item never arrived, item significantly different from listing, item arrived damaged",
          "Partial refund: item arrived but with minor discrepancies from description",
          "No refund: buyer's remorse, change of mind (unless seller's return policy allows it), damage caused by buyer",
          "Refunds are not issued for off-platform transactions",
        ],
        tags: ["refund", "eligibility", "policy", "dispute"],
        readingTime: 3,
        updatedAt: "2025-06-05",
        views: 8700,
        featured: true,
        relatedIds: ["opening-disputes", "refund-timelines", "buyer-protection"],
      },
      {
        id: "refund-timelines",
        title: "Refund timelines",
        description: "When to expect your money back after a dispute.",
        content: "Refund speed depends on the original payment method and the dispute resolution.",
        importantNotes: [
          "Market360 Wallet: instant, as soon as dispute is resolved in your favour",
          "Orange Money / Africell Money: 1–3 business days",
          "Debit/Credit Card: 3–7 business days (varies by bank)",
          "Bank transfer: 3–5 business days",
        ],
        tags: ["refund", "timeline", "how long", "money back"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 6600,
        relatedIds: ["refund-eligibility", "opening-disputes", "refund-processing"],
      },
      {
        id: "appeal-process",
        title: "Appeal process",
        description: "How to appeal a dispute decision you disagree with.",
        content: "If you believe a dispute was resolved unfairly, you can appeal within 7 days of the decision. Appeals are reviewed by a senior member of the Trust & Safety team who was not involved in the original decision.",
        steps: [
          "Go to the dispute case in your Orders section",
          "Tap 'Appeal decision'",
          "Explain clearly why you believe the decision was incorrect",
          "Upload any additional evidence not included in the original dispute",
          "Submit — you'll receive an acknowledgement within 24 hours",
          "Appeal outcomes are typically issued within 5 business days",
        ],
        importantNotes: [
          "Appeals must be submitted within 7 days of the original decision",
          "Only one appeal is allowed per dispute",
          "Appeal decisions are final",
        ],
        tags: ["appeal", "dispute", "review", "decision"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 4900,
        relatedIds: ["opening-disputes", "evidence-requirements"],
      },
    ],
  },
  {
    id: "tester-program",
    icon: Zap,
    label: "Tester Program",
    color: "#8E44AD",
    accent: "rgba(142,68,173,0.10)",
    articles: [
      {
        id: "tester-program-overview",
        title: "What is the Market360 Tester Program?",
        description: "An overview of Market360's early access and feedback program.",
        content: "The Market360 Tester Program is an invitation-based program that gives selected users early access to new app features before they're released publicly. Testers help the team catch bugs, validate new flows, and improve the overall user experience. In return, testers receive exclusive rewards, badges, and direct access to the product team.",
        tags: ["tester", "program", "beta", "early access"],
        readingTime: 2,
        updatedAt: "2025-06-10",
        views: 5700,
        trending: true,
        relatedIds: ["tester-requirements", "tester-rewards", "bug-reporting"],
      },
      {
        id: "tester-requirements",
        title: "Tester requirements",
        description: "Who qualifies to become a Market360 tester.",
        content: "The Tester Program is open to all Market360 users who meet the following criteria. Testers are selected based on their account history, engagement, and technical feedback quality.",
        importantNotes: [
          "Account must be at least 30 days old",
          "At least one completed transaction (buy or sell)",
          "No active policy violations or suspensions",
          "Android device (iOS support coming soon)",
          "Willingness to report bugs using the provided template",
        ],
        tags: ["tester", "requirements", "qualify", "beta"],
        readingTime: 2,
        updatedAt: "2025-06-10",
        views: 4800,
        relatedIds: ["tester-program-overview", "becoming-tester"],
      },
      {
        id: "tester-rewards",
        title: "Tester rewards",
        description: "What testers get for their contributions.",
        content: "Testers who actively contribute high-quality bug reports and feedback are recognised and rewarded. Rewards are distributed monthly based on contribution quality, not just quantity.",
        importantNotes: [
          "Exclusive 'Tester' profile badge",
          "Early access to new features",
          "Monthly wallet credit for active contributors",
          "Invitations to product feedback calls with the Market360 team",
          "Recognition in release notes for significant bug discoveries",
        ],
        tags: ["tester", "rewards", "benefits", "badge"],
        readingTime: 2,
        updatedAt: "2025-06-10",
        views: 4200,
        relatedIds: ["tester-program-overview", "tester-requirements", "bug-reporting"],
      },
      {
        id: "bug-reporting",
        title: "Bug reporting process",
        description: "How to report bugs effectively as a tester.",
        content: "A great bug report includes enough information for the development team to reproduce the issue. The more specific your report, the faster it gets fixed.",
        steps: [
          "When you find a bug, take a screenshot or screen recording",
          "Note exactly what you were doing when it occurred",
          "Open the Tester Portal from Settings → Tester Program",
          "Tap 'Submit bug report'",
          "Fill in: device model, OS version, app version, steps to reproduce, expected vs actual behaviour",
          "Attach screenshots or screen recording",
          "Submit",
        ],
        commonMistakes: [
          "Vague descriptions like 'it doesn't work' — be specific",
          "Not including device and app version",
          "Not attaching visual evidence",
          "Reporting the same bug multiple times",
        ],
        tags: ["bug", "report", "tester", "feedback"],
        readingTime: 3,
        updatedAt: "2025-06-10",
        views: 3900,
        relatedIds: ["tester-program-overview", "tester-rewards"],
      },
    ],
  },
  {
    id: "policies",
    icon: FileText,
    label: "Policies & Rules",
    color: "#2C3E50",
    accent: "rgba(44,62,80,0.10)",
    articles: [
      {
        id: "marketplace-policies",
        title: "Marketplace policies",
        description: "The rules that govern buying and selling on Market360.",
        content: "Market360's marketplace policies exist to protect buyers, sellers, and the integrity of the platform. All users are bound by these policies upon creating an account.",
        importantNotes: [
          "All transactions must occur through the in-app payment system",
          "Listings must accurately represent the product",
          "Sellers must honour delivery commitments",
          "Buyers must confirm or dispute orders within the stated window",
          "Abuse of the dispute system is a policy violation",
        ],
        tags: ["policy", "rules", "marketplace", "guidelines"],
        readingTime: 3,
        updatedAt: "2025-06-01",
        views: 5200,
        relatedIds: ["prohibited-products", "community-guidelines", "seller-rules"],
      },
      {
        id: "prohibited-products",
        title: "Prohibited products",
        description: "Items that cannot be sold on Market360.",
        content: "Certain products are prohibited from being listed or sold on Market360, either due to legal restrictions in Sierra Leone or platform safety policies.",
        importantNotes: [
          "Illegal drugs and controlled substances",
          "Weapons, firearms, and ammunition",
          "Counterfeit or replica branded goods",
          "Stolen property",
          "Explicit adult content",
          "Endangered animal products",
          "Unregulated financial products or investment schemes",
          "Alcohol (restricted category — requires pre-approval)",
        ],
        tags: ["prohibited", "banned", "policy", "products"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 4700,
        relatedIds: ["marketplace-policies", "reporting-products", "seller-rules"],
      },
      {
        id: "community-guidelines",
        title: "Community guidelines",
        description: "How to engage respectfully on Market360.",
        content: "Market360 is a community of buyers and sellers built on trust. These guidelines apply to all messaging, reviews, and public-facing content on the platform.",
        importantNotes: [
          "No harassment, threats, or abusive language in messages or reviews",
          "No discriminatory language based on ethnicity, religion, gender, or other protected characteristics",
          "Reviews must be based on genuine transactions",
          "No spam or unsolicited promotions",
          "No sharing of personal contact details in public listings",
        ],
        tags: ["community", "guidelines", "behaviour", "rules"],
        readingTime: 2,
        updatedAt: "2025-06-01",
        views: 3800,
        relatedIds: ["marketplace-policies", "reporting-users"],
      },
    ],
  },
];

// ─── Utility Helpers ────────────────────────────────────────────────────────

function getAllArticles(): (Article & { categoryId: string; categoryLabel: string })[] {
  return KB.flatMap((cat) =>
    cat.articles.map((art) => ({
      ...art,
      categoryId: cat.id,
      categoryLabel: cat.label,
    }))
  );
}

function getArticleById(id: string) {
  for (const cat of KB) {
    const art = cat.articles.find((a) => a.id === id);
    if (art) return { article: art, category: cat };
  }
  return null;
}

function getCategoryById(id: string) {
  return KB.find((c) => c.id === id) ?? null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Route ──────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Market360" },
      {
        name: "description",
        content:
          "Find answers about buying, selling, the wallet, security, and your account on Market360. Complete knowledge base with step-by-step guides, FAQs, and 24/7 support.",
      },
      { property: "og:title", content: "Market360 Help Center" },
      {
        property: "og:description",
        content: "Sierra Leone's most comprehensive marketplace help center. Guides, FAQs, and expert support for Market360 buyers and sellers.",
      },
      { property: "og:url", content: "https://market360.shop/help" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://market360.shop/help" }],
    // FAQ + WebPage structured data injected via script tag below
  }),
  component: HelpPage,
});

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Category card on the home view */
function CategoryCard({ cat, onClick }: { cat: Category; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hc-cat-card"
      style={{ "--cat-accent": cat.accent, "--cat-color": cat.color } as React.CSSProperties}
    >
      <span className="hc-cat-icon">
        <cat.icon size={20} strokeWidth={1.8} />
      </span>
      <span className="hc-cat-body">
        <span className="hc-cat-label">{cat.label}</span>
        <span className="hc-cat-count">{cat.articles.length} articles</span>
      </span>
      <ArrowRight size={15} className="hc-cat-arrow" />
    </button>
  );
}

/** Single article list item */
function ArticleRow({
  article,
  category,
  onClick,
}: {
  article: Article & { categoryId?: string; categoryLabel?: string };
  category?: { color: string; label: string };
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="hc-art-row">
      <span className="hc-art-row-body">
        <span className="hc-art-row-title">{article.title}</span>
        <span className="hc-art-row-meta">
          {category && (
            <span className="hc-art-row-cat" style={{ color: category.color }}>
              {category.label}
            </span>
          )}
          <span className="hc-art-row-time">
            <Clock size={11} />
            {article.readingTime} min read
          </span>
          {article.trending && (
            <span className="hc-badge hc-badge-trend">
              <TrendingUp size={10} />
              Trending
            </span>
          )}
        </span>
      </span>
      <ArrowRight size={15} className="hc-art-row-arrow" />
    </button>
  );
}

/** Inline callout box */
function Callout({ type, children }: { type: "info" | "warning" | "check"; children: React.ReactNode }) {
  const styles = {
    info: { icon: Info, bg: "rgba(0,168,89,0.06)", border: "rgba(0,168,89,0.2)", color: "#006B3C" },
    warning: { icon: AlertCircle, bg: "rgba(245,166,35,0.07)", border: "rgba(245,166,35,0.25)", color: "#9B6A00" },
    check: { icon: CheckCircle, bg: "rgba(0,113,227,0.06)", border: "rgba(0,113,227,0.18)", color: "#004A9B" },
  }[type];
  const Icon = styles.icon;
  return (
    <div
      style={{ background: styles.bg, borderLeft: `3px solid ${styles.border}`, color: styles.color }}
      className="hc-callout"
    >
      <Icon size={15} className="hc-callout-icon" />
      <div>{children}</div>
    </div>
  );
}

/** Was this helpful widget */
function HelpfulWidget({ articleId }: { articleId: string }) {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  return (
    <div className="hc-helpful">
      {voted ? (
        <span className="hc-helpful-thanks">
          <CheckCircle size={15} />
          {voted === "yes" ? "Glad this helped!" : "Thanks — we'll improve this article."}
        </span>
      ) : (
        <>
          <span className="hc-helpful-label">Was this article helpful?</span>
          <button onClick={() => setVoted("yes")} className="hc-helpful-btn hc-helpful-yes">
            <ThumbsUp size={14} /> Yes
          </button>
          <button onClick={() => setVoted("no")} className="hc-helpful-btn hc-helpful-no">
            <ThumbsDown size={14} /> No
          </button>
        </>
      )}
    </div>
  );
}

/** Full article detail view */
function ArticleView({
  articleId,
  onBack,
  onNavigate,
}: {
  articleId: string;
  onBack: () => void;
  onNavigate: (id: string) => void;
}) {
  const result = getArticleById(articleId);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [articleId]);

  if (!result) return null;
  const { article, category } = result;

  const related = (article.relatedIds ?? [])
    .map((id) => {
      const r = getArticleById(id);
      return r ? { article: r.article, category: r.category } : null;
    })
    .filter(Boolean) as { article: Article; category: Category }[];

  return (
    <div ref={contentRef} className="hc-article-view">
      {/* Breadcrumb */}
      <nav className="hc-breadcrumb" aria-label="breadcrumb">
        <button onClick={onBack} className="hc-bc-item hc-bc-link">Help Center</button>
        <ChevronRight size={13} className="hc-bc-sep" />
        <button
          onClick={() => {
            onBack();
            // small hack: set category view after back — parent handles this
          }}
          className="hc-bc-item hc-bc-link"
          style={{ color: category.color }}
        >
          {category.label}
        </button>
        <ChevronRight size={13} className="hc-bc-sep" />
        <span className="hc-bc-item hc-bc-current">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="hc-art-header">
        <span className="hc-art-cat-chip" style={{ background: category.accent, color: category.color }}>
          <category.icon size={12} />
          {category.label}
        </span>
        <h1 className="hc-art-title">{article.title}</h1>
        <p className="hc-art-desc">{article.description}</p>
        <div className="hc-art-meta-row">
          <span><Clock size={13} /> {article.readingTime} min read</span>
          <span><Eye size={13} /> {article.views.toLocaleString()} views</span>
          <span><RefreshCw size={13} /> Updated {formatDate(article.updatedAt)}</span>
          {article.tags.slice(0, 3).map((t) => (
            <span key={t} className="hc-art-tag"><Tag size={11} />{t}</span>
          ))}
        </div>
      </header>

      {/* Main content */}
      <div className="hc-art-body">
        {article.content.split("\n\n").map((para, i) => (
          <p key={i} className="hc-art-para">{para}</p>
        ))}

        {article.steps && article.steps.length > 0 && (
          <div className="hc-art-section">
            <h2 className="hc-art-section-title">
              <CheckCircle size={16} />
              Step-by-step guide
            </h2>
            <ol className="hc-steps-list">
              {article.steps.map((step, i) => (
                <li key={i} className="hc-step-item">
                  <span className="hc-step-num">{i + 1}</span>
                  <span className="hc-step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {article.importantNotes && article.importantNotes.length > 0 && (
          <div className="hc-art-section">
            <h2 className="hc-art-section-title">
              <Info size={16} />
              Important notes
            </h2>
            <div className="hc-notes-list">
              {article.importantNotes.map((note, i) => (
                <Callout key={i} type={note.toLowerCase().includes("never") ? "warning" : "info"}>
                  {note}
                </Callout>
              ))}
            </div>
          </div>
        )}

        {article.commonMistakes && article.commonMistakes.length > 0 && (
          <div className="hc-art-section">
            <h2 className="hc-art-section-title">
              <AlertCircle size={16} />
              Common mistakes to avoid
            </h2>
            <ul className="hc-mistakes-list">
              {article.commonMistakes.map((m, i) => (
                <li key={i} className="hc-mistake-item">
                  <X size={14} className="hc-mistake-icon" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Helpful widget */}
      <HelpfulWidget articleId={article.id} />

      {/* Related articles */}
      {related.length > 0 && (
        <div className="hc-related">
          <h3 className="hc-related-title">Related articles</h3>
          <div className="hc-related-grid">
            {related.map(({ article: ra, category: rc }) => (
              <button key={ra.id} onClick={() => onNavigate(ra.id)} className="hc-related-card">
                <span className="hc-related-cat" style={{ color: rc.color }}>
                  <rc.icon size={12} /> {rc.label}
                </span>
                <span className="hc-related-art-title">{ra.title}</span>
                <span className="hc-related-art-time"><Clock size={11} /> {ra.readingTime} min</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Still need help */}
      <StillNeedHelp />
    </div>
  );
}

/** Category detail view listing all articles in a category */
function CategoryView({
  categoryId,
  onBack,
  onArticle,
}: {
  categoryId: string;
  onBack: () => void;
  onArticle: (id: string) => void;
}) {
  const cat = getCategoryById(categoryId);
  if (!cat) return null;

  return (
    <div className="hc-cat-view">
      <nav className="hc-breadcrumb">
        <button onClick={onBack} className="hc-bc-item hc-bc-link">Help Center</button>
        <ChevronRight size={13} className="hc-bc-sep" />
        <span className="hc-bc-item hc-bc-current" style={{ color: cat.color }}>{cat.label}</span>
      </nav>

      <header className="hc-cat-view-header">
        <span className="hc-cat-view-icon" style={{ background: cat.accent, color: cat.color }}>
          <cat.icon size={22} />
        </span>
        <div>
          <h1 className="hc-cat-view-title">{cat.label}</h1>
          <p className="hc-cat-view-count">{cat.articles.length} articles</p>
        </div>
      </header>

      <div className="hc-art-list">
        {cat.articles.map((art) => (
          <ArticleRow
            key={art.id}
            article={art}
            onClick={() => onArticle(art.id)}
          />
        ))}
      </div>
    </div>
  );
}

/** Still need help section */
function StillNeedHelp() {
  return (
    <div className="hc-still-help">
      <div className="hc-still-help-inner">
        <h2 className="hc-still-title">Still need help?</h2>
        <p className="hc-still-sub">Our team responds within hours, every day of the week.</p>
        <div className="hc-still-contacts">
          <span><Mail size={14} /> support@market360.shop</span>
          <span><Phone size={14} /> +232 (0) 76 000 000</span>
          <span><Clock size={14} /> Mon–Sun · 8am – 10pm GMT</span>
        </div>
        <div className="hc-still-actions">
          <Link to="/contact" className="hc-still-btn-primary">Contact support</Link>
          <Link to="/safety" className="hc-still-btn-ghost">Marketplace safety</Link>
        </div>
      </div>
      <div className="hc-still-cards">
        {[
          { icon: Smartphone, t: "Inside the app", d: "Settings → Help & Support" },
          { icon: CreditCard, t: "Payment issues?", d: "We can lift wallet holds and review failed payouts." },
          { icon: Truck, t: "Delivery problems?", d: "Open a dispute on the order page for fastest resolution." },
        ].map((c) => (
          <div key={c.t} className="hc-still-card">
            <span className="hc-still-card-icon"><c.icon size={18} /></span>
            <div>
              <p className="hc-still-card-title">{c.t}</p>
              <p className="hc-still-card-desc">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

type View =
  | { type: "home" }
  | { type: "category"; id: string }
  | { type: "article"; id: string };

function HelpPage() {
  const [view, setView] = useState<View>({ type: "home" });
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const allArticles = useMemo(() => getAllArticles(), []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allArticles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.content.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query, allArticles]);

  const featuredArticles = useMemo(
    () => allArticles.filter((a) => a.featured).slice(0, 6),
    [allArticles]
  );

  const trendingArticles = useMemo(
    () => allArticles.filter((a) => a.trending).slice(0, 4),
    [allArticles]
  );

  const handleArticle = (id: string) => {
    setQuery("");
    setView({ type: "article", id });
  };

  const handleCategory = (id: string) => {
    setQuery("");
    setView({ type: "category", id });
  };

  const handleBack = () => setView({ type: "home" });

  const showSearch = query.trim().length > 0 && searchFocused;

  // Structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allArticles.slice(0, 20).map((a) => ({
      "@type": "Question",
      name: a.title,
      acceptedAnswer: { "@type": "Answer", text: a.description + " " + a.content.slice(0, 300) },
    })),
  };

  return (
    <SiteLayout>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        /* ─── Help Center Design System ──────────────────────────── */

        .hc-hero {
          background: linear-gradient(155deg, #003D20 0%, #006B3C 55%, #00A859 100%);
          padding: 64px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hc-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hc-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 16px;
        }
        .hc-hero-title {
          font-size: clamp(26px, 5vw, 44px);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .hc-hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.72);
          max-width: 420px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        /* Search */
        .hc-search-wrap {
          position: relative;
          max-width: 540px;
          margin: 0 auto;
          z-index: 10;
        }
        .hc-search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .hc-search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          color: #1a1a1a;
        }
        .hc-search-box input::placeholder { color: #9ca3af; }
        .hc-search-clear {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        .hc-search-results {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.16);
          overflow: hidden;
          z-index: 200;
        }
        .hc-sr-header {
          padding: 10px 16px 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9ca3af;
          border-bottom: 1px solid #f1f5f9;
        }
        .hc-sr-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          transition: background 0.15s;
        }
        .hc-sr-item:hover { background: #f8fafc; }
        .hc-sr-item-body { display: flex; flex-direction: column; gap: 2px; }
        .hc-sr-title { font-size: 13px; font-weight: 600; color: #1a1a1a; }
        .hc-sr-cat { font-size: 11px; color: #6b7280; }
        .hc-sr-empty {
          padding: 24px 16px;
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
        }

        /* Hero quick links */
        .hc-popular-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }
        .hc-pop-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 12px;
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .hc-pop-chip:hover { background: rgba(255,255,255,0.2); }

        /* Stats bar */
        .hc-stats {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 14px 24px;
        }
        .hc-stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
        .hc-stat {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }
        .hc-stat-icon { color: #00A859; }

        /* Layout */
        .hc-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .hc-section { margin-bottom: 48px; }
        .hc-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hc-section-title-icon { color: #00A859; }

        /* Category cards grid */
        .hc-cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        .hc-cat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          text-align: left;
          transition: box-shadow 0.18s, border-color 0.18s, transform 0.15s;
          width: 100%;
        }
        .hc-cat-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09);
          border-color: var(--cat-color);
          transform: translateY(-1px);
        }
        .hc-cat-icon {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--cat-accent);
          color: var(--cat-color);
          flex-shrink: 0;
        }
        .hc-cat-body { flex: 1; min-width: 0; }
        .hc-cat-label { display: block; font-size: 13px; font-weight: 700; color: #1a1a1a; }
        .hc-cat-count { display: block; font-size: 11px; color: #9ca3af; margin-top: 2px; }
        .hc-cat-arrow { color: #cbd5e1; flex-shrink: 0; }

        /* Featured + trending grids */
        .hc-featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }
        .hc-featured-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px;
          cursor: pointer;
          text-align: left;
          transition: box-shadow 0.18s, border-color 0.18s;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hc-featured-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09);
          border-color: #00A859;
        }
        .hc-feat-cat {
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hc-feat-title { font-size: 14px; font-weight: 700; color: #1a1a1a; line-height: 1.4; }
        .hc-feat-desc { font-size: 12px; color: #6b7280; line-height: 1.5; }
        .hc-feat-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: #9ca3af;
          margin-top: 4px;
        }
        .hc-feat-meta span { display: flex; align-items: center; gap: 3px; }

        /* Badges */
        .hc-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
        }
        .hc-badge-trend { background: rgba(230,126,34,0.1); color: #c0620a; }
        .hc-badge-new { background: rgba(0,168,89,0.1); color: #006B3C; }

        /* Article row */
        .hc-art-list { display: flex; flex-direction: column; gap: 2px; }
        .hc-art-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          transition: background 0.15s;
        }
        .hc-art-row:hover { background: #f8fafc; }
        .hc-art-row-body { flex: 1; min-width: 0; }
        .hc-art-row-title { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; }
        .hc-art-row-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 3px;
          font-size: 11px;
          color: #9ca3af;
        }
        .hc-art-row-cat { font-weight: 600; display: flex; align-items: center; gap: 3px; }
        .hc-art-row-time { display: flex; align-items: center; gap: 3px; }
        .hc-art-row-arrow { color: #cbd5e1; flex-shrink: 0; }

        /* Article view */
        .hc-article-view { max-width: 760px; }
        .hc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .hc-bc-item { font-size: 12px; display: flex; align-items: center; gap: 3px; }
        .hc-bc-link {
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s;
        }
        .hc-bc-link:hover { color: #00A859; }
        .hc-bc-sep { color: #cbd5e1; }
        .hc-bc-current { color: #1a1a1a; font-weight: 600; }

        .hc-art-header { margin-bottom: 32px; }
        .hc-art-cat-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 20px;
          padding: 4px 10px;
          margin-bottom: 14px;
        }
        .hc-art-title {
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 800;
          
