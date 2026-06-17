"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const timeline = [
  { year: "2021", event: "Started Forex Trading" },
  { year: "2022", event: "First Prop Firm Challenge Passed" },
  { year: "2023", event: "Founded @fxupdates_official" },
  { year: "2024", event: "Launched Trader Family Community" },
  { year: "2025", event: "Open to Capital Partnerships" },
];

const quotes = [
  "Trading is not easy. Only those who want to succeed at all costs will succeed.",
  "Never quit trading, you don't know how close you are to success.",
  "Stop looking for a safety net.",
];

const skills = ["Forex", "Crypto", "Price Action", "Risk Management", "Prop Firms", "Market Psychology"];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent-gold font-montserrat text-sm tracking-widest uppercase mb-4">
              ABOUT ME
            </span>
            <h1 className="font-bebas text-5xl md:text-7xl text-white mb-4">
              FXSURYA
            </h1>
            <p className="text-gray-400 font-inter text-lg">
              Funded Trader | Mentor | Market Authority
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bebas text-3xl text-white mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-400 font-inter">
                <p>
                  I started trading forex in 2021 with just a small capital and an 
                  obsession to understand how markets move. Like most traders, I 
                  experienced the harsh realities of trading — the losses, the self-doubt, 
                  and the temptation to give up.
                </p>
                <p>
                  But I didn&apos;t quit. I studied price action, learned risk management, 
                  and developed a disciplined approach that eventually led me to pass my 
                  first prop firm challenge in 2022.
                </p>
                <p>
                  Today, I trade funded capital from multiple prop firms, run a community 
                  of over 8,600 traders, and help companies allocate their capital to 
                  disciplined traders like myself.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bebas text-3xl text-white mb-6">The Philosophy</h2>
              <div className="space-y-4 text-gray-400 font-inter">
                <p>
                  My approach to trading is simple: discipline over excitement, process 
                  over outcomes, and consistency over spectacular gains.
                </p>
                <p>
                  I believe that anyone can become a profitable trader if they are willing 
                  to put in the work, follow a proven system, and never stop learning. 
                  That&apos;s why I share my analysis openly and mentor traders who are 
                  serious about success.
                </p>
                <p>
                  The markets don&apos;t care about your feelings or circumstances. They 
                  only respond to price action and probability. Learn to read the charts, 
                  manage your risk, and trust the process.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-bebas text-3xl text-white mb-8 text-center">Timeline</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                      <span className="text-accent-gold font-bebas text-2xl">{item.year}</span>
                      <p className="text-white font-inter">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bebas text-3xl text-white mb-8 text-center">Words from My Reels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotes.map((quote, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border-l-4 border-accent-gold"
                >
                  <p className="text-gray-300 font-inter italic">&ldquo;{quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="font-bebas text-2xl text-white mb-6">Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2 rounded-full bg-surface border border-border text-gray-300 font-inter text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}