"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-accent-gold text-black hover:bg-accent-gold-hover shadow-lg shadow-accent-gold/20",
  ghost: "bg-transparent border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10",
  danger: "bg-danger text-white hover:bg-danger/80",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer",
        "hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}