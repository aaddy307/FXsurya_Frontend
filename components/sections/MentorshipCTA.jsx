"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const benefits = [
  "✓ Live Sessions",
  "✓ Chart Analysis",
  "✓ Prop Firm Guidance",
];

export default function MentorshipCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,166,35,0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-surface/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          label="TRADER FAMILY"
          heading="Ready to Trade Like a Funded Trader?"
          subtext="Join a community of serious traders who are committed to mastering the markets."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {benefits.map((benefit) => (
            <span
              key={benefit}
              className="px-5 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-white font-inter text-sm"
            >
              {benefit}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/mentorship">
            <Button size="lg">Join Trader Family</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}