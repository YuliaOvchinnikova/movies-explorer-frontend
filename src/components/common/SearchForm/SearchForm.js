import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm({ handleSearchSubmit, query, isShortMovies }) {
  const [inputValue, setInputValue] = useState(query);

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }
  return (
    <section className="searchForm-section">
      <form className="searchForm" onSubmit={handleSearchSubmit}>
        <div className="searchForm__search-box">
          <input
            className="searchForm__input interactive-element"
            type="text"
            onChange={handleOnChange}
            value={inputValue}
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
