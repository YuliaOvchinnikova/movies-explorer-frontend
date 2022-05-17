import React from 'react'
import Navigation from '../Navigation/Navigation.js'
import Logo from '../Logo/Logo.js'
import './Header.css'

function Header({authorized, handlePopupOpen, width}) {

  return (
    <header className='header'>
      <Logo />
      <Navigation 
        authorized={authorized} 
        handlePopupOpen={handlePopupOpen}
        width={width}
      />
    </header>
  )
}

export default Header
