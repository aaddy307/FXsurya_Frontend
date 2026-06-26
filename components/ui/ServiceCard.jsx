"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  tag,
  cta,
  href,
  className,
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 flex flex-col h-full",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-accent-gold/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-accent-gold" />
      </div>
      <h3 className="font-bebas text-2xl text-white mb-3">{title}</h3>
      <p className="text-gray-400 font-inter mb-4 flex-grow">{description}</p>
      {tag && (
        <span className="inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold text-black bg-accent-gold mb-4">
          {tag}
        </span>
      )}
      {cta && (
        <Link
          href={href || "#"}
          className="inline-flex items-center text-accent-gold font-semibold hover:text-accent-gold-hover transition-colors"
        >
          {cta} →
        </Link>
      )}
    </div>
  );
}