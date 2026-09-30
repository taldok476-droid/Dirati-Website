"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { MaskedHeading, Reveal } from "@/components/ui/motion";
import { PillLink } from "@/components/ui/PillLink";
import { site } from "@/lib/site";

/**
 * Closing scene. The arched window from the hero returns at dusk, with a
 * light on inside: the day is done and the apartment is in order.
 */
export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const phoneY = useTransform(p, [0, 1], ["38%", "0%"]);
  // Daylight from the hero turns to evening, and the window lights up.
  const evening = useTransform(p, [0.25, 0.9], [0, 1]);

  return (
    <section id="join" aria-labelledby="join-title" className="pt-32 pb-8 text-center sm:pt-44">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <MaskedHeading
          id="join-title"
          lines={["הגיע הזמן שהדירה", "תהיה מסודרת."]}
          className="display mx-auto text-[clamp(2.5rem,1.3rem+5vw,6rem)]"
        />
        <Reveal as="p" className="lede mx-auto mt-6 max-w-[28rem]">
          מוסיפים את הנכס, מזמינים את השוכר, וממשיכים משם.
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex justify-center">
          {/* TODO: point at the store / sign-up link via site.downloadHref */}
          <PillLink href={site.downloadHref} size="lg">
            מתחילים עם דירתי
          </PillLink>
        </Reveal>

        <div
          ref={ref}
          className="arch sky relative mx-auto mt-16 aspect-[13/16] w-[min(100%,520px)] overflow-hidden [--arch-base:var(--radius-panel)] [--arch-v:40.625%] sm:mt-20"
        >
          <m.div aria-hidden="true" style={{ opacity: evening }} className="dusk absolute inset-0" />
          <m.div style={{ y: phoneY }} className="fx absolute top-[18%] left-1/2 -translate-x-1/2">
            <PhoneMockup screen="landlord-home" className="w-[min(58vw,280px)]" sizes="280px" />
          </m.div>
        </div>
      </div>
    </section>
  );
}
