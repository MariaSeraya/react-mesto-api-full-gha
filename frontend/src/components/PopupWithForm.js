import Popup from './Popup';

function PopupWithForm({ name, isOpen, onClose, title, children, buttonName, buttonLoading, onSubmit, isValid, isLoading }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name={name}>
      <form
        name={name}
        onSubmit={onSubmit}
        noValidate>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          disabled={!isValid}
          type="submit"
          className={`form__button button button_opacity_save ${!isValid && 'form__button_disabled'}`}>
          {isLoading ? buttonLoading : buttonName}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
