import React, { useEffect, useRef } from "react";
import "./Presentation.css";
import profilePic from "../../assets/presentation.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Presentation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={containerRef} className="page2 presentation-container">
        <div className="bottom-center">
          <div className="bottom-center1">Explorez mon monde :</div>
          <div className="bottom-center2">
            Un mélange de parcours, de compétences, de projets et de passions.
          </div>
        </div>
      <div className="presentation-left">
        <img
          src={profilePic}
          alt="Simon Clavel"
          className="presentation-img"
        />
      </div>
      <div className="presentation-right">
        <h2 className="presentation-title">Présentation</h2>
        <div className="presentation-text">
          <p>
            Bonjour ! Je m'appelle Simon Clavel, j'ai 20 ans et je suis étudiant
            en IUT Informatique. Je suis patient, curieux et passionné par
            l'apprentissage constant.
          </p>
          <p>
            J'adore la nature, la pêche, le foot et la pétanque. J'aime
            explorer de nouvelles activités, comprendre comment les choses
            fonctionnent et relever de nouveaux défis.
          </p>
          <p>
            Dans mes projets et études, je mets toujours un point d'honneur à
            être rigoureux et créatif. Je m'intéresse aussi au développement
            web et à la conception de sites.
          </p>
          <p>
            Je suis motivé, sociable et j'aime collaborer avec des équipes pour
            créer des projets innovants et durables.
          </p>
        </div>
      </div>
    </section>
  );
}