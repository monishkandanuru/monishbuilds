import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import FinalCTA from "@/components/FinalCTA";
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="inner-page">
        <h1 className="sr-only">Selected projects</h1>
        <Projects />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
