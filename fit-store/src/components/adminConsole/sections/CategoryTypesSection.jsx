import React, { useState } from 'react';
import {
  useGetCategoryTypesQuery,
  useCreateCategoryTypeMutation,
  useUpdateCategoryTypeMutation,
  useDeleteCategoryTypeMutation,
} from '../../../store/apiSlice';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import '../AdminConsole.css';

const getCategoryTypeLabel = (type) => type.name || type.type_name || type.title || `Type #${type.id}`;

export default function CategoryTypesSection() {
  const { data: categoryTypes, isLoading, isError, error } = useGetCategoryTypesQuery();
  const [createCategoryType, { isLoading: isCreating, error: createError }] = useCreateCategoryTypeMutation();
  const [updateCategoryType, { isLoading: isUpdating, error: updateError }] = useUpdateCategoryTypeMutation();
  const [deleteCategoryType, { isLoading: isDeleting }] = useDeleteCategoryTypeMutation();

  const [editingType, setEditingType] = useState(null); // null = create mode, type object = edit mode
  const [name, setName] = useState('');
  const [deletingType, setDeletingType] = useState(null);

  const isEditMode = Boolean(editingType);
  const isSaving = isCreating || isUpdating;
  const saveError = createError || updateError;

  const resetForm = () => {
    setEditingType(null);
    setName('');
  };

  const startEdit = (type) => {
    setEditingType(type);
    setName(type.name || type.type_name || type.title || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCategoryType({ id: editingType.id, name }).unwrap();
      } else {
        await createCategoryType({ name }).unwrap();
      }
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategoryType(deletingType.id).unwrap();
      if (editingType?.id === deletingType.id) resetForm();
      setDeletingType(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="admin-console-section">
      <h3 className="admin-console-section-title">Category Types</h3>

      <form className="admin-console-form" onSubmit={handleSubmit}>
        {saveError && (
          <p className="admin-console-error">
            {saveError?.data?.message || saveError?.data?.error || 'Failed to save'}
          </p>
        )}

        <div className="admin-console-field">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="admin-console-actions">
          {isEditMode && (
            <button type="button" className="admin-console-btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
          <button type="submit" className="admin-console-btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      {isLoading && <div className="grid-status">Loading...</div>}
      {isError && (
        <div className="grid-status error">Error: {error?.data?.message || 'Failed to load'}</div>
      )}

      {!isLoading && !isError && (
        <ul className="category-type-list">
          {(categoryTypes || []).length === 0 && (
            <li className="grid-status">No category types yet.</li>
          )}
          {(categoryTypes || []).map((type) => (
            <li key={type.id} className="category-type-item">
              <span>{getCategoryTypeLabel(type)}</span>
              <div className="category-type-item-actions">
                <button
                  type="button"
                  className="category-type-edit"
                  aria-label="Edit category type"
                  onClick={() => startEdit(type)}
                >
                  &#9998;
                </button>
                <button
                  type="button"
                  className="category-type-delete"
                  aria-label="Delete category type"
                  onClick={() => setDeletingType(type)}
                >
                  &#128465;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {deletingType && (
        <ConfirmDialog
          title="Delete Category Type"
          message={`Are you sure you want to delete "${getCategoryTypeLabel(deletingType)}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingType(null)}
          isLoading={isDeleting}
        />
      )}
    </section>
  );
}
