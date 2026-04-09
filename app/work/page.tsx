"use client";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";
export default function WorkPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="pt-20">
        <Projects />
        <FinalCTA />
      </main>
      <FloatingWhatsApp />
      <footer className="border-t border-white/5 py-8 text-center text-muted text-sm font-body">
        © {new Date().getFullYear()} Monish Kandanuru. Built with purpose, not just code.
      </footer>
    </>
  );
}
