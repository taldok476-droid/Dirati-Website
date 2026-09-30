"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { MaskedHeading, Reveal } from "@/components/ui/motion";

/** What the tenant gets once invited. Written as sentences, read one at a time. */
const lines = [
  { lead: "פרטי הדירה,", rest: "תמיד בהישג יד." },
  { lead: "פרטי השכירות והתשלומים,", rest: "בלי לשאול שוב." },
  { lead: "תקלה?", rest: "מדווחים ישירות דרך הנכס." },
  { lead: "וכל מה שקשור לדירה,", rest: "במקום אחד." },
] as const;

/**
 * Tenant: same system, warmer light. The page shifts from daylight blue to
 * evening sand as this section arrives: the landlord's side is the building,
 * the tenant's side is the home inside it.
 */
export function Tenants() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const bg = useTransform(enter, [0, 1], ["#ffffff", "#faf5ef"]);

  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress: read } = useScroll({ target: list, offset: ["start 0.8", "end 0.45"] });
  const phone = useRef<HTMLDivElement>(null);
  const { scrollYProgress: phoneP } = useScroll({ target: phone, offset: ["start end", "end start"] });
  const phoneY = useSpring(useTransform(phoneP, [0, 1], [60, -60]), { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <m.section
      ref={ref}
      id="tenants"
      aria-labelledby="tenants-title"
      style={{ backgroundColor: bg }}
      className="mt-28 pt-24 pb-28 sm:mt-36 sm:pt-32 sm:pb-36"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow !text-ember">לשוכרים</p>
          <MaskedHeading
            id="tenants-title"
            lines={["גם לשוכר יש בית", "בתוך דירתי."]}
            className="display mt-3 text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)]"
          />
          <Reveal as="p" className="lede mt-6 max-w-[30rem]">
            מרגע שהשוכר מצטרף עם קוד ההזמנה, יש לו מקום אחד לכל מה שקשור לדירה שלו.
          </Reveal>

          <ol ref={list} className="mt-12 space-y-5 sm:mt-14">
            {lines.map((l, i) => (
              <ReadLine key={l.lead} index={i} total={lines.length} progress={read} lead={l.lead} rest={l.rest} />
            ))}
          </ol>
        </div>

        <div ref={phone} className="relative mx-auto w-full max-w-[520px]">
          <div className="relative mx-auto aspect-[13/16] w-full overflow-hidden rounded-[var(--radius-panel)] bg-sand-2">
            {/* A doorway of warm light behind the tenant's phone */}
            <div
              aria-hidden="true"
              className="arch absolute bottom-0 left-1/2 aspect-[5/7] h-[80%] -translate-x-1/2 bg-[linear-gradient(180deg,#fdf1e4_0%,#fbd9b5_100%)] [--arch-base:0px] [--arch-v:35.714%]"
            />
            <m.div style={{ y: phoneY }} className="fx absolute top-[16%] left-1/2 -translate-x-1/2">
              <PhoneMockup screen="tenant-home" className="w-[min(58vw,280px)]" sizes="280px" />
            </m.div>
          </div>
        </div>
      </div>
    </m.section>
  );
}

function ReadLine({
  index,
  total,
  progress,
  lead,
  rest,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  lead: string;
  rest: string;
}) {
  const at = index / total;
  const opacity = useTransform(progress, [at - 0.05, at + 0.12], [0.22, 1]);
  return (
    <m.li
      style={{ opacity }}
      className="fx-fade text-[clamp(1.375rem,1.05rem+1.3vw,1.875rem)] leading-snug font-semibold tracking-[-0.015em] [font-stretch:92%]"
    >
      {lead} <span className="text-ink-3">{rest}</span>
    </m.li>
  );
}
