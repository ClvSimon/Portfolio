import React from "react";
import Header from "./components/layouts/header";
import Accueils from "./feature/accueil/accueil"; // correspond au composant Accueils
import Presentation from "./feature/présentation/presentation";
import Parcours from "./feature/parcours/parcours";
import Competences from "./feature/competences/competences";
import Skills from "./feature/skills/skills";


function App() {
  return (
    <>
      <Header />
      <Accueils />
      <Presentation />
      <Parcours/>
      <Skills/>
      <Competences/>

    </>
  );
}

export default App;