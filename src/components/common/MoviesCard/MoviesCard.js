import React from 'react';
import './MoviesCard.css';

function MoviesCard({ title, duration, image, liked, saved }) {
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
      {saved ? (
        <button className="card__button card__button_saved interactive-element">
          saved
        </button>
      ) : (
        <button
          className={
            liked
              ? 'card__button card__button_liked interactive-element'
              : 'card__button interactive-element'
          }
        >
          {liked ? '' : 'Сохранить'}
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
