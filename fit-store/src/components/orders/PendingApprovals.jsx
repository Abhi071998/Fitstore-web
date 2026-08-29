import React, { useState } from 'react';
import { useGetPendingOrdersQuery, useBulkApproveOrdersMutation } from '../../store/api/ordersApi';
import { normalizeOrderGroups } from './ordersUtils';
import OrderCard from './OrderCard';
import './PendingApprovals.css';

export default function PendingApprovals() {
  const { data, isLoading, isError, error } = useGetPendingOrdersQuery();
  const [bulkApprove, { isLoading: isBulkApproving }] = useBulkApproveOrdersMutation();
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkResult, setBulkResult] = useState(null);

  const groups = normalizeOrderGroups(data);
  const allOrderIds = groups.flatMap((group) => group.orders.map((order) => order.id));

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === allOrderIds.length ? [] : allOrderIds));
  };

  const handleBulkApprove = async () => {
    try {
      const result = await bulkApprove(selectedIds).unwrap();
      setBulkResult(result);
      setSelectedIds([]);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div className="grid-status">Loading...</div>;
  if (isError) return <div className="grid-status error">Error: {error?.data?.message || 'Failed to load'}</div>;

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <h2 className="orders-title">Pending Approvals</h2>

        {allOrderIds.length > 0 && (
          <div className="orders-bulk-bar">
            <label className="order-select">
              <input
                type="checkbox"
                checked={selectedIds.length === allOrderIds.length}
                onChange={toggleSelectAll}
              />
              <span>Select all ({allOrderIds.length})</span>
            </label>
            <button
              type="button"
              className="order-btn-approve"
              onClick={handleBulkApprove}
              disabled={selectedIds.length === 0 || isBulkApproving}
            >
              {isBulkApproving ? 'Approving...' : `Approve Selected (${selectedIds.length})`}
            </button>
          </div>
        )}
      </div>

      {bulkResult && (
        <div className="orders-bulk-result">
          {bulkResult.approved?.length > 0 && <span>Approved: {bulkResult.approved.join(', ')}</span>}
          {bulkResult.skipped?.length > 0 && <span>Skipped: {bulkResult.skipped.join(', ')}</span>}
        </div>
      )}

      {groups.length === 0 ? (
        <div className="grid-status">No pending orders.</div>
      ) : (
        groups.map((group) => (
          <div key={group.customerLabel} className="orders-group">
            <h3 className="orders-group-title">{group.customerLabel}</h3>
            <div className="orders-grid">
              {group.orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  selected={selectedIds.includes(order.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
