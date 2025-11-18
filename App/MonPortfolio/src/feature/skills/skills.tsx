import React from "react";
import "./skills.css";

const Skills: React.FC = () => {
  return (
    <section className="skills-section" id="skills-page">
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
          Place ce composant après ta section "Parcours" dans le DOM.
        </p>
      </div>
    </section>
  );
};

export default Skills;
