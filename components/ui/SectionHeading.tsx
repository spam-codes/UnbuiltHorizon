import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  headline,
  align = "left",
}: {
  eyebrow: string;
  headline: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center" : "text-left"}>
        <p className="font-body text-sm font-medium text-signal">{eyebrow}</p>
        <h2
          className={`mt-3 font-display text-3xl font-semibold leading-[1.15] text-bone md:text-4xl ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {headline}
        </h2>
      </div>
    </Reveal>
  );
}
