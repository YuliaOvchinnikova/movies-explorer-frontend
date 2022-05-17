import React, {useLayoutEffect, useState} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "../Main/Main.js"
import Movies from "../Movies/Movies.js"
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from "../Profile/Profile.js"
import Login from "../Login/Login.js"
import Register from "../Register/Register.js" 
import Popup from '../common/Popup/Popup.js'

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
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

const [isPopupOpen, setIsPopupOpen] = useState(false);
function handlePopupOpen() {
  setIsPopupOpen(true)
}

function handlePopupClose() {
  setIsPopupOpen(false)
}

  return (
    <>
      <Routes>
        <Route path="/" element={<Main width={width}/>} />
        <Route path="/movies" element={<Movies handlePopupOpen={handlePopupOpen} width={width} />} />
        <Route path="/saved-movies" element={<SavedMovies handlePopupOpen={handlePopupOpen} width={width} />} />
        <Route path="/profile" element={<Profile handlePopupOpen={handlePopupOpen} width={width} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {(isPopupOpen && width < 1024) && <Popup handlePopupClose={handlePopupClose} />}
    </>
  );
}

export default App;
