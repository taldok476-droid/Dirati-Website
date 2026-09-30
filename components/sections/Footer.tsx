import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-[1200px] px-5 pb-10 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-[0.9375rem] text-ink-3">הדירה שלך. מסודרת.</span>
        </div>
        <nav aria-label="קישורים משניים">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-ink-3">
            {site.footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="rounded-full transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-6 text-[0.8125rem] text-ink-3">© {new Date().getFullYear()} דירתי</p>
    </footer>
  );
}
