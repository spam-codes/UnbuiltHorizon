import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Static top-level pages. As new standalone pages are added to
// config/routes.ts (e.g. /blog), add their path here too.
const staticPaths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
