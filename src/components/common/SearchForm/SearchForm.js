import React from 'react'
import "./SearchForm.css"
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js'

function SearchForm() {
  return (
    <section className='searchForm-section'>
      <form className='searchForm'>
        <input className='searchForm__input interactive-element' type="text" id="search" name="search" placeholder='Фильм' required max-length="3" min-length="15" />
        <button className='searchForm__submit interactive-element' type="submit"></button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm
