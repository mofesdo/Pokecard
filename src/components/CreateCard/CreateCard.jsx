import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPokemonByName } from "../../utils/pokeapi";
import "./CreateCard.css";

function CreateCard() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState(null);
  const [cinematicMoves, setCinematicMoves] = useState([]);
  const [chargeMove, setChargeMove] = useState("");
  const [chargeMove2, setChargeMove2] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    cp: 0,
    trainer: "",
    isShiny: false,
    quickMove: "",
    chargeMove1: "",
    chargeMove2: "",
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
          console.log(pokemon.primaryType.names.English);
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
  const chargeMoveData = cinematicMoves.find(
    (move) => move.id === chargeMove
  );
  const chargeMoveData2 = cinematicMoves.find(
    (move) => move.id === chargeMove2
  );

  return (
    <div className="page">
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
          Combat Power (CP):
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            max={9999}
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
            value={chargeMove}
            onChange={(e) => setChargeMove(e.target.value)}
          >
            <option value="">-- Select Charged Move --</option>
            {cinematicMoves.map((move) => (
              <option key={move.id} value={move.id}>
                {move.label}
              </option>
            ))}
          </select>
          <select
            value={chargeMove2}
            onChange={(e) => setChargeMove2(e.target.value)}
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
        <div className="card__header">
          <p>CP {formData.cp}</p>
          <div className="card__typings">
            <img
              className="card__type_icon"
              src={`https://assets.dittobase.com/go/types/${pokemon.primaryType.names.English.toLowerCase()}.png`}
              alt={pokemon.primaryType.names.English}
            />
            {pokemon.secondaryType !== null ? (
              <img
                className="card__type_icon"
                src={`https://assets.dittobase.com/go/types/${pokemon.secondaryType.names.English.toLowerCase()}.png`}
                alt={pokemon.secondaryType.names.English}
              />
            ) : (
              ""
            )}
          </div>
        </div>
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
        {chargeMove ? (
          <div className="move-preview">
            <h3>{chargeMoveData.label}</h3>
            <img
              src={`https://assets.dittobase.com/go/types/${chargeMoveData.type.toLowerCase()}.png`}
              alt={chargeMoveData.type}
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            <p>Type: {chargeMoveData.type}</p>
            <p>Power: {chargeMoveData.power}</p>
          </div>
        ) : (
          <p>No charged move selected</p>
        )}
        {chargeMove2 ? (
          <div className="move-preview">
            <h3>{chargeMoveData2.label}</h3>
            <img
              src={`https://assets.dittobase.com/go/types/${chargeMoveData2.type.toLowerCase()}.png`}
              alt={chargeMoveData2.type}
              style={{ width: "20px", height: "20px", marginRight: "6px" }}
            />
            <p>Type: {chargeMoveData2.type}</p>
            <p>Power: {chargeMoveData2.power}</p>
          </div>
        ) : (
          <p>No charged move selected</p>
        )}
        <p>Trainer: {formData.trainer || "Unknown"}</p>
      </div>

      <button onClick={handleExport} style={{ marginTop: "1rem" }}>
        Export Card as PNG
      </button>
    </div>
  );
}

export default CreateCard;
