function getPokemonByName(name) {
  return fetch(
    `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name/${name}.json`
  ).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export { getPokemonByName };
