import React from 'react';
import './MoreButton.css';

export default function MoreButton({ saved, handleMoreCards }) {
  return (
    <section
      className={saved ? 'moreButton-section_empty' : 'moreButton-section'}
    >
      {!saved && (
        <button
          className="moreButton-section__button interactive-element"
          onClick={handleMoreCards}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
