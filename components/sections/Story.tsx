"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { AppScreenshot } from "@/components/screens/AppScreenshot";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { MaskedHeading, Reveal } from "@/components/ui/motion";

const steps = [
  {
    n: "1",
    title: "מוסיפים את הנכס",
    body: "מזינים פעם אחת את פרטי הדירה והשכירות, והנכס מוכן.",
  },
  {
    n: "2",
    title: "מזמינים את השוכר",
    body: "דירתי יוצרת לנכס קוד הזמנה ייחודי. השוכר מזין אותו באפליקציה ומצטרף לדירה.",
  },
  {
    n: "3",
    title: "מכאן, הכול מסודר",
    body: "תשלומים, פרטי הנכס ודיווחי תקלות נשמרים באותו מקום, ושני הצדדים יודעים איפה למצוא אותם.",
  },
] as const;

/** The three things that end up living together in step 3. */
const gathered = ["תשלומים", "פרטי השכירות", "תקלות"] as const;

export function Story() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <MaskedHeading
          id="how-title"
          lines={["מתחילים", "בשלושה צעדים."]}
          className="display text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)]"
        />
      </div>
      <PinnedStory />
      <StackedStory />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: the phone stays pinned while the story advances around it. */
/* ------------------------------------------------------------------ */

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.35 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2));

  // Screen transitions inside the landlord's phone: each new screen slides up.
  const s2 = useTransform(p, [0.3, 0.4], ["100%", "0%"]);
  const s3 = useTransform(p, [0.63, 0.73], ["100%", "0%"]);

  // The tenant's phone joins for step 2, then steps back.
  const tenantOpacity = useTransform(p, [0.36, 0.44, 0.62, 0.7], [0, 1, 1, 0]);
  const tenantX = useTransform(p, [0.36, 0.46, 0.62, 0.7], [-60, 0, 0, -40]);

  // The invitation code travels from the landlord's phone to the tenant's.
  const codeOpacity = useTransform(p, [0.4, 0.44, 0.58, 0.63], [0, 1, 1, 0]);
  const codeX = useTransform(p, [0.44, 0.56], [0, -230]);
  const codeY = useTransform(p, [0.44, 0.56], [0, 70]);

  const rail = useTransform(p, [0.02, 0.98], [0, 1]);

  return (
    <div ref={ref} data-pin="story" className="relative mt-10 hidden h-[300vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12 px-8">
          {/* Steps (start side) */}
          <ol className="relative ps-8">
            <span aria-hidden="true" className="absolute inset-y-2 start-0 w-px bg-line" />
            <m.span
              aria-hidden="true"
              style={{ scaleY: rail }}
              className="absolute inset-y-2 start-0 w-px origin-top bg-ink"
            />
            {steps.map((s, i) => (
              <li
                key={s.n}
                aria-current={active === i ? "step" : undefined}
                className={`relative py-6 transition-opacity duration-500 ease-(--ease-soft) ${
                  active === i ? "opacity-100" : "opacity-30"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-8 -start-8 size-[9px] translate-x-1/2 rounded-full transition-colors duration-500 ${
                    active >= i ? "bg-ink" : "bg-cloud-2"
                  }`}
                />
                <p className="text-[0.9375rem] font-medium text-ink-3">שלב {s.n}</p>
                <h3 className="mt-1 text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] [font-stretch:90%]">
                  {s.title}
                </h3>
                <p className="lede mt-2 max-w-[26rem] !text-[1.0625rem]">{s.body}</p>
              </li>
            ))}
          </ol>

          {/* Stage (end side) */}
          <div className="relative h-[min(78svh,760px)] overflow-hidden rounded-[var(--radius-panel)] bg-cloud">
            <div
              aria-hidden="true"
              className="arch sky absolute bottom-0 left-1/2 aspect-[13/16] h-[88%] -translate-x-1/2 [--arch-base:0px] [--arch-v:40.625%] opacity-70"
            />
            {/* Tenant phone (sits toward the end/left side) */}
            <m.div
              style={{ opacity: tenantOpacity, x: tenantX }}
              className="absolute top-[24%] right-[calc(50%+40px)]"
            >
              <PhoneMockup screen="tenant-join" depth="back" className="w-[min(210px,calc((100svh-260px)*0.33))]" sizes="210px" />
            </m.div>

            {/* Landlord phone with sliding screens */}
            <div className="absolute top-[9%] left-1/2 -translate-x-1/2">
              <PhoneMockup className="w-[min(290px,calc((100svh-230px)*0.44))]">
                <AppScreenshot screen="onboarding" sizes="290px" />
                <m.div style={{ y: s2 }} className="absolute inset-0 shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.25)]">
                  <AppScreenshot screen="invitation" sizes="290px" />
                </m.div>
                <m.div style={{ y: s3 }} className="absolute inset-0 shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.25)]">
                  <AppScreenshot screen="landlord-home" sizes="290px" />
                </m.div>
              </PhoneMockup>
            </div>

            {/* Invitation code, travelling between the phones */}
            <m.div
              aria-hidden="true"
              style={{ opacity: codeOpacity, x: codeX, y: codeY }}
              className="absolute top-[40%] left-[calc(50%+20px)]"
            >
              <InviteCode />
            </m.div>

            {/* Step 3: loose pieces settle into order next to the phone */}
            {gathered.map((label, i) => (
              <GatheredChip key={label} label={label} index={i} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const scatter = [
  { x: -90, y: -150, r: -9 },
  { x: -20, y: 170, r: 7 },
  { x: -110, y: 40, r: -4 },
];

function GatheredChip({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const start = 0.7 + index * 0.03;
  const end = start + 0.12;
  const o = scatter[index];
  const opacity = useTransform(progress, [start - 0.04, start + 0.02], [0, 1]);
  const x = useTransform(progress, [start, end], [o.x, 0]);
  const y = useTransform(progress, [start, end], [o.y, 0]);
  const rotate = useTransform(progress, [start, end], [o.r, 0]);
  return (
    <m.div
      aria-hidden="true"
      style={{ opacity, x, y, rotate, top: `calc(34% + ${index * 58}px)` }}
      className="absolute right-[calc(50%+min(145px,calc((100svh-230px)*0.22))-36px)] z-10"
    >
      <span className="inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 whitespace-nowrap text-[1rem] font-medium text-ink shadow-[0_0_0_1px_rgb(12_14_19/0.05),0_12px_28px_-14px_rgb(18_32_58/0.3)]">
        <span className="size-1.5 rounded-full bg-glow" />
        {label}
      </span>
    </m.div>
  );
}

/** Illustrative invitation code. Not a claim about the real code format. */
function InviteCode({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full bg-ink py-2 ps-5 pe-2 text-white shadow-[0_16px_36px_-16px_rgb(12_14_19/0.6)] ${className}`}
    >
      <span className="text-[0.9375rem] font-medium">קוד הזמנה</span>
      <span dir="ltr" className="flex gap-1">
        {["D", "7", "K", "4", "M", "2"].map((c, i) => (
          <span key={i} className="grid h-8 w-6.5 place-items-center rounded-[9px] bg-white/12 font-mono text-[0.9375rem]">
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile & tablet: no pinning. Each step is its own short scene.      */
/* ------------------------------------------------------------------ */

function StackedStory() {
  return (
    <ol className="mx-auto mt-12 max-w-[640px] space-y-20 px-5 sm:px-8 lg:hidden">
      {steps.map((s, i) => (
        <li key={s.n}>
          <Reveal>
            <p className="text-[0.9375rem] font-medium text-ink-3">שלב {s.n}</p>
            <h3 className="mt-1 text-[clamp(1.875rem,1.4rem+2vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em] [font-stretch:90%]">
              {s.title}
            </h3>
            <p className="lede mt-2">{s.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="relative mt-8 overflow-hidden rounded-[var(--radius-card)] bg-cloud pt-10">
            <div
              aria-hidden="true"
              className="arch sky absolute bottom-0 left-1/2 aspect-[13/16] h-[86%] -translate-x-1/2 opacity-70 [--arch-base:0px] [--arch-v:40.625%]"
            />
            <div className="relative -mb-[18%] flex items-start justify-center">
              {i === 0 && <PhoneMockup screen="onboarding" className="w-[min(62vw,270px)]" sizes="270px" />}
              {i === 1 && (
                <>
                  <PhoneMockup screen="invitation" className="relative z-10 w-[min(50vw,230px)]" sizes="230px" />
                  <PhoneMockup screen="tenant-join" depth="back" className="-ms-[10%] mt-[14%] w-[min(42vw,196px)]" sizes="196px" />
                </>
              )}
              {i === 2 && <PhoneMockup screen="landlord-home" className="w-[min(62vw,270px)]" sizes="270px" />}
            </div>
            {i === 1 && (
              <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center">
                <InviteCode className="scale-[0.88]" />
              </div>
            )}
          </Reveal>
          {i === 2 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="מה נשמר במקום אחד">
              {gathered.map((g) => (
                <li
                  key={g}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-cloud px-4 text-[0.9375rem] font-medium"
                >
                  <span className="size-1.5 rounded-full bg-glow" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
