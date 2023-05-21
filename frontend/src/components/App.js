import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import AuthForm from './AuthForm';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const api = new Api({
    baseUrl: 'https://mesto.seraya.f.nomoredomains.monster',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  });

  const navigate = useNavigate();

  function handleTokenCheck() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
          setUserEmail(res.email);
          navigate('/', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleRegister(values) {
    auth.register(values.password, values.email)
      .then (() => {
        navigate('/sign-in', {replace: true});
        setIsRegister(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((error) => {
        setIsRegister(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(error);
      })
  }

  function handleLogin(values) {
    if (!values.password || !values.email){
      return;
    }
    auth.authorize(values.password, values.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserEmail(values.email);
          setIsLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setIsLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  useEffect(() => {
    isLoggedIn &&
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards.reverse());
      })
      .catch((error) => {
        console.log(error);
      })
  }, [isLoggedIn])

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || isInfoTooltipPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('click', handleOverlayClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClick);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isConfirmationPopupOpen, isInfoTooltipPopupOpen, selectedCard])


  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteClick(card) {
    setIsConfirmationPopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="content">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} onLogout={handleLogout}/>

          <Routes>
            <Route path='/' element={
              <ProtectedRouteElement
                Component={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                cards={cards}
              />
            }/>
            <Route path='/sign-in' element={
              <AuthForm
                onSubmit={handleLogin}
                title={'Вход'}
                button={'Войти'}
              />
            }/>
            <Route path='/sign-up' element={
              <AuthForm
                onSubmit={handleRegister}
                title={'Регистрация'}
                button={'Зарегистрироваться'}
              >
                <p className="authorization__text">Уже зарегистрированы?
                  <Link to="/sign-in" className="authorization__link button button_opacity_login"> Войти</Link>
                </p>
              </AuthForm>
            }/>
            <Route
              path='*'
              element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            />
          </Routes>

          <Footer />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            cardToDelete={cardToDelete}
            isLoading={isLoading}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegister={isRegister}
          />

        </CurrentUserContext.Provider>
      </div>

    </div>
  );
}

export default App;
