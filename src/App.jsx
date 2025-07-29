import { useState } from "react";
import "./App.css";
import CardModal from "./components/CardModal/CardModal";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleCreateCardClick = () => {
    setActiveModal("card");
  };
  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Card submitted");
    setActiveModal(""); // Close the modal after submission
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <>
      <button className="card__btn" type="button" onClick={handleCreateCardClick}>Create Catch Card</button>
      <div className="card"></div>
      <CardModal
        onClose={closeActiveModal}
        isOpen={activeModal === "card"}
        onSubmit={handleCardSubmit}
      />
    </>
  );
}

export default App;
