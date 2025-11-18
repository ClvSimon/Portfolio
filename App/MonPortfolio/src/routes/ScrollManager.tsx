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

    const horizontalSections = Array.from(horizontalWrapper.children) as HTMLElement[];

    // Force chaque section horizontale à 100vw / 100vh
    horizontalSections.forEach(sec => {
      sec.style.width = `${window.innerWidth}px`;
      sec.style.height = `100vh`;
      sec.style.minHeight = `100vh`;
      sec.style.boxSizing = "border-box";
    });

    const totalWidth = window.innerWidth * horizontalSections.length;

    gsap.to(horizontalWrapper, {
      x: () => `-${totalWidth - window.innerWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: horizontalWrapper,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {/* Pages verticales */}
      {sections.slice(0, 3).map((section, i) => (
        <div key={i} className="scroll-section">
          {section}
        </div>
      ))}

      {/* Pages horizontales */}
      <div ref={horizontalRef} className="horizontal-wrapper">
        {sections.slice(3).map((section, i) => (
          <div key={i} className="scroll-section">
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}
