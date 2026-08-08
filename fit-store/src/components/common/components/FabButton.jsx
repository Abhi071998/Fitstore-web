import React from 'react';
import './FabButton.css';

export default function FabButton({ onClick, ariaLabel = 'Add', children = '+' }) {
  return (
    <button className="fab-button" aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
