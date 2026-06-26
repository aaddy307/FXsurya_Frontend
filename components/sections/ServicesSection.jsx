"use client";

import { motion } from "framer-motion";
import { TrendingUp, GraduationCap, Handshake } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    icon: TrendingUp,
    title: "Funded Trader",
    description:
      "I trade capital allocated by prop firms and institutional partners, consistently passing challenges and generating returns.",
    tag: "Active",
  },
  {
    icon: GraduationCap,
    title: "Trading Mentor",
    description:
      "I teach forex and crypto trading through live sessions, analysis breakdowns, and my exclusive Trader Family community.",
    tag: "Enrolling Now",
    cta: "Join Trader Family",
    href: "/mentorship",
  },
  {
    icon: Handshake,
    title: "Capital Partner",
    description:
      "Companies and HNIs can allocate capital for me to trade and manage. Transparent track record. Consistent approach.",
    tag: "Open to Proposals",
    cta: "Submit Proposal",
    href: "/partner#submit-proposal",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="SERVICES"
          heading="Three Ways I Create Value"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex"
            >
              <ServiceCard {...service} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}