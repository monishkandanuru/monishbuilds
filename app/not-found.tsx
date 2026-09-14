import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="not-found shell">
        <span className="eyebrow">404 / A WRONG TURN</span>
        <h1>
          This page took
          <br />a different path.
        </h1>
        <p>Let’s get you back to the good stuff.</p>
        <Link href="/" className="pill-button">
          <ArrowLeft size={18} /> Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
