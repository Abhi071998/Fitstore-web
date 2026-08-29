import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../../store/api/productsApi';
import ProductModal from './ProductModal';
import FabButton from '../common/components/FabButton';
import './Products.css';

export default function Products() {
  const { categoryId } = useParams();
  const { data: products, isLoading, isError, error } = useGetProductsByCategoryQuery(categoryId);
  // null = closed, 'create' = add mode, product object = edit mode
  const [modalMode, setModalMode] = useState(null);

  const getProductImage = (product) => {
    if (!product.images) return null;
    try {
      const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      return parsed[0] || null;
    } catch {
      return null;
    }
  };

  if (isLoading) return <div className="grid-status">Loading...</div>;
  if (isError) return <div className="grid-status error">Error: {error?.data?.message || 'Failed to load'}</div>;

  return (
    <div className="card-grid-container">
      <h2 className="card-grid-title">{products?.[0]?.category?.name || 'Products'}</h2>

      {!products || products.length === 0 ? (
        <div className="grid-status">No products found.</div>
      ) : (
        <div className="card-grid">
          {products.map((product) => {
            const imageUrl = getProductImage(product);

            return (
              <div
                key={product.id}
                className="item-card"
                onClick={() => setModalMode(product)}
              >
                <div className="card-image-container">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="card-image"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="card-no-image">No Image</div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-subtitle">{product.brand}</p>
                  <div className="card-price-row">
                    <span className="card-price">₹{product.selling_price}</span>
                    {product.mrp > product.selling_price && (
                      <span className="card-mrp">₹{product.mrp}</span>
                    )}
                    {product.discount_percentage > 0 && (
                      <span className="card-discount">{product.discount_percentage}% off</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <FabButton ariaLabel="Add product" onClick={() => setModalMode('create')} />

      {modalMode && (
        <ProductModal
          product={modalMode === 'create' ? null : modalMode}
          categoryId={categoryId}
          onClose={() => setModalMode(null)}
        />
      )}
    </div>
  );
}
