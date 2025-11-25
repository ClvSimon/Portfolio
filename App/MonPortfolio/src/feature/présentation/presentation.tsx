import React, { useEffect, useRef } from "react";
import "./Presentation.css";
import profilePic from "../../assets/presentation.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Presentation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const leftColumn = containerRef.current.querySelector<HTMLDivElement>(
      ".presentation-left"
    );
    const title = containerRef.current.querySelector<HTMLHeadingElement>(
      ".presentation-title"
    );

    // Pin de l'image
    if (leftColumn) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColumn,
        pinSpacing: false,
      });
    }

    // Pin du titre en parallèle
    if (title) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: title,
        pinSpacing: false,
      });
    }
    
    // Animation d'entrée de l'image quand on arrive sur la section
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: -300 }, // image en dessous et invisible
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top%", // commence quand la section arrive dans le viewport
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }

    // Animation du trait derrière le titre
    const titleLine = containerRef.current.querySelector(".title-line");

    if (titleLine) {
      gsap.fromTo(
        titleLine,
        { x: "100%" },     // Hors de la zone, à droite
        {
          x: "-5%",
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
    }


    // Animation des paragraphes
    const paragraphs = containerRef.current.querySelectorAll<HTMLParagraphElement>(
      ".presentation-text p"
    );

    paragraphs.forEach((p) => {
      // apparition progressive
      gsap.fromTo(
        p,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: p,
            start: "top 80%", // commence un peu avant le milieu
            end: "top 50%",   // milieu de l'écran
            scrub: true,
          },
        }
      );

      // disparition progressive
      gsap.fromTo(
        p, 
        { opacity: 1, y: -50},
        {
          opacity: 0,
          y:0,
          scrollTrigger: {
            trigger: p,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
        },
      });
    });

    // Animation de sortie de l'image quand on quitte la section
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          x: -300, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 80%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }


    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);



  return (
    <section ref={containerRef} className="page2 presentation-container">
      <h2 className="presentation-title">
        Qui suis-je ?
        <span className="title-line"></span>
      </h2>
      <div className="presentation-left">
        <img
          ref={imgRef}
          src={profilePic}
          alt="Simon Clavel"
          className="presentation-img"
        />
      </div>
      <div className="presentation-right">
        <div className="presentation-text">
          <p>
            Bonjour ! Je m'appelle Simon Clavel, j'ai 20 ans et je suis étudiant
            en IUT Informatique Réalisation d'applications : conception, développement, validation à Blagnac. 
          </p>
          <p>
            Je suis sociable, patient, curieux, passionné par
            l'apprentissage constant et j'aime collaborer avec des équipes pour
            créer des projets innovants et durables.
          </p>
          <p>
            Je suis un passionné de sport, de toute variété, notamment le rugby, le tennis, l'athletisme, 
            mais aussi le billard, les flechettes et surtout le foot ! visca el barca !
          </p>
            
          <p>
            J’ai aussi un vrai amour pour la nature et pour tout ce qu’elle offre : 
            paysages, calme et moments de contemplation. La pêche est donc pour moi 
            une manière de vivre pleinement ces instants, entre patience, émerveillement 
            et plaisir de la découverte.
          </p>
            
            
          <p>
             J’aime partir à la découverte de nouvelles activités, comprendre comment elles 
             fonctionnent et relever des défis. Si vous avez l’occasion de me montrer quelque 
             chose de nouveau, je serais ravi d’essayer et d’apprendre à vos côtés !
          </p>
          
        </div>
      </div>
    </section>
  );
}
