import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, duration, image, trailerLink, children }) {
  return (
    <div className="card">
      <div className="card__cover">
        <h2 className="card__title">{title}</h2>
        <p className="card__duration">{duration}</p>
      </div>
      <a
        className="card__trailer"
        href={trailerLink}
        rel="noreferrer"
        target="_blank"
      >
        <img className="card__image" src={image} alt="Картинка" />
      </a>
      {children}
    </div>
  );
}

export default MoviesCard;
