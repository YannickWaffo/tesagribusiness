import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Hostinger's CDN ignores the Vary header Next.js uses to separate
        // RSC payloads from HTML, so a cached client-navigation response
        // gets served as a full page. Forbid caching pages entirely;
        // /_next/static assets keep their own immutable cache headers and
        // /api/images responses set their own long-lived Cache-Control.
        source: "/((?!api/images/).*)",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "CDN-Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
