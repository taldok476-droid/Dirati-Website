"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { PhoneMockup } from "@/components/screens/PhoneMockup";
import { MaskedHeading, Reveal } from "@/components/ui/motion";

const topics = [
  { title: "סקירת הנכסים", body: "כל נכס והפרטים החשובים שלו, במבט אחד." },
  { title: "השוכר", body: "מי גר בדירה, ומה הסטטוס שלו בנכס." },
  { title: "פרטי השכירות", body: "מה שסוכם בחוזה, זמין כשצריך." },
  { title: "תשלומים", body: "מעקב אחרי תשלומי השכירות." },
  { title: "תקלות", body: "כל מה שהשוכר דיווח, בלי לחפש בהודעות." },
  { title: "מידע חשוב", body: "הפרטים שתמיד צריך למצוא מהר." },
] as const;

export function Landlords() {
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  // The property screen slides out from behind the overview: from the list to one property.
  const backX = useTransform(p, [0, 1], [-20, -130]);
  const backY = useTransform(p, [0, 1], [-10, 56]);
  const backRotate = useTransform(p, [0, 1], [0, -3]);

  return (
    <section id="landlords" aria-labelledby="landlords-title" className="pt-28 sm:pt-36 lg:pt-44">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">לבעלי דירות</p>
            <MaskedHeading
              id="landlords-title"
              lines={["כל הנכסים.", "מקום אחד."]}
              className="display mt-3 text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)]"
            />
          </div>
          <Reveal as="p" className="lede max-w-[30rem] lg:justify-self-end">
            נכנסים לאפליקציה ורואים איפה כל דירה עומדת: מי השוכר, מה סוכם, מה שולם ומה דווח.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          {/* Screens (start side on desktop) */}
          <div
            ref={stage}
            className="relative h-[min(132vw,600px)] overflow-hidden rounded-[var(--radius-panel)] bg-cloud sm:h-[640px]"
          >
            <m.div
              style={{ x: backX, y: backY, rotate: backRotate }}
              className="fx absolute top-[13%] left-1/2 -translate-x-[40%]"
            >
              <PhoneMockup screen="property-details" depth="back" className="w-[min(52vw,258px)]" sizes="258px" />
            </m.div>
            <div className="absolute top-[8%] left-1/2 -translate-x-[34%] sm:-translate-x-[30%]">
              <PhoneMockup screen="landlord-home" className="w-[min(58vw,290px)]" sizes="290px" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cloud to-cloud/0" />
          </div>

          {/* What a landlord sees. Typographic, no icon grid. */}
          <Reveal className="rounded-[var(--radius-panel)] bg-white p-7 hairline sm:p-10 lg:p-12">
            <p className="text-[0.9375rem] font-medium text-ink-3">מה רואים בכל נכס</p>
            <dl className="mt-4">
              {topics.map((t) => (
                <div key={t.title} className="border-b border-line py-4 last:border-b-0 last:pb-0">
                  <dt className="text-[1.1875rem] font-semibold tracking-[-0.01em]">{t.title}</dt>
                  <dd className="mt-0.5 text-[1rem] text-ink-3">{t.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <OneOrMany />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* One property or many: windows of a building light up as you scroll */
/* ------------------------------------------------------------------ */

const WINDOWS = 5;

function OneOrMany() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.4"] });

  return (
    <div ref={ref} className="mx-auto mt-28 max-w-[1200px] px-5 text-center sm:mt-36 sm:px-8">
      <h3 className="display mx-auto max-w-[16ch] text-[clamp(2rem,1.2rem+3.4vw,4rem)]">
        מדירה אחת ועד כמה נכסים, הכול נשאר מסודר.
      </h3>
      <div className="mx-auto mt-12 flex max-w-[720px] items-end justify-center gap-[3vw] sm:gap-5" aria-hidden="true">
        {Array.from({ length: WINDOWS }, (_, i) => (
          <LitWindow key={i} index={i} progress={scrollYProgress} />
        ))}
      </div>
      <Reveal as="p" className="lede mx-auto mt-10 max-w-[36rem]">
        לא צריך להיות חברת ניהול כדי שיהיה סדר. דירתי מתאימה למי שמשכיר דירה אחת, וממשיכה לעבוד באותה פשטות כשמצטרפים עוד נכסים.
      </Reveal>
    </div>
  );
}

function LitWindow({ index, progress }: { index: number; progress: MotionValue<number> }) {
  // The first window is lit from the start: one apartment is already a home.
  const from = index === 0 ? -1 : 0.1 + (index - 1) * 0.2;
  const lit = useTransform(progress, [from, from + 0.14], [0, 1]);
  return (
    <div className="arch relative aspect-[3/5] w-[14vw] max-w-[112px] overflow-hidden bg-cloud-2 [--arch-base:12px] [--arch-v:30%]">
      <m.div
        style={{ opacity: lit }}
        className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,#f6b479_0%,rgb(246_180_121/0)_100%),linear-gradient(180deg,#fdf0e1_0%,#fbdcbc_100%)]"
      />
      {/* Window mullion */}
      <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white/70" />
      <span className="absolute inset-x-0 top-[46%] h-[3px] bg-white/70" />
    </div>
  );
}
