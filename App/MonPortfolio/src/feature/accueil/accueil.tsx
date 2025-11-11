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
  const containerEl = containerRef.current;
  if (!logoEl || !contentEl || !containerEl) return;

  const ratio = logoEl.naturalHeight / logoEl.naturalWidth || 1;

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  tl.to(logoEl, {
    x: -window.innerWidth / 2 + 230,
    y: -window.innerHeight / 2 + 250,
    width: 500,
    height: 500 * ratio,
    duration: 3,
  });
  tl.to(contentEl, { opacity: 1, duration: 1 }, "+=1");

  // refs pour gérer l'instance ScrollTrigger et le listener resize
  const stRef = { current: null as ScrollTrigger | null };
  let resizeHandler: (() => void) | null = null;

  const mm = ScrollTrigger.matchMedia({
    "(min-width: 768px)": () => {
      const page2 = document.querySelector(".page2") as HTMLElement | null;
      const getPage2Height = () =>
        page2 ? page2.offsetHeight : window.innerHeight * 2;

      // factory pour (re)créer le ScrollTrigger
      const createPin = () => {
        // kill l'instance précédente si présente
        if (stRef.current) {
          try { stRef.current.kill(); } catch (e) { /* safe */ }
          stRef.current = null;
        }

        stRef.current = ScrollTrigger.create({
          trigger: containerEl,
          start: "top top",
          end: () => "+=" + getPage2Height(),
          pin: true,
          pinSpacing: false,
          scrub: false,
          // markers: true,
        });
      };

      // création initiale
      createPin();

      // on resize on recrée (plus simple et sûr que muter st.end)
      resizeHandler = () => {
        createPin();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", resizeHandler);

      // renvoi d'un cleanup pour matchMedia (sera appelé par mm.revert() automatiquement)
      return () => {
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
          resizeHandler = null;
        }
        if (stRef.current) {
          try { stRef.current.kill(); } catch (e) { /* safe */ }
          stRef.current = null;
        }
      };
    },

    "(max-width: 767px)": () => {
      // Pas de pin sur mobile ; on renvoie un cleanup no-op
      return () => {};
    },
  });

  return () => {
    tl.kill();
    // kill tous les ScrollTrigger restants
    ScrollTrigger.getAll().forEach((s) => {
      try { s.kill(); } catch (e) { /* safe */ }
    });

    // matchMedia retourne un objet qui peut exposer revert/kill selon la version.
    // On appelle revert si disponible, sinon on essaie kill via any.
    try {
      if ((mm as any).revert) (mm as any).revert();
      else if ((mm as any).kill) (mm as any).kill();
    } catch (e) {
      // ignore
    }
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