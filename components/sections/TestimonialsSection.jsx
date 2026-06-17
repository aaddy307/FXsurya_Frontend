"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    quote:
      "FXsurya's mentorship changed everything for me. I went from consistently losing to finally understanding how to read markets. Passed my first prop firm challenge within 3 months.",
    name: "Rahul M.",
    tag: "Passed FTMO",
  },
  {
    quote:
      "The Trader Family community is unlike any other. Real traders, real analysis, no fluff. Been a member for 8 months now and my trading has transformed completely.",
    name: "Priya S.",
    tag: "Joined Trader Family",
  },
  {
    quote:
      "I was skeptical at first, but the daily chart breakdowns and live sessions are worth every penny. FXsurya's approach to teaching price action is practical and actionable.",
    name: "Aditya K.",
    tag: "6 Months Member",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="TESTIMONIALS"
          heading="What Traders Say"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex"
            >
              <TestimonialCard {...testimonial} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}