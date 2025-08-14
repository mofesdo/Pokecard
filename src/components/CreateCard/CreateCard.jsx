import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPokemonByName } from "../../utils/pokeapi";
import typeImages from "../../utils/typeImages";
import "./CreateCard.css";

function CreateCard() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [pokemon, setPokemon] = useState(null);
  const [cinematicMoves, setCinematicMoves] = useState([]);
  const [quickMoves, setQuickMoves] = useState([]); // list of moves
  const [selectedQuickMove, setSelectedQuickMove] = useState(""); // selected id
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
          const cinematic = Object.values(pokemon.cinematicMoves).map((m) => ({
            id: m.id,
            label: m.names?.English ?? m.id,
            power: m.power,
            type: m.type?.names?.English,
          }));
          setCinematicMoves(cinematic);
          const quick = Object.values(pokemon.quickMoves).map((m) => ({
            id: m.id,
            label: m.names?.English ?? m.id,
            power: m.power,
            type: m.type?.names?.English,
          }));
          setQuickMoves(quick);
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
        link.download = `${name}-card.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Loading...</p>;
  const quickMoveData = quickMoves.find(
    (move) => move.id === selectedQuickMove
  );
  const chargeMoveData = cinematicMoves.find((move) => move.id === chargeMove);
  const chargeMoveData2 = cinematicMoves.find(
    (move) => move.id === chargeMove2
  );

  return (
    <div className="page">
      <form className="card__form">
        <label className="card__label">
          Nickname:
          <input
            className="card__input"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>

        <label className="card__label">
          Combat Power (CP):
          <input
            className="card__input"
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            max={9999}
          />
        </label>

        <label className="card__label">
          Trainer Name:
          <input
            className="card__input"
            type="text"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
          />
        </label>

        <label className="card__label">
          Shiny:
          <input
            className="card__input"
            type="checkbox"
            name="isShiny"
            checked={formData.isShiny}
            onChange={handleChange}
          />
        </label>
        <select
          value={selectedQuickMove}
          onChange={(e) => setSelectedQuickMove(e.target.value)}
        >
          <option value="">-- Select Quick Move --</option>
          {quickMoves.map((move) => (
            <option key={move.id} value={move.id}>
              {move.label}
            </option>
          ))}
        </select>
        <select
          value={chargeMove}
          onChange={(e) => setChargeMove(e.target.value)}
        >
          <option value="">-- Select Charged Move --</option>
          {cinematicMoves
            .filter((move) => move.id !== chargeMove2)
            .map((move) => (
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
          {cinematicMoves
            .filter((move) => move.id !== chargeMove)
            .map((move) => (
              <option key={move.id} value={move.id}>
                {move.label}
              </option>
            ))}
        </select>
      </form>

      <div id="pokemon-card" className="card__preview" ref={cardRef}>
        <div className="card__header">
          <p>CP {formData.cp}</p>
          <div className="card__typings">
            <img
              className="card__type_icon"
              src={typeImages[pokemon.primaryType.names.English.toLowerCase()]}
              alt={pokemon.primaryType.names.English}
            />
            {pokemon.secondaryType !== null ? (
              <img
                className="card__type_icon"
                src={
                  typeImages[pokemon.secondaryType.names.English.toLowerCase()]
                }
                alt={pokemon.secondaryType.names.English}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <h2>{formData.nickname || pokemon.name}</h2>
        <img
          className="card__img"
          src={
            formData.isShiny
              ? pokemon.assets.shinyImage || pokemon.assets.image
              : pokemon.assets.image
          }
          alt={pokemon.name}
        />
        <div className="card__moves">
          {quickMoveData ? (
            <div className="move__preview">
              <div className="move__preview_container">
                <img
                  className="card__type_icon"
                  src={typeImages[quickMoveData.type.toLowerCase()]}
                  alt={quickMoveData.type}
                />
                <h3>{quickMoveData.label}</h3>
              </div>
              <p>{quickMoveData.power}</p>
            </div>
          ) : (
            <p>No quick move selected</p>
          )}
          {chargeMoveData ? (
            <div className="move__preview">
              <div className="move__preview_container">
                <img
                  className="card__type_icon"
                  src={typeImages[chargeMoveData.type.toLowerCase()]}
                  alt={chargeMoveData.type}
                />
                <h3>{chargeMoveData.label}</h3>
              </div>

              <p>{chargeMoveData.power}</p>
            </div>
          ) : (
            <p>No charged move selected</p>
          )}
          {chargeMoveData2 ? (
            <div className="move__preview">
              <div className="move__preview_container">
                <img
                  className="card__type_icon"
                  src={typeImages[chargeMoveData2.type.toLowerCase()]}
                  alt={chargeMoveData2.type}
                />
                <h3>{chargeMoveData2.label}</h3>
              </div>
              <p>{chargeMoveData2.power}</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <p>Trainer: {formData.trainer || "Unknown"}</p>
      </div>

      <button onClick={handleExport} className="card__export_button">
        Export Card as PNG
      </button>
    </div>
  );
}

export default CreateCard;
