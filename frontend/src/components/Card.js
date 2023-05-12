import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button button ${isLiked && 'card__button_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__item card" >
      {isOwn &&
        <button
          className="card__delete button button_opacity_page"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick} />
      }
      <img
        src={card.link}
        alt={card.name}
        className="card__image button"
        onClick={handleClick} />
      <div className="card__caption">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк"
            type="button"
            onClick={handleLikeClick} />
          <p className="card__likes-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
