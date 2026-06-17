"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/utils";

const socialLinks = [
  { 
    href: "https://instagram.com/fxupdates_official", 
    icon: (props) => (
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ), 
    label: "@fxupdates_official" 
  },
  { 
    href: "https://youtube.com/@fxsurya", 
    icon: (props) => (
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
      </svg>
    ), 
    label: "YouTube" 
  },
  { 
    href: "https://t.me/fxsurya", 
    icon: (props) => (
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
      >
        <path d="M21.5 2L2 11.5l6 2.5 11.5-7.5-8.5 9v5.5l3.5-4.5 4.5 3z" />
      </svg>
    ), 
    label: "Telegram" 
  },
];

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", type: "student", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", form);
      toast.success("Message sent! I'll get back to you within 24 hours.");
      setForm({ name: "", email: "", type: "student", message: "" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to send message. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <SectionHeading
                label="CONTACT"
                heading="Let's Connect"
                align="left"
              />
              <p className="text-gray-400 font-inter mb-8">
                Whether you&apos;re a student, a company, or just someone with
                questions — reach out.
              </p>

              <div className="space-y-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-400 hover:text-accent-gold transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-inter">{social.label}</span>
                  </a>
                ))}
              </div>

              <p className="text-gray-500 font-inter text-sm">
                Usually responds within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">I am a</label>
                    <div className="flex gap-6">
                      {["student", "partnership", "general"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.toLowerCase()}
                            checked={form.type === type.toLowerCase()}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="accent-accent-gold"
                          />
                          <span className="text-gray-300 font-inter text-sm capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-inter text-sm mb-2">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white font-inter focus:outline-none focus:border-accent-gold transition-colors resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" loading={loading} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}