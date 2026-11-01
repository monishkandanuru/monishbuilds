"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus, ShieldCheck, Dumbbell } from "lucide-react";
const projects = [
  {
    name: "ThermoWatch",
    category: "Web",
    type: "CLIMATE TECH / SIH26083",
    description: "Turning heat-risk intelligence into timely action.",
    detail:
      "A heatwave early-warning and decision-support prototype for Smart India Hackathon. It brings weather-informed risk assessment, district maps, forecasts, Kannada localisation, and response workflows into one interface.",
    stack: "React / TypeScript / Cloudflare",
    href: "https://thermowatch-sih26083.vercel.app/",
    github: "https://github.com/monishkandanuru/thermowatch-sih26083",
    key: "thermowatch",
    image: "/projects/thermowatch.png",
    imageAlt:
      "ThermoWatch command centre with thermal stress indicators and an India district risk map",
    status: "LIVE PROJECT",
    features: [
      "Explainable risk forecasts",
      "Regional-language support",
      "Officer response workflows",
    ],
  },
  {
    name: "FitAI",
    category: "Web",
    type: "FITNESS / FULL-STACK APPLICATION",
    description: "A little progress. A healthier everyday.",
    detail:
      "A Python and Flask fitness journal with account authentication, adult BMI measurement history, workout logs, meal tracking, and a dashboard backed by saved records. The journal keeps user-entered records together in a focused, account-based experience.",
    stack: "Python / Flask / SQL",
    href: "https://fit-ai-olive-delta.vercel.app",
    github: "https://github.com/monishkandanuru/FitAI",
    key: "fitai",
    image: null,
    imageAlt: "",
    status: "LIVE PROJECT",
    features: [
      "Workout and meal journals",
      "Measurement history",
      "Account-based dashboard",
    ],
  },
  {
    name: "NewGen Technologies",
    category: "Web",
    type: "CLIENT WORK / BUSINESS WEBSITE",
    description: "An established engineering business, clearly presented.",
    detail:
      "A collaborative website project for a pharmaceutical and cleanroom infrastructure company. The live site presents engineering services, healthcare segments, GMP consultancy, team information, and routes for prospective customers to get in touch.",
    stack: "Next.js / Tailwind CSS",
    href: "https://newgenprojects.in",
    github: null,
    key: "newgen",
    image: "/projects/newgen.png",
    imageAlt:
      "NewGen Technologies website showing its cleanroom engineering services and contact links",
    status: "LIVE PROJECT",
    features: [
      "Service-focused architecture",
      "Responsive layouts",
      "Collaborative development",
    ],
  },
  {
    name: "SpendWise",
    category: "Web",
    type: "PERSONAL FINANCE / WEB APPLICATION",
    description: "Make sense of where your money goes.",
    detail:
      "A personal expense tracker with account sign-in and a focused interface for understanding spending, designed to make everyday money management easier to follow.",
    stack: "React / Vercel",
    href: "https://spendwisemanagement.vercel.app",
    github: "https://github.com/monishkandanuru/spendwise",
    key: "spendwise",
    image: "/projects/spendwise.png",
    imageAlt: "SpendWise public sign-in screen",
    status: "LIVE PROJECT",
    features: ["Account sign-in", "Expense tracking", "Spending overview"],
  },
  {
    name: "VaultEye",
    category: "Android",
    type: "ANDROID / PRIVACY & FINANCE",
    description: "A different perspective on your digital life.",
    detail:
      "An Android project exploring the relationship between privacy and personal finance intelligence. Visit the public repository for its project overview.",
    stack: "Android",
    href: "https://github.com/monishkandanuru/VaultEye",
    github: "https://github.com/monishkandanuru/VaultEye",
    key: "vaulteye",
    image: null,
    imageAlt: "",
    status: "SOURCE AVAILABLE",
    features: [
      "Android project",
      "Privacy & finance concept",
      "Public project repository",
    ],
  },
];
function Cover({ project }: { project: (typeof projects)[number] }) {
  if (project.image)
    return (
      <div className={"live-capture capture-" + project.key}>
        <div className="capture-chrome">
          <i />
          <i />
          <i />
          <span>{project.name} / WEB EXPERIENCE</span>
        </div>
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={1440}
          height={960}
          sizes="(max-width: 767px) 90vw, (max-width: 1000px) 85vw, 60vw"
        />
      </div>
    );
  if (project.key === "fitai")
    return (
      <div className="fitai-poster" aria-hidden="true">
        <span className="poster-eyebrow">
          A FITNESS JOURNAL FOR YOUR EVERYDAY.
        </span>
        <div className="fitai-logotype">
          fit<span>ai</span>
          <Dumbbell />
        </div>
        <div className="fitai-orbits">
          <i />
          <i />
          <i />
          <span>
            START
            <br />
            <em>somewhere.</em>
          </span>
        </div>
        <div className="poster-baseline">
          <span>MOVE. LOG. REPEAT.</span>
          <span>SMALL STEPS, EVERY DAY. ↗</span>
        </div>
      </div>
    );
  return (
    <div className="vault-poster" aria-hidden="true">
      <ShieldCheck className="vault-symbol" />
      <span className="poster-eyebrow">YOUR DIGITAL LIFE, CONSIDERED.</span>
      <div className="vault-logotype">
        Vault<span>Eye.</span>
      </div>
      <div className="poster-baseline">
        <span>PRIVACY × FINANCE</span>
        <span>AN ANDROID EXPLORATION ↗</span>
      </div>
    </div>
  );
}
export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string[]>([]);
  const shown = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  return (
    <section id="projects" className="work-gallery">
      <div className="shell">
        <div className="gallery-header">
          <div>
            <span className="eyebrow">01 / IDEAS MADE REAL</span>
            <h2>
              Selected <em>work.</em>
              <sup>05</sup>
            </h2>
          </div>
          <p>
            Different challenges.
            <br />
            The same attention to detail.
          </p>
        </div>
        <div className="gallery-toolbar">
          <div
            className="work-filters"
            role="group"
            aria-label="Filter projects"
          >
            {["All", "Web", "Android"].map((f) => (
              <button
                key={f}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f === "All" ? "All projects" : f}
                <span>{f === "All" ? "05" : f === "Web" ? "04" : "01"}</span>
              </button>
            ))}
          </div>
          <span className="gallery-hint">
            EXPLORE THE DETAILS <ArrowDownMark />
          </span>
        </div>
        <span className="sr-only" aria-live="polite">
          Showing {shown.length} {filter.toLowerCase()} projects
        </span>
        <div
          className={
            "editorial-projects" +
            (filter !== "All" ? " filtered-projects" : "")
          }
        >
          {shown.map((p) => (
            <article className={"editorial-project item-" + p.key} key={p.key}>
              <a
                className={"project-cover cover-" + p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  "Open " +
                  p.name +
                  (p.status === "LIVE PROJECT" ? " live project" : " on GitHub")
                }
              >
                <div className="cover-topline">
                  <span>
                    0{projects.indexOf(p) + 1} / {p.name}
                  </span>
                  <span className="project-status">
                    <i />
                    {p.status}
                  </span>
                </div>
                <Cover project={p} />
                <span className="cover-caption">
                  {p.image
                    ? "CAPTURED FROM THE LIVE WEBSITE"
                    : "PROJECT IDENTITY EXPLORATION"}
                </span>
                <span className="cover-open">
                  <ArrowUpRight />
                </span>
              </a>
              <div className="editorial-meta">
                <span className="eyebrow">{p.type}</span>
                <span>{p.stack}</span>
              </div>
              <div className="editorial-title">
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  <h3>{p.name}</h3>
                </a>
                <button
                  aria-label={
                    (expanded.includes(p.key) ? "Hide" : "Show") +
                    " " +
                    p.name +
                    " project details"
                  }
                  aria-expanded={expanded.includes(p.key)}
                  aria-controls={"details-" + p.key}
                  onClick={() =>
                    setExpanded((prev) =>
                      prev.includes(p.key)
                        ? prev.filter((k) => k !== p.key)
                        : [...prev, p.key],
                    )
                  }
                >
                  {expanded.includes(p.key) ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              <p className="project-one-liner">{p.description}</p>
              <div
                className="project-details"
                id={"details-" + p.key}
                hidden={!expanded.includes(p.key)}
              >
                <p>{p.detail}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="project-detail-links">
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.status === "LIVE PROJECT"
                      ? "Visit live project"
                      : "Explore repository"}
                    <ArrowUpRight size={15} />
                  </a>
                  {p.github && p.github !== p.href && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="gallery-footer">
          <span>BUILT WITH CURIOSITY. FINISHED WITH CARE.</span>
          <a
            href="https://github.com/monishkandanuru"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
function ArrowDownMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 1v9M2 6l4 4 4-4" stroke="currentColor" />
    </svg>
  );
}
