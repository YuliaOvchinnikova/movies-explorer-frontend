import React, { useState, useEffect } from 'react';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';
import mainApi from '../../utils/MainApi.js';
import { SHORTFILM_LENGTH } from '../../utils/constants.js';
import { calculateInitialCardsNumber } from '../../utils/helpers.js';

import './SavedMovies.css';

function SavedMovies({ width }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState(false);
  const [query, setQuery] = useState('');
  const params = calculateInitialCardsNumber(width);
  const [cardsNumber] = useState(params[0]);

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
    <main>
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
              (shortFilms ? movie.duration <= SHORTFILM_LENGTH : true)
          )
          .slice(0, cardsNumber)
          .map((savedMovie) => (
            <MoviesCard
              key={savedMovie._id}
              title={savedMovie.nameRU}
              duration={savedMovie.duration}
              image={savedMovie.image}
              trailerLink={savedMovie.trailerLink}
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
