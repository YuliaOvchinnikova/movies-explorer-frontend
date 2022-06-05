import React from 'react'
import "./Portfolio.css"
import linkArrow from "../../../images/link-arrow.svg"

function Portfolio() {
  return (
    <section className='portfolio-section'>
      <a href="https://yuliaovchinnikova.github.io/" target="_blank" className='portfolio-link interactive-element' rel="noreferrer">Портфолио</a>
        <ul className='portfolio-list'>
          <li className='portfolio-item'>
            <a className='portfolio-item__link interactive-element' target="_blank" href='https://yuliaovchinnikova.github.io/russian-travel/index.html' rel="noreferrer">
              <p className='portfolio-item__title'>Статичный сайт</p>
              <img className='portfolio-item__arrow' src={linkArrow} alt="стрелка"/>
            </a>
          </li>

          <li className='portfolio-item'>
            <a className='portfolio-item__link interactive-element' target="_blank" href='https://yuliaovchinnikova.github.io/russian-travel/index.html' rel="noreferrer">
              <p className='portfolio-item__title'>Адаптивный сайт</p>
              <img className='portfolio-item__arrow' src={linkArrow} alt="стрелка"/>
            </a>
          </li>

          <li className='portfolio-item'>
            <a className='portfolio-item__link interactive-element' target="_blank" href='https://mestogram.students.nomoredomains.work/sign-in' rel="noreferrer">
              <p className='portfolio-item__title'>Одностраничное приложение</p>
              <img className='portfolio-item__arrow' src={linkArrow} alt="стрелка"/>
            </a>
          </li>
        </ul>
    </section>
  )
}

export default Portfolio
