import React from 'react'
import "./AboutProject.css"

function AboutProject() {
  return (
    <section id="aboutproject" className='aboutProject-section'>
      <h2 className='aboutProject-section__bookmark bookmark'>О проекте</h2>      
      <div className='table'>
        <h3 className='table__title table__t1'>Дипломный проект включал 5 этапов</h3>
        <h3 className='table__title table__t2'>На выполнение диплома ушло 5 недель</h3>
        <p className='table__subtitle table__t3'>Составление плана, работу над бэкендом, 
          вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='table__subtitle table__t4'>У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.</p>  
      </div>
      <div className='chart'>
        <p className='chart__title chart__title_complete '>1 неделя</p>
        <p className='chart__title chart__title_incomplete '>4 недели</p>
        <p className='chart__subtitle chart__subtitle_first'>Back-end</p>
        <p className='chart__subtitle chart__subtitle_second'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject