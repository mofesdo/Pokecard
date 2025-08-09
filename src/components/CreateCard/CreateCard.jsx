import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPokemonByName } from "../../utils/pokeapi";
import "./CreateCard.css";

function CreateCard() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState(null);
  const [cinematicMoves, setCinematicMoves] = useState([]);
  const [selectedMove, setSelectedMove] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    trainer: "",
    isShiny: false,
    quickMove: "",
    chargeMove: "",
  });

  const cardRef = useRef();

  useEffect(() => {
    if (name) {
      getPokemonByName(name)
        .then((pokemon) => {
          setPokemon(pokemon);
          console.log("Pokemon data fetched:", pokemon);
          const cinematic = Object.values(pokemon.cinematicMoves).map((m) => ({
            id: m.id,
            label: m.names?.English ?? m.id,
            power: m.power,
            type: m.type?.names?.English,
          }));
          console.log("Cinematic Moves:", cinematic);
          setCinematicMoves(cinematic);
        })
        .catch(() => setError("Invalid Pokémon."));
    }
  }, [name]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExport = async () => {
    const html2canvas = (await import("html2canvas")).default;
    if (!cardRef.current) return;

    html2canvas(cardRef.current, { useCORS: true, allowTaint: false }).then(
      (canvas) => {
        const link = document.createElement("a");
        link.download = `${formData.nickname || pokemon.name}-card.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="create-page">
      <form className="card-form">
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>

        <label>
          Trainer Name:
          <input
            type="text"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
          />
        </label>

        <label>
          Shiny:
          <input
            type="checkbox"
            name="isShiny"
            checked={formData.isShiny}
            onChange={handleChange}
          />
          <select
            value={selectedMove}
            onChange={(e) => setSelectedMove(e.target.value)}
          >
            <option value="">-- Select Charged Move --</option>
            {cinematicMoves.map((move) => (
              <option key={move.id} value={move.id}>
                {move.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div
        id="pokemon-card"
        className="card-preview"
        ref={cardRef}
        style={{
          width: "300px",
          height: "400px",
          backgroundColor: "white",
          color: "black",
          padding: "20px",
          border: "2px solid #000",
        }}
      >
        <h2>{formData.nickname || pokemon.name}</h2>
        <img
          src={
            formData.isShiny
              ? pokemon.assets.shinyImage || pokemon.assets.image
              : pokemon.assets.image
          }
          alt={pokemon.name}
          style={{ width: "150px" }}
        />
        <p>Trainer: {formData.trainer || "Unknown"}</p>
      </div>

      <button onClick={handleExport} style={{ marginTop: "1rem" }}>
        Export Card as PNG
      </button>
    </div>
  );
}

export default CreateCard;
