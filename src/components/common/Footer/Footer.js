import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <footer className='footer'>
      <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__cover'>
        <p className='footer__date'>© 2022</p>
        <nav className='link-list'>
          <a href="https://practicum.yandex.ru" target="_blank" className='link-list__link interactive-element' rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/Yandex-Practicum" target="_blank" className='link-list__link interactive-element' rel="noreferrer">Github</a>
          <a href="https://www.facebook.com/YPracticum/" target="_blank" className='link-list__link interactive-element' rel="noreferrer">Facebook</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer