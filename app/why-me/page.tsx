import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Trust from "@/components/Trust";
import FinalCTA from "@/components/FinalCTA";
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="inner-page">
        <h1 className="sr-only">About Monish Kandanuru</h1>
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
