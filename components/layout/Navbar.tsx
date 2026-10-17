"use client";

import { useEffect, useState } from "react";
import { navRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <div className="flex gap-2">
            <img src="icon.png" className="h-7 w-7 rounded-md"/>
            <a href="/" className="font-display text-lg font-semibold tracking-tight text-bone">
              {siteConfig.shortName.split(" ")[0]}
              <span className="text-signal"> {siteConfig.shortName.split(" ")[1]}</span>
            </a>
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {navRoutes.map((route) => (
              <li key={route.href}>
                <a
                  href={route.href}
                  className="font-body text-sm text-mute transition-colors hover:text-bone"
                >
                  {route.label}
                </a>
              </li>
            ))}
          </ul>

          <ButtonLink href="#contact" className="hidden md:inline-flex" variant="primary">
            Join us
          </ButtonLink>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-[1.5px] w-6 bg-bone transition-transform ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-bone transition-transform ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </Container>

      {open && (
        <div className="border-t border-line bg-ink md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {navRoutes.map((route) => (
                <li key={route.href}>
                  <a
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-body text-base text-bone"
                  >
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
