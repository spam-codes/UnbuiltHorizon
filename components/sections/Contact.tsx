"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/config/content";
import { siteConfig } from "@/config/site";
import { submitContactForm } from "@/lib/contactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const inputClasses =
  "w-full border border-line bg-transparent px-4 py-3 font-body text-sm text-bone placeholder:text-mute/70 transition-colors focus:border-signal focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const result = await submitContactForm(payload);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <div>
              <p className="font-body text-sm font-medium text-signal">
                {contact.eyebrow}
              </p>
              <h2 className="mt-3 max-w-md font-display text-3xl font-semibold leading-[1.15] text-bone md:text-4xl">
                {contact.headline}
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mute">
                {contact.subhead}
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-8 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "success" ? (
              <div className="border border-signal/40 bg-signal-soft/40 p-8">
                <p className="font-display text-lg font-semibold text-bone">
                  Message sent.
                </p>
                <p className="mt-2 text-sm text-mute">
                  We read every message — expect a reply soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-mute">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wide text-mute">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wide text-mute">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder="What are you building?"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-signal" role="alert">
                    {errorMessage}
                  </p>
                )}

                <Button type="submit" disabled={status === "loading"} className="mt-2 self-start">
                  {status === "loading" ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
