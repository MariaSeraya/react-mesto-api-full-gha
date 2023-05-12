import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile">
        <div
          className="profile__overlay"
          onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{currentUser.name}</h1>
          <button
            className="profile__edit-button button button_opacity_page"
            aria-label="Кнопка редактирования профиля"
            type="button"
            onClick={onEditProfile}>
          </button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button button button_opacity_page"
          aria-label="Кнопка добавления информации"
          type="button"
          onClick={onAddPlace}>
        </button>
      </section>

      <section
        className="gallery"
        aria-label="Галерея пользователя">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

    </main>

  );
}

export default Main;
