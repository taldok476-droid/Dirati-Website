"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { PillLink } from "@/components/ui/PillLink";
import { site } from "@/lib/site";

/**
 * Hero: the app standing in an arched window of sky.
 * Scrolling away opens the window slightly, lifts the phone and lets the two
 * supporting screens (tenant side, fault report) drift apart: one product,
 * two sides.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const archScale = useTransform(p, [0, 1], [1, 1.08]);
  const phoneY = useTransform(p, [0, 1], [0, -70]);
  const sideY = useTransform(p, [0, 1], [0, 50]);
  const startX = useTransform(p, [0, 1], [0, 60]); // start = right in RTL
  const endX = useTransform(p, [0, 1], [0, -60]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <h1
          id="hero-title"
          className="display mx-auto text-[clamp(3.25rem,1.6rem+7.4vw,8.25rem)] text-ink"
        >
          <span className="enter block [--d:60ms]">הדירה שלך.</span>
          <span className="enter block [--d:160ms]">מסודרת.</span>
        </h1>
        <p className="lede enter mx-auto mt-6 max-w-[34rem] [--d:320ms] sm:mt-7">
          אפליקציה אחת לבעל הדירה ולשוכר. פרטי השכירות, התשלומים והתקלות נשארים במקום אחד, ברורים לשני הצדדים.
        </p>
        <div className="enter mt-8 flex items-center justify-center gap-3 [--d:420ms] sm:mt-9">
          <PillLink href={site.joinHref} size="lg">
            הצטרפו לדירתי
          </PillLink>
          <PillLink href="#how" size="lg" variant="quiet">
            איך זה עובד
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M8 3v10m0 0 4-4m-4 4L4 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PillLink>
        </div>
      </div>

      {/* Stage */}
      <div
        className="enter relative mx-auto mt-12 h-[min(128vw,560px)] max-w-[1200px] overflow-hidden [--d:380ms] [--enter-y:60px] sm:mt-16 sm:h-[600px] lg:h-[660px]"
        aria-label="תצוגת האפליקציה"
        role="group"
      >
        {/* The arched window. Bottom corners are square: it continues past the fold. */}
        <m.div
          style={{ scale: archScale }}
          className="fx arch sky absolute bottom-0 left-1/2 aspect-[13/16] w-[min(88vw,540px)] -translate-x-1/2 origin-bottom [--arch-base:0px] [--arch-v:40.625%]"
        />

        {/* Supporting screens, behind */}
        <m.div
          style={{ x: startX, y: sideY }}
          className="fx absolute top-[38%] left-[calc(50%+min(12vw,110px))] sm:top-[32%]"
        >
          <PhoneMockup screen="tenant-home" depth="back" className="w-[min(40vw,232px)]" sizes="232px" />
        </m.div>
        <m.div
          style={{ x: endX, y: sideY }}
          className="fx absolute top-[38%] right-[calc(50%+min(12vw,110px))] sm:top-[32%]"
        >
          <PhoneMockup screen="report-issue" depth="back" className="w-[min(40vw,232px)]" sizes="232px" />
        </m.div>

        {/* Main phone */}
        <m.div style={{ y: phoneY }} className="fx absolute top-[9%] left-1/2 -translate-x-1/2 sm:top-[12%]">
          <PhoneMockup
            screen="landlord-home"
            className="w-[min(58vw,300px)]"
            sizes="(min-width: 640px) 300px, 58vw"
            preload
          />
        </m.div>

        {/* Soft floor so the phones settle into the page instead of being cut. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-white/0" />
      </div>
    </section>
  );
}
