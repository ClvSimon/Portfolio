import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./layouts.css";

export default function Header() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 4 } // 4s après le logo
    );
  }, []);

  return (
    <div ref={headerRef} className="header">
      <nav className="nav-container">
        <div className="nav-item">Accueil</div>
        <div className="nav-item">Présentation</div>
        <div className="nav-item">Formation</div>
        <div className="nav-item">Compétences</div>
        <div className="nav-item">Projets</div>
      </nav>
    </div>
  );
}
