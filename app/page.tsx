import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import FinalCTA from "@/components/FinalCTA";
export default function Page() {
  return (
    <>
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
