import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-foreground text-white hover:bg-foreground/90 shadow-sm",
  secondary:
    "bg-accent text-white hover:bg-accent-dark shadow-sm shadow-accent/20",
  outline:
    "border border-foreground/15 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-white",
  ghost:
    "bg-transparent text-foreground hover:bg-surface",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-sm shadow-[#25D366]/25",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
