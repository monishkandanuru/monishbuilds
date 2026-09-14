import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="inner-page">
        <h1 className="sr-only">Start a project with Monish</h1>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
