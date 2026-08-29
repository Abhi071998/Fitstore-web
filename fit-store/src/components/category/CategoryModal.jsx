import React, { useState } from 'react';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../../store/api/categoriesApi';
import { useGetCategoryTypesQuery } from '../../store/api/categoryTypesApi';
import './CategoryModal.css';

const getCategoryTypeLabel = (type) => type.name || type.type_name || type.title || `Type #${type.id}`;

export default function CategoryModal({ category, onClose }) {
  const isEditMode = Boolean(category);

  const [imageUrl, setImageUrl] = useState(category?.image_url || '');
  const [categoryTypeId, setCategoryTypeId] = useState(
    category?.category_type_id != null ? String(category.category_type_id) : ''
  );

  const { data: categoryTypes } = useGetCategoryTypesQuery();
  const [createCategory, { isLoading: isCreating, error: createError }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating, error: updateError }] = useUpdateCategoryMutation();

  const isLoading = isEditMode ? isUpdating : isCreating;
  const error = isEditMode ? updateError : createError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedType = (categoryTypes || []).find((t) => String(t.id) === categoryTypeId);
    const payload = {
      name: selectedType ? getCategoryTypeLabel(selectedType) : '',
      image_url: imageUrl || undefined,
      category_type_id: categoryTypeId ? Number(categoryTypeId) : undefined,
    };
    try {
      if (isEditMode) {
        await updateCategory({ id: category.id, ...payload }).unwrap();
      } else {
        await createCategory(payload).unwrap();
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
            <label>Name<span className="required-mark">*</span></label>
            <select
              value={categoryTypeId}
              onChange={(e) => setCategoryTypeId(e.target.value)}
              required
            >
              <option value="">Select a type</option>
              {(categoryTypes || []).map((type) => (
                <option key={type.id} value={type.id}>
                  {getCategoryTypeLabel(type)}
                </option>
              ))}
            </select>
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
