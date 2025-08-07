import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function CardModal({ isOpen, onClose, onSubmit }) {
  const [activeModal, setActiveModal] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setActiveModal("card");
    } else {
      setActiveModal("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Create Catch Card"
      buttonText="Create"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onSubmit}
    >
      <div className="card__form">
        <label htmlFor="card__name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          className="modal__input"
          id="card__name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
        <div className="card__iv_attack">
          IV Attack:
          <select name="card__iv_attack" id="card__iv_attack">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="card__iv_defense">
          IV Defense:
          <select name="card__iv_defense" id="card__iv_defense">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="card__iv__stamina">
          IV Stamina:
          <select name="card__iv_stamina" id="card__iv_stamina">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
        <label htmlFor="card__cp">Combat Power:</label>
        <input type="number" max="9999" />
        <label htmlFor="card__shiny">Shiny?</label>
        <input type="checkbox" name="card__shiny" id="card__shiny" />

      </div>
    </ModalWithForm>
  );
}

export default CardModal;
