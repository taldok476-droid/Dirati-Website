"use client";

import { useId, useState } from "react";
import { MaskedHeading } from "@/components/ui/motion";
import { faq } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="pt-28 sm:pt-36 lg:pt-44">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <MaskedHeading
            id="faq-title"
            lines={["שאלות", "נפוצות"]}
            className="display text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)]"
          />
        </div>

        <ul className="border-t border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 rounded-2xl py-6 text-start text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] font-semibold tracking-[-0.01em] focus-visible:outline-offset-[-2px]"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={`relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-ink text-white" : "bg-cloud text-ink group-hover:bg-cloud-2"
                      }`}
                    >
                      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                      <span
                        className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-500 ease-(--ease-soft) ${
                          isOpen ? "scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-soft) ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[38rem] pb-7 text-[1.0625rem] leading-relaxed text-ink-2">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
