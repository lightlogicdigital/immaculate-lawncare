import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "white" | "outline-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
  white: "bg-white text-ink hover:bg-surface",
  "outline-light": "border-[1.5px] border-white/70 text-white hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-[22px] text-base",
  lg: "h-[58px] px-7 text-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-bold text-ink underline decoration-ink/30 underline-offset-[5px] transition-colors hover:text-brand hover:decoration-brand"
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
