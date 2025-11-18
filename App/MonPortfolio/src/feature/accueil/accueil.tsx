import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./accueil.css";
import backgroundImage from "../../assets/fond-accueil.png";
import logo from "../../assets/logo.png";

export default function Accueils() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const logoEl = logoRef.current;
    const contentEl = contentRef.current;
    if (!logoEl || !contentEl) return;

    const ratio = logoEl.naturalHeight / logoEl.naturalWidth || 1;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    // Animation logo
    tl.to(logoEl, {
      x: -window.innerWidth / 2 + 230,
      y: -window.innerHeight / 2 + 250,
      width: 500,
      height: 500 * ratio,
      duration: 3,
    });

    // Apparition du contenu
    tl.to(contentEl, { opacity: 1, duration: 1 }, "+=1");

    return () => {
      tl.kill(); // cleanup de l'animation
    };
  }, []);

  return (
    <div ref={containerRef} className="animated-container">
      {/* Fond + textes */}
      <div ref={contentRef} className="animated-content">
        <div
          className="animated-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="bottom-right">2025</div>
      </div>

      {/* Logo au-dessus du reste */}
      <img ref={logoRef} src={logo} alt="Logo" className="animated-logo" />
    </div>
  );
}
