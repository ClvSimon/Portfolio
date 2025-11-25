import React, { useState } from "react";

type Project = {
  name: string;
  url: string;
};

type Level = {
  name: string;
  description: string;
  projects?: Project[];
};

type Props = {
  title: string;
  levels: Level[];
  isActive?: boolean;
};

// Import dynamique des images
const images = import.meta.glob("../../assets/competences/*.png", { eager: true, as: "url" });

export default function CompetenceCard({ title, levels, isActive = true }: Props) {
  const [activeLevel, setActiveLevel] = useState(0);

  // On récupère l'image correspondant au titre
  const bgImage = images[`../../assets/competences/${title}.png`] || "";

  return (
    <div
      className="competence-card"
      style={{
        backgroundColor: isActive ? "#b5d4b1" : "#8caf70",
      }}
    >
      {isActive && (
        <>
          <div
            className="competence-card-title"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>{title}</h3>
          </div>

          <div className="competence-card-level">
            <div className="competence-card-level-buttons">
              {levels.map((lvl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLevel(idx)}
                  className={idx === activeLevel ? "active" : ""}
                >
                  {lvl.name}
                </button>
              ))}
            </div>
          </div>

          <div className="competence-card-description">
            <p>{levels[activeLevel].description}</p>
          </div>

          {levels[activeLevel].projects && (
            <div className="competence-card-projects">
              <ul>
                {levels[activeLevel].projects!.map((proj, idx) => (
                  <li key={idx}>
                    <a href={proj.url} target="_blank" rel="noopener noreferrer">
                      {proj.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
