import React from 'react'
import Navigation from '../Navigation/Navigation.js'
import Logo from '../Logo/Logo.js'
import './Header.css'

function Header({authorized}) {
  return (
    <header className='header'>
      <Logo />
      <Navigation authorized={authorized}/>
    </header>
  )
}

export default Header
