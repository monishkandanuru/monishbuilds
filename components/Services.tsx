import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const services = [
  {
    title: "Websites with personality.",
    desc: "Fast, responsive websites that communicate who you are and give your visitors a clear next step.",
    tags: "BUSINESS WEBSITES / PORTFOLIOS / LANDING PAGES",
  },
  {
    title: "Products that feel effortless.",
    desc: "Custom web applications, dashboards, and tools that make complex tasks feel simple.",
    tags: "WEB APPS / DASHBOARDS / INTEGRATIONS",
  },
  {
    title: "Ideas that go places.",
    desc: "Thoughtful Android and React Native apps, shaped around how people actually use their phones.",
    tags: "MOBILE APPS / FIREBASE / CUSTOM DEVELOPMENT",
  },
];
export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="shell">
        <div className="section-top">
          <span className="eyebrow">02 / WHAT I DO</span>
          <span className="section-note">
            From the first sketch to the final build.
          </span>
        </div>
        <div className="services-heading">
          <h2>
            Considered design.
            <br />
            <em>Capable code.</em>
          </h2>
          <p>
            One person, from idea to launch.
            <br />A connected approach to making
            <br />
            your next digital thing.
          </p>
        </div>
        <div>
          {services.map((s, i) => (
            <Link className="service-row" href="/contact" key={s.title}>
              <span className="service-index">0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <span className="eyebrow">{s.tags}</span>
              </div>
              <p>{s.desc}</p>
              <ArrowUpRight className="service-arrow" size={28} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
