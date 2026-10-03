/* ==========================================================================
   OWNER INPUT — THE ONE FILE THAT NEEDS REAL INFORMATION
   --------------------------------------------------------------------------
   Everything the owner must supply lives here, and nowhere else.

   Each value is `null` until it is real. Nothing is pre-filled with a
   plausible-looking fake, because a fake phone number that reaches the live
   site is worse than no phone number: the site hides a channel it cannot
   honour, rather than inviting someone to call a number that does not exist.

   Set a value either by editing it here, or by setting the matching
   environment variable (see .env.example). The environment wins.
   ========================================================================== */

const env = (key: string): string | null => {
  const raw = process.env[key];
  const v = typeof raw === "string" ? raw.trim() : "";
  return v.length > 0 ? v : null;
};

/* -------------------------------------------------------------------------
   1. CONTACT
   ------------------------------------------------------------------------- */

/**
 * WhatsApp number in international format: country code first, digits only.
 * No "+", no spaces, no leading zero. India example: 919876543210
 * Env: NEXT_PUBLIC_WHATSAPP_NUMBER
 */
export const WHATSAPP_NUMBER: string | null =
  env("NEXT_PUBLIC_WHATSAPP_NUMBER") ?? null;

/** Spoken/printed phone number, e.g. "+91 98765 43210". */
export const PHONE_DISPLAY: string | null = env("NEXT_PUBLIC_PHONE_DISPLAY") ?? null;

/** Dial string for tel: links, e.g. "+919876543210". */
export const PHONE_E164: string | null = env("NEXT_PUBLIC_PHONE_E164") ?? null;

/** Enquiry inbox, e.g. "stay@theplanterslodge.in". */
export const EMAIL: string | null = env("NEXT_PUBLIC_EMAIL") ?? null;

/* -------------------------------------------------------------------------
   2. ADDRESS
   Used for structured data. Leave null until confirmed — an approximate
   address in schema.org is worse than none.
   ------------------------------------------------------------------------- */

export const STREET_ADDRESS: string | null = null;
export const POSTAL_CODE: string | null = null;
/** Decimal degrees, e.g. 11.6854 / 76.1320. */
export const LATITUDE: number | null = null;
export const LONGITUDE: number | null = null;

/* -------------------------------------------------------------------------
   3. WEB
   ------------------------------------------------------------------------- */

/**
 * Live origin, no trailing slash. Used for canonical URLs, Open Graph and
 * the sitemap. Falls back to localhost so development works; set this before
 * deploying or every canonical URL will be wrong.
 * Env: NEXT_PUBLIC_SITE_URL
 */
export const SITE_URL: string =
  env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000";

export const SITE_URL_IS_REAL = env("NEXT_PUBLIC_SITE_URL") !== null;

/**
 * Forces noindex even when a real SITE_URL is set.
 *
 * Needed for preview links (ngrok, staging): Open Graph and canonical URLs
 * require a real origin, but setting one would otherwise flip robots to
 * "allow". Set NEXT_PUBLIC_FORCE_NOINDEX=1 to share a link without letting
 * a pre-launch site — placeholder room names and all — get crawled.
 */
export const FORCE_NOINDEX = env("NEXT_PUBLIC_FORCE_NOINDEX") !== null;

/** Whether search engines should be allowed in. */
export const INDEXABLE = SITE_URL_IS_REAL && !FORCE_NOINDEX;

/** Real handles only. An empty list renders nothing. */
export const SOCIAL: { label: string; href: string }[] = [];

/* -------------------------------------------------------------------------
   4. ENQUIRY DELIVERY
   Where a submitted enquiry should go. See src/lib/enquiry/.
   "log" writes to the server console and notifies nobody.
   ------------------------------------------------------------------------- */

export type EnquiryChannel = "log" | "email";

/** Env: ENQUIRY_CHANNEL */
export const ENQUIRY_CHANNEL = (env("ENQUIRY_CHANNEL") ?? "log") as EnquiryChannel;

/* -------------------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------------------- */

/**
 * Builds a wa.me deep link. Returns null when no number is configured, so
 * callers can hide the action instead of linking somewhere that does not
 * answer.
 */
export function whatsappHref(message?: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const text = encodeURIComponent(
    message ?? "Hello — I'd like to enquire about staying at The Planters Lodge.",
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const telHref = () => (PHONE_E164 ? `tel:${PHONE_E164}` : null);
export const mailHref = () => (EMAIL ? `mailto:${EMAIL}` : null);

/**
 * Anything still missing. Printed once in the dev server console so it does
 * not quietly go to production.
 */
export function missingOwnerInput(): string[] {
  const missing: string[] = [];
  if (!WHATSAPP_NUMBER) missing.push("WHATSAPP_NUMBER");
  if (!PHONE_DISPLAY) missing.push("PHONE_DISPLAY");
  if (!PHONE_E164) missing.push("PHONE_E164");
  if (!EMAIL) missing.push("EMAIL");
  if (!SITE_URL_IS_REAL) missing.push("SITE_URL");
  if (!STREET_ADDRESS) missing.push("STREET_ADDRESS");
  if (LATITUDE === null || LONGITUDE === null) missing.push("LATITUDE / LONGITUDE");
  if (SOCIAL.length === 0) missing.push("SOCIAL");
  if (ENQUIRY_CHANNEL === "log") missing.push("ENQUIRY_CHANNEL (nobody is notified)");
  return missing;
}
