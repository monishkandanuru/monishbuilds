import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Trust() {
  return (
    <section id="about" className="about-section shell">
      <span className="eyebrow">03 / THE PERSON BEHIND THE PIXELS</span>
      <div className="about-grid">
        <div className="about-art" aria-hidden="true">
          <span>mk.</span>
          <small>
            CURIOUS BY NATURE.
            <br />
            BUILDER BY CHOICE.
          </small>
          <div>✳</div>
        </div>
        <div className="about-copy">
          <h2>
            A developer’s mind.
            <br />
            <em>A designer’s eye.</em>
          </h2>
          <p>
            I’m Monish, a full-stack and Android developer based in Bangalore,
            India, with a background in Computer Science.
          </p>
          <p>
            I enjoy the space where thoughtful design meets practical
            engineering. From a business’s first website to an app that solves
            an everyday problem, I care about making things useful, clear, and a
            pleasure to use.
          </p>
          <div className="about-details">
            <span>Bangalore, India</span>
            <span>B.Tech · Computer Science</span>
          </div>
          <Link className="text-link" href="/contact">
            Let’s make something together <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="toolkit">
        <span className="eyebrow">MY EVERYDAY TOOLKIT</span>
        <div>
          {[
            "Next.js",
            "React",
            "Tailwind CSS",
            "Firebase",
            "Android",
            "React Native",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
