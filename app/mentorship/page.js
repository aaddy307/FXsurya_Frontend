"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/utils";

export const metadata = {
  title: "Trader Family Mentorship - Learn to Trade & Get Funded",
  description:
    "Join FXSurya's exclusive Trader Family mentorship. Get live trading sessions, daily chart analysis, prop firm guidance, and direct access to a funded trader.",
};

const features = [
  "Live trading sessions",
  "Daily chart analysis",
  "Prop firm challenge guidance",
  "Market updates (forex + crypto)",
  "Direct access to FXsurya",
  "Community of serious traders",
];

const plans = [
  {
    name: "Monthly",
    price: 4999,
    description: "Perfect for getting started",
    features: features,
  },
  {
    name: "Lifetime",
    price: 14999,
    description: "One-time payment, forever access",
    features: features,
    popular: true,
  },
];

const faqs = [
  {
    q: "What is Trader Family?",
    a: "Trader Family is my exclusive mentorship community where I share live trading sessions, daily chart analysis, prop firm guidance, and market updates. It's designed for serious traders who want to accelerate their learning curve.",
  },
  {
    q: "How is this different from free content on Instagram?",
    a: "Free content gives you snippets. Trader Family gives you structured learning, direct access to me, and a community of like-minded traders. Plus, I share real trade setups and walk you through my thought process.",
  },
  {
    q: "Do I need prior trading experience?",
    a: "Basic understanding of trading is helpful but not required. I start from fundamentals and build up to advanced strategies. What matters most is your commitment to learning.",
  },
  {
    q: "What if I want to cancel?",
    a: "For monthly plans, you can cancel anytime. For lifetime plans, it's a one-time payment with no recurring charges. Both include access to all current and future content.",
  },
  {
    q: "How do I access the content?",
    a: "Once you enroll, you'll receive login credentials to our private community platform where all content is hosted. You'll also be added to our Telegram group for real-time updates.",
  },
];

export default function MentorshipPage() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleEnroll = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/enrollment", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        plan: selectedPlan?.name.toLowerCase(),
      });
      toast.success("Enrollment successful! Welcome to Trader Family!");
      setShowModal(false);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Enrollment failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(245,166,35,0.1)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-accent-gold font-montserrat text-sm tracking-widest uppercase mb-4">
              TRADER FAMILY
            </span>
            <h1 className="font-bebas text-4xl md:text-6xl text-white mb-6">
              Learn to Trade. Get Funded. Change Your Life.
            </h1>
            <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">
              Join my exclusive mentorship program and get access to live sessions, 
              daily analysis, prop firm guidance, and a community of serious traders.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="WHAT'S INSIDE"
            heading="Everything You Get"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 glass-card rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-accent-gold" />
                </div>
                <span className="text-white font-inter">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="PRICING"
            heading="Choose Your Plan"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className={`relative ${plan.popular ? "border-accent-gold/50" : ""}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gold text-black text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="font-bebas text-3xl text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 font-inter text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="font-bebas text-5xl text-accent-gold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-gray-500 font-inter text-sm">/one-time</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-300 font-inter text-sm">
                        <Check className="w-4 h-4 text-accent-gold flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "primary" : "ghost"}
                    onClick={() => handleEnroll(plan)}
                  >
                    Enroll Now
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            heading="Frequently Asked Questions"
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-inter font-semibold">{faq.q}</span>
                  {openFaq === i ? (
                    <X className="w-5 h-5 text-accent-gold" />
                  ) : (
                    <span className="text-accent-gold text-xl">+</span>
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 font-inter">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="font-bebas text-2xl text-white mb-2">Complete Your Enrollment</h3>
            <p className="text-gray-400 font-inter text-sm mb-6">
              {selectedPlan?.name} Plan — ₹{selectedPlan?.price.toLocaleString()}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-inter text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-white font-inter text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-white font-inter text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white font-inter focus:outline-none focus:border-accent-gold"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" loading={loading} onClick={handleSubmit}>
                  Enroll — ₹{selectedPlan?.price.toLocaleString()}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
