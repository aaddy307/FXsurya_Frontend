"use client";

import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  hover = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && "hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}