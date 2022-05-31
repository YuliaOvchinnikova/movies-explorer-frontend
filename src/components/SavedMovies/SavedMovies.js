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
  console.log(savedMovies);
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
    console.log(savedMovies);
    console.log(id);
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

  return (
    <main className="page">
      <Header
        authorized={true}
        handlePopupOpen={handlePopupOpen}
        width={width}
      />
      <SearchForm />
      <MoviesCardList>
        {savedMovies.map((savedMovie) => (
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
      <Footer />
    </main>
  );
}

export default SavedMovies;
