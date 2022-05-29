import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, duration, image, children }) {
  return (
    <div className="card">
      <div className="card__cover">
        <h2 className="card__title">{title}</h2>
        <p className="card__duration">{duration}</p>
      </div>
      <img
        className="card__image"
        src={`https://api.nomoreparties.co/${image}`}
        alt="Картинка"
      />
      {children}
    </div>
  );
}

export default MoviesCard;
