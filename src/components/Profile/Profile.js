import React from 'react';
import useFormWithValidation from '../../utils/useFormWithValidation.js';
import Header from '../common/Header/Header.js';
import './Profile.css';
import { UserContext } from '../../utils/userContext.js';

function Profile({ handlePopupOpen, width, profileSubmit }) {
  const currentUser = React.useContext(UserContext);

  const [values, handleChange, errors, isValid, resetForm] =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    profileSubmit(values);
  }

  return (
    <main className="page">
      <Header
        authorized={true}
        handlePopupOpen={handlePopupOpen}
        width={width}
      />
      <section className="profile-section">
        <h1 className="profile-section__title">Привет, {currentUser.name}!</h1>
        <form className="profile-section__form" onSubmit={handleSubmit}>
          <div className="profile-section__cover">
            <label className="profile-section__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile-section__input interactive-element"
              name="name"
              type="text"
              placeholder="Name"
              value={values.name ? values.name : currentUser.name}
              onChange={handleChange}
              required
              max-length="3"
              min-length="15"
            />
            {errors?.name && (
              <span className="profile-section__input-error">
                {errors.name}
              </span>
            )}
          </div>
          <div className="profile-section__cover">
            <label className="profile-section__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile-section__input interactive-element"
              name="email"
              type="email"
              placeholder="Email"
              value={values.email ? values.email : currentUser.email}
              onChange={handleChange}
              required
              max-length="5"
              min-length="30"
            />
            {errors?.email && (
              <span className="profile-section__input-error">
                {errors.email}
              </span>
            )}
          </div>
        </form>
        <button
          className={
            isValid
              ? 'profile-section__edit-button interactive-element'
              : 'profile-section__edit-button profile-section__edit-button_disable'
          }
          type="submit"
          disabled={!isValid ? true : false}
        >
          Редактировать
        </button>
        <button className="profile-section__logout-button interactive-element">
          Выйти из аккаунта
        </button>
        <button className="profile-section__save-button interactive-element interactive-element">
          Выйти из аккаунта
        </button>
        <p className="profile-section__error">Текст ошибки</p>
        <button className="profile-section__save-button profile-section__save-button_disable interactive-element">
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
