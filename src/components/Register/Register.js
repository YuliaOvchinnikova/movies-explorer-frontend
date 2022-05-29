import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo/Logo.js';
import './Register.css';

function Register({ registrationSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    registrationSubmit(name, email, password);
  }

  return (
    <main className="page">
      <header className="empty-header">
        <Logo />
        <h1 className="empty-header__title">Добро пожаловать!</h1>
      </header>
      <section className="register-section">
        <form className="register-section__form" onSubmit={handleSubmit}>
          <label className="register-section__label" htmlFor="name">
            Имя
          </label>
          <input
            className="register-section__input interactive-element"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
            required
            max-length="3"
            min-length="15"
          />
          <label className="register-section__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="register-section__input interactive-element"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
            max-length="5"
            min-length="30"
          />
          <label className="register-section__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register-section__input interactive-element"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
            required
            max-length="4"
          />
          <button
            className="register-section__submit-button interactive-element"
            type="submit"
          >
            Зарегистироваться
          </button>
        </form>
        <p className="register-section__link-block">
          Уже зарегистрированы?&nbsp;
          <Link
            to="/signin"
            className="register-section__link interactive-element"
          >
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
