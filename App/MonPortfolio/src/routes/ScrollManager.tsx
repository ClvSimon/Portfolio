import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scrollManager.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollManagerProps {
  sections: React.ReactNode[];
}

export default function ScrollManager({ sections }: ScrollManagerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const horizontalWrapper = horizontalRef.current;
    if (!horizontalWrapper) return;

    const setSizesAndTrigger = () => {
      const horizontalSections = Array.from(horizontalWrapper.children) as HTMLElement[];
      const count = horizontalSections.length;

      const totalWidth = window.innerWidth * count; // largeur totale des sections horizontales
      const travel = totalWidth - window.innerWidth; // distance réelle à parcourir

      // supprime anciens ScrollTriggers liés au wrapper avant d'en recréer un
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === horizontalWrapper) st.kill();
      });

      gsap.to(horizontalWrapper, {
        x: () => `-${travel}px`,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapper,
          start: "top top",
          end: () => `+=${travel}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();
    };

    setSizesAndTrigger();
    window.addEventListener("resize", setSizesAndTrigger);

    return () => {
      window.removeEventListener("resize", setSizesAndTrigger);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {/* Pages verticales : garder 2 pages avant l'horizontal */}
      {sections.slice(0, 2).map((section, i) => (
        <div key={i} className="scroll-section">
          {section}
        </div>
      ))}

      {/* Pages horizontales */}
      <div ref={horizontalRef} className="horizontal-wrapper">
        {sections.slice(2).map((section, i) => (
          <div key={i} className="scroll-section">
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}