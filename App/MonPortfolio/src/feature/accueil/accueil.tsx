import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./accueil.css";
import backgroundImage from "../../assets/fond-accueil.png";
import logo from "../../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Accueils() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const logoEl = logoRef.current;
    const contentEl = contentRef.current;
    const bgEl = contentEl?.querySelector<HTMLDivElement>(".animated-background");
    if (!logoEl || !contentEl || !bgEl) return;

    const ratio = logoEl.naturalHeight / logoEl.naturalWidth || 1;

    // Timeline pour le logo
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(logoEl, {
      x: -window.innerWidth / 2 + 230,
      y: -window.innerHeight / 2 + 250,
      width: 500,
      height: 500 * ratio,
      duration: 3,
    });

    tl.to(contentEl, { opacity: 1, duration: 1 }, "+=1");

    // Animation du fond au scroll
    // Animation du fond au scroll (de sombre à clair)
    gsap.fromTo(
      bgEl,
      { scale: 1, filter: "blur(0px) brightness(1)" }, // état initial : zoom + flou + sombre
      {
        scale: 1.2,                             // état final : normal
        filter: "blur(4px) brightness(0.3)",    // état final : plus flou + lumineux
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );


    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
