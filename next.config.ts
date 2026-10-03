import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 requires every quality used in the app to be declared.
       88 — the hero. 82 — every other photograph. */
    qualities: [82, 88],
    /* AVIF first, WebP for anything that cannot take it. */
    formats: ["image/avif", "image/webp"],
    /* The photographs are at most 1086px wide, so there is nothing to gain
       from generating 2048/3840 variants — they would only upscale. */
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440],
    imageSizes: [160, 240, 320, 420, 540, 720],
  },
};

export default nextConfig;
