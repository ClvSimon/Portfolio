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

    // Colonnes : invisibles et décalées
    gsap.set([hard, soft], { autoAlpha: 0, x: "80vw" });

    // Titres + chaque li séparément
    const hardTitle = hard.querySelector("h3");
    const hardListItems = hard.querySelectorAll("li");
    const softTitle = soft.querySelector("h3");
    const softListItems = soft.querySelectorAll("li");

    gsap.set(
      [hardTitle, ...hardListItems, softTitle, ...softListItems],
      { autoAlpha: 0, x: "80vw" }
    );

    // Eviter overflow visuel
    section.style.overflow = "hidden";

    // ---------------------------
    // Calcul end basé sur la largeur
    // ---------------------------
    const computedEnd = () => {
      const vw = window.innerWidth;
      const factor = 1;
      return Math.max(stack.scrollWidth || vw, Math.round(vw * factor));
    };

    // ---------------------------
    // Timeline scrubbée
    // ---------------------------
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top top",
        end: () => `+=${computedEnd()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true, // désactiver après debug
      }
    });

    // Colonnes entrent
    tl.to(hard, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0)
      .to(soft, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);

    // Hard Skills : titre puis li en cascade
    tl.to(hardTitle, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, ">-0.2")
      .to(
        hardListItems,
        { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.12 },
        ">-0.1"
      );

    // Soft Skills : titre puis li en cascade
    tl.to(softTitle, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, ">-0.2")
      .to(
        softListItems,
        { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.12 },
        ">-0.1"
      );

    // ---------------------------
    // Cleanup
    // ---------------------------
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      section.style.overflow = "";
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
