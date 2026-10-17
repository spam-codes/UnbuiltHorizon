// Single source of truth for site routes.
//
// The Navbar, Footer, and sitemap.ts all read from this file — so adding a
// new page later (e.g. "/blog" or "/events") means adding ONE entry here,
// not editing the Navbar and Footer separately.
//
// `showInNav` controls whether it appears in the header.
// `showInFooter` controls whether it appears in the footer link list.
// `isSection` means it's an in-page anchor on the homepage (id-based scroll)
// rather than a separate route.

export type RouteItem = {
  label: string;
  href: string;
  showInNav?: boolean;
  showInFooter?: boolean;
  isSection?: boolean;
  description?: string; // used for sitemap / future metadata
};

export const routes: RouteItem[] = [
  {
    label: "About",
    href: "/#about",
    showInNav: true,
    showInFooter: true,
    isSection: true,
  },
  {
    label: "What We Do",
    href: "/#features",
    showInNav: true,
    showInFooter: true,
    isSection: true,
  },
  {
    label: "Voices",
    href: "/#testimonials",
    showInNav: true,
    showInFooter: true,
    isSection: true,
  },
  {
    label: "FAQ",
    href: "/#faq",
    showInNav: true,
    showInFooter: true,
    isSection: true,
  },
  {
    label: "Contact",
    href: "/#contact",
    showInNav: true,
    showInFooter: true,
    isSection: true,
  },
  // Example of how a future standalone page gets added:
  // {
  //   label: "Blog",
  //   href: "/blog",
  //   showInNav: true,
  //   showInFooter: true,
  //   description: "Essays and field notes from the community.",
  // },
];

export const navRoutes = routes.filter((r) => r.showInNav);
export const footerRoutes = routes.filter((r) => r.showInFooter);
