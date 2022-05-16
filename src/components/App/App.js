import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "../Main/Main.js"
import Movies from "../Movies/Movies.js"
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from "../Profile/Profile.js"
import Login from "../Login/Login.js"
import Register from "../Register/Register.js" 
import Error from '../Error/Error.js'
import Popup from '../common/Popup/Popup.js'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* Роуты popup и error временное решение, пока нет JS */}
        <Route path="/error" element={<Error />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </>
  );
}

export default App;
