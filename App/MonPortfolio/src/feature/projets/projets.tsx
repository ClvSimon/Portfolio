import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import projetsData from "./projets.json";
import "./projets.css";

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";



export default function Projets() {
  const [projets, setProjets] = useState<any[]>([]);
  const [index, setIndex] = useState(0); // projet affiché
  const smallCircleRef = useRef<HTMLDivElement>(null);
  // Ajoute cet état en haut avec tes autres useState
  const [imageIndex, setImageIndex] = useState(0);

  // Fonction pour aller à l'image suivante
  const nextImage = () => {
    setImageIndex((prev) =>
      prev === projet.images.fichiers.length - 1 ? 0 : prev + 1
    );
  };

  // Fonction pour aller à l'image précédente
  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? projet.images.fichiers.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    setProjets(projetsData.projets); // ⬅️ chargement JSON
  }, []);

  if (projets.length === 0) return <div>Chargement...</div>;

  const projet = projets[index];

  const handleCircleClick = () => {
    // changer de projet
    setIndex((prev) => (prev === projets.length - 1 ? 0 : prev + 1));

    // animation de rotation autour du centre
    if (smallCircleRef.current) {
      gsap.to(smallCircleRef.current, {
        duration: 3, // durée de l'animation
        rotation: "+=360", // rotation autour du centre
        transformOrigin: "50vh", // centre du grand cercle (à adapter)
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="projet-section">
      
      {/* LEFT */}
      <div className="projet-left">
        <div className="left-top">
          <h2 className="projet-title">{projet.titre}</h2>
        </div>
        <div className="left-middle">
          <p className="projet-info">{projet.nombreMembres} membres</p>
          <p className="projet-info">Durée : {projet.duree}</p>
        </div>
        <div className="left-bottom">
          <div className="projet-tags">
            {projet.technologies.map((tech: string, i: number) => (
              <div key={i} className="tag">{tech}</div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="projet-center">
        <div className="projet-image-box">
          <button className="arrow-btn" onClick={prevImage}>◀</button>
          <img
            className="projet-image"
            src={new URL(
              `../../assets/projets/${projet.images.dossier}/${projet.images.fichiers[imageIndex]}`,
              import.meta.url
            ).href}
            alt={projet.titre}
          />
          <button className="arrow-btn" onClick={nextImage}>▶</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="projet-right">
        <div className="big-circle"></div>
        <div className="big-circle-line"></div>

        <div
          className="small-circle"
          ref={smallCircleRef}
          onClick={handleCircleClick}        
        ></div>
      </div>

    </div>
  );
}
