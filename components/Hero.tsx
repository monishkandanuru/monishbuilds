"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, Smartphone, Code2, MapPin, GraduationCap } from "lucide-react";
const floatingCards = [
  { icon: Globe, title: "NewGen Technologies", desc: "Pharma Infrastructure Web", color: "#7C5CFF", className: "floating-card top-[10%] right-[5%] md:right-[8%]", tech: "Next.js + Tailwind" },
  { icon: Smartphone, title: "SpendWise", desc: "Smart Expense Tracker", color: "#00D4FF", className: "floating-card-2 top-[45%] right-[2%] md:right-[5%]", tech: "React + Vercel" },
  { icon: Code2, title: "VaultEye", desc: "Security Monitor App", color: "#7C5CFF", className: "floating-card-3 top-[72%] right-[8%] md:right-[12%]", tech: "Android + Firebase" },
];
function fadeUp(delay = 0) {
  return { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut", delay } };
}
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#7C5CFF 1px, transparent 1px), linear-gradient(90deg, #7C5CFF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div {...fadeUp(0.1)} className="inline-flex">
              <span className="flex items-center gap-2 text-xs font-body font-medium px-4 py-2 glass rounded-full border border-primary/20 text-primary">
                <Sparkles size={12} className="text-secondary" />
                Available for new projects
              </span>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="glass rounded-2xl px-5 py-4 border border-white/5 inline-block">
              <p className="text-muted font-body text-xs mb-1 uppercase tracking-widest">About Me</p>
              <h2 className="font-heading font-bold text-xl gradient-text mb-1">Monish Kandanuru</h2>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-muted font-body">
                  <MapPin size={11} className="text-primary" /> Bangalore, India
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted font-body">
                  <GraduationCap size={11} className="text-secondary" /> B.Tech Computer Science
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted font-body">
                  <Code2 size={11} className="text-primary" /> Full Stack + Android
                </span>
              </div>
            </motion.div>
            <motion.h1 {...fadeUp(0.2)} className="font-heading font-bold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-tight">
              Your Website Should{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Bring You Clients</span>
                <motion.span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-gradient" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
              </span>
              <br />
              <span className="text-white/60 font-medium text-3xl md:text-4xl lg:text-[40px]">{"— Not Just Sit There."}</span>
            </motion.h1>
            <motion.p {...fadeUp(0.35)} className="font-body text-muted text-base md:text-lg leading-relaxed max-w-[500px]">
              I design and build high-quality websites and apps that help businesses{" "}
              <span className="text-white font-medium">attract, impress,</span> and{" "}
              <span className="text-white font-medium">convert customers</span> — with clean code and real strategy.
            </motion.p>
            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4 items-center">
              <a href="/contact" className="btn-primary">
                <span className="flex items-center gap-2">Start Your Project <ArrowRight size={16} /></span>
              </a>
              <a href="/work" className="btn-secondary">View My Work</a>
            </motion.div>
            <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-3 pt-1">
              {["Real project experience", "Modern design", "Scalable solutions"].map(function(item, i) {
                return (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-muted font-body">
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
                    {item}
                  </span>
                );
              })}
            </motion.div>
            <motion.div {...fadeUp(0.65)} className="grid grid-cols-3 gap-4 pt-2">
              {[
                { num: "5+", label: "Projects Shipped", sub: "Real clients & products" },
                { num: "3+", label: "Tech Stacks", sub: "Web, Mobile, Android" },
                { num: "100%", label: "Client Focus", sub: "Outcome over output" }
              ].map(function(stat, i) {
                return (
                  <div key={i} className="glass rounded-xl p-3 border border-white/5 text-center">
                    <div className="font-heading font-bold text-xl gradient-text">{stat.num}</div>
                    <div className="text-xs text-white font-body font-medium mt-0.5">{stat.label}</div>
                    <div className="text-[10px] text-muted font-body mt-0.5">{stat.sub}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <div className="relative h-[520px] hidden md:block">
            {floatingCards.map(function(card, i) {
              return (
                <motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" }} className={"absolute " + card.className + " w-[200px]"}>
                  <div className="glass glass-hover rounded-2xl p-4 shadow-glass cursor-default group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.color + "22" }}>
                        <card.icon size={16} style={{ color: card.color }} />
                      </div>
                      <span className="text-[10px] font-body px-2 py-0.5 rounded-full" style={{ background: card.color + "15", color: card.color, border: "1px solid " + card.color + "30" }}>Live</span>
                    </div>
                    <p className="font-heading font-semibold text-sm text-white leading-tight">{card.title}</p>
                    <p className="text-muted text-xs mt-1 font-body">{card.desc}</p>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-muted font-body font-medium">{card.tech}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px]">
              <div className="w-full h-full rounded-full border border-primary/10 flex items-center justify-center relative">
                <div className="w-3/4 h-3/4 rounded-full border border-secondary/10 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl animate-glow-pulse" />
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, ease: "linear", repeat: Infinity }} className="absolute inset-0">
                  <div className="w-3 h-3 rounded-full bg-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-glow-sm" />
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} className="absolute inset-4">
                  <div className="w-2 h-2 rounded-full bg-secondary absolute bottom-0 right-0 shadow-glow-cyan" />
                </motion.div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs text-muted/50 font-body italic">"Your project deserves better than average."</p>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted/40 font-body">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
