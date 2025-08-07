import React, { useState } from "react";
import { getPokemonByName } from "../../utils/pokeapi";

function CreateCard(pokemon) {
    console.log("CreateCard component loaded with pokemon:", pokemon);
  const [pokemonName, setPokemonName] = useState("");
  const [shiny, setShiny] = useState(false);
  const [cp, setCp] = useState(0);
  const [pokemonData, setPokemonData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemonByName(pokemonName)
      .then(data => {
        setPokemonData(data);
        // Additional logic to handle shiny status and CP can be added here
      })
      .catch(error => {
        console.error("Error fetching Pokémon data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <input
        type="checkbox"
        checked={shiny}
        onChange={(e) => setShiny(e.target.checked)}
      />
      <label>Shiny?</label>
      <input
        type="number"
        value={cp}
        onChange={(e) => setCp(e.target.value)}
        placeholder="Combat Power"
      />
      <button type="submit">Create Card</button>
    </form>
  );
}

export default CreateCard;