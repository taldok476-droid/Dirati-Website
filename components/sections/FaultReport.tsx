"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { MaskedHeading, Reveal } from "@/components/ui/motion";

/**
 * The scattered way it usually goes: messages, calls, reminders.
 * Positions are % offsets from the phone's center (x: + is right).
 */
const scattered = [
  { text: "הדוד לא מחמם מאתמול", x: 34, y: -30, r: -4 },
  { text: "שלחתי לך תמונה של הרטיבות, ראית?", x: -38, y: -20, r: 3 },
  { text: "שיחה שלא נענתה", x: 40, y: 8, r: 2, call: true },
  { text: "מתי מישהו יכול לבוא?", x: -34, y: 14, r: -3 },
  { text: "הברז במטבח מטפטף שוב", x: 30, y: 34, r: 3 },
  { text: "תזכיר לי מה סיכמנו על התיקון?", x: -30, y: 40, r: -2 },
] as const;

/**
 * Fault reporting: the one dark scene. Pinned briefly while the scattered
 * messages are pulled into a single report on the phone.
 */
export function FaultReport() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.35 });

  const phoneScale = useTransform(p, [0, 0.7], [0.94, 1]);
  const resolved = useTransform(p, [0.62, 0.78], [0, 1]);
  const resolvedY = useTransform(p, [0.62, 0.78], [16, 0]);

  return (
    <section aria-labelledby="fault-title" className="px-2 pt-2 sm:px-4">
      <div className="overflow-clip rounded-[var(--radius-panel)] bg-night text-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-20 sm:px-8 sm:pt-28 lg:pt-32">
          <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
            <MaskedHeading
              id="fault-title"
              lines={["יש תקלה?", "פשוט מדווחים."]}
              className="display text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)]"
            />
            <Reveal as="p" className="lede max-w-[30rem] !text-white/70 lg:justify-self-end">
              במקום הודעות שנבלעות בין וואטסאפ, שיחות ותזכורות, השוכר מדווח על התקלה ישירות דרך הנכס. הדיווח נשמר במקום אחד, ובעל הדירה יודע איפה למצוא אותו.
            </Reveal>
          </div>
        </div>

        <div ref={ref} data-pin="fault" className="relative h-[190vh]">
          <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
            <div className="relative">
              {scattered.map((b, i) => (
                <Bubble key={b.text} {...b} index={i} progress={p} />
              ))}
              <m.div style={{ scale: phoneScale }} className="fx relative z-10">
                <PhoneMockup
                  screen="report-issue"
                  className="w-[min(60vw,calc((100svh-160px)*0.43),300px)]"
                  sizes="300px"
                />
              </m.div>
              <m.p
                style={{ opacity: resolved, y: resolvedY }}
                className="fx-fade absolute -bottom-14 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-[0.9375rem] font-medium text-ink"
              >
                <span className="me-2 inline-block size-1.5 translate-y-[-2px] rounded-full bg-glow" aria-hidden="true" />
                דיווח אחד, במקום הנכון.
              </m.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({
  text,
  x,
  y,
  r,
  call,
  index,
  progress,
}: {
  text: string;
  x: number;
  y: number;
  r: number;
  call?: boolean;
  index: number;
  progress: MotionValue<number>;
}) {
  // Each message is pulled into the phone, slightly staggered.
  // --k goes 0 -> 1: the bubble's offset from the phone's center shrinks to zero.
  const start = 0.18 + index * 0.05;
  const end = start + 0.3;
  const k = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [1, 0.5]);
  const opacity = useTransform(progress, [end - 0.1, end], [1, 0]);
  const rotate = useTransform(progress, [start, end], [r, 0]);
  const isStart = x > 0; // right side in RTL: incoming bubble tail on the start corner

  const dx = `${x / 40} * clamp(92px, 25vw, 380px)`;
  const dy = `${y / 40} * clamp(210px, 32svh, 320px)`;

  return (
    <m.div
      aria-hidden="true"
      style={{
        ["--k" as string]: k,
        scale,
        opacity,
        rotate,
        translate: `calc(-50% + (1 - var(--k)) * ${dx}) calc(-50% + (1 - var(--k)) * ${dy})`,
      }}
      className="absolute top-1/2 left-1/2 z-20 w-max"
    >
      <div
        className={`flex max-w-[min(58vw,300px)] items-center gap-2 rounded-[20px] bg-night-2 px-4 py-3 text-[clamp(0.8125rem,0.7rem+0.4vw,1rem)] leading-snug text-white/85 shadow-[0_0_0_1px_rgb(255_255_255/0.06)] sm:whitespace-nowrap ${
          isStart ? "rounded-ss-md" : "rounded-se-md"
        }`}
      >
        {call && (
          <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-glow" aria-hidden="true">
            <path
              d="M4.5 2.5h-1a1 1 0 0 0-1 1c0 5.523 4.477 10 10 10a1 1 0 0 0 1-1v-1a1 1 0 0 0-.684-.949l-1.74-.58a1 1 0 0 0-1.09.3l-.53.64a7 7 0 0 1-3.664-3.665l.638-.53a1 1 0 0 0 .302-1.089l-.58-1.74A1 1 0 0 0 4.5 2.5Z"
              fill="currentColor"
            />
          </svg>
        )}
        {text}
      </div>
    </m.div>
  );
}
