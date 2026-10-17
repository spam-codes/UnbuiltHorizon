import type { Metadata } from "next";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

// Fonts are loaded via <link> (fetched by the browser at runtime) rather
// than next/font/google (fetched at build time). This keeps the build
// independent of network access to fonts.googleapis.com and is equally
// fast in production thanks to preconnect + display=swap.
export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body className="bg-ink text-bone font-body antialiased">
        {children}
      </body>
    </html>
  );
}
