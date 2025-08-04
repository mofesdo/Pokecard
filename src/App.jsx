import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
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
    console.log(e.target.elements.pokemon_name.value); // Access the name input value
    
    setActiveModal(""); // Close the modal after submission
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <>
      <Header/>
      <button className="card__btn" type="button" onClick={handleCreateCardClick}>Create Catch Card</button>
      <div className="card__container">
        <h2 className="card__title">Pokemon Name</h2>
        <img src="https://placehold.co/600x400" alt="" className="card__img" />
      </div>
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
