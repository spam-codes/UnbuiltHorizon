"use client";

import { motion } from "framer-motion";
import { hero } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HorizonGraphic } from "@/components/sections/HorizonGraphic";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pb-32">
      <div
        className="absolute inset-0 bg-blueprint bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]
        aria-hidden "
      />

      <Container className="relative">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-body text-sm font-medium text-signal"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-bone sm:text-5xl lg:text-[3.4rem]"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-lg font-body text-base leading-relaxed text-mute md:text-lg"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <ButtonLink href="https://discord.com/invite/HjCmvybvwE" variant="primary">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-bone">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-mute">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <div className="flex justify-center md:justify-end">
            <HorizonGraphic />
          </div>
        </div>
      </Container>
    </section>
  );
}
