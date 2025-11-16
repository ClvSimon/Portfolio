import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.css";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 30, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            // scrub: true,
            // markers: true,
          },
        }
      );
    }, el);

    // assure que ScrollTrigger calcule correctement après montage
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      // optionnel : ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="skills-section" ref={rootRef} id="skills-page">
      <div className="skills-inner">
        <h2 className="skills-title">Skills</h2>

        <div className="skills-columns">
          <article className="skills-column">
            <h3 className="skills-subtitle">Hard Skills</h3>
            <ul className="skills-list">
              <li>Fullstack : Spring Boot, Node.js, TypeScript</li>
              <li>Frontend : React, GSAP, animation scroll-driven</li>
              <li>Databases : Neo4j (Cypher), PostgreSQL</li>
              <li>DevOps : CI/CD, Docker, GitHub Actions</li>
              <li>Tests & qualité : Jest, testing-library, Sonar</li>
            </ul>
          </article>

          <article className="skills-column">
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

        <p className="skills-note">
          Place ce composant après ta section "Parcours" dans le DOM pour que l'animation se déclenche au scroll.
        </p>
      </div>
    </section>
  );
};

export default Skills;