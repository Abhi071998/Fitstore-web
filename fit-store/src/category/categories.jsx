import React from 'react';
import { useGetCategoriesQuery } from '../store/apiSlice';
import './CardGrid.css';

export default function Categories() {
  const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();

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
  if (!categories || categories.length === 0) return <div className="grid-status">No categories found.</div>;

  return (
    <div className="card-grid-container">
      <h2 className="card-grid-title">Categories</h2>
      
      <div className="card-grid">
        {categories.map((cat) => {
          const imageUrl = getCategoryImage(cat);

          return (
            <div key={cat.id} className="item-card">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}