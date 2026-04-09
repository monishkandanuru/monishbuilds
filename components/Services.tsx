"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Layers,
  Smartphone,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Websites That Convert Visitors Into Clients",
    category: "Business Websites",
    description:
      "Not just a digital presence — a conversion engine. I build fast, beautiful websites that communicate your value clearly and guide visitors toward action.",
    outcomes: [
      "Increased client inquiries",
      "Professional brand impression",
      "SEO-optimised structure",
      "Mobile-first design",
    ],
    color: "#7C5CFF",
    popular: false,
  },
  {
    icon: Layers,
    title: "Web Apps That Automate Your Business Processes",
    category: "Web Applications",
    description:
      "Complex workflows simplified into clean, intuitive tools. Whether it's a dashboard, platform, or internal tool — built to scale with your business.",
    outcomes: [
      "Reduced operational friction",
      "Custom dashboards & portals",
      "Real-time data features",
      "Secure authentication",
    ],
    color: "#00D4FF",
    popular: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps Tailored to Real User Needs",
    category: "Mobile Apps",
    description:
      "Clean Android & React Native apps that people actually use. Built around user behaviour, not just feature lists.",
    outcomes: [
      "Intuitive user experience",
      "Offline-first capability",
      "Push notifications",
      "Firebase integration",
    ],
    color: "#7C5CFF",
    popular: false,
  },
  {
    icon: Wrench,
    title: "Custom Solutions Built Around Your Exact Needs",
    category: "Custom Development",
    description:
      "When off-the-shelf tools don't cut it. I'll architect and build something specific — from APIs to integrations to bespoke tools.",
    outcomes: [
      "Tailored to your workflow",
      "API & third-party integrations",
      "Scalable architecture",
      "Long-term maintainability",
    ],
    color: "#00D4FF",
    popular: false,
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-28 relative">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="section-label">What I Do</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
            Services Designed for{" "}
            <span className="gradient-text">Outcomes</span>
          </h2>
          <p className="font-body text-muted max-w-lg mx-auto text-base">
            Every service I offer is built around one question: what result does
            your business actually need?
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group glass glass-hover rounded-2xl p-7 overflow-hidden transition-all duration-500"
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute top-5 right-5">
                  <span
                    className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(0,212,255,0.15)",
                      color: "#00D4FF",
                      border: "1px solid rgba(0,212,255,0.25)",
                    }}
                  >
                    Most Requested
                  </span>
                </div>
              )}

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${service.color}08 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${service.color}18`, border: `1px solid ${service.color}25` }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>

              {/* Category */}
              <span className="section-label text-[10px] mb-2 block">{service.category}</span>

              {/* Title */}
              <h3 className="font-heading font-semibold text-lg text-white mb-3 leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted text-sm font-body leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Outcomes */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      style={{ color: service.color, flexShrink: 0 }}
                    />
                    <span className="text-xs text-muted font-body">{outcome}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <a
                  href="#contact"
                  className="text-sm font-body font-medium inline-flex items-center gap-1.5 transition-all duration-300"
                  style={{ color: service.color }}
                >
                  Discuss this service
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted text-sm font-body mt-12"
        >
          Not sure which service fits your needs?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Let's figure it out together.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
