import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Error from '../Error/Error.js';
import Popup from '../common/Popup/Popup.js';
import { register, login } from '../../utils/Auth.js';
import mainApi from '../../utils/MainApi.js';
import useWindowSize from '../../utils/useWindowSize.js';
import ProtectedRoute from '../ProtectedRoute.js';
import { UserContext } from '../../utils/userContext.js';

function App() {
  const [width] = useWindowSize();
  const navigate = useNavigate();

  const [userAuthorized, setUserAuthorized] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res && res.data.email !== '') {
          setUserAuthorized(true);
          setCurrentUser(res.data);
          setUserInfoLoading(false);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setUserInfoLoading(false);
        } else {
          console.log(err.text);
        }
      });
  }, [userInfoLoading, userAuthorized]);

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  function registrationSubmit({ name, email, password }) {
    register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginSubmit({ email, password }) {
    login(email, password)
      .then(() => {
        setUserAuthorized(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (userInfoLoading) {
    return <div></div>;
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
              <UserContext.Provider
                value={{ currentUser, setCurrentUser, setUserAuthorized }}
              >
                <Profile handlePopupOpen={handlePopupOpen} width={width} />
              </UserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            userAuthorized ? (
              <Navigate to="/movies" replace />
            ) : (
              <Main width={width} />
            )
          }
        />
        <Route path="/signin" element={<Login loginSubmit={loginSubmit} />} />
        <Route
          path="/signup"
          element={<Register registrationSubmit={registrationSubmit} />}
        />
        <Route path="*" element={<Error></Error>} />
      </Routes>
      {isPopupOpen && width < 1024 && (
        <Popup handlePopupClose={handlePopupClose} />
      )}
    </>
  );
}

export default App;
