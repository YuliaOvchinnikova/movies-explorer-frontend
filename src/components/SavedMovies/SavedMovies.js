import React, { useState, useEffect } from 'react';
import Header from '../common/Header/Header.js';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';
import mainApi from '../../utils/MainApi.js';

import './SavedMovies.css';

function SavedMovies({ handlePopupOpen, width }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then(({ data }) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDeleteSavedMovie(id) {
    mainApi
      .deleteSavedMovieById(id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== id);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearchSubmit(newQuery) {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery.toLowerCase());
  }

  function handleShortFilms(checkbox) {
    setShortFilms(checkbox);
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
        isShortMovies={shortFilms}
        handleShortFilms={handleShortFilms}
        requiredInput={false}
      />
      <MoviesCardList>
        {savedMovies
          .filter(
            (movie) =>
              movie.nameRU.toLowerCase().includes(query) &&
              (shortFilms ? movie.duration <= 40 : true)
          )
          .map((savedMovie) => (
            <MoviesCard
              key={savedMovie._id}
              title={savedMovie.nameRU}
              duration={savedMovie.duration}
              image={savedMovie.image}
            >
              <button
                className="card__button card__button_saved interactive-element"
                type="button"
                onClick={() => handleDeleteSavedMovie(savedMovie._id)}
              >
                saved
              </button>
            </MoviesCard>
          ))}
      </MoviesCardList>
      <div className="empty-block"></div>
      <Footer />
    </main>
  );
}

export default SavedMovies;
