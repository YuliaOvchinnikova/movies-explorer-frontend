import React from 'react'
import "./AboutMe.css"
import myPhoto from "../../../images/myPhoto.jpg"

function AboutMe() {
  return (
    <>
      <section className='aboutMe-section'>
        <h2 className='aboutMe-section__bookmark bookmark'>Студент</h2>
        <div className='grid-table'>
          <div className='cover grid-table__t1'>
            <h3 className='aboutMe-section__title'>Юлия</h3>
            <h4 className='aboutMe-section__subtitle'>Фронтенд-разработчица</h4>
            <p className='aboutMe-section__text-about'>Привет, я родом из Красноярска, Сибирь. Теперь уже 5 лет живу в Финляндии. 
              Я решила переучиться здесь, 
              в прошлом году закончила колледж и теперь ищу работу. Чем больше знаю, 
              тем интереснее изучать дальше. </p>
            <a href="https://www.facebook.com/julchik.sk" className='link interactive-element' target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://github.com/YuliaOvchinnikova" className='link interactive-element' target="_blank" rel="noreferrer">Github</a>
          </div>
          <img src={myPhoto} alt="мое фото" className='avatar  grid-table__t2'/>  
        </div>
      </section>
    </>
  )
}

export default AboutMe
