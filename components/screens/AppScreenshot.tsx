"use client";

import Image from "next/image";
import type { ScreenKey } from "@/lib/screens";
import { site } from "@/lib/site";
import { useScreen } from "./ScreensProvider";

type Props = {
  screen: ScreenKey;
  /** Rendered width hint for responsive images, e.g. "(min-width: 1024px) 320px, 60vw". */
  sizes?: string;
  preload?: boolean;
};

/**
 * The inside of a phone screen: the real screenshot when
 * /public/app-screens/<screen>.<ext> exists, otherwise an intentional placeholder.
 * Sizes are in cqw of the surrounding PhoneMockup so it scales with the phone.
 */
export function AppScreenshot({ screen, sizes = "320px", preload = false }: Props) {
  const s = useScreen(screen);

  if (s.src) {
    return (
      <Image
        src={s.src}
        alt={`דירתי: ${s.label} (${s.audience})`}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover object-top"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`מקום לצילום מסך: ${s.label}, ${s.audience}`}
      className="absolute inset-0 flex flex-col items-center bg-[linear-gradient(180deg,#f5f8fc_0%,#e8eff7_100%)]"
    >
      {/* Dashed inset frame: reads as "screen goes here", on purpose. */}
      <div className="absolute inset-[3.5cqw] rounded-[10cqw] border border-dashed border-ink/12" />
      <div className="relative mt-[46cqw] flex flex-col items-center text-center">
        <span
          className="arch sky mb-[6cqw] block aspect-[4/5] w-[20cqw] [--arch-base:2cqw] [--arch-v:40%]"
          aria-hidden="true"
        />
        <span className="text-[4.6cqw] font-medium text-ink-3">{s.audience}</span>
        <span className="mt-[1.2cqw] text-[7.6cqw] font-semibold leading-tight tracking-[-0.01em] text-ink [font-stretch:92%]">
          {s.label}
        </span>
      </div>
      {site.showScreenshotHints && (
        <span dir="ltr" className="absolute bottom-[9cqw] font-mono text-[3.6cqw] tracking-tight text-ink-3/80">
          app-screens/{s.key}.png
        </span>
      )}
    </div>
  );
}
