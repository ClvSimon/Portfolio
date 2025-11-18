import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.css";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const hardRef = useRef<HTMLElement | null>(null);
  const softRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
  const section = sectionRef.current;
  const stack = stackRef.current;
  const hard = hardRef.current;
  const soft = softRef.current;
  if (!section || !stack || !hard || !soft) return;

  // ---------------------------
  // Initial states
  // ---------------------------
  // texte/positions des blocs
  gsap.set(hard, { autoAlpha: 0, x: "80vw" });
  gsap.set(soft, { autoAlpha: 0, x: "80vw" });

  // fond initial de la section (assure que le départ est bien la couleur souhaitée)
  section.style.backgroundColor = "#ebe8db";

  // Optionnel : éviter overflow visuel
  section.style.overflow = "hidden";

  // ---------------------------
  // Calcul end basé sur la largeur (horizontal mapping)
  // ---------------------------
  const computedEnd = () => {
    const vw = window.innerWidth;
    // facteur à ajuster si tu veux l'animation plus longue ou plus courte
    const factor = 2;
    return Math.max(stack.scrollWidth || vw, Math.round(vw * factor));
  };

  // ---------------------------
  // Timeline scrubbée
  // ---------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${computedEnd()}`,
      scrub: 0.7,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: true // désactive après debug
    }
  });

  // 1) Animer le fond de #ebe8db vers un gris très foncé (#2a2a2a ici)
  tl.to(section, { backgroundColor: "#000", duration: 0.3, ease: "none" }, 0);
  // 2) Tweens de contenu : faire apparaître les deux colonnes
  //    on garde les mêmes positions de départ et on les fait entrer rapidement
  tl.to(hard, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0)
    .to(soft, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);

  // Cleanup
  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
    section.style.overflow = "";
    // optionnel : remettre la couleur initiale (ou laisser telle quelle)
    // section.style.backgroundColor = "";
  };
}, []);

  return (
    <section className="skills-section" id="skills-page" ref={sectionRef}>
      <div className="skills-columns" ref={stackRef}>
        <article className="skills-column" ref={hardRef} aria-label="Hard Skills">
          <h3 className="skills-subtitle">Hard Skills</h3>
          <ul className="skills-list">
            <li>Fullstack : Spring Boot, Node.js, TypeScript</li>
            <li>Frontend : React, GSAP, animation scroll-driven</li>
            <li>Databases : Neo4j (Cypher), PostgreSQL</li>
            <li>DevOps : CI/CD, Docker, GitHub Actions</li>
            <li>Tests & qualité : Jest, testing-library, Sonar</li>
          </ul>
        </article>

        <div className="skills-separator" aria-hidden="true" />

        <article className="skills-column" ref={softRef} aria-label="Soft Skills">
          <h3 className="skills-subtitle">Soft Skills</h3>
          <ul className="skills-list">
            <li>Communication claire et synthétique</li>
            <li>Leadership technique et mentorship</li>
            <li>Résolution de problèmes et pragmatisme</li>
            <li>Attention au détail et fidélité visuelle</li>
            <li>Collaboration inter‑équipes et pédagogie</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Skills;