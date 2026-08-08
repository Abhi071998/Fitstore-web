import React, { useState } from 'react';
import { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../../store/apiSlice';
import ConfirmDialog from '../common/components/ConfirmDialog';
import './ProductModal.css';

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];

const imagesToText = (images) => {
  if (!images) return '';
  try {
    const parsed = typeof images === 'string' ? JSON.parse(images) : images;
    return Array.isArray(parsed) ? parsed.join('\n') : '';
  } catch {
    return '';
  }
};

const specificationsToText = (specifications) => {
  if (!specifications) return '';
  try {
    const parsed = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
    return Object.entries(parsed)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  } catch {
    return '';
  }
};

const sizesToStockMap = (sizes) => {
  const map = SIZE_OPTIONS.reduce((acc, size) => ({ ...acc, [size]: '' }), {});
  if (Array.isArray(sizes)) {
    sizes.forEach(({ size, stock }) => {
      if (map[size] !== undefined) map[size] = String(stock ?? '');
    });
  }
  return map;
};

export default function ProductModal({ product, categoryId, onClose }) {
  const isEditMode = Boolean(product);

  const [name, setName] = useState(product?.name || '');
  const [brand, setBrand] = useState(product?.brand || '');
  const [productCode, setProductCode] = useState(product?.product_code || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [description, setDescription] = useState(product?.description || '');
  const [mrp, setMrp] = useState(product?.mrp ?? '');
  const [sellingPrice, setSellingPrice] = useState(product?.selling_price ?? '');
  const [imagesText, setImagesText] = useState(imagesToText(product?.images));
  const [specificationsText, setSpecificationsText] = useState(specificationsToText(product?.specifications));
  const [sizeStock, setSizeStock] = useState(sizesToStockMap(product?.sizes));

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const [createProduct, { isLoading: isCreating, error: createError }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const isLoading = isEditMode ? isUpdating : isCreating;
  const error = isEditMode ? updateError : createError;

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSizeStockChange = (size, value) => {
    setSizeStock((prev) => ({ ...prev, [size]: value }));
  };

  const parseImages = () =>
    imagesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

  const parseSpecifications = () => {
    const specs = {};
    specificationsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) return;
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        if (key) specs[key] = value;
      });
    return specs;
  };

  const parseSizes = () =>
    SIZE_OPTIONS.filter((size) => sizeStock[size] !== '').map((size) => ({
      size,
      stock: Number(sizeStock[size]) || 0,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      brand: brand || undefined,
      description: description || undefined,
      product_code: productCode,
      sku,
      mrp: mrp === '' ? 0 : Number(mrp),
      selling_price: sellingPrice === '' ? 0 : Number(sellingPrice),
      category_id: Number(categoryId),
      images: parseImages(),
      specifications: parseSpecifications(),
      sizes: parseSizes(),
    };

    try {
      if (isEditMode) {
        await updateProduct({ id: product.id, ...payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
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
          <h3>{isEditMode ? 'Edit Product' : 'Add Product'}</h3>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <p className="modal-error">
              {error?.data?.message || error?.data?.error || 'Something went wrong'}
            </p>
          )}

          <div className="modal-field">
            <label>
              Name<span className="required-mark">*</span>
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>
                Product Code<span className="required-mark">*</span>
              </label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                placeholder="STYLE-43054612"
                required
              />
            </div>

            <div className="modal-field">
              <label>
                SKU<span className="required-mark">*</span>
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="ONYX-STR-SHIRT-001"
                required
              />
            </div>
          </div>

          <div className="modal-field">
            <label>Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="FITstore"
            />
          </div>

          <div className="modal-field">
            <label>Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>MRP</label>
              <input type="number" min="0" step="0.01" value={mrp} onChange={(e) => setMrp(e.target.value)} />
            </div>

            <div className="modal-field">
              <label>Selling Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-field">
            <label>Images</label>
            <textarea
              rows={3}
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder={'One image URL per line'}
            />
          </div>

          <div className="modal-field">
            <label>Specifications</label>
            <textarea
              rows={3}
              value={specificationsText}
              onChange={(e) => setSpecificationsText(e.target.value)}
              placeholder={'One per line, e.g.\nFabric: 100% Cotton\nFit: Slim Fit'}
            />
          </div>

          <div className="modal-field">
            <label>Sizes & Stock</label>
            <div className="size-stock-grid">
              {SIZE_OPTIONS.map((size) => (
                <div key={size} className="size-stock-item">
                  <label>{size}</label>
                  <input
                    type="number"
                    min="0"
                    value={sizeStock[size]}
                    onChange={(e) => handleSizeStockChange(size, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            {isEditMode && (
              <button
                type="button"
                className="modal-btn-danger"
                onClick={() => setIsConfirmingDelete(true)}
              >
                Delete
              </button>
            )}
            <button type="button" className="modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      {isConfirmingDelete && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${product?.name}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmingDelete(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
