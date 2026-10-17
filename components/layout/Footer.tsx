import { footerRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = Object.entries(siteConfig.social);

  return (
    <footer className="border-t border-line bg-ink">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold text-bone">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-wide text-mute">
                Site
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {footerRoutes.map((route) => (
                  <li key={route.href}>
                    <a
                      href={route.href}
                      className="text-sm text-bone transition-colors hover:text-signal"
                    >
                      {route.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-body text-xs font-medium uppercase tracking-wide text-mute">
                Elsewhere
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {socialLinks.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-bone transition-colors hover:text-signal"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. Built by the community, for the community.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="transition-colors hover:text-signal"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
