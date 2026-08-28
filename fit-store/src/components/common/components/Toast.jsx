import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type = 'success', onClose, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast-${type}`} role="status">
      <span className="toast-icon">{type === 'success' ? '✓' : '!'}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
