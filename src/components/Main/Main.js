import React from 'react'
import Promo from "./Promo/Promo.js"
import AboutProject from "./AboutProject/AboutProject.js"
import Techs from "./Techs/Techs.js"
import AboutMe from "./AboutMe/AboutMe.js"
import Portfolio from "./Portfolio/Portfolio.js"
import Footer from "../common/Footer/Footer.js"
import "./Main.css"

function Main() {
  return (
    <main className="page">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
}

export default Main