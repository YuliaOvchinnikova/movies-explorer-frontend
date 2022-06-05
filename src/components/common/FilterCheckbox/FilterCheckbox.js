import React, { useState } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShortMovies, handleShortFilms }) {
  function handleCheckboxClick() {
    handleShortFilms(!isShortMovies);
  }

  return (
    <div className="checkbox-container">
      <p className="checkbox-container__label">Короткометражки</p>
      <input
        className="checkbox-container__input"
        type="checkbox"
        id="shortfilm"
        name="shortfilm"
        onClick={handleCheckboxClick}
      />
      <label
        htmlFor="shortfilm"
        className={`${
          isShortMovies
            ? 'checkbox-container__image'
            : 'checkbox-container__image checkbox-container__image-inactive'
        }`}
      ></label>
    </div>
  );
}
