/* ==========================================================================
   MOTION ENGINE
   --------------------------------------------------------------------------
   Two IntersectionObservers and one animation frame loop for the whole site.
   No per-element scroll listeners, no timers, no React state on scroll, and
   nothing running when nothing is moving.

   Reveals   — an observer toggles `is-in`; CSS does the animating.
   Parallax  — an observer keeps a set of what is on screen; one passive
               scroll listener flags a frame; one rAF loop writes one custom
               property per visible element.

   Both switch off entirely under prefers-reduced-motion. Parallax is also
   desktop-only: on a phone it costs more than it gives.
   ========================================================================== */

const REDUCED = "(prefers-reduced-motion: reduce)";
const DESKTOP = "(min-width: 1024px)";

/* Hysteresis. A photograph becomes active once ENTER of it is on screen and
   only resets once it has fallen back below EXIT. The gap between the two is
   what stops an element parked near the edge from flickering as the page
   moves a few pixels — it must properly leave before it can arrive again. */
const ENTER = 0.15;
const EXIT = 0.02;

/**
 * Reveals.
 *
 * Photographs (`[data-plate]`) replay: they stay observed, so scrolling away
 * and back runs the reveal again, in either direction. Text (`.reveal`)
 * resolves once and is released — words re-animating on every pass reads as
 * a page that will not sit still.
 */
export function initReveals(): () => void {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(".reveal, [data-plate]"),
  );
  if (nodes.length === 0) return () => {};

  // Honour the OS setting: show everything, observe nothing.
  if (window.matchMedia(REDUCED).matches) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;
        const active = el.classList.contains("is-in");

        if (!active) {
          if (ratio < ENTER) continue;
          el.classList.add("is-in");
          // Text animates once; photographs stay under observation.
          if (!el.hasAttribute("data-plate")) io.unobserve(el);
          continue;
        }

        // Only reset once it has genuinely left, never on a small nudge.
        if (ratio <= EXIT) el.classList.remove("is-in");
      }
    },
    {
      // Both edges of the hysteresis band must be observable, plus 0 so a
      // full exit is always reported.
      threshold: [0, EXIT, ENTER, 0.3],
      // Hold the reveal back until the photograph is properly in the frame.
      rootMargin: "0px 0px -10% 0px",
    },
  );

  nodes.forEach((n) => io.observe(n));
  return () => io.disconnect();
}

/**
 * Parallax for the handful of photographs carrying `data-parallax`.
 *
 * The value is the maximum travel in pixels — about 10 is the whole budget.
 * Movement is relative to how far the element sits from the middle of the
 * viewport, so a photograph drifts a few pixels as it passes and never
 * appears to float free of the page. Entirely separate from the reveal: it
 * tracks scroll position continuously, in both directions, for as long as
 * the element is on screen.
 */
export function initParallax(): () => void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
  if (nodes.length === 0) return () => {};

  const reduced = window.matchMedia(REDUCED);
  const desktop = window.matchMedia(DESKTOP);

  /* Only what is on screen is measured. Everything else costs nothing. */
  const visible = new Set<HTMLElement>();

  let frame = 0;
  let queued = false;
  let active = false;

  const update = () => {
    queued = false;
    const h = window.innerHeight;
    for (const node of visible) {
      const rect = node.getBoundingClientRect();
      const strength = Number(node.dataset.parallax) || 0;
      // −1 at the bottom of the screen, +1 at the top.
      const ratio = (h / 2 - (rect.top + rect.height / 2)) / (h / 2 + rect.height / 2);
      const offset = Math.max(-1, Math.min(1, ratio)) * strength;
      node.style.setProperty("--par", `${offset.toFixed(2)}px`);
    }
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    frame = requestAnimationFrame(update);
  };

  const vis = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visible.add(el);
        else {
          visible.delete(el);
          el.style.removeProperty("--par");
        }
      }
      if (active) schedule();
    },
    { rootMargin: "10% 0px 10% 0px" },
  );

  const enable = () => {
    if (active) return;
    active = true;
    nodes.forEach((n) => vis.observe(n));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
  };

  const disable = () => {
    if (!active) return;
    active = false;
    vis.disconnect();
    visible.clear();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    cancelAnimationFrame(frame);
    nodes.forEach((n) => n.style.removeProperty("--par"));
  };

  const sync = () => (desktop.matches && !reduced.matches ? enable() : disable());

  sync();
  reduced.addEventListener("change", sync);
  desktop.addEventListener("change", sync);

  return () => {
    disable();
    reduced.removeEventListener("change", sync);
    desktop.removeEventListener("change", sync);
  };
}
