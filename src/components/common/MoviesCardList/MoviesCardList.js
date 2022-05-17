import React from 'react'
import "./MoviesCardList.css"
import Preloader from '../../common/Preloader/Preloader.js'

function MoviesCardList({children}) {
  return (
    <>
    {children ? 
      <section className='moviesCardList-section'>
        {children}
      </section>
    : <Preloader />
    }
    </>
  )
}

export default MoviesCardList