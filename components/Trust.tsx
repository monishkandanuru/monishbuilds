"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Palette,
  Layers,
  TrendingUp,
  Microscope,
  MessageSquare,
  Code2,
} from "lucide-react";

const reasons = [
  {
    icon: Palette,
    title: "Clean, Intentional UI",
    description:
      "Design isn't decoration here. Every layout decision is made to guide attention, build trust, and move users toward action.",
    color: "#7C5CFF",
  },
  {
    icon: Layers,
    title: "Real-World Project Experience",
    description:
      "Not portfolio experiments — actual shipped products used by real people and businesses. I know what works beyond theory.",
    color: "#00D4FF",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale",
    description:
      "Clean architecture from day one means your product grows with you. No messy rewrites when you hit your next milestone.",
    color: "#7C5CFF",
  },
  {
    icon: Microscope,
    title: "Obsessive Attention to Detail",
    description:
      "The difference between good and great is in the details. Spacing, transitions, copy, performance — nothing is overlooked.",
    color: "#00D4FF",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "No technical jargon, no ghosting. You'll always know the status of your project and what's happening next.",
    color: "#7C5CFF",
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description:
      "Next.js, React Native, Firebase, Tailwind — tools that are battle-tested, fast, and won't become obsolete in two years.",
    color: "#00D4FF",
  },
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="py-28 relative">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="section-label">Why Clients Choose Me</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
            More Than a Developer.{" "}
            <span className="gradient-text">A Growth Partner.</span>
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto text-base">
            When you work with me, you're not just getting code — you're getting
            a collaborator who cares about your product's success as much as you
            do.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass glass-hover rounded-2xl p-6 transition-all duration-500 hover:shadow-glow-sm"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${reason.color}18` }}
              >
                <reason.icon size={18} style={{ color: reason.color }} />
              </div>
              <h3 className="font-heading font-semibold text-base text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-muted text-sm font-body leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 glass rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5 border border-primary/10"
        >
          <p className="font-heading font-medium text-lg text-white/80 italic text-center md:text-left">
            "Your project deserves better than average — that's the standard I
            hold myself to."
          </p>
          <a href="#contact" className="btn-primary flex-shrink-0 text-sm py-3 px-6">
            <span>Work With Me</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
