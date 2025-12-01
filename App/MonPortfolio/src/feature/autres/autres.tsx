import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./autres.css";

const Autres: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Largeur totale du contenu dupliqué
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 9,       // vitesse : plus petit = plus rapide
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <section className="autres-section">
      <div className="autres-marquee">
        <div className="autres-track" ref={trackRef}>
          <span className="autres-text">
            Autres Experiences • Permis B • Anglais (niveau B2) • Récolte de fruit • Babysitting • La croix rouge •
          </span>
          <span className="autres-text">
            Autres Experiences • Permis B • Anglais (niveau B2) • Récolte de fruit • Babysitting • La croix rouge •
          </span>
        </div>
      </div>
    </section>
  );
};

export default Autres;
