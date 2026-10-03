import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/content/owner";

/**
 * Until a real domain is configured, the site asks not to be indexed —
 * a pre-launch site ranking on localhost metadata helps nobody.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
