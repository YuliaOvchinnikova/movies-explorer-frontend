import React, { useState } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShortMovies }) {
  console.log(isShortMovies);
  const [checkbox, setCheckbox] = useState(isShortMovies);

  function handleCheckboxClick() {
    setCheckbox(!checkbox);
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
          checkbox
            ? 'checkbox-container__image'
            : 'checkbox-container__image checkbox-container__image-inactive'
        }`}
      ></label>
    </div>
  );
}
