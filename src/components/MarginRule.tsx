"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";

/**
 * The running head.
 *
 * A hairline down the left margin carrying the name of the section you are
 * currently in, set vertically in small caps — the way a printed monograph
 * repeats its chapter title on every spread. It is the one persistent piece
 * of chrome on the site, and it is pure typography.
 *
 * Desktop only, and decorative: the same information is in the navigation,
 * so it is hidden from assistive technology.
 */
export function MarginRule() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The section occupying the middle band of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = sections.find((s) => s.id === visible.target.id);
          setCurrent(match ? match.name : null);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    /* On the outer (right) margin, the way a book sets a running head —
       and clear of the section eyebrows, which sit on the left. */
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 z-20 hidden h-screen w-[var(--gutter)] xl:block"
    >
      <div className="relative flex h-full items-center justify-center">
        <span
          className="absolute top-[16%] left-1/2 h-[28%] w-px -translate-x-1/2 bg-[var(--rule)] transition-opacity duration-700"
          style={{ opacity: current ? 1 : 0 }}
        />
        <span
          className="t-plate vertical-rl whitespace-nowrap transition-all duration-700 ease-[var(--ease-estate)]"
          style={{
            opacity: current ? 0.8 : 0,
            transform: `translateY(${current ? 0 : 8}px)`,
          }}
        >
          {current ?? ""}
        </span>
        <span
          className="absolute bottom-[16%] left-1/2 h-[28%] w-px -translate-x-1/2 bg-[var(--rule)] transition-opacity duration-700"
          style={{ opacity: current ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
