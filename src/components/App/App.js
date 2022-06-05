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
import mainApi from '../../utils/MainApi.js';
import useWindowSize from '../../utils/useWindowSize.js';
import ProtectedRoute from '../ProtectedRoute.js';
import { UserContext } from '../../utils/userContext.js';
import Header from '../common/Header/Header.js';

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

  function registrationSuccess() {
    setUserAuthorized(true);
    navigate('/movies');
  }

  function loginSuccess() {
    setUserAuthorized(true);
    navigate('/movies');
  }

  if (userInfoLoading) {
    return <div></div>;
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/movies"
          element={
            <ProtectedRoute authorized={userAuthorized}>
              <Header
                authorized={true}
                handlePopupOpen={handlePopupOpen}
                width={width}
                isMain={false}
              />
              <Movies handlePopupOpen={handlePopupOpen} width={width} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute authorized={userAuthorized}>
              <Header
                authorized={true}
                handlePopupOpen={handlePopupOpen}
                width={width}
                isMain={false}
              />
              <SavedMovies width={width} />
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
                <Header
                  authorized={true}
                  handlePopupOpen={handlePopupOpen}
                  width={width}
                  isMain={false}
                />
                <Profile width={width} />
              </UserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header
                authorized={userAuthorized}
                handlePopupOpen={handlePopupOpen}
                width={width}
                isMain={true}
              />
              <Main />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            userAuthorized ? (
              <Navigate to="/" />
            ) : (
              <Login loginSuccess={loginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userAuthorized ? (
              <Navigate to="/" />
            ) : (
              <Register registrationSuccess={registrationSuccess} />
            )
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      {isPopupOpen && width < 1024 && (
        <Popup handlePopupClose={handlePopupClose} />
      )}
    </div>
  );
}

export default App;
