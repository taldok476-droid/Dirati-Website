"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { PillLink } from "@/components/ui/PillLink";
import { ease } from "@/components/ui/motion";
import { navLinks, site } from "@/lib/site";

/** Tracks which section is under the upper third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SiteNav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape closes, focus moves into the panel and back out.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const items = [button, ...panel.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? i - 1 : i + 1;
        if (next < 0 || next >= items.length) {
          e.preventDefault();
          items[e.shiftKey ? items.length - 1 : 0].focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Desktop: one centered capsule, links in the middle, CTA at the end. */}
      <nav
        aria-label="ניווט ראשי"
        className={`pointer-events-auto mx-auto hidden h-14 max-w-[880px] items-center justify-between rounded-full ps-6 pe-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-(--ease-soft) lg:flex ${
          scrolled
            ? "bg-white/90 shadow-[0_0_0_1px_rgb(12_14_19/0.06),0_10px_30px_-12px_rgb(18_32_58/0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-white/0"
        }`}
      >
        <a href="#top" aria-label="דירתי, לראש העמוד" className="rounded-full">
          <Logo />
        </a>
        <ul className="flex items-center gap-1">
          {navLinks.slice(1).map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative isolate block rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${
                  active === l.id ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 rounded-full bg-cloud transition-[opacity,transform] duration-500 ease-(--ease-soft) ${
                    active === l.id ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <PillLink href={site.joinHref}>הצטרפו לדירתי</PillLink>
      </nav>

      {/* Mobile: a compact bar. The menu opens as a sheet under it, not a shrunken desktop bar. */}
      <div className="pointer-events-auto relative lg:hidden">
        <div
          className={`flex h-14 items-center justify-between rounded-full ps-5 pe-1.5 transition-[background-color,box-shadow] duration-500 ${
            scrolled || open
              ? "bg-white/85 shadow-[0_0_0_1px_rgb(12_14_19/0.06),0_10px_30px_-12px_rgb(18_32_58/0.2)] backdrop-blur-xl"
              : "bg-white/0"
          }`}
        >
          <a href="#top" aria-label="דירתי, לראש העמוד" className="rounded-full" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <div className="flex items-center gap-1.5">
            <PillLink href={site.joinHref} className="h-10 px-4 text-[0.875rem]">
              הצטרפו
            </PillLink>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"}
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center rounded-full bg-cloud text-ink transition-colors hover:bg-cloud-2"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={`absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-500 ease-(--ease-soft) ${
                    open ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-500 ease-(--ease-soft) ${
                    open ? "-translate-y-[5.25px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <m.button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 -z-10 cursor-default bg-ink/20 backdrop-blur-[2px]"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
              <m.div
                ref={panel}
                id="mobile-menu"
                className="absolute inset-x-0 top-[calc(100%+8px)] origin-top overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_0_0_1px_rgb(12_14_19/0.06),0_30px_60px_-20px_rgb(18_32_58/0.35)]"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
              >
                <nav aria-label="ניווט ראשי">
                  <ul>
                    {navLinks.map((l, i) => (
                      <m.li
                        key={l.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease, delay: 0.04 * i + 0.05 }}
                      >
                        <a
                          href={`#${l.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={active === l.id ? "true" : undefined}
                          className="flex items-center justify-between rounded-[20px] px-4 py-3.5 text-[1.375rem] font-medium tracking-[-0.01em] [font-stretch:92%] active:bg-cloud"
                        >
                          {l.label}
                          {active === l.id && <span className="size-2 rounded-full bg-glow" aria-hidden="true" />}
                        </a>
                      </m.li>
                    ))}
                  </ul>
                </nav>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
