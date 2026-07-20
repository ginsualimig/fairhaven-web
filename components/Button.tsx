import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "inline-flex items-center gap-2 rounded-sm bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/90 transition-colors duration-200",
  ghost:
    "inline-flex items-center gap-2 rounded-sm border border-gold/40 px-6 py-3 text-sm font-medium text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200",
  outline:
    "inline-flex items-center gap-2 rounded-sm border border-offwhite/30 px-8 py-3.5 text-sm font-semibold text-offwhite hover:border-gold hover:text-gold transition-colors duration-200",
  dark: "inline-flex items-center gap-2 rounded-sm border border-navy/20 px-6 py-3 text-sm font-medium text-navy hover:border-navy hover:bg-navy/5 transition-colors duration-200",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button className={`${variants[variant]} ${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50`} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: keyof typeof variants;
}

export function ButtonLink({ href, className = "", variant = "primary", children, ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${variants[variant]} ${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50`}
      {...props}
    >
      {children}
    </Link>
  );
}
