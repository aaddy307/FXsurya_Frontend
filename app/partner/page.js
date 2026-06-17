"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Shield, Users, MessageSquare, DollarSign } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/utils";

const offerings = [
  "Proven prop firm track record",
  "Transparent trading approach (Forex + Crypto)",
  "Flexible capital management structures",
];

const whyPartner = [
  { icon: Shield, title: "Prop Firm Certified", desc: "Passed multiple prop firm challenges" },
  { icon: TrendingUp, title: "3+ Years Consistent Trading", desc: "Proven track record of consistency" },
  { icon: Users, title: "Active Trader Community", desc: "8.6K+ followers as proof of credibility" },
  { icon: MessageSquare, title: "Transparent Communication", desc: "Regular updates and performance reports" },
];

const capitalRanges = ["₹1L–5L", "₹5L–20L", "₹20L–50L", "₹50L+", "Prefer not to say"];

export default function PartnerPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    capitalRange: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/contact", { ...form, type: "partnership" });
      toast.success("Proposal submitted! I'll get back to you within 24-48 hours.");
      setForm({ name: "", company: "", email: "", phone: "", capitalRange: "", message: "" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to submit proposal. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-accent-gold font-montserrat text-sm tracking-widest uppercase mb-4">
              CAPITAL PARTNERSHIP
            </span>
            <h1 className="font-bebas text-4xl md:text-6xl text-white mb-6">
              Capital Partnership Opportunities
            </h1>
            <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">
              I work with select companies and investors who want their capital actively 
              managed by a consistent, disciplined trader.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="WHAT I OFFER" heading="A True Partnership" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {offerings.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <GlassCard className="flex items-start gap-4 w-full">
                  <CheckCircle className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
                  <span className="text-white font-inter">{item}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <SectionHeading label="WHY PARTNER WITH ME" heading="Why Companies Choose Me" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {whyPartner.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <GlassCard className="w-full flex flex-col">
                  <item.icon className="w-10 h-10 text-accent-gold mb-4" />
                  <h3 className="font-bebas text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 font-inter text-sm flex-grow">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center mb-16"
          >
            <DollarSign className="w-12 h-12 text-accent-gold mx-auto mb-4" />
            <h3 className="font-bebas text-2xl text-white mb-2">Capital Range</h3>
            <p className="text-gray-400 font-inter">
              I currently work with partners allocating between <span className="text-accent-gold">₹1 Lakh – ₹50 Lakhs+</span>
            </p>
          </motion.div>

          <SectionHeading label="SUBMIT PROPOSAL" heading="Let's Talk Business" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="max-w-2xl mx-auto p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-inter text-sm mb-2">
                    Capital Range
                  </label>
                  <select
                    value={form.capitalRange}
                    onChange={(e) => setForm({ ...form, capitalRange: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                  >
                    <option value="">Select capital range</option>
                    {capitalRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white font-inter text-sm mb-2">
                    Message / What are you looking for?
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  />
                </div>
                <Button type="submit" loading={loading} className="w-full">
                  Submit Proposal
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}