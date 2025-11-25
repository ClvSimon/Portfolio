import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import CompetenceCard from "./competencesCard";
import COMPETENCES from "./competencesData.json";
import "./competences.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CompetencesPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // séparation entre l'index qui contrôle la rotation (immédiat)
  // et l'index "actif" qui contrôle l'état visuel (apparaît après delay)
  const [rotationIndex, setRotationIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // verrou pour empêcher le spam de boutons pendant transition
  const [isLocked, setIsLocked] = useState(false);

  // réglages (ajuste ces valeurs)
  const activationDelay = 500; // ms avant que la nouvelle carte soit marquée active
  const rotationDuration = 800; // ms durée de la rotation GSAP (doit correspondre à gsap.duration)

  // navigation
  const next = () => {
    if (isLocked) return;
    setIsLocked(true);

    const newRotation = (rotationIndex + 1) % COMPETENCES.length;
    setRotationIndex(newRotation); // déclenche rotation immédiatement

    // après un délai, on marque la carte active (sépare l'apparition visuelle)
    setTimeout(() => {
      setActiveIndex(newRotation);
      // relâche le verrou après la durée effective (sécurité)
      setTimeout(() => setIsLocked(false), Math.max(rotationDuration, activationDelay));
    }, activationDelay);
  };

  const prev = () => {
    if (isLocked) return;
    setIsLocked(true);

    const newRotation = (rotationIndex - 1 + COMPETENCES.length) % COMPETENCES.length;
    setRotationIndex(newRotation);

    setTimeout(() => {
      setActiveIndex(newRotation);
      setTimeout(() => setIsLocked(false), Math.max(rotationDuration, activationDelay));
    }, activationDelay);
  };

  // useEffect qui anime la rotation — écoute rotationIndex (immédiat)
  useEffect(() => {
    const total = COMPETENCES.length;
    const radius = 300;
    const angle = 360 / total;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const offset = (i - rotationIndex) * angle;
      const rad = (offset * Math.PI) / 180;

      gsap.to(card, {
        rotationY: offset,
        x: radius * Math.sin(rad),
        z: radius * Math.cos(rad),
        transformOrigin: "50% 50% 0px",
        duration: rotationDuration / 1000, // gsap attend des secondes
        ease: "power2.inOut",
      });
    });
  }, [rotationIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const titleLine = container.querySelector<HTMLElement>(".competences-title-line");
    if (!titleLine) return;

    gsap.set(titleLine, { x: "-100%" });

    const anim = gsap.to(titleLine, {
      x: "-5%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });
    return () => {
        // nettoyage propre du ScrollTrigger et de l'animation
        if (anim && (anim as any).scrollTrigger) {
          try {
            (anim as any).scrollTrigger.kill();
          } catch {}
        }
        try {
          anim.kill();
        } catch {}
        ScrollTrigger.refresh();
      };
    }, [containerRef]);

  return (
    <section className="competences-section" ref={containerRef}>
      {/* Titre */}
      <h2 className="competences-title">
        Compétences
        <span className="competences-title-line"></span>
      </h2>

      {/* Carousel */}
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
              // isActive dépend maintenant de activeIndex (apparaît après activationDelay)
              isActive={
                idx === activeIndex ||
                idx === (activeIndex - 1 + COMPETENCES.length) % COMPETENCES.length ||
                idx === (activeIndex + 1) % COMPETENCES.length
              }
            />
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="competences-buttons-container">
        <button
          className="competences-button"
          onClick={prev}
          disabled={isLocked}
          aria-disabled={isLocked}
        >
          ◀
        </button>
        <button
          className="competences-button"
          onClick={next}
          disabled={isLocked}
          aria-disabled={isLocked}
        >
          ▶
        </button>
      </div>
    </section>
  );
}