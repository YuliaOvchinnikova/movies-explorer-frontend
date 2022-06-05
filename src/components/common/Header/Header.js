import Navigation from '../Navigation/Navigation.js';
import Logo from '../Logo/Logo.js';
import './Header.css';

function Header({ authorized, handlePopupOpen, width, isMain }) {
  return (
    <header
      className={
        isMain
          ? 'header header_background-dark'
          : 'header header_background-white'
      }
    >
      <Logo />
      <Navigation
        authorized={authorized}
        handlePopupOpen={handlePopupOpen}
        width={width}
        isMain={isMain}
      />
    </header>
  );
}

export default Header;
