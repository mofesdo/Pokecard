function getPokemonByName(name) {
  fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name/${name}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then(data => {
      console.log("Pokémon data:", data);
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
}

export { getPokemonByName };