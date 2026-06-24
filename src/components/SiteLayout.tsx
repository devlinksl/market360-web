import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Drawer } from "vaul";
import {
  Menu, ShoppingBag, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin,
  Sparkles, Store, Download, FlaskConical, Newspaper, LifeBuoy, Info, ArrowRight, X, FileText, Lock,
} from "lucide-react";
import logoAsset from "@/assets/market360-logo.png.asset.json";

const mobileTiles = [
  { to: "/seller-solutions", label: "Sell on Market360", desc: "Tools for stores", Icon: Store, accent: "from-green-100 to-emerald-50", legal: false },
  { to: "/download", label: "Get the App", desc: "iOS & Android", Icon: Download, accent: "from-lime-100 to-emerald-50", legal: false },
  { to: "/news", label: "News & Updates", desc: "Product changelog", Icon: Newspaper, accent: "from-emerald-50 to-white", legal: false },
  { to: "/about", label: "About Market360", desc: "Our story", Icon: Info, accent: "from-emerald-50 to-white", legal: false },
  { to: "/contact", label: "Contact Us", desc: "We're here to help", Icon: Mail, accent: "from-emerald-100 to-emerald-50", legal: false },
  { to: "/help", label: "Help Center", desc: "FAQs & guides", Icon: LifeBuoy, accent: "from-green-50 to-white", legal: false },
  { to: "/privacy", label: "Privacy Policy", desc: "How we use your data", Icon: Lock, accent: "from-slate-50 to-slate-100", legal: true },
  { to: "/terms", label: "Terms of Service", desc: "Rules & conditions", Icon: FileText, accent: "from-slate-50 to-slate-100", legal: true },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/seller-solutions", label: "Sellers" },
  { to: "/download", label: "Download" },
  { to: "/tester", label: "Tester Program" },
  { to: "/news", label: "News" },
  { to: "/help", label: "Help" },
];

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img src={logoAsset.url} alt="Market360 logo" className={className} width={40} height={40} loading="eager" decoding="async" />
  );
}

function PageLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/60 backdrop-blur-sm" aria-busy="true">
      <div className="page-spinner" />
    </div>
  );
}

function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-pro flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
          <Logo className="h-9 w-9 rounded-xl" />
          <span>Market<span className="text-primary">360</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md" activeProps={{ className: "text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/contact" className="btn-ghost text-sm py-2 px-4">Contact</Link>
          <Link to="/download" className="btn-primary text-sm py-2 px-4">Get the App</Link>
        </div>
        <button aria-label="Open menu" className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary" onClick={onOpen}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function MobileDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[60] mt-24 flex h-[88vh] flex-col rounded-t-3xl border-t border-border bg-background outline-none lg:hidden">
          <Drawer.Title className="sr-only">Navigation menu</Drawer.Title>
          <Drawer.Description className="sr-only">Browse Market360 sections</Drawer.Description>
          <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border" />
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <div className="flex items-center gap-2.5 font-display font-bold text-lg">
              <Logo className="h-8 w-8 rounded-xl" />
              <span>Market<span className="text-primary">360</span></span>
            </div>
            <p className="text-xs text-muted-foreground">Swipe down to close</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-10 pt-3">
            <Link
              to="/tester"
              onClick={() => onOpenChange(false)}
              className="group relative block overflow-hidden rounded-2xl border border-border shadow-soft tile-anim"
              style={{ animationDelay: "30ms", minHeight: "148px" }}
            >
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              {/* Top-left badge */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Now Recruiting</span>
              </div>
              {/* Content */}
              <div className="relative flex h-full flex-col justify-end p-4 pt-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Tester Program · Beta</p>
                <p className="mt-0.5 text-[17px] font-extrabold leading-tight tracking-tight text-white">
                  Join the Market360<br />Tester Program
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[11px] text-white/70">Early access · Perks · Shape the app</p>
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-white/20 ring-1 ring-white/30 group-hover:bg-white/35 transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>
            </Link>

            <h2 className="mt-5 text-xl font-bold tracking-tight">Where do you want to go?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {mobileTiles.map(({ to, label, desc, Icon, accent, legal }, i) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => onOpenChange(false)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-4 shadow-soft tile-anim ${
                    legal
                      ? "min-h-[90px] border-border/60"
                      : "min-h-[130px] border-border"
                  }`}
                  style={{ animationDelay: `${90 + i * 45}ms` }}
                >
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${accent} opacity-80`} />
                  {legal ? (
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 backdrop-blur ring-1 ring-border/40">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground leading-tight">{label}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground/70 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 backdrop-blur ring-1 ring-primary/15">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{desc}</p>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/download"
              onClick={() => onOpenChange(false)}
              className="btn-primary mt-6 w-full justify-center"
            >
              <Download className="h-4 w-4" /> Download the App
            </Link>

            <div className="mt-6 flex justify-center gap-2 pb-6">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const TESTER_POPUP_KEY = "m360_tester_popup_last";

function TesterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const last = localStorage.getItem(TESTER_POPUP_KEY);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (!last || now - parseInt(last, 10) > oneDay) {
        const t = setTimeout(() => setOpen(true), 4500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(TESTER_POPUP_KEY, String(Date.now())); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 backdrop-blur-sm px-4 menu-overlay-anim" role="dialog" aria-modal="true" aria-label="Join the Market360 Tester Program">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-elevated menu-panel-anim">
        <button onClick={dismiss} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary to-primary-glow">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid h-full place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/30">
              <FlaskConical className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6 text-center">
          <span className="eyebrow"><Sparkles className="h-3 w-3" /> Now recruiting</span>
          <h3 className="mt-3 text-xl font-bold tracking-tight">Join the Market360 Tester Program.</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get early access, exclusive perks, and help shape Sierra Leone's #1 marketplace.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button onClick={dismiss} className="btn-ghost w-full justify-center">Maybe later</button>
            <Link to="/tester" onClick={dismiss} className="btn-primary w-full justify-center">
              Join now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: [
      { to: "/features", label: "Features" },
      { to: "/seller-solutions", label: "Seller Solutions" },
      { to: "/download", label: "Download App" },
      { to: "/safety", label: "Marketplace Safety" },
    ]},
    { title: "Company", links: [
      { to: "/about", label: "About" },
      { to: "/news", label: "News & Updates" },
      { to: "/tester", label: "Become a Tester" },
      { to: "/contact", label: "Contact" },
    ]},
    { title: "Resources", links: [
      { to: "/help", label: "Help Center" },
      { to: "/safety", label: "Trust & Safety" },
    ]},
    { title: "Legal", links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ]},
  ] as const;

  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="container-pro py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
              <Logo className="h-9 w-9 rounded-xl" />
              <span>Market<span className="text-primary">360</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              The modern marketplace where buyers, sellers, and stores grow together — with built-in wallet, analytics, and trust at every step.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@market360.shop</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> market360.shop</p>
            </div>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-primary hover:border-primary/40">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2"><ShoppingBag className="h-3.5 w-3.5 text-primary" /> © {new Date().getFullYear()} Market360. All rights reserved.</p>
          <p>Built for buyers, sellers, and the future of commerce.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex min-h-dvh flex-col">
      <PageLoader />
      <Header onOpen={() => setMenuOpen(true)} />
      <MobileDrawer open={menuOpen} onOpenChange={setMenuOpen} />
      <TesterPopup />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
