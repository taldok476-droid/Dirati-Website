type MarkProps = { className?: string; lit?: boolean };

/** The דירתי mark: an arched doorway with a lit window. */
export function LogoMark({ className, lit = true }: MarkProps) {
  return (
    <svg viewBox="0 0 24 28" className={className} aria-hidden="true" focusable="false">
      <path d="M0 27V12C0 5.373 5.373 0 12 0s12 5.373 12 12v15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1Z" fill="currentColor" />
      <path
        d="M7 28V17.5a5 5 0 0 1 10 0V28Z"
        fill={lit ? "var(--color-glow)" : "var(--color-canvas)"}
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className="h-[22px] w-auto" />
      <span className="text-[1.3125rem] font-[640] leading-none tracking-[-0.02em] [font-stretch:92%]">
        דירתי
      </span>
    </span>
  );
}
