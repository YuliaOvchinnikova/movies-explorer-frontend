import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Popup from '../common/Popup/Popup.js';
import { register, login } from '../../utils/Auth.js';
import useWindowSize from '../../utils/useWindowSize.js';
import ProtectedRoute from '../ProtectedRoute.js';

function App() {
  const [width] = useWindowSize();
  const navigate = useNavigate();

  const [userAuthorized, setUserAuthorized] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
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
        setUserAuthorized(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Routes>
        <Route
          path="/movies"
          element={
            <ProtectedRoute authorized={userAuthorized}>
              <Movies handlePopupOpen={handlePopupOpen} width={width} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute authorized={userAuthorized}>
              <SavedMovies handlePopupOpen={handlePopupOpen} width={width} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute authorized={userAuthorized}>
              <Profile handlePopupOpen={handlePopupOpen} width={width} />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Main width={width} />} />
        <Route path="/signin" element={<Login loginSubmit={loginSubmit} />} />
        <Route
          path="/signup"
          element={<Register registrationSubmit={registrationSubmit} />}
        />
        <Route
          path="*"
          element={
            userAuthorized ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      {isPopupOpen && width < 1024 && (
        <Popup handlePopupClose={handlePopupClose} />
      )}
    </>
  );
}

export default App;
