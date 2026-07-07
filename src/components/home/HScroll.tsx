import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

export function HScroll({
  children,
  ariaLabel,
  className = "",
}: {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dx: number) => {
    ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-320)}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 hidden md:grid h-10 w-10 place-items-center rounded-full border border-border bg-background/95 shadow-soft backdrop-blur hover:text-primary"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(320)}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 hidden md:grid h-10 w-10 place-items-center rounded-full border border-border bg-background/95 shadow-soft backdrop-blur hover:text-primary"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

