import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        {" "}
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-form" type="button" onClick={onClose} />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            <p className="modal__submit-text">{buttonText}</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
