import React from 'react';
import './ConfirmDialog.css';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, isLoading }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="confirm-overlay" onClick={handleOverlayClick}>
      <div className="confirm-dialog">
        <h4 className="confirm-title">{title}</h4>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button type="button" className="confirm-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="confirm-btn-danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
