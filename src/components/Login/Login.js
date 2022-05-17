import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/common/Logo/Logo.js'
import "./Login.css"

function Login() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/movies')
  }
  return (
    <main className="page">
      <header className='empty-header'>
        <Logo />
        <h1 className='empty-header__title'>Рады видеть!</h1>
      </header>
      <section className='login-section'>
        <form className='login-section__form'>
          <label className='login-section__label' for="email">E-mail</label>
          <input className='login-section__input interactive-element' name="email" type="email" placeholder='Email' defaultValue="yulia@gmail.com"  required max-length="5" min-length="30"/>
          <label className='login-section__label' for="password">Пароль</label>
          <input className='login-section__input interactive-element' name="password" type="password" placeholder='Пароль' required max-length="4" />
          <button className='login-section__submit-button interactive-element' type='submit' onClick={handleClick}>Войти</button>
        </form>
        <p className='login-section__link-block'>
          Еще не зарегистрированы?&nbsp;
          <Link to="/signup" className='login-section__link interactive-element'>
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Login
