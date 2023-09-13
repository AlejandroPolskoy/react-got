import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import HomePage from "./Pages/HomePage";
import { Characters, CharacterDetails } from "./Pages/Characters";
import Cronologia from "./Pages/Cronologia";
import { Casas, CasasDetails } from "./Pages/Casas";
import React, { useState } from 'react';

export const url = "https://got-api-tau.vercel.app";
//export const url = "http://localhost:8000";
export const ContextLanguage = React.createContext();
export const t = {
  en: {
    characters: "Characters",
    houses: "Houses",
    chronology: "Chronology",
    search: "Search",
    return: "Return",

    house: "House",
    alliances: "alliances",
    parents: "Parents",
    apparation: "Apparation",
    siblings: "Siblings",
    titles: "Titles",

    settlement: "Settlement",
    region: "Region",
    religions: "Religions",
    foundation: "Foundation",
  },
  es: {
    characters: "Personajes",
    houses: "Casas",
    chronology: "Cronologia",
    search: "Buscar",
    return: "Volver",

    house: "Casa",
    alliances: "Alianzas",
    parents: "Padres",
    apparation: "Apariciones",
    siblings: "Descendientes",
    titles: "Titulos",

    settlement: "Sede",
    region: "Region",
    religions: "Religiones",
    foundation: "Fundacion",
  }
}

function App() {
  const [lang, setLang] = useState("es");
  const [searching, setSearch] = useState("");

  return (
    <Router>
    <div className="App">
      <ContextLanguage.Provider value={{lang, setLang, searching, setSearch}} >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/characters" element={<Characters/>} />
        <Route path="/characters/:id" element={<CharacterDetails/>} />
        <Route path="/houses" element={<Casas/>} />
        <Route path="/houses/:id" element={<CasasDetails/>} />
        <Route path="/cronologia" element={<Cronologia/>} />
      </Routes>
      </ContextLanguage.Provider>
    </div>
    
    </Router>
  );
}

export default App;
