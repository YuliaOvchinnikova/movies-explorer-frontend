import React from 'react';
import {Link} from "react-router-dom";
import "./Popup.css";
import profileLogo from "../../../images/profile-logo.svg"

function Popup() {
  return (
    <div className='popup popup_opened'>
      <div className='popup-container'>
        <button type='button' className='popup__close-button'></button>
        <nav className='popup-navigation'>
          <Link to="/movies" className='popup-navigation__link interactive-element'>
            Главная
          </Link>
          <Link to="/movies" className='popup-navigation__link popup-navigation__link_active interactive-element'>
            Фильмы
          </Link>
          <Link to="/movies" className='popup-navigation__link interactive-element'>
            Сохраненные фильмы
          </Link>
          <Link to="/profile" className='popup-navigation__cover interactive-element'>
            <a className='popup-navigation__link popup-navigation__link_account interactive-element' href='address'>Аккаунт</a>
            <img className='popup-navigation__profile-logo interactive-element' src={profileLogo} alt="иконка профайла" />
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Popup