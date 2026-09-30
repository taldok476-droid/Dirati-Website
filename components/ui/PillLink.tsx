type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "quiet" | "light";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  solid: "bg-ink text-white hover:bg-[#23262e]",
  quiet: "bg-cloud text-ink hover:bg-cloud-2",
  light: "bg-white text-ink hover:bg-cloud",
};

const sizes = {
  md: "h-10 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-[1.0625rem]",
};

/** Capsule-shaped action. The only button shape on the site. */
export function PillLink({ href, children, variant = "solid", size = "md", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,transform] duration-300 ease-(--ease-soft) active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
