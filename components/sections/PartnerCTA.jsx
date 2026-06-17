"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function PartnerCTA() {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          label="CAPITAL PARTNERSHIP"
          heading="Are You a Company Looking to Allocate Capital?"
          subtext="I work with select firms and high-net-worth partners. Submit a proposal and let's explore what's possible."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/partner">
            <Button size="lg">Submit a Proposal →</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}