import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.css";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const columns = gsap.utils.toArray<HTMLElement>(".skills-column", section);

    // Initialisation des colonnes (titre + li invisibles et décalés)
    columns.forEach(column => {
      const title = column.querySelector<HTMLElement>("h3");
      const items = Array.from(column.querySelectorAll<HTMLElement>("li"));
      gsap.set([title, ...items], { autoAlpha: 0, x: "60vw" });
    });

    // Timeline principale pour l'apparition des titres et des items
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${section.scrollWidth}`, // durée totale du scroll
        scrub: 0.25,
        markers: false,
      },
    });

    columns.forEach(column => {
      const title = column.querySelector<HTMLElement>("h3");
      const items = gsap.utils.toArray<HTMLElement>("li", column);

      tl.to(title, { x: 0, autoAlpha: 1, duration: 0.28, ease: "power1.out" }, ">-0.15")
        .to(items, { x: 0, autoAlpha: 1, duration: 0.18, ease: "power1.out", stagger: 0.04 }, ">-0.08");
    });

    tlRef.current = tl;

    // ===== ScrollTrigger indépendant pour le container =====
    const columnsContainer = section.querySelector<HTMLElement>(".skills-columns");

    gsap.to(columnsContainer, {
      x: "100vh",          // distance à parcourir
      ease: "none",        // mouvement linéaire
      scrollTrigger: {
        trigger: section,
        start: `+=${section.scrollWidth/2}`,  // commence dès que la section arrive en haut
        end: () => `+=${section.scrollWidth}`, // durée du scroll
        scrub: 0.25,
        markers: false,
      },
    });

  }, section);

  return () => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    ScrollTrigger.getAll().forEach(st => st.kill());
    ctx.revert();
  };
}, []);



  return (
    <section className="skills-section" id="skills-page" ref={sectionRef}>
      <div className="skills-columns">
        <article className="skills-column" aria-label="Hard Skills">
          <h3 className="skills-subtitle">
            Hard Skills
            <span className="skills-subtitle-line"></span>
          </h3>
          <ul className="skills-list">
            <li>Fullstack : Spring Boot, Node.js, TypeScript</li>
            <li>Frontend : React, GSAP, animation scroll-driven</li>
            <li>Databases : Neo4j (Cypher), PostgreSQL</li>
            <li>DevOps : CI/CD, Docker, GitHub Actions</li>
            <li>Tests & qualité : Jest, testing-library, Sonar</li>
          </ul>
        </article>

        <div className="skills-separator" aria-hidden="true" />

        <article className="skills-column" aria-label="Soft Skills">
          <h3 className="skills-subtitle">
            Soft Skills
            <span className="skills-subtitle-line"></span>
          </h3>
          <ul className="skills-list">
            <li>Communication claire et synthétique</li>
            <li>Leadership technique et mentorship</li>
            <li>Résolution de problèmes et pragmatisme</li>
            <li>Attention au détail et fidélité visuelle</li>
            <li>Collaboration inter-équipes et pédagogie</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Skills;
