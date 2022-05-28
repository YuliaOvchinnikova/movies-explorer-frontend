import React from 'react';
import Header from '../common/Header/Header.js';
import SearchForm from '../common/SearchForm/SearchForm.js';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList.js';
import MoreButton from '../common/MoreButton/MoreButton.js';
import Footer from '../common/Footer/Footer.js';
import MoviesCard from '../common/MoviesCard/MoviesCard.js';
import './Movies.css';
import Preloader from '../common/Preloader/Preloader.js';
// import image1 from '../../images/image1.jpg';
// import image2 from '../../images/image2.jpg';
// import image3 from '../../images/image3.jpg';

function Movies({
  handlePopupOpen,
  width,
  handleSearchSubmit,
  filteredMovies,
  isLoading,
  query,
  isShortMovies,
}) {
  return (
    <main className="page">
      <Header
        authorized={true}
        handlePopupOpen={handlePopupOpen}
        width={width}
      />
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        query={query}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList>
        {isLoading && <Preloader />}
        {filteredMovies !== null &&
          !isLoading &&
          filteredMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.nameRU}
              duration={movie.duration}
              image={movie.url}
              liked={true}
              saved={false}
            />
          ))}
      </MoviesCardList>
      <MoreButton saved={false} />
      <Footer />
    </main>
  );
}

export default Movies;
