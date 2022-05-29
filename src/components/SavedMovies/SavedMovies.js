import React, { useState, useEffect } from 'react';
import Header from '../common/Header/Header.js';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import MoreButton from '../common/MoreButton/MoreButton.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';

import './SavedMovies.css';

function SavedMovies({
  handlePopupOpen,
  width,
  savedMovies,
  handleDeleteSavedMovie,
}) {
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
            key={savedMovie.id}
            title={savedMovie.nameRU}
            duration={savedMovie.duration}
            image={savedMovie.image.url}
          >
            <button
              className="card__button card__button_saved interactive-element"
              type="button"
              onClick={() => handleDeleteSavedMovie(savedMovie.id)}
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
