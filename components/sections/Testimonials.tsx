import { testimonials } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          headline={testimonials.headline}
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col justify-between border border-line p-8">
                <blockquote className="font-display text-[1.05rem] leading-snug text-bone">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 text-sm text-mute">
                  <span className="text-bone">{t.name}</span> — {t.role}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
