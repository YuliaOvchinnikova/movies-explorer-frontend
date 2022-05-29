import React, { useLayoutEffect, useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Popup from '../common/Popup/Popup.js';
import moviesApi from '../../utils/MoviesApi.js';

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
            />
          }
        />
        {/* <Route
          path="/saved-movies"
          element={
            <SavedMovies handlePopupOpen={handlePopupOpen} width={width} />
          }
        /> */}
        <Route
          path="/profile"
          element={<Profile handlePopupOpen={handlePopupOpen} width={width} />}
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {isPopupOpen && width < 1024 && (
        <Popup handlePopupClose={handlePopupClose} />
      )}
    </>
  );
}

export default App;
