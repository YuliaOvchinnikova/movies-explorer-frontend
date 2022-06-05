import './ErrorPopup.css';

function ErrorPopup({ errorText, onClose }) {
  return (
    <div className={`error-popup error-popup_opened`}>
      <div className="error-popup__container ">
        <button
          type="button"
          className="interactive-element error-popup__close-button"
          onClick={onClose}
        ></button>
        <p className="error-popup__info">Что-то пошло не так: {errorText}</p>
      </div>
    </div>
  );
}

export default ErrorPopup;
