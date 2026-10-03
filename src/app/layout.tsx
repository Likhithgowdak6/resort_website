import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/content/site";
import {
  EMAIL,
  LATITUDE,
  LONGITUDE,
  PHONE_E164,
  POSTAL_CODE,
  SITE_URL,
  INDEXABLE,
  SOCIAL,
  STREET_ADDRESS,
  missingOwnerInput,
} from "@/content/owner";
import "./globals.css";

/* Self-hosted by next/font — no render-blocking call to Google, no CLS. */
/* 400 for the large display sizes, 500 for the smaller ones — the optical
   weight scale in globals.css. 300 is no longer used anywhere. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

/* Only the weights the site actually sets. Body copy moved 300 -> 400, so
   300 is dead and no longer shipped — one fewer font file. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-manrope",
});

const description =
  "A private 100-acre cocoa and coffee plantation estate in Wayanad, Kerala. An intimate retreat built for privacy, stillness and slow days.";

const title = `${site.name} — Plantation Estate Retreat, Wayanad`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "luxury resort in Wayanad",
    "plantation resort Wayanad",
    "coffee plantation stay Wayanad",
    "cocoa plantation resort Kerala",
    "Wayanad estate retreat",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title,
    description,
    locale: "en_IN",
    // opengraph-image.jpg in this folder is picked up automatically.
  },
  twitter: { card: "summary_large_image", title, description },
  // Not indexable until a real domain is configured.
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/* Structured data. Only properties backed by information that actually
   exists — no ratings, prices, amenities or approximate coordinates. */
function buildJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: site.name,
    description,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wayanad",
      addressRegion: "Kerala",
      addressCountry: "IN",
      ...(STREET_ADDRESS ? { streetAddress: STREET_ADDRESS } : {}),
      ...(POSTAL_CODE ? { postalCode: POSTAL_CODE } : {}),
    },
  };
  if (PHONE_E164) data.telephone = PHONE_E164;
  if (EMAIL) data.email = EMAIL;
  if (LATITUDE !== null && LONGITUDE !== null) {
    data.geo = { "@type": "GeoCoordinates", latitude: LATITUDE, longitude: LONGITUDE };
  }
  if (SOCIAL.length > 0) data.sameAs = SOCIAL.map((s) => s.href);
  return data;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  // One reminder in the server console of what still needs real information.
  if (process.env.NODE_ENV !== "production") {
    const missing = missingOwnerInput();
    if (missing.length > 0) {
      console.warn(
        `\n[owner input missing] ${missing.join(", ")}\n` +
          `  → src/content/owner.ts (see README “Launch checklist”)\n`,
      );
    }
  }

  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#estate"
          className="action sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ivory focus:px-5"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
