import React, { useState } from 'react';
import Header from '../common/Header/Header.js';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import MoreButton from '../common/MoreButton/MoreButton.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';
import Preloader from '../common/Preloader/Preloader.js';
import './Movies.css';

function Movies({
  handlePopupOpen,
  width,
  handleSearchSubmit,
  filteredMovies,
  isLoading,
  query,
  isShortMovies,
  serverError,
  savedMovies,
  handleSaveMovie,
  handleDeleteSavedMovie,
}) {
  function calculateInitialCardsNumber() {
    if (width >= 1280) {
      return [12, 3];
    }
    if (width >= 768) {
      return [8, 2];
    }
    return [5, 1];
  }
  const params = calculateInitialCardsNumber();
  const [cardsNumber, setCardsNumber] = useState(params[0]);

  function handleMoreCards() {
    setCardsNumber(cardsNumber + params[1]);
  }

  function isMovieSaved(id) {
    return savedMovies.some((movie) => movie.movieId === id);
  }

  return (
    <main className="page">
      <Header
        authorized={true}
        handlePopupOpen={handlePopupOpen}
        width={width}
      />
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        query={query}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList>
        {isLoading && <Preloader />}
        {filteredMovies !== null &&
          !isLoading &&
          filteredMovies.slice(0, cardsNumber).map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.nameRU}
              duration={movie.duration}
              image={movie.image.url}
            >
              {isMovieSaved(movie.id) ? (
                <button
                  className="card__button card__button_liked interactive-element"
                  onClick={() => handleDeleteSavedMovie(movie.id)}
                />
              ) : (
                <button
                  className="card__button interactive-element"
                  onClick={() => handleSaveMovie(movie)}
                >
                  Сохранить
                </button>
              )}
            </MoviesCard>
          ))}
        {filteredMovies.length === 0 && !isLoading && <p>Ничего не найдено</p>}
        {serverError && (
          <p>
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
      </MoviesCardList>
      {filteredMovies.length > cardsNumber && (
        <MoreButton saved={false} handleMoreCards={handleMoreCards} />
      )}
      <Footer />
    </main>
  );
}

export default Movies;
