import React, { useState } from 'react';
import useFormWithValidation from '../../utils/useFormWithValidation.js';
import './Profile.css';
import { UserContext } from '../../utils/userContext.js';
import mainApi from '../../utils/MainApi.js';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser, setCurrentUser, setUserAuthorized } =
    React.useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  console.log(currentUser);
  const [values, handleChange, errors, isValid, resetForm, isChanged] =
    useFormWithValidation(currentUser);

  const [serverError, setServerError] = useState('');

  function changeUserInfo({ name, email }) {
    mainApi
      .changeUserInfo(name, email)
      .then(({ data }) => {
        setCurrentUser(data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err.message);
      });
  }

  function onLogout() {
    mainApi
      .signout()
      .then(() => {
        localStorage.removeItem('query');
        localStorage.removeItem('checkbox');
        localStorage.removeItem('filteredMovies');
        setUserAuthorized(false);
        navigate('/');
      })
      .catch((err) => {
        localStorage.removeItem('query');
        localStorage.removeItem('checkbox');
        localStorage.removeItem('filteredMovies');
        setUserAuthorized(false);
        navigate('/');
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log();
    changeUserInfo({ ...currentUser, ...values });
  }

  function handleFormChange(e) {
    setServerError('');
    handleChange(e);
  }

  return (
    <main>
      <section className="profile-section">
        <h1 className="profile-section__title">Привет, {currentUser.name}!</h1>
        <form className="profile-section__form" onSubmit={handleSubmit}>
          <div className="profile-section__cover">
            <label className="profile-section__label" htmlFor="name">
              Имя
            </label>
            <input
              className={
                !isEditing
                  ? 'profile-section__input profile-section__input_disable'
                  : 'profile-section__input'
              }
              name="name"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleFormChange}
              required
              pattern="^[а-яА-ЯёЁa-zA-Z\s\-]+$"
              min-length="3"
              max-length="15"
              disabled={!isEditing}
            />
          </div>
          {errors?.name && (
            <span className="profile-section__input-error">{errors.name}</span>
          )}
          <div className="profile-section__cover">
            <label className="profile-section__label" htmlFor="email">
              E-mail
            </label>
            <input
              className={
                !isEditing
                  ? 'profile-section__input profile-section__input_disable'
                  : 'profile-section__input'
              }
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleFormChange}
              required
              min-length="5"
              max-length="30"
              disabled={!isEditing}
            />
          </div>
          {errors?.email && (
            <span className="profile-section__input-error">{errors.email}</span>
          )}
          {serverError !== '' && (
            <p className="profile-section__error">
              При обновлении профиля произошла ошибка: {serverError}
            </p>
          )}

          {isEditing &&
            (!isValid || serverError !== '' || !isChanged ? (
              <>
                <button
                  className="profile-section__save-button profile-section__save-button_disable"
                  disabled={true}
                  type="submit"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setServerError('');
                    setIsEditing(false);
                  }}
                  className="profile-section__back-button interactive-element"
                >
                  Назад
                </button>
              </>
            ) : (
              <button
                className="profile-section__save-button interactive-element"
                disabled={false}
                type="submit"
              >
                Сохранить
              </button>
            ))}
        </form>

        {!isEditing && (
          <>
            <button
              className="profile-section__edit-button interactive-element"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
            <button
              className="profile-section__logout-button interactive-element"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
