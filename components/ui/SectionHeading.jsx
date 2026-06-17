"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SectionHeading({
  label,
  heading,
  subtext,
  align = "center",
  className,
}) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", alignmentClasses[align], className)}
    >
      {label && (
        <span className="inline-block text-accent-gold font-montserrat text-sm tracking-widest uppercase mb-4">
          {label}
        </span>
      )}
      <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-4">
        {heading}
      </h2>
      {subtext && (
        <p className="text-gray-400 max-w-2xl mx-auto font-inter">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}