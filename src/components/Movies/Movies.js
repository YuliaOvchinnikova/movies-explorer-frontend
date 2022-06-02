import React, { useState, useEffect } from 'react';
import Header from '../common/Header/Header.js';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import MoreButton from '../common/MoreButton/MoreButton.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';
import Preloader from '../common/Preloader/Preloader.js';
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';

import './Movies.css';

function Movies({ handlePopupOpen, width }) {
  const storedFilteredMovies = localStorage.getItem('filteredMovies');
  const storedQuery = localStorage.getItem('query');
  const storedcheckbox = localStorage.getItem('checkbox');

  const [filteredMovies, setFilteredMovies] = useState(
    storedFilteredMovies !== null ? JSON.parse(storedFilteredMovies) : null
  );
  const [query, setQuery] = useState(storedQuery !== null ? storedQuery : '');
  const [checkbox, setCheckbox] = useState(
    storedcheckbox !== null ? JSON.parse(storedcheckbox) : false
  );

  const [allMovies, setAllMovies] = useState([]);
  const [isAllMoviesLoading, setAllMoviesIsLoading] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedMoviesLoading, setSavedMoviesIsLoading] = useState(false);

  const [serverError, setServerError] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();
    let isChanged = false;

    if (storedQuery !== e.target.search.value) {
      isChanged = true;
      localStorage.setItem('query', e.target.search.value);
    }

    if (storedcheckbox !== e.target.shortfilm.checked) {
      isChanged = true;
      localStorage.setItem('checkbox', e.target.shortfilm.checked);
    }

    if (!isChanged) {
      return;
    }

    function isShortMovie(movie) {
      return movie.duration <= 40;
    }

    function filteredByCheckbox(movie, checkbox) {
      if (checkbox) {
        return isShortMovie(movie);
      }
      return true;
    }
    const query = localStorage.getItem('query')
      ? localStorage.getItem('query')
      : '';
    const checkbox = localStorage.getItem('checkbox')
      ? JSON.parse(localStorage.getItem('checkbox'))
      : false;

    function updateFilteredMovies() {
      const filtered = allMovies.filter(
        (movie) =>
          movie.nameRU.includes(query) && filteredByCheckbox(movie, checkbox)
      );
      localStorage.setItem('filteredMovies', JSON.stringify(filtered));
      setQuery(query);
      setCheckbox(checkbox);

      setFilteredMovies(filtered);
    }

    console.log('query', query);
    if (query === '') {
      return;
    }

    // setIsLoading(true);
    updateFilteredMovies();
    // setIsLoading(false);
  }

  useEffect(() => {
    setSavedMoviesIsLoading(true);
    mainApi
      .getSavedMovies()
      .then(({ data }) => {
        setSavedMovies(data);
        setSavedMoviesIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSavedMoviesIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setAllMoviesIsLoading(true);
    moviesApi
      .getAllMovies()
      .then((data) => {
        setAllMovies(data);
        setAllMoviesIsLoading(false);
      })
      .catch((err) => {
        setAllMoviesIsLoading(false);
        if (err.statusCode === 500) {
          setServerError(true);
        }
        console.log(err);
      });
  }, []);

  // useEffect(() => {}, [isSearchSubmited]);

  function handleSaveMovie(movie) {
    const movieToSave = {
      ...movie,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    mainApi
      .saveMovie(movieToSave)
      .then(({ data }) => {
        setSavedMovies([...savedMovies, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteSavedMovie(id) {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === id);
    if (!movieToDelete) {
      return;
    }
    mainApi
      .deleteSavedMovieById(movieToDelete._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (movie) => movie.movieId !== id
        );
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        isShortMovies={checkbox}
      />
      <MoviesCardList>
        {isSavedMoviesLoading || isAllMoviesLoading ? (
          <Preloader />
        ) : (
          filteredMovies !== null &&
          filteredMovies.slice(0, cardsNumber).map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.nameRU}
              duration={movie.duration}
              image={`https://api.nomoreparties.co/${movie.image.url}`}
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
          ))
        )}
        {filteredMovies && filteredMovies.length === 0 && (
          <p>Ничего не найдено</p>
        )}
        {serverError && (
          <p>
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
      </MoviesCardList>
      {filteredMovies && filteredMovies.length > cardsNumber && (
        <MoreButton saved={false} handleMoreCards={handleMoreCards} />
      )}
      <Footer />
    </main>
  );
}

export default Movies;
