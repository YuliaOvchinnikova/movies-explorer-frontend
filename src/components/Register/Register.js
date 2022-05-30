import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo/Logo.js';
import useFormWithValidation from '../../utils/useFormWithValidation.js';
import './Register.css';

function Register({ registrationSubmit }) {
  const [values, handleChange, errors, isValid, resetForm] =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    registrationSubmit(values);
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
            value={values.name ? values.name : ''}
            onChange={handleChange}
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
            value={values.email ? values.email : ''}
            onChange={handleChange}
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
            value={values.password ? values.password : ''}
            onChange={handleChange}
            required
            max-length="4"
          />
          {/* <span className="popup__input-error about-input-error">
            Что-то пошло не так...
          </span> */}
          <button
            className="register-section__submit-button interactive-element"
            type="submit"
            disabled={!isValid}
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
