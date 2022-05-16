import React from 'react'

import Header from '../common/Header/Header.js'
import "./Profile.css"

function Profile() {
  return (
    <main className="page">
      <Header authorized={true}/>
      <section className='profile-section'>
        <h1 className='profile-section__title'>Привет, Юлия!</h1>
        <form className='profile-section__form'>
          <div className='profile-section__cover'>
            <label className='profile-section__label' for="name">Имя</label>
            <input className='profile-section__input interactive-element' name="name" type="text" placeholder='Name' defaultValue="Юлия" required max-length="3" min-length="15"/>
          </div>
          <div className='profile-section__cover'>
            <label className='profile-section__label' for="email">E-mail</label>
            <input className='profile-section__input interactive-element' name="email" type="email" placeholder='Email' defaultValue="yulia@gmail.com"  required max-length="5" min-length="30"/>
          </div>
        </form>
        <button className='profile-section__edit-button interactive-element'>Редактировать</button>
        <button className='profile-section__logout-button interactive-element'>Выйти из аккаунта</button>
        <button className='profile-section__save-button interactive-element interactive-element'>Выйти из аккаунта</button>
        <p className='profile-section__error'>Текст ошибки</p>
        <button className='profile-section__save-button profile-section__save-button_disable interactive-element'>Выйти из аккаунта</button>
      </section>
    </main>
  )
}

export default Profile
