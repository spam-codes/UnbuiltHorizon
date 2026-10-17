import { about } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal>
              <p className="font-body text-sm font-medium text-signal">
                {about.eyebrow}
              </p>
              <h2 className="mt-3 max-w-md font-display text-3xl font-semibold leading-[1.15] text-bone md:text-4xl">
                {about.headline}
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-4">
              {about.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="max-w-md text-[15px] leading-relaxed text-mute">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <RevealGroup className="flex flex-col gap-8">
            {about.pillars.map((pillar, i) => (
              <RevealItem key={pillar.title}>
                <div className="flex gap-5 border-l-2 border-line pl-6 transition-colors hover:border-signal">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-bone">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
