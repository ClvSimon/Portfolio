import React, { useEffect, useRef, type ReactElement } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollManagerProps {
  verticalSections?: ReactElement[];
  horizontalSections?: ReactElement[];
}

const ScrollManager: React.FC<ScrollManagerProps> = ({
  verticalSections = [],
  horizontalSections = [],
}) => {
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (horizontalSections.length > 0 && horizontalRef.current) {
      const sections = horizontalRef.current.children;
      const totalWidth = horizontalRef.current.scrollWidth;

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 0, // scroll classique, plus de smooth
          end: () => `+=${totalWidth - window.innerWidth}`,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [horizontalSections]);

  return (
    <div ref={verticalRef}>
      {/* Sections verticales */}
      {verticalSections.map((Section, index) => (
        <div key={index} style={{ minHeight: "100vh" }}>
          {Section}
        </div>
      ))}

      {/* Container horizontal */}
      {horizontalSections.length > 0 && (
        <div
          ref={horizontalRef}
          style={{
            display: "flex",
            flexDirection: "row",
            width: `${horizontalSections.length * 100}vw`,
            height: "100vh",
          }}
        >
          {horizontalSections.map((Section, index) => (
            <div key={index} style={{ flex: "0 0 100vw", height: "100%" }}>
              {Section}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollManager;
