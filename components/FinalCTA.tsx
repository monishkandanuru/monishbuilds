"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow">
              <Sparkles size={24} className="text-white" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-[56px] leading-tight">
            Let's Build Something{" "}
            <span className="gradient-text">That Works.</span>
          </h2>

          <p className="font-body text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Great products don't happen by accident. They're designed with
            intention, built with care, and launched with a clear purpose. If
            that's what you want — let's talk.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-2">
            <a href="/contact" className="btn-primary text-base py-4 px-8">
              <span className="flex items-center gap-2">
                Start Your Project
                <ArrowRight size={18} />
              </span>
            </a>
            <a href="/work" className="btn-secondary text-base py-4 px-8">
              View My Work
            </a>
          </div>

          {/* Trust line */}
          <p className="text-muted/50 text-sm font-body italic pt-2">
            "Your project deserves better than average."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
