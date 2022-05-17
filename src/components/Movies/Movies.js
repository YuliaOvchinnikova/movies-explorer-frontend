import React from 'react'
import Header from "../common/Header/Header.js"
import SearchForm from "../common/SearchForm/SearchForm.js"
import MoviesCardList from "../common/MoviesCardList/MoviesCardList.js"
import MoreButton from "../common/MoreButton/MoreButton.js"
import Footer from "../common/Footer/Footer.js"
import MoviesCard from '../common/MoviesCard/MoviesCard.js'
import "./Movies.css"
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"

function Movies({handlePopupOpen, width}) {
  return (
    <main className="page">
      <Header authorized={true} handlePopupOpen={handlePopupOpen} width={width} />
      <SearchForm />
      <MoviesCardList>
        <MoviesCard title="В погоне за Бенкси" duration="27 минут" image={image1} liked={true} saved={false}/>
        <MoviesCard title="В погоне за Бенкси" duration="27 минут" image={image2} liked={true} saved={false}/>
        <MoviesCard title="В погоне за Бенкси" duration="27 минут" image={image3} liked={false} saved={false}/>
        <MoviesCard title="В погоне за Бенкси" duration="27 минут" image={image3} liked={false} saved={false}/>
      </MoviesCardList>
      <MoreButton saved={false}/>
      <Footer />
    </main>
  )
}

export default Movies