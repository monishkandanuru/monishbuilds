import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import FinalCTA from "@/components/FinalCTA";
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="inner-page">
        <h1 className="sr-only">Web and app development services</h1>
        <Services />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
