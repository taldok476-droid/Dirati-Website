"use client";

import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from "motion/react";

/** Shared motion language: soft, physical, deliberate. */
export const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0 },
};

/** One entrance: fade and a short rise, once, when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "span";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Section headline revealed line by line from behind a mask.
 * Pass lines explicitly so Hebrew breaks where we want, not where the browser does.
 */
export function MaskedHeading({
  lines,
  className,
  as = "h2",
  id,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <m.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease, delay: 0.08 * i }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
