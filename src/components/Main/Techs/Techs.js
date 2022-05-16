import React from 'react'
import "./Techs.css"

function Techs() {
  return (
    <section className='techs-section'>
      <h2 className='techs-section__bookmark bookmark'>Технологии</h2>
      <h3 className='techs-section__title'>7 технологий</h3>
      <p className='techs-section__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='list'>
        <li className='list__item'>HTML</li>
        <li className='list__item'>CSS</li>
        <li className='list__item'>JS</li>
        <li className='list__item'>React</li>
        <li className='list__item'>Git</li>
        <li className='list__item'>Express.js</li>
        <li className='list__item'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs
