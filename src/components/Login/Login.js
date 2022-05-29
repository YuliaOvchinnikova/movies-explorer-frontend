import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo/Logo.js';
import './Login.css';

function Login({ loginSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    loginSubmit(email, password);
  }

  return (
    <main className="page">
      <header className="empty-header">
        <Logo />
        <h1 className="empty-header__title">Рады видеть!</h1>
      </header>
      <section className="login-section">
        <form className="login-section__form" onSubmit={handleSubmit}>
          <label className="login-section__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="login-section__input interactive-element"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
            max-length="5"
            min-length="30"
          />
          <label className="login-section__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login-section__input interactive-element"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
            required
            max-length="4"
          />
          <button
            className="login-section__submit-button interactive-element"
            type="submit"
          >
            Войти
          </button>
        </form>
        <p className="login-section__link-block">
          Еще не зарегистрированы?&nbsp;
          <Link
            to="/signup"
            className="login-section__link interactive-element"
          >
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
