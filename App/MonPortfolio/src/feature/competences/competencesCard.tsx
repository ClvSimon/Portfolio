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

export default function CompetenceCard({ title, levels, isActive = true }: Props) {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div
      className="competence-card"
      style={{
        backgroundColor: isActive ? "#b5d4b1" : "#435966",
      }}
    >
      {isActive && (
        <>
          <div className="competence-card-title">
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
