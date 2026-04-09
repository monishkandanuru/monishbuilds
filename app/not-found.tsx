"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 relative z-10">
        <div className="font-heading font-bold text-[120px] leading-none gradient-text">404</div>
        <h1 className="font-heading font-bold text-2xl text-white">Page not found</h1>
        <p className="text-muted font-body text-base max-w-sm mx-auto">Looks like this page doesn't exist. Let's get you back to something real.</p>
        <a href="/" className="btn-primary inline-flex items-center gap-2 mt-4">
          <span className="flex items-center gap-2"><ArrowLeft size={16} />Back to Home</span>
        </a>
      </motion.div>
    </div>
  );
}
