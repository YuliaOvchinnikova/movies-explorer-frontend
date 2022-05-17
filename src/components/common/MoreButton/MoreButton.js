import React from 'react'
import "./MoreButton.css"

export default function MoreButton({saved}) {
  return (
    <section className={saved ? "moreButton-section_empty" : 'moreButton-section'}>
      {!saved && <button className='moreButton-section__button interactive-element'>Ещё</button>}
    </section>
  )
}
