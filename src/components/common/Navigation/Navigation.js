import React from 'react'
import { Link } from 'react-router-dom'
import profileLogo from "../../../images/profile-logo.svg"
import "./Navigation.css"

function Navigation({authorized}) {
  let width = window.innerWidth;

  return (
    <>
    {authorized ? 
    <>
    <nav className='navigation'>
      {width < 1024 ?
      <button className="navigation__menu"></button>
      :
      <>
        <div className='navigation__cover'>
          <Link to="/movies"  className='navigation__films-link navigation__link interactive-element'>
            Фильмы
          </Link>
          <Link to="/saved-movies"  className='navigation__likedFilm-link navigation__link interactive-element'>
            Сохраненные фильмы
          </Link>
        </div>
        <Link to="/profile" className='navigation__cover interactive-element'>
          <a className='navigation__profile-link navigation__link' href='address'>Аккаунт</a>
          <img className='navigation__profile-logo' src={profileLogo} alt="иконка профайла" />
        </Link>
      </>
      }
     </nav>
    </>
    :
    <nav className='navigation-unauthorized'>
      <Link to="/signup">
        <button className='navigation-unauthorized__register-button interactive-element'>Регистрация</button>
      </Link>
      <Link to="/signin">
        <button className='navigation-unauthorized__login-button interactive-element'>Войти</button>
      </Link> 
    </nav>
  }
  </>
  )
}

export default Navigation
