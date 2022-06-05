import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo/Logo.js';
import useFormWithValidation from '../../utils/useFormWithValidation.js';
import { register } from '../../utils/Auth.js';

import './Register.css';

function Register({ registrationSuccess }) {
  const [serverError, setServerError] = useState('');

  const [values, handleChange, errors, isValid, resetForm] =
    useFormWithValidation({ name: '', email: '', password: '' });

  function registrationSubmit({ name, email, password }) {
    setServerError('');
    register(name, email, password)
      .then(() => registrationSuccess())
      .catch((err) => {
        setServerError(err.message);
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    registrationSubmit(values);
  }

  function handleFormChange(e) {
    setServerError('');
    handleChange(e);
  }

  return (
    <main>
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
            placeholder="Имя"
            value={values.name ? values.name : ''}
            onChange={handleFormChange}
            required
            pattern="^[а-яА-ЯёЁa-zA-Z\s\-]+$"
            min-length="3"
            max-length="15"
          />
          {errors?.name && (
            <span className="register-section__input-error">{errors.name}</span>
          )}
          <label className="register-section__label" htmlFor="email">
            Email
          </label>
          <input
            className="register-section__input interactive-element"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email ? values.email : ''}
            onChange={handleFormChange}
            required
            max-length="5"
            min-length="30"
          />
          {errors?.email && (
            <span className="register-section__input-error">
              {errors.email}
            </span>
          )}
          <label className="register-section__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register-section__input interactive-element"
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password ? values.password : ''}
            onChange={handleFormChange}
            required
            min-length="4"
          />
          {errors?.password && (
            <span className="register-section__input-error">
              {errors.password}
            </span>
          )}
          {serverError !== '' && (
            <p className="register-section__input-error">{serverError}</p>
          )}
          <button
            className={
              isValid
                ? 'register-section__submit-button interactive-element'
                : 'register-section__submit-button register-section__submit-button_disable'
            }
            type="submit"
            disabled={!isValid ? true : false}
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
