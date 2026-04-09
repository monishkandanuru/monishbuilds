"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, MessageCircle, ChevronDown, User, Mail, FileText, Target, Banknote, Clock } from "lucide-react";
const WHATSAPP_NUMBER = "919880702013";
const FORMSPREE_ID = "YOUR_FORM_ID";
const serviceOptions = [{ value: "business-website", label: "Business Website" },{ value: "web-app", label: "Web Application" },{ value: "mobile-app", label: "Mobile App" },{ value: "custom-solution", label: "Custom Solution" },{ value: "not-sure", label: "Not Sure Yet" }];
const budgetOptions = [{ value: "5k-10k", label: "5,000 - 10,000" },{ value: "10k-25k", label: "10,000 - 25,000" },{ value: "25k-50k", label: "25,000 - 50,000" },{ value: "50k+", label: "50,000+" }];
const timelineOptions = [{ value: "asap", label: "ASAP" },{ value: "1month", label: "Within 1 month" },{ value: "flexible", label: "Flexible" }];
export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", service: "", goal: "", budget: "", timeline: "", details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(function(prev) { return { ...prev, [name]: value }; });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const subject = encodeURIComponent("New Project Inquiry - " + formData.service);
    const body = encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\nService: " + formData.service + "\nGoal: " + formData.goal + "\nBudget: " + formData.budget + "\nTimeline: " + formData.timeline + "\nDetails: " + formData.details);
    setTimeout(function() { setLoading(false); setSubmitted(true); fetch("https://formspree.io/f/" + FORMSPREE_ID, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }); }, 1000);
  }
  const isValid = formData.name && formData.email && formData.service && formData.goal && formData.budget;
  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:sticky lg:top-28 space-y-7">
            <div>
              <span className="section-label block mb-4">Get in Touch</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
                {"Let's Build "}<span className="gradient-text">Something Valuable</span>
              </h2>
              <p className="font-body text-muted mt-4 text-base leading-relaxed">{"Tell me about your project and I'll respond with the best approach."}</p>
            </div>
            <div className="glass rounded-2xl p-5 space-y-3">
              <p className="font-heading font-semibold text-sm text-white mb-4">What happens next?</p>
              {["I review your submission within 24 hours","I respond with an initial approach","We schedule a short discovery call","You get a clear scope, timeline and quote"].map(function(step, i) {
                return (<div key={i} className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[9px] font-heading font-bold text-white">{i + 1}</span></div><p className="text-muted text-sm font-body">{step}</p></div>);
              })}
            </div>
            <div className="space-y-3">
              <p className="text-muted text-xs font-body">Prefer to chat directly?</p>
              <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full glass rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center"><MessageCircle size={16} className="text-green-400" /></div>
                <div><p className="font-heading font-semibold text-sm text-white">Chat on WhatsApp</p><p className="text-muted text-xs font-body">Quick questions welcome</p></div>
                <span className="ml-auto text-muted group-hover:text-green-400 transition-colors text-sm">{"→"}</span>
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-10 text-center space-y-4 border border-primary/20">
                <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center mx-auto"><Send size={24} className="text-white" /></div>
                <h3 className="font-heading font-bold text-2xl text-white">Message Sent!</h3>
                <p className="text-muted font-body">{"Thanks! I'll get back to you within 24 hours."}</p>
                <button onClick={function() { setSubmitted(false); }} className="btn-secondary text-sm mt-4">Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-muted font-body"><User size={11} /> Your Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Rahul Sharma" className="premium-input" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-muted font-body"><Mail size={11} /> Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@business.com" className="premium-input" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs text-muted font-body"><FileText size={11} /> What do you need? *</label>
                  <div className="relative">
                    <select name="service" value={formData.service} onChange={handleChange} className="premium-select" required>
                      <option value="" disabled>Select a service...</option>
                      {serviceOptions.map(function(o) { return <option key={o.value} value={o.value}>{o.label}</option>; })}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs text-muted font-body"><Target size={11} /> What is your goal? *</label>
                  <input type="text" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Get more clients, improve my online presence..." className="premium-input" required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-muted font-body"><Banknote size={11} /> Budget Range *</label>
                    <div className="relative">
                      <select name="budget" value={formData.budget} onChange={handleChange} className="premium-select" required>
                        <option value="" disabled>Select budget...</option>
                        {budgetOptions.map(function(o) { return <option key={o.value} value={o.value}>{o.label}</option>; })}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-muted font-body"><Clock size={11} /> Timeline</label>
                    <div className="relative">
                      <select name="timeline" value={formData.timeline} onChange={handleChange} className="premium-select">
                        <option value="" disabled>Select timeline...</option>
                        {timelineOptions.map(function(o) { return <option key={o.value} value={o.value}>{o.label}</option>; })}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs text-muted font-body"><FileText size={11} /> Project Details</label>
                  <textarea name="details" value={formData.details} onChange={handleChange} rows={4} placeholder="Describe your project..." className="premium-input resize-none" />
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <button type="submit" disabled={!isValid || loading} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                    <span className="flex items-center gap-2">
                      {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>) : (<><Send size={15} />Send My Brief</>)}
                    </span>
                  </button>
                  <p className="text-muted text-xs font-body">I typically respond within 24 hours.</p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
