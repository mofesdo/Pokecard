import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonByName } from '../../utils/pokeapi';

function CreateCard() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (name) {
      getPokemonByName(name)
        .then(setPokemon)
        .catch(() => setError('Invalid Pokémon.'));
    }
  }, [name]);

  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.assets.image} alt={pokemon.name} />
      {/* Additional card customization form here */}
    </div>
  );
}

export default CreateCard;