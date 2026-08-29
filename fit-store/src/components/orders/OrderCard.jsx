import React, { useState } from 'react';
import { useApproveOrderMutation, useRejectOrderMutation } from '../../store/api/ordersApi';
import {
  getOrderItems,
  getItemLabel,
  getItemProductCode,
  getItemQuantity,
  getItemUnitPrice,
  computeOrderTotal,
} from './ordersUtils';

export default function OrderCard({ order, selected, onToggleSelect }) {
  const [comment, setComment] = useState('');
  const [approveOrder, { isLoading: isApproving, error: approveError }] = useApproveOrderMutation();
  const [rejectOrder, { isLoading: isRejecting, error: rejectError }] = useRejectOrderMutation();

  const items = getOrderItems(order);
  const total = computeOrderTotal(order);
  const isBusy = isApproving || isRejecting;

  const handleApprove = async () => {
    try {
      await approveOrder(order.id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    try {
      await rejectOrder({ id: order.id, comment }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <label className="order-select">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(order.id)}
          />
          <span>Order #{order.id}</span>
        </label>
        {order.status && <span className="order-status">{order.status}</span>}
      </div>

      <div className="order-card-meta">
        {order.created_at && (
          <span>Placed: {new Date(order.created_at).toLocaleString()}</span>
        )}
        {order.shipping_name && <span>Ship to: {order.shipping_name}</span>}
        {order.shipping_address && (
          <span>
            {order.shipping_address}, {order.shipping_city}, {order.shipping_state} -{' '}
            {order.shipping_pincode}
          </span>
        )}
      </div>

      {items.length > 0 && (
        <ul className="order-items">
          {items.map((item, idx) => (
            <li key={item.id ?? idx}>
              {getItemLabel(item)} × {getItemQuantity(item)}
              {getItemProductCode(item) && ` [${getItemProductCode(item)}]`}
              {getItemUnitPrice(item) != null && ` — ₹${getItemUnitPrice(item)} each`}
            </li>
          ))}
        </ul>
      )}

      {total > 0 && <div className="order-total">Total: ₹{total}</div>}

      {order.admin_comment && (
        <p className="order-admin-comment">Previous comment: {order.admin_comment}</p>
      )}

      {(approveError || rejectError) && (
        <p className="order-error">
          {approveError?.data?.message ||
            approveError?.data?.error ||
            rejectError?.data?.message ||
            rejectError?.data?.error ||
            'Something went wrong'}
        </p>
      )}

      <textarea
        className="order-comment"
        rows={2}
        placeholder="Add a comment (required to reject)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="order-actions">
        <button
          type="button"
          className="order-btn-reject"
          onClick={handleReject}
          disabled={isBusy || comment.trim() === ''}
        >
          {isRejecting ? 'Rejecting...' : 'Reject'}
        </button>
        <button
          type="button"
          className="order-btn-approve"
          onClick={handleApprove}
          disabled={isBusy}
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </button>
      </div>
    </div>
  );
}
