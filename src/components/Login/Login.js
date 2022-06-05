import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo/Logo.js';
import useFormWithValidation from '../../utils/useFormWithValidation.js';
import './Login.css';

function Login({ loginSubmit, error }) {
  const [values, handleChange, errors, isValid, resetForm] =
    useFormWithValidation({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    loginSubmit(values);
  }

  return (
    <main>
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
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA_Z]{2,63}$"
            placeholder="Email"
            value={values.email ? values.email : ''}
            onChange={handleChange}
            required
            min-length="5"
            max-length="30"
          />
          {errors?.email && (
            <span className="login-section__input-error">{errors.email}</span>
          )}
          <label className="login-section__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login-section__input interactive-element"
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password ? values.password : ''}
            onChange={handleChange}
            required
            min-length="4"
          />
          {errors?.password && (
            <span className="login-section__input-error">
              {errors.password}
            </span>
          )}
          {error !== '' && <p>{error}</p>}
          <button
            className={
              isValid
                ? 'login-section__submit-button interactive-element'
                : 'login-section__submit-button login-section__submit-button_disable'
            }
            type="submit"
            disabled={!isValid ? true : false}
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
