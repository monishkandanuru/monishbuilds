"use client";
import { useEffect } from "react";
export default function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!preference.matches)
            animations.push(
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(24px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
              ),
            );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".editorial-project, .service-row, .about-grid, .cta-title",
      )
      .forEach((el) => observer.observe(el));
    const stopMotion = () => {
      if (preference.matches) animations.forEach((a) => a.cancel());
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      preference.removeEventListener("change", stopMotion);
    };
  }, []);
  return null;
}
