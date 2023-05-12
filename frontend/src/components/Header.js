import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, onLogout }) {

  return (
    <header className="header">
      <a href="#" className="logo header__logo"></a>
      <div className="header__menu">
        {userEmail && <p className="header__text">{userEmail}</p>}
        <Routes>
          <Route path="/sign-in" element={
            <Link className="header__link button button_opacity_page" to="/sign-up">Регистрация</Link>
          } />
          <Route path="/sign-up" element={
            <Link className="header__link button button_opacity_page" to="/sign-in">Войти</Link>
          } />
           <Route path="/" element={
            <Link className="header__link button button_opacity_page" onClick={onLogout} to="/sign-in">Выйти</Link>
          } />
        </Routes>
      </div>
    </header>
 );
}

export default Header;
