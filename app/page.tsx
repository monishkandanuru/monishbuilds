import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import FinalCTA from "@/components/FinalCTA";
export const metadata: Metadata = { alternates: { canonical: "/" } };
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Monish Kandanuru",
  alternateName: "Monish Builds",
  url: "https://monishbuilds.vercel.app/",
};
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollReveal />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <Services />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
