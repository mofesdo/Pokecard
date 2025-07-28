import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function CardModal({ isOpen, onClose, onSubmit }) {
  const [activeModal, setActiveModal] = useState("");

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
        {/* Form fields go here */}
      </div>
    </ModalWithForm>
  );
}