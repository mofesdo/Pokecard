import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

function Main() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/create?name=${encodeURIComponent(name)}`);
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
    </div>
  );
}

export default Main;
