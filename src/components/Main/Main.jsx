import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemonByName } from "../../utils/pokeapi";
import "./Main.css";

function Main() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    const trimmedName = name.trim().toUpperCase();
    if (!trimmedName) {
      setError("Please enter a Pokémon name.");
      return;
    }

    try {
      await getPokemonByName(trimmedName); // Assume this throws on 404
      navigate(`/create?name=${encodeURIComponent(trimmedName)}`);
    } catch (err) {
      setError("That is not a valid Pokémon name.");
    }
  };

  return (
    <div className="main">
      <h1>Pokecard</h1>
      <p>Create a unique catch card for you pokemon!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Pokémon name"
        />
        <button type="submit">Continue</button>
      </form>
       {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Main;
