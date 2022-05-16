import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/common/Logo/Logo.js'
import "./Register.css"

function Register() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/signin')
  }
  return (
    <main className="page">
      <header className='empty-header'>
        <Logo />
        <h1 className='empty-header__title'>Добро пожаловать!</h1>
      </header>
      <section className='register-section'>
        <form className='register-section__form'>
          <label className='register-section__label' for="name">Имя</label>
          <input className='register-section__input interactive-element' name="name" type="text" placeholder='Name' defaultValue="Юлия" required max-length="3" min-length="15"/>
          <label className='register-section__label' for="email">E-mail</label>
          <input className='register-section__input interactive-element' name="email" type="email" placeholder='Email' defaultValue="yulia@gmail.com" required max-length="5" min-length="30"/>
          <label className='register-section__label' for="password">Пароль</label>
          <input className='register-section__input interactive-element' name="password" type="password" placeholder='Пароль' required max-length="4"/>
          <button className='register-section__submit-button interactive-element' type='submit' onClick={handleClick}>Зарегистироваться</button>
        </form>
        <p className='register-section__link-block'>
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className='register-section__link interactive-element'>
            Войти
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Register
