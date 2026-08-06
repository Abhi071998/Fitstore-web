import React, { useState } from 'react';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../store/apiSlice';
import './CategoryModal.css';

export default function CategoryModal({ category, onClose }) {
  const isEditMode = Boolean(category);

  const [name, setName] = useState(category?.name || '');
  const [imageUrl, setImageUrl] = useState(category?.image_url || '');

  const [createCategory, { isLoading: isCreating, error: createError }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating, error: updateError }] = useUpdateCategoryMutation();

  const isLoading = isEditMode ? isUpdating : isCreating;
  const error = isEditMode ? updateError : createError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCategory({ id: category.id, name, image_url: imageUrl || undefined }).unwrap();
      } else {
        await createCategory({ name, image_url: imageUrl || undefined }).unwrap();
      }
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
          <h3>{isEditMode ? 'Edit Category' : 'Add Category'}</h3>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <p className="modal-error">{error?.data?.message || error?.data?.error || 'Something went wrong'}</p>
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
              {isLoading ? 'Saving...' : isEditMode ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
