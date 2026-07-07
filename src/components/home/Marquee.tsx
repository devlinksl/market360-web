import type { ReactNode } from "react";

export function Marquee({ children, speed = 30 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="marquee" style={{ ["--marquee-duration" as string]: `${speed}s` }}>
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}
