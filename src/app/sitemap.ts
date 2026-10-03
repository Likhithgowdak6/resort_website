import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/owner";

/** One page today. Journal routes join this list as they are published. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
