import React, { useState } from 'react';
import { useCreateCategoryMutation } from '../store/apiSlice';
import './CreateCategoryModal.css';

export default function CreateCategoryModal({ onClose }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name, image_url: imageUrl || undefined }).unwrap();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>Add Category</h3>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <p className="modal-error">{error?.data?.message || 'Failed to create category'}</p>
          )}

          <div className="modal-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal-field">
            <label>Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
