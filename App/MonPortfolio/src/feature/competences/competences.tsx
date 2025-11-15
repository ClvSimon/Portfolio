import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import CompetenceCard from "./competencesCard";
import COMPETENCES from "./competencesData.json"; // ton JSON existant
import "./competences.css";

export default function CompetencesPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % COMPETENCES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + COMPETENCES.length) % COMPETENCES.length);

  useEffect(() => {
    const total = COMPETENCES.length;
    const radius = 300;
    const angle = 360 / total;

    cardsRef.current.forEach((card, i) => {
      const offset = (i - activeIndex) * angle;
      const rad = (offset * Math.PI) / 180;

      gsap.to(card, {
        rotationY: offset,
        x: radius * Math.sin(rad),
        z: radius * Math.cos(rad),
        transformOrigin: "50% 50% 0px",
        duration: 0.8,
        ease: "power2.inOut",
      });
    });
  }, [activeIndex]);


  return (
    <section className="competences-section" ref={containerRef}>
      <h2 className="competences-title">Compétences</h2>

      <div className="competences-carousel">
        {COMPETENCES.map((comp, idx) => (
          <div
            key={idx}
            className="carousel-item"
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
          >
            <CompetenceCard
              title={comp.title}
              levels={comp.levels}
              isActive={
                idx === activeIndex || // carte active
                idx === (activeIndex - 1 + COMPETENCES.length) % COMPETENCES.length || // carte avant
                idx === (activeIndex + 1) % COMPETENCES.length // carte après
              }
            />
          </div>
        ))}
      </div>

      <button className="competences-buttons-left" onClick={prev}>◀</button>
      <button className="competences-buttons-right" onClick={next}>▶</button>

    </section>
  );
}
