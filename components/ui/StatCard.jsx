"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function StatCard({ value, label, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(numericValue * easeOut));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(numericValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const displayValue = count.toLocaleString();

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 text-center aspect-square w-full flex flex-col justify-center items-center"
    >
      <div className="font-bebas text-4xl md:text-5xl text-accent-gold mb-2">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className="text-gray-400 font-inter text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}