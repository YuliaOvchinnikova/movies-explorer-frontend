import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm({ handleSearchSubmit, query, isShortMovies }) {
  return (
    <section className="searchForm-section">
      <form className="searchForm" onSubmit={handleSearchSubmit}>
        <div className="searchForm__search-box">
          <input
            className="searchForm__input interactive-element"
            type="text"
            value={query}
            id="search"
            name="search"
            placeholder="Фильм"
            required
            max-length="3"
            min-length="15"
          />
          <button
            className="searchForm__submit interactive-element"
            type="submit"
          ></button>
        </div>
        <FilterCheckbox isShortMovies={isShortMovies} />
      </form>
    </section>
  );
}

export default SearchForm;
