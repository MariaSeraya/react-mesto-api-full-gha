function ImagePopup({ card, onClose, }) {
  return (
    <div className={`popup popup_image ${card.link && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button
          className="popup__close-button button button_opacity_page"
          type="button"
          onClick={onClose}>
        </button>
        <figure className="popup__item">
          <img
            src={card.link}
            alt={card.name}
            className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
