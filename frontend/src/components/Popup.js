function Popup({ name, isOpen, onClose, children }) {
return (
  <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <button
        className="popup__close-button button button_opacity_page"
        type="button"
        onClick={onClose}>
      </button>
      {children}
    </div>
  </div >
)
}

export default Popup;

/* className={`popup popup_${name} ${isOpen && 'popup_opened'}`} */
