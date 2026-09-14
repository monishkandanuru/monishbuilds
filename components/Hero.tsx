"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";

export default function Hero() {
  const artwork = useRef<HTMLDivElement>(null);
  function moveArtwork(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    artwork.current?.style.setProperty("--tilt-x", `${-y * 10}deg`);
    artwork.current?.style.setProperty("--tilt-y", `${x * 12}deg`);
  }
  function resetArtwork() {
    artwork.current?.style.setProperty("--tilt-x", "0deg");
    artwork.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <section className="identity-hero shell">
      <div className="hero-top">
        <span className="eyebrow">
          INDEPENDENT DEVELOPER · BANGALORE, INDIA
        </span>
        <span className="availability">
          <i /> Available for select projects
        </span>
      </div>
      <div className="identity-stage">
        <div className="identity-copy">
          <div className="identity-prelude">
            <Asterisk className="tiny-cross" size={20} aria-hidden="true" /> A
            LITTLE INTRODUCTION
          </div>
          <h1>
            Monish
            <span>
              Kandanuru<span className="orange">.</span>
            </span>
          </h1>
          <p className="identity-role">
            Creative developer.
            <br />
            Equal parts <em>logic & instinct.</em>
          </p>
          <Link className="hero-work-button" href="#projects">
            Discover my work <ArrowDown size={18} />
          </Link>
        </div>
        <div
          className="sculpture-stage"
          onPointerMove={moveArtwork}
          onPointerLeave={resetArtwork}
          aria-hidden="true"
        >
          <span className="sculpture-caption">
            FIG. 01 — A DIFFERENT PERSPECTIVE
          </span>
          <div className="sculpture-image" ref={artwork}>
            <Image
              src="/monish-chrome.png"
              alt=""
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 767px) 80vw, 48vw"
              quality={85}
            />
          </div>
          <div className="sculpture-stamp">
            <ArrowUpRight size={26} />
            <span>
              OPEN TO
              <br />
              GOOD IDEAS
            </span>
          </div>
          <span className="sculpture-coordinate">MK / FORM & FUNCTION</span>
        </div>
      </div>
      <div className="identity-footer">
        <div className="identity-note">
          <span>01 / THE SHORT VERSION</span>
          <p>
            I turn ideas into websites and apps
            <br />
            with a clear purpose and a point of view.
          </p>
        </div>
        <div className="identity-specialties">
          <span>FULL-STACK DEVELOPMENT</span>
          <span>ANDROID APPLICATIONS</span>
          <span>THOUGHTFUL INTERFACES</span>
        </div>
        <Link href="/contact" className="identity-contact">
          Have an idea?
          <br />
          <span>
            Let’s make it real <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
