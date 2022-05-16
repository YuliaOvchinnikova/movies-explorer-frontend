import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Error.css"

function Error() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }
  return (
    <section className='error-section'>
      <div className='error-section__status'>404</div>
      <p className='error-section__name'>Страница не найдена</p>
      <button className='error-section__button interactive-element' onClick={handleClick}>Назад</button>
    </section>
  )
}

export default Error
