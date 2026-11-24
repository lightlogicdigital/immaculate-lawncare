import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The deploy workflow sets PAGES_BASE_PATH to
 * "/<repo-name>" while the site lives at <user>.github.io/<repo-name>; leave it
 * empty once a custom domain points at the site.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /about-us/index.html (not /about-us.html) so any static host serves clean URLs.
  trailingSlash: true,
  basePath,
  // GitHub Pages has no image optimizer; photos are served as-is.
  images: { unoptimized: true },
  // cacheComponents and partialPrefetching stay off: they need a Next server, and
  // static export requires `dynamic = "force-static"` on sitemap/robots, which they forbid.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
