"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

const stats = [
  { value: "8678", suffix: "+", label: "Followers" },
  { value: "40", suffix: "K+", label: "Avg Reel Views" },
  { value: "136", suffix: "+", label: "Posts Published" },
  { value: "3", suffix: "+", label: "Years Trading" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}