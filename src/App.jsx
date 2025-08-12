import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CreateCard from "./components/CreateCard/CreateCard";
import CardModal from "./components/CardModal/CardModal";
import {
  getPokemonByName,
  getAllPokemon,
  getPokemonTypes,
} from "./utils/pokeapi";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleCreateCardClick = () => {
    setActiveModal("card");
  };
  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(e.target.elements.card__shiny.checked); // Access the shiny input value
    getPokemonByName(e.target.elements.card__name.value.toUpperCase()).then(
      (pokemon) => {
        console.log("Pokemon data fetched:", pokemon);
        let img = document.getElementsByClassName("card__img")[0];
        let checked = e.target.elements.card__shiny.checked;
        img.src = checked ? pokemon.assets.shinyImage : pokemon.assets.image; // Update the image based on shiny status
      }
    ); // Fetch Pokémon data by name
    console.log("Card submitted");
    setActiveModal(""); // Close the modal after submission
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // useEffect(() => {
  //   // Any additional setup can go here
  //   getAllPokemon().then((pokemonList) => {
  //     console.log("All Pokémon fetched:", pokemonList);
  //   }).catch((error) => {
  //     console.error("Error fetching Pokémon list:", error);
  //   });
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateCard />} />
      </Routes>
    </Router>
  );
}

export default App;
