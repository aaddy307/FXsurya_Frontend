"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-accent-gold/20 rounded-2xl blur-3xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-accent-gold/30">
                <Image
                  src="/placeholder-profile.png"
                  alt="FXsurya - Funded Trader"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              label="ABOUT ME"
              heading="From Retail Trader to Prop Firm Authority"
              align="left"
            />

            <div className="space-y-6">
              <p className="text-gray-400 font-inter leading-relaxed">
                I didn&apos;t start with capital or connections. I started with charts,
                discipline, and a refusal to quit. Today I trade funded accounts,
                run a growing trader community, and help serious traders and
                companies put their capital to work.
              </p>

              <blockquote className="border-l-4 border-accent-gold pl-6 py-2">
                <p className="text-white font-inter italic text-lg">
                  &ldquo;Stop looking for a safety net. Plan B must be making Plan A
                  work.&rdquo;
                </p>
              </blockquote>

              <p className="text-gray-400 font-inter leading-relaxed">
                Through my journey, I&apos;ve passed multiple prop firm challenges,
                built a community of 8.6K+ followers, and created a mentorship
                program that&apos;s changing how traders approach the markets.
              </p>

              <div className="pt-4">
                <Link href="/about">
                  <Button variant="ghost">Read My Full Story →</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}