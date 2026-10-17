import { features } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-line bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={features.eyebrow} headline={features.headline} />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="h-full bg-surface p-8 transition-colors hover:bg-surface2">
                <h3 className="font-display text-lg font-semibold text-bone">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
