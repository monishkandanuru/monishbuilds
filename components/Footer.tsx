import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer shell">
      <a href="/" className="wordmark">
        monish
        <span aria-hidden="true" />
      </a>
      <span>© {new Date().getFullYear()} Monish Kandanuru</span>
      <div>
        <a
          href="https://github.com/monishkandanuru"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={14} />
        </a>
        <a
          href="https://wa.me/919880702013"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp <ArrowUpRight size={14} />
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
