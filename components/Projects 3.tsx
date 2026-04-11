"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink, Download, Globe, Smartphone, ShieldCheck, ArrowUpRight } from "lucide-react";
const projects = [
  {
    id: "newgen",
    label: "Client Work",
    title: "NewGen Technologies",
    tagline: "A pharmaceutical consultancy needed more than a website - they needed a brand presence.",
    problem: "Their old site failed to communicate expertise and convert inquiries.",
    solution: "Built a professional, SEO-ready site that communicates authority, showcases services, and drives client inquiries.",
    tech: ["Next.js 14", "Tailwind CSS", "Vercel", "Nodemailer"],
    icon: Globe,
    color: "#7C5CFF",
    accentColor: "rgba(124,92,255,0.1)",
    liveUrl: "https://newgenprojects.in",
    apkUrl: null,
    githubUrl: "https://github.com/monishkandanuru/New-Gen-Technologies",
    badge: "Live Site",
    badgeColor: "#7C5CFF",
  },
  {
    id: "spendwise",
    label: "Web App",
    title: "SpendWise",
    tagline: "People lose track of money because tracking feels like work.",
    problem: "Most expense apps are bloated, confusing, or too generic to actually change habits.",
    solution: "A clean, focused expense tracker with visual breakdowns that makes understanding your finances feel effortless.",
    tech: ["React", "Vercel", "Chart.js", "LocalStorage"],
    icon: Smartphone,
    color: "#00D4FF",
    accentColor: "rgba(0,212,255,0.1)",
    liveUrl: "https://spendwisemanagement.vercel.app",
    apkUrl: null,
    githubUrl: null,
    badge: "Live App",
    badgeColor: "#00D4FF",
  },
  {
    id: "vaulteye",
    label: "Security App",
    title: "VaultEye",
    tagline: "Security monitoring should be accessible, not enterprise-only.",
    problem: "Existing solutions were complex, costly, or required expensive hardware setups.",
    solution: "A lightweight Android app that turns any device into a smart security monitor with real-time alerts and a clean dashboard.",
    tech: ["Android", "Java", "Firebase", "CameraX API"],
    icon: ShieldCheck,
    color: "#7C5CFF",
    accentColor: "rgba(124,92,255,0.1)",
    liveUrl: null,
    apkUrl: null,
    githubUrl: null,
    badge: "Coming Soon",
    badgeColor: "#7C5CFF",
  },
];
function ProjectCard(props: { project: typeof projects[0]; index: number }) {
  const { project, index } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasLinks = project.liveUrl || project.apkUrl || project.githubUrl;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }} className="group relative glass glass-hover rounded-2xl p-7 overflow-hidden transition-all duration-500 hover:shadow-glow">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: project.accentColor }} />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: project.accentColor, border: "1px solid " + project.color + "30" }}>
            <project.icon size={20} style={{ color: project.color }} />
          </div>
          <div>
            <span className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: project.badgeColor + "15", color: project.badgeColor, border: "1px solid " + project.badgeColor + "25" }}>
              {project.badge}
            </span>
            <p className="text-muted text-xs mt-0.5 font-body">{project.label}</p>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-muted group-hover:text-white transition-colors duration-300 mt-1" />
      </div>
      <h3 className="font-heading font-bold text-xl text-white mb-1 relative z-10">{project.title}</h3>
      <p className="text-muted text-sm font-body italic mb-4 relative z-10">{'"' + project.tagline + '"'}</p>
      <div className="space-y-3 mb-5 relative z-10">
        <div className="flex gap-3">
          <span className="text-red-400/70 text-xs font-body font-semibold pt-0.5 flex-shrink-0">Problem</span>
          <p className="text-muted text-sm font-body leading-relaxed">{project.problem}</p>
        </div>
        <div className="flex gap-3">
          <span className="text-xs font-body font-semibold pt-0.5 flex-shrink-0" style={{ color: project.color }}>Solution</span>
          <p className="text-white/80 text-sm font-body leading-relaxed">{project.solution}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {project.tech.map(function(t) {
          return <span key={t} className="text-[11px] font-body px-3 py-1 rounded-lg bg-white/5 text-muted border border-white/5">{t}</span>;
        })}
      </div>
      {hasLinks && (
        <div className="flex flex-wrap gap-3 relative z-10 pt-4 border-t border-white/5">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 px-5">
              <span className="flex items-center gap-2"><ExternalLink size={14} />Live Preview</span>
            </a>
          )}
          {project.apkUrl && (
            <a href={project.apkUrl} className="btn-primary text-sm py-2.5 px-5" download>
              <span className="flex items-center gap-2"><Download size={14} />Download APK</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2.5 px-5">View Code</a>
          )}
        </div>
      )}
    </motion.div>
  );
}
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-primary/30" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16 space-y-4">
          <span className="section-label">Selected Work</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
            Projects That <span className="gradient-text">Solve Real Problems</span>
          </h2>
          <p className="font-body text-muted max-w-xl mx-auto text-base">Every project here was built around a specific business problem. Not just to look good - but to actually work.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(function(project, i) {
            return <ProjectCard key={project.id} project={project} index={i} />;
          })}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="text-center mt-14">
          <p className="text-muted font-body text-sm mb-5">Have a project in mind? Let's build something better.</p>
          <a href="#contact" className="btn-primary">
            <span className="flex items-center gap-2">Start Your Project <ArrowUpRight size={15} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
