// All homepage copy lives here, separate from the components that render it.
// Editing wording — the hero line, a feature description, an FAQ answer —
// never requires touching component/layout code.

export const hero = {
  eyebrow: "For AI agent builders & founders",
  headline: "The map ends here. That's the point.",
  subhead:
    "Unbuilt Horizon is a working community for people shipping AI agents — not talking about them. Trade real playbooks, get unstuck faster, and build alongside people doing the same thing right now.",
  primaryCta: { label: "Join the community", href: "#contact" },
  secondaryCta: { label: "See what we do", href: "#features" },
  stats: [
    { value: "500+", label: "builders & founders" },
    { value: "40+", label: "agent stacks shared" },
    { value: "12", label: "countries" },
  ],
};

export const about = {
  eyebrow: "Why we exist",
  headline: "Most AI agent advice is written by people who haven't shipped one.",
  body: [
    "Building a real agent — one that plans, calls tools, fails gracefully, and actually earns its place in someone's workflow — looks nothing like a demo video. The gap between a working prototype and something people trust in production is where most builders get stuck, alone.",
    "Unbuilt Horizon exists to close that gap. We're a community of founders and engineers who share the parts of the process nobody posts: the eval that finally worked, the orchestration pattern that didn't, the pricing model that made the agent sustainable.",
  ],
  pillars: [
    {
      title: "Build in the open",
      description:
        "Share architecture, prompts, and eval results with people who'll actually push back on them.",
    },
    {
      title: "Skip the dead ends",
      description:
        "Learn which agent patterns hold up past a demo and which quietly fall apart at scale.",
    },
    {
      title: "Find your people",
      description:
        "Meet founders and engineers building at the same edge — for co-founders, hires, or just a sanity check.",
    },
  ],
};

export const features = {
  eyebrow: "What we do",
  headline: "A community built around the actual work",
  items: [
    {
      title: "Build sessions",
      description:
        "Weekly working calls where members bring a real agent problem — a broken tool call, a flaky eval — and solve it live with others.",
    },
    {
      title: "Founder office hours",
      description:
        "Regular sessions with founders who've taken an agent product from prototype to paying customers, open to hard questions.",
    },
    {
      title: "Private playbook library",
      description:
        "A growing, members-only archive of architectures, prompts, and eval frameworks contributed by the community — not scraped from blog posts.",
    },
    {
      title: "Hiring & co-founder board",
      description:
        "A trusted board for finding early hires and co-founders who've actually built agent systems before.",
    },
    {
      title: "Demo nights",
      description:
        "Monthly showcases where members demo what they shipped and get direct, technical feedback from peers.",
    },
    {
      title: "Direct line to the frontier",
      description:
        "Early access to notes and conversations with people building the underlying models and agent frameworks.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Voices",
  headline: "What members say",
  items: [
    {
      quote:
        "I spent three months stuck on agent memory before I found this group. Someone had already solved it and just... told me how.",
      name: "Priya N.",
      role: "Founder, dev-tools agent startup",
    },
    {
      quote:
        "The build sessions are the only place I've found where people actually show their broken code, not just their launch tweet.",
      name: "Marcus T.",
      role: "Founding engineer",
    },
    {
      quote:
        "Found my co-founder through the hiring board. We shipped our first agent product together four months later.",
      name: "Devika R.",
      role: "Co-founder, ops automation agent",
    },
  ],
};

export const faq = {
  eyebrow: "Questions",
  headline: "Before you join",
  items: [
    {
      question: "Who is Unbuilt Horizon actually for?",
      answer:
        "Founders and engineers who are actively building AI agents — whether that's a side project, an early-stage startup, or an internal tool at a company. It's built for people doing the work, not people evaluating whether to start.",
    },
    {
      question: "Do I need to already have a working product?",
      answer:
        "No. Plenty of members join while still figuring out their first working prototype. What matters is that you're actually building, not just researching from the sidelines.",
    },
    {
      question: "Is this free?",
      answer:
        "We're opening the community in stages. Fill out the contact form and we'll tell you exactly what the current cohort looks like and how to get in.",
    },
    {
      question: "Is this only for technical people?",
      answer:
        "Most members are hands-on with code, but non-technical founders building agent products with a technical co-founder or team are welcome too.",
    },
  ],
};

export const contact = {
  eyebrow: "Get in",
  headline: "Tell us what you're building.",
  subhead:
    "Whether you're looking to join, partner, or speak at a build session — this goes straight to our inbox and we read every message.",
};
