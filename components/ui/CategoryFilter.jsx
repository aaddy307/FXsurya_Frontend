"use client";

import { cn } from "@/lib/utils";

const categories = ["ALL", "FOREX", "CRYPTO", "MINDSET", "PROP FIRMS"];

export default function CategoryFilter({ active, onChange, className }) {
  return (
    <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === "ALL" ? "" : cat)}
          className={cn(
            "px-5 py-2 rounded-full font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300",
            active === (cat === "ALL" ? "" : cat)
              ? "bg-accent-gold text-black"
              : "bg-surface border border-border text-gray-400 hover:border-accent-gold/50 hover:text-white"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}