import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CreateCard from "./components/CreateCard/CreateCard";
import CardModal from "./components/CardModal/CardModal";
import { getPokemonByName, getAllPokemon } from "./utils/pokeapi";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleCreateCardClick = () => {
    setActiveModal("card");
  };
  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(e.target.elements.card__shiny.checked); // Access the shiny input value
    getPokemonByName(e.target.elements.card__name.value.toUpperCase()).then((pokemon) => {
      console.log("Pokemon data fetched:", pokemon);
      let img = document.getElementsByClassName("card__img")[0];
      let checked =e.target.elements.card__shiny.checked;
      img.src = checked ? pokemon.assets.shinyImage : pokemon.assets.image; // Update the image based on shiny status
      // You can update the card with the fetched Pokémon data here
      // For example, you might want to set the card title and image based on the fetched data
      // document.querySelector(".card__title").textContent = pokemon.name;
      // document.querySelector(".card__img").src = pokemon.image; // Assuming pokemon has an image property
    }); // Fetch Pokémon data by name
    console.log("Card submitted");
    // console.log(e.target.elements.card__name.value); // Access the name input value
    // let name = document.getElementsByClassName("card__title")[0];
    // console.log(name);
    // name.textContent = e.target.elements.card__name.value; // Update the card title with the input value
    // let shiny = "normal"; // Default to normal sprite
    // let img = document.getElementsByClassName("card__img")[0];
    // img.src = `https://img.pokemondb.net/sprites/go/${shiny}/${e.target.elements.card__name.value.toLowerCase()}.png`; // Update the image
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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateCard/>} />
      </Routes>
    </Router>
    // <>
    //   <Header/>
    //   <Main/>
    //   {/* <button className="card__btn" type="button" onClick={handleCreateCardClick}>Create Catch Card</button>
    //   <div className="card__container">
    //     <h2 className="card__title">Pokemon Name</h2>
    //     <img src="https://placehold.co/600x400" alt="" className="card__img" />
    //   </div> */}
    //   <div className="card"></div>
    //   <CardModal
    //     onClose={closeActiveModal}
    //     isOpen={activeModal === "card"}
    //     onSubmit={handleCardSubmit}
    //   />
    // </>
  );
}

export default App;
