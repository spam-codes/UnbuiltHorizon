// Single abstraction for "how a contact form submission gets sent."
//
// IMPORTANT: Web3Forms' free tier only accepts submissions made directly
// from the browser — server-side calls require a paid plan + IP
// whitelisting (see https://docs.web3forms.com/getting-started/api-reference).
// So this runs client-side, not through a Next.js API route.
//
// The access key is meant to be public — Web3Forms' own docs put it in a
// plain hidden form field. It only allows submissions to route to the one
// email address it was created for, so exposing it client-side is safe.
//
// To switch providers later (Resend, Formspree, a real backend), this is
// the only file that needs to change — the Contact component just calls
// submitContactForm() and doesn't know or care how it works underneath.

import { siteConfig } from "@/config/site";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type ContactResult = { success: true } | { success: false; error: string };

export async function submitContactForm(
  payload: ContactPayload
): Promise<ContactResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error(
      "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set. See lib/contactForm.ts / .env.example for setup."
    );
    return {
      success: false,
      error: "Contact form isn't configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New message from ${payload.name} — ${siteConfig.name}`,
        from_name: siteConfig.name,
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: data.message ?? "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Couldn't reach the form service. Please try again.",
    };
  }
}
