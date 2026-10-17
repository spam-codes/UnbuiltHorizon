// Single source of truth for site-wide identity & metadata.
// Change the name, tagline, or contact email here — every page,
// the SEO metadata, and the footer all read from this one place.

export const siteConfig = {
  name: "Unbuilt Horizon",
  shortName: "Unbuilt Horizon",
  tagline: "Where AI agent builders ship the unbuilt.",
  description:
    "Unbuilt Horizon is a community of founders and builders working at the edge of AI agents — sharing what works, what breaks, and what's next.",
  url: "https://unbuilthorizon.com", // update once the domain is live
  contactEmail: "unbuilthorizon@gmail.com",
  keywords: [
    "Unbuilt Horizon",
    "AI agents community",
    "AI builders",
    "AI founders",
    "agent developers",
    "autonomous agents",
    "AI startup community",
    "build AI agents",
  ],
  social: {
    twitter: "https://twitter.com/unbuilthorizon",
    discord: "https://discord.gg/unbuilthorizon",
    github: "https://github.com/unbuilthorizon",
    linkedin: "https://linkedin.com/company/unbuilthorizon",
  },
  ogImage: "/og-image.png",
};

export type SiteConfig = typeof siteConfig;
