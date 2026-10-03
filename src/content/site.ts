import { SITE_URL } from "./owner";

/* ==========================================================================
   BRAND CONSTANTS
   --------------------------------------------------------------------------
   Facts about the property that are already established. Anything that needs
   the owner to supply it lives in owner.ts, not here.
   ========================================================================== */

export const site = {
  name: "The Planters Lodge",
  /** Wordmark is set on two lines in the nav. */
  wordmark: ["The Planters", "Lodge"] as const,
  url: SITE_URL,
  region: "Wayanad, Kerala, India",
  acreage: 100,
  tagline: "A private 100-acre cocoa and coffee estate in Wayanad, Kerala.",
} as const;

export const nav = [
  { label: "The Estate", href: "#estate" },
  { label: "Stay", href: "#stay" },
  { label: "Experiences", href: "#experiences" },
  { label: "Dining", href: "#dining" },
  { label: "Wayanad", href: "#wayanad" },
  { label: "Journal", href: "#journal" },
] as const;

/** Section names for the running head in the right margin. */
export const sections = [
  { id: "estate", name: "The Estate" },
  { id: "stay", name: "Stay" },
  { id: "experiences", name: "Experiences" },
  { id: "dining", name: "Dining" },
  { id: "wayanad", name: "Wayanad" },
  { id: "journal", name: "Journal" },
  { id: "enquire", name: "Enquire" },
] as const;
