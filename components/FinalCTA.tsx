import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function FinalCTA() {
  return (
    <section className="contact-cta">
      <div className="shell">
        <div className="section-top">
          <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
          <span className="availability">
            <i /> Available for new projects
          </span>
        </div>
        <Link href="/contact" className="cta-title">
          Let’s make
          <br />
          it <em>happen.</em>
          <ArrowUpRight />
        </Link>
        <div className="cta-bottom">
          <p>
            A new website. A big idea. A better experience.
            <br />
            It all starts with a conversation.
          </p>
          <Link className="pill-button" href="/contact">
            Tell me about your project <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
