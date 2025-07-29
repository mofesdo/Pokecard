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
        <label htmlFor="login_email" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="pokemon_name"
            placeholder="Name"
            onChange={handleNameChange}
            value={name}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
}

export default CardModal;
