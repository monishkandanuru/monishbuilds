"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <FinalCTA />
      </main>
      <FloatingWhatsApp />
      <footer className="border-t border-white/5 py-8 text-center text-muted text-sm font-body">
        © {new Date().getFullYear()} Monish Kandanuru. Built with purpose, not just code.
      </footer>
    </>
  );
}
