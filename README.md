# Unbuilt Horizon

Landing site for the Unbuilt Horizon AI-agent-builders community. Built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms key (see below)
npm run dev
```

Visit http://localhost:3000

## Set up the contact form (1 minute, free)

The contact form sends submissions straight to **unbuilthorizon@gmail.com**
via [Web3Forms](https://web3forms.com), a free email-forwarding API — no
backend or database needed.

1. Go to https://web3forms.com
2. Enter `unbuilthorizon@gmail.com` and click "Create Access Key" — no signup required
3. Copy the access key it gives you
4. In `.env.local` (create it from `.env.example` if you haven't), set:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
   ```
5. Restart the dev server (or redeploy on Vercel — see below)

Every submission on the site will now land in that inbox. If the key isn't
set, the form fails with a clear on-screen error instead of silently losing
messages.

**Why `NEXT_PUBLIC_`:** Web3Forms' free tier only accepts submissions sent
directly from the browser — server-side requests (like a Next.js API route)
require a paid plan and IP whitelisting. So `lib/contactForm.ts` calls
Web3Forms straight from the client, and the key needs the `NEXT_PUBLIC_`
prefix so Next.js exposes it to browser code. This is expected and safe:
Web3Forms' own docs put this key in a plain, visible form field — it can
only route mail to the one address it was created for, nothing else.

## Deploying to Vercel

1. Push this project to a GitHub repo
2. Go to https://vercel.com/new and import the repo
3. Before deploying, add an environment variable:
   - Key: `WEB3FORMS_ACCESS_KEY`
   - Value: (the key from the step above)
4. Deploy. Vercel handles the build automatically.
5. Once you buy a domain (e.g. unbuilthorizon.com), attach it in
   Vercel's Project → Settings → Domains, then update `url` in
   `config/site.ts` to match — this keeps canonical URLs, sitemap.xml, and
   Open Graph tags correct for SEO.

## Project structure — where to change things

This project is deliberately split so that changing one thing never
disturbs another:

```
config/
  site.ts       ← Site name, tagline, contact email, social links.
                  Change the name here and it updates everywhere
                  (nav logo, footer, page titles, JSON-LD).
  routes.ts     ← EVERY nav/footer link lives here. Adding a future page
                  (e.g. a Blog) means adding one entry to this file —
                  the Navbar and Footer read from it automatically.
  content.ts    ← All homepage copy (hero text, about paragraphs, feature
                  cards, testimonials, FAQ). Edit wording here without
                  touching any component code.

lib/
  seo.ts          ← Shared metadata builder + JSON-LD. Any future page calls
                    buildMetadata({ title, description }) for consistent SEO.
  contactForm.ts  ← The ONLY file that knows how a form submission actually
                    gets sent. Swap Web3Forms for another provider later by
                    editing just this file — the Contact component only
                    calls submitContactForm() and doesn't know how it works.

app/
  layout.tsx    ← Root HTML shell, fonts, global metadata
  page.tsx      ← Homepage — just assembles the sections below in order
  sitemap.ts    ← Auto-generated sitemap.xml (reads from config/site.ts)
  robots.ts     ← Auto-generated robots.txt

components/
  layout/       ← Navbar, Footer (both driven by config/routes.ts)
  sections/     ← Hero, About, Features, Testimonials, FAQ, Contact —
                  one file per homepage section
  ui/           ← Reusable primitives: Button, Container, SectionHeading,
                  and Reveal (the scroll-animation wrapper every section
                  uses, so scroll-in behavior is tuned in one place)
```

## Adding a new page later

1. Add an entry to `config/routes.ts` (this updates the Navbar/Footer instantly)
2. Create `app/your-page/page.tsx`
3. Call `buildMetadata({ title: "...", description: "..." })` from `lib/seo.ts`
   for that page's SEO tags
4. Add the path to `app/sitemap.ts`

## On ranking #1 for "Unbuilt Horizon" on Google

This site ships with the technical SEO fundamentals that help brand-name
search: semantic HTML, fast load times, mobile responsiveness, meta tags,
Open Graph tags, JSON-LD organization structured data, a sitemap, and a
robots.txt. These give the site the best possible foundation.

Actual ranking also depends on factors outside the code — domain age,
backlinks, how many other things share the name, and Google's indexing
timeline. A few things that will help once the site is live:

- Submit the site to [Google Search Console](https://search.google.com/search-console)
  and request indexing
- Link to the site from your social profiles, Twitter/X bio, and any
  existing community channels (Discord, Twitter, GitHub) — backlinks matter
  more than on-page SEO for a branded search term
- Keep the `url` in `config/site.ts` accurate once you have a real domain
- Publish new content over time (a future `/blog` route, for instance) —
  freshness and depth both help brand-name queries

## Customizing visuals

- **Colors**: `tailwind.config.ts` → the `colors` block (`ink`, `signal`,
  `bone`, etc.) — every component references these tokens, never raw hex codes
- **Logo/images**: drop files into `/public` and reference them from
  `components/layout/Navbar.tsx` (currently text-based) or any section
- **OG image**: add `/public/og-image.png` (1200×630px) — referenced
  automatically by `lib/seo.ts`
- **Favicon**: add `/app/favicon.ico`
