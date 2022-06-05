import React from 'react';

import landingImage from '../../../images/landing-image.svg';
import './Promo.css';

function Promo() {
  return (
    <section className="promo-section">
      <section className="greating-section">
        <div className="greating-section__cover">
          <h1 className="greating-section__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="greating-section__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img
          src={landingImage}
          alt="форма планеты Земля"
          className="earth-logo"
        />
      </section>
      <a href="#aboutproject" className="more-button interactive-element">
        Узнать больше
      </a>
    </section>
  );
}
export default Promo;
