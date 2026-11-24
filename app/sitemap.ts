import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

// Rendered once at build time for the static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about-us", "/contact", ...services.map((s) => `/services/${s.slug}`)];
  return routes.map((path) => ({
    // Trailing slash matches the exported URLs (trailingSlash: true).
    url: `${site.url}${path}/`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
