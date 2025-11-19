import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParcoursCard from "./parcoursCard";
import "./parcours.css";

import bg1 from "../../assets/college-batiment.jpg";
import bg2 from "../../assets/lycee-batiment2.jpg";
import bg3 from "../../assets/iut-batiment2.png";

gsap.registerPlugin(ScrollTrigger);

type Entry = {
  year: string;
  title: string;
  institution: string;
  details?: string;
  bgImage: string;
};

const ENTRIES: Entry[] = [
  {
    year: "2022",
    title: "Baccalauréat Général",
    institution: "Lycee François Mitterrand, 82200 Moissac",
    details: "Spécialitées : Math, NSI, Physique",
    bgImage: bg3,
  },
  {
    year: "2024",
    title: "DUT Informatique",
    institution: "IUT Blagnac, 31700 Blagnac",
    details: "Spécialisation : Réalisation d'applications (conception, développement, validation)",
    bgImage: bg2,
  },
  {
    year: "2025",
    title: "BUT Informatique (en cours)",
    institution: "IUT Blagnac, 31700 Blagnac",
    details: "Spécialisation : Réalisation d'applications (conception, développement, validation)",
    bgImage: bg1,
  },
  
  
];

export default function ParcoursPage() {
  const containerRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const lineEl = lineRef.current;
    const ballEl = ballRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container || !lineEl || !ballEl || items.length === 0) return;

    const vh = window.innerHeight;

    gsap.set(lineEl, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(ballEl, { yPercent: -50, opacity: 1, scale: 1 });
    items.forEach((it) => gsap.set(it, { autoAlpha: 0, y: 20 }));

    const totalDuration = 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 50%",
        end: () => "+=" + Math.round(vh * 0.5),
        scrub: 0.2,
      },
      defaults: { immediateRender: false },
    });

    tl.to(lineEl, { scaleY: 1, duration: 0.25, ease: "none" }, 0);

    requestAnimationFrame(() => {
      const lineH = lineEl.offsetHeight || Math.round(vh * 0.6);
      const ballHalf = ballEl.offsetHeight / 2 || 12;

      tl.to(
        ballEl,
        {
          y: lineH - ballHalf,
          duration: totalDuration,
          ease: "none",
        },
        0
      );

      items.forEach((it, i) => {
        const pct = items.length > 1 ? i / (items.length - 1) : 0;
        const time = pct * totalDuration;

        tl.to(
          it,
          { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" },
          time + 0.02
        );
      });

      ScrollTrigger.refresh();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const rafRefresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener("load", rafRefresh);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", rafRefresh);
    };
  }, []);

  return (
    <section ref={containerRef} className="parcours-section page3">
      <h2 className="parcours-title">Mon Parcours</h2>

      <div className="parcours-timeline-wrapper">
        <div className="parcours-left">
          <div className="parcours-line-wrap">
            <div className="parcours-line" ref={lineRef} aria-hidden="true" />
            <div className="parcours-ball" ref={ballRef} aria-hidden="true" />
          </div>
        </div>

        <div className="parcours-items">
          {ENTRIES.map((entry, idx) => (
            <ParcoursCard
              key={entry.year + idx}
              ref={(el) => { itemsRef.current[idx] = el }} // <-- bien retourner void
              year={entry.year}
              title={entry.title}
              institution={entry.institution}
              details={entry.details}
              bgImage={entry.bgImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
