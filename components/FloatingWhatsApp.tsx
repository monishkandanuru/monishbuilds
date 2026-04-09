"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
const WHATSAPP_NUMBER = "919880702013";
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(function() {
    const t = setTimeout(function() { setVisible(true); }, 3000);
    return function() { clearTimeout(t); };
  }, []);
  useEffect(function() {
    if (!visible) return;
    const t = setTimeout(function() {
      setTooltipOpen(true);
      setTimeout(function() { setTooltipOpen(false); }, 4000);
    }, 1500);
    return function() { clearTimeout(t); };
  }, [visible]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10, scale: 0.9 }} transition={{ duration: 0.3 }} className="glass rounded-2xl px-4 py-3 border border-green-500/20 max-w-[200px] relative">
                <button onClick={function() { setTooltipOpen(false); }} className="absolute top-2 right-2 text-muted hover:text-white">
                  <X size={10} />
                </button>
                <p className="font-heading font-semibold text-sm text-white mb-0.5">Have a question?</p>
                <p className="text-muted text-xs font-body">Chat with me on WhatsApp.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer" onClick={function() { setTooltipOpen(false); }} className="group relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
            <MessageCircle size={22} className="text-white" />
            <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
