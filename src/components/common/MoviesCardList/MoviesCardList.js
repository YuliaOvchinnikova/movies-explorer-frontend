import React from 'react';
import './MoviesCardList.css';

function MoviesCardList({ children }) {
  return (
    <>
      {children && (
        <section className="moviesCardList-section">{children}</section>
      )}
    </>
  );
}

export default MoviesCardList;
