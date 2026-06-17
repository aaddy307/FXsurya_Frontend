"use client";

import { cn } from "@/lib/utils";

export default function TestimonialCard({ quote, name, tag, className }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 relative flex flex-col h-full justify-between",
        className
      )}
    >
      <div className="text-4xl text-accent-gold/20 absolute top-4 left-4">
        "
      </div>
      <p className="text-gray-300 font-inter italic mb-6 pt-8 flex-1">{quote}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-white font-semibold">{name}</p>
        </div>
        {tag && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-accent-gold border border-accent-gold/30">
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}