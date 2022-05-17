import React from 'react'
import "./FilterCheckbox.css"
import checkboxLogo from "../../../images/checkbox-active.svg"

export default function FilterCheckbox() {
  return (
    <div className='checkbox-container'>
      <p className='checkbox-container__label'>Короткометражки</p>
      <img className='checkbox-container__switch interactive-element' src={checkboxLogo} alt="активный чекбокс"/>
    </div>
  )
}
