import React, { useLayoutEffect, useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Popup from '../common/Popup/Popup.js';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import { register, login } from '../../utils/Auth.js';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function App() {
  const [width] = useWindowSize();
  const navigate = useNavigate();

  const storedFilteredMovies = localStorage.getItem('filteredMovies');
  const storedQuery = localStorage.getItem('query');
  const storedcheckbox = localStorage.getItem('checkbox');

  const [filteredMovies, setFilteredMovies] = useState(
    storedFilteredMovies !== null ? JSON.parse(storedFilteredMovies) : []
  );
  const [query, setQuery] = useState(storedQuery !== null ? storedQuery : '');
  const [checkbox, setCheckbox] = useState(
    storedcheckbox !== null ? JSON.parse(storedcheckbox) : false
  );

  const [allMovies, setAllMovies] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchSubmited, setIsSearchSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

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

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

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

    if (isChanged) {
      setIsSearchSubmited(true);
    }
  }

  useEffect(() => {
    function isShortMovie(movie) {
      return movie.duration <= 40;
    }

    function filteredByCheckbox(movie, checkbox) {
      if (checkbox) {
        return isShortMovie(movie);
      }
      return true;
    }
    if (!isSearchSubmited) {
      return;
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

    if (allMovies.length !== 0) {
      updateFilteredMovies();
    } else {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((data) => {
          setAllMovies(data);
          updateFilteredMovies();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.statusCode === 500) {
            setServerError(true);
          }
          console.log(err);
        });
    }
    setIsSearchSubmited(false);
  }, [isSearchSubmited, allMovies]);

  function handleDeleteSavedMovie(id) {
    mainApi
      .deleteSavedMovieById(id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => movie.id !== id);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function registrationSubmit(name, email, password) {
    register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginSubmit(email, password) {
    login(email, password)
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveMovie(movie) {
    console.log(movie);
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Main width={width} />} />
        <Route
          path="/movies"
          element={
            <Movies
              handlePopupOpen={handlePopupOpen}
              width={width}
              handleSearchSubmit={handleSearchSubmit}
              filteredMovies={filteredMovies}
              isLoading={isLoading}
              query={query}
              isShortMovies={checkbox}
              serverError={serverError}
              handleSaveMovie={handleSaveMovie}
              savedMovies={savedMovies}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              handlePopupOpen={handlePopupOpen}
              width={width}
              savedMovies={savedMovies}
              handleDeleteSavedMovie={handleDeleteSavedMovie}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile handlePopupOpen={handlePopupOpen} width={width} />}
        />
        <Route path="/signin" element={<Login loginSubmit={loginSubmit} />} />
        <Route
          path="/signup"
          element={<Register registrationSubmit={registrationSubmit} />}
        />
      </Routes>
      {isPopupOpen && width < 1024 && (
        <Popup handlePopupClose={handlePopupClose} />
      )}
    </>
  );
}

export default App;
