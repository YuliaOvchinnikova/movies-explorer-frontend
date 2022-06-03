import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm({
  handleSearchSubmit,
  query,
  isShortMovies,
  handleShortFilms,
  requiredInput,
}) {
  const [inputValue, setInputValue] = useState(query);

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSearchSubmit(e.target.search.value);
  }

  return (
    <section className="searchForm-section">
      <form className="searchForm" onSubmit={onSubmit}>
        <div className="searchForm__search-box">
          <input
            className="searchForm__input interactive-element"
            type="text"
            onChange={handleOnChange}
            value={inputValue}
            id="search"
            name="search"
            placeholder="Фильм"
            required={requiredInput}
            min-length="3"
            max-length="15"
          />
          <button
            className="searchForm__submit interactive-element"
            type="submit"
          ></button>
        </div>
        <FilterCheckbox
          isShortMovies={isShortMovies}
          handleShortFilms={handleShortFilms}
        />
      </form>
    </section>
  );
}

export default SearchForm;
