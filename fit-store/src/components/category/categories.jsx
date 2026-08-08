import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../store/apiSlice';
import CategoryModal from './CategoryModal';
import ConfirmDialog from '../common/components/ConfirmDialog';
import FabButton from '../common/components/FabButton';
import './CardGrid.css';

export default function Categories() {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();
  // null = closed, 'create' = add mode, category object = edit mode
  const [modalMode, setModalMode] = useState(null);
  // category object pending delete confirmation, or null
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(deletingCategory.id).unwrap();
      setDeletingCategory(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryImage = (cat) => {
    if (cat.image_url) return cat.image_url;

    if (cat.products && cat.products.length > 0) {
      const firstProduct = cat.products[0];
      if (firstProduct.images) {
        try {
          const parsed = typeof firstProduct.images === 'string' 
            ? JSON.parse(firstProduct.images) 
            : firstProduct.images;
          return parsed[0] || null;
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  if (isLoading) return <div className="grid-status">Loading...</div>;
  if (isError) return <div className="grid-status error">Error: {error?.data?.message || 'Failed to load'}</div>;

  return (
    <div className="card-grid-container">
      <h2 className="card-grid-title">Categories</h2>

      {!categories || categories.length === 0 ? (
        <div className="grid-status">No categories found.</div>
      ) : (
        <div className="card-grid">
          {categories.map((cat) => {
            const imageUrl = getCategoryImage(cat);

            return (
              <div
                key={cat.id}
                className="item-card"
                onClick={() => navigate(`/categories/${cat.id}/products`)}
              >
                <div className="card-image-container">
                  {imageUrl ? (
                    <img src={imageUrl} alt={cat.name} className="card-image" />
                  ) : (
                    <div className="card-no-image">No Image</div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{cat.name}</h3>
                  <p className="card-subtitle">
                    Products: {cat.products ? cat.products.length : 0}
                  </p>
                </div>

                <button
                  className="card-edit-button"
                  aria-label="Edit category"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalMode(cat);
                  }}
                >
                  &#9998;
                </button>

                <button
                  className="card-delete-button"
                  aria-label="Delete category"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingCategory(cat);
                  }}
                >
                  &#128465;
                </button>
              </div>
            );
          })}
        </div>
      )}

      <FabButton ariaLabel="Add category" onClick={() => setModalMode('create')} />

      {modalMode && (
        <CategoryModal
          category={modalMode === 'create' ? null : modalMode}
          onClose={() => setModalMode(null)}
        />
      )}

      {deletingCategory && (
        <ConfirmDialog
          title="Delete Category"
          message={`Are you sure you want to delete "${deletingCategory.name}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingCategory(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}