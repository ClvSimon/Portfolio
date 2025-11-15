import React from "react";
import Header from "./components/layouts/header";
import Accueils from "./feature/accueil/accueil"; // correspond au composant Accueils
import Presentation from "./feature/présentation/presentation";
import Parcours from "./feature/parcours/parcours";
import Competences from "./feature/competences/competences";

function App() {
  return (
    <>
      <Header />
      <Accueils />
      <Presentation />
      <Parcours/>
      <Competences/>

    </>
  );
}

export default App;