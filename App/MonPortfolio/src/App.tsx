import React from "react";
import Header from "./components/layouts/header";
import Accueils from "./feature/accueil/accueil";
import Presentation from "./feature/présentation/presentation";
import Parcours from "./feature/parcours/parcours";
import Skills from "./feature/skills/skills";
import Competences from "./feature/competences/competences";
import ScrollManager from "./routes/ScrollManager";

function App() {
  return (
    <>
      {/* Header fixe en haut */}
      <Header />

      {/* Toutes les sections scrollables passent dans ScrollManager */}
      <ScrollManager
        sections={[
          <Accueils />,
          <Presentation />,
          <Parcours />,
          <Skills />,
          <Competences />,
        ]}
      />
    </>
  );
}

export default App;
