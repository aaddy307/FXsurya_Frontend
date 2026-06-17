"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center noise-overlay overflow-hidden pt-28 pb-16 lg:py-0">
      {/* Background Video & Trading Overlays */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.28] scale-[1.03] filter brightness-[0.85] contrast-[1.15] saturation-[0.8]"
          src="/trading.mp4"
        />
        {/* Dark Vignette Overlays (lighter for video visibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0A0A0A] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45 pointer-events-none" />
        
        {/* Tech/Trading Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] pointer-events-none" />
        
        {/* Golden Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_top,_rgba(245,166,35,0.14)_0%,_transparent_55%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6 tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block text-white"
              >
                FUNDED TRADER.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-[#FFD166]"
              >
                MENTOR.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                MARKET AUTHORITY.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-300 font-inter text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
            >
              Forex & Crypto | Prop Firm Certified | CEO @fxupdates_official
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/mentorship">
                <Button size="lg" className="w-full sm:w-auto">Learn With Me</Button>
              </Link>
              <Link href="/partner">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">Partner With Me</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Animating Trading Terminal Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient backlight glow */}
            <div className="absolute -inset-4 bg-accent-gold/15 rounded-3xl blur-2xl pointer-events-none" />
            
            <div className="relative glass-card rounded-2xl overflow-hidden border border-border/80 bg-black/50 backdrop-filter backdrop-blur-xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111]/90 border-b border-border/50">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  Terminal v2.0 // Live Market Data
                </div>
                <div className="w-4 h-2" />
              </div>
              
              {/* Terminal Body */}
              <div className="p-5 space-y-5">
                {/* Active Trading Pair Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bebas text-xl text-white tracking-wider">BTC / USDT</div>
                    <div className="font-mono text-xs text-gray-500">Real-time Feed</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-success text-sm sm:text-base">$68,240.50</div>
                    <div className="font-mono text-[10px] text-success flex items-center justify-end gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      +4.25% (24h)
                    </div>
                  </div>
                </div>

                {/* SVG Candlestick Chart */}
                <div className="h-44 w-full relative bg-[#0D0D0D]/90 rounded-lg border border-border/40 p-2 overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="border-t border-l border-white/[0.02] w-full h-full" />
                    ))}
                  </div>

                  {/* SVG Chart Elements */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                    {/* Candle 1 (Green) */}
                    <line x1="20" y1="90" x2="20" y2="40" stroke="#22C55E" strokeWidth="1" />
                    <rect x="16" y="55" width="8" height="25" fill="#22C55E" rx="1" />

                    {/* Candle 2 (Red) */}
                    <line x1="60" y1="80" x2="60" y2="30" stroke="#EF4444" strokeWidth="1" />
                    <rect x="56" y="45" width="8" height="25" fill="#EF4444" rx="1" />

                    {/* Candle 3 (Green) */}
                    <line x1="100" y1="100" x2="100" y2="50" stroke="#22C55E" strokeWidth="1" />
                    <rect x="96" y="60" width="8" height="30" fill="#22C55E" rx="1" />

                    {/* Candle 4 (Green) */}
                    <line x1="140" y1="70" x2="140" y2="20" stroke="#22C55E" strokeWidth="1" />
                    <rect x="136" y="30" width="8" height="30" fill="#22C55E" rx="1" />

                    {/* Candle 5 (Red) */}
                    <line x1="180" y1="90" x2="180" y2="40" stroke="#EF4444" strokeWidth="1" />
                    <rect x="176" y="50" width="8" height="20" fill="#EF4444" rx="1" />

                    {/* Candle 6 (Green) */}
                    <line x1="220" y1="60" x2="220" y2="10" stroke="#22C55E" strokeWidth="1" />
                    <rect x="216" y="20" width="8" height="30" fill="#22C55E" rx="1" />

                    {/* Candle 7 (Green) */}
                    <line x1="260" y1="40" x2="260" y2="5" stroke="#22C55E" strokeWidth="1" />
                    <rect x="256" y="10" width="8" height="20" fill="#22C55E" rx="1" />

                    {/* Golden Trend Line - Animated */}
                    <motion.path
                      d="M 20 68 L 60 58 L 100 75 L 140 45 L 180 60 L 220 35 L 260 20"
                      fill="none"
                      stroke="#F5A623"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1.5 }}
                    />
                    
                    {/* Gradient underneath the line */}
                    <path
                      d="M 20 68 L 60 58 L 100 75 L 140 45 L 180 60 L 220 35 L 260 20 L 260 120 L 20 120 Z"
                      fill="url(#chartGrad)"
                      opacity="0.1"
                    />

                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5A623" />
                        <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Glowing Price Tag Indicator */}
                  <div className="absolute right-[32px] top-[15px] bg-accent-gold text-black font-mono text-[9px] px-1 py-0.5 rounded font-bold animate-bounce">
                    $68.2K
                  </div>
                </div>

                {/* Live Position Ledger */}
                <div className="space-y-3">
                  <div className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Live Position Ledger</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono pb-2 border-b border-border/30">
                      <span className="text-white">EUR / USD</span>
                      <span className="text-success font-semibold">BUY @ 1.0925</span>
                      <span className="text-success bg-success/10 px-1.5 py-0.5 rounded text-[10px]">+14.80%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono pb-2 border-b border-border/30">
                      <span className="text-white">GBP / JPY</span>
                      <span className="text-danger font-semibold">SELL @ 201.42</span>
                      <span className="text-danger bg-danger/10 px-1.5 py-0.5 rounded text-[10px]">-2.15%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white">BTC / USDT</span>
                      <span className="text-success font-semibold">BUY @ 67,240</span>
                      <span className="text-success bg-success/10 px-1.5 py-0.5 rounded text-[10px]">+28.50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}