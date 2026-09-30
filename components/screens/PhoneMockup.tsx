import type { ScreenKey } from "@/lib/screens";
import { AppScreenshot } from "./AppScreenshot";

type Props = {
  screen?: ScreenKey;
  /** Custom screen content (e.g. several screens layered for a transition). Overrides `screen`. */
  children?: React.ReactNode;
  /** Width utilities for the phone, e.g. "w-[280px] lg:w-[320px]". Height follows. */
  className?: string;
  sizes?: string;
  preload?: boolean;
  /** Softer, flatter shadow for phones that sit behind another phone. */
  depth?: "front" | "back";
};

/**
 * A modern phone frame. Everything inside is sized in cqw, so the phone
 * scales cleanly from any width. Screen ratio matches iPhone captures
 * (1179 x 2556); other ratios are cropped from the top.
 */
export function PhoneMockup({ screen, children, className = "w-[300px]", sizes, preload, depth = "front" }: Props) {
  return (
    <div className={`@container shrink-0 ${className}`}>
      <div
        className={`relative rounded-[15.5cqw] bg-[#15171c] p-[2.7cqw] ${
          depth === "front"
            ? "shadow-[0_1px_0_1px_rgb(255_255_255/0.06)_inset,0_40px_80px_-30px_rgb(18_32_58/0.35),0_18px_36px_-18px_rgb(18_32_58/0.25)]"
            : "shadow-[0_1px_0_1px_rgb(255_255_255/0.06)_inset,0_24px_48px_-28px_rgb(18_32_58/0.28)]"
        }`}
      >
        {/* Titanium rim highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[15.5cqw] ring-1 ring-white/10 ring-inset" />
        <div className="relative aspect-[1179/2556] overflow-hidden rounded-[13cqw] bg-cloud">
          {children ?? (screen && <AppScreenshot screen={screen} sizes={sizes} preload={preload} />)}
          {/* Dynamic island */}
          <div className="absolute top-[3.2cqw] left-1/2 h-[8.4cqw] w-[29cqw] -translate-x-1/2 rounded-full bg-[#0b0c0f]" />
        </div>
      </div>
    </div>
  );
}
