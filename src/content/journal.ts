/* ==========================================================================
   JOURNAL
   --------------------------------------------------------------------------
   ⚠  THESE ARE UNPUBLISHED TITLES, not live articles. `href` is "#" for
      every entry until the pieces are written, so they render as plain text
      rather than dead links. Point one at a real route (e.g.
      /journal/plantation-morning) and it becomes a link automatically.
   ========================================================================== */

export type Entry = {
  title: string;
  /** Standfirst — one line, the way a magazine contents page reads. */
  standfirst: string;
  /** PLACEHOLDER — "#" means not yet published. */
  href: string;
};

export const journal: Entry[] = [
  {
    title: "The rhythm of a plantation morning",
    standfirst: "What happens on the estate before anyone has had breakfast.",
    href: "#",
  },
  {
    title: "Why Wayanad feels different after the rain",
    standfirst: "On the week the monsoon breaks, and what it does to the hills.",
    href: "#",
  },
  {
    title: "From cocoa pod to chocolate",
    standfirst: "Cutting, fermenting, drying — the long middle of a short story.",
    href: "#",
  },
  {
    title: "Coffee country",
    standfirst: "How the hills of Wayanad came to be planted, and by whom.",
    href: "#",
  },
];
