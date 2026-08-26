import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPendingOrdersQuery } from '../../../store/apiSlice';
import { countPendingOrders } from '../../orders/ordersUtils';
import "../common-style/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { data: pendingData } = useGetPendingOrdersQuery(undefined, {
    skip: !isAuthenticated,
    pollingInterval: 30000,
  });
  const pendingCount = countPendingOrders(pendingData);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          FIT STORE
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/categories" className="nav-link">Categories</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>

        {/* Action Button */}
        <div className="navbar-actions">
          {isAuthenticated && (
            <Link to="/orders/pending" className="notification-bell" aria-label="Pending approvals">
              &#128276;
              {pendingCount > 0 && <span className="notification-badge">{pendingCount}</span>}
            </Link>
          )}
          <Link to="/login" className="btn-login">Login</Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/categories" className="nav-link" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
          {isAuthenticated && (
            <Link to="/orders/pending" className="nav-link" onClick={() => setIsOpen(false)}>
              Pending Approvals{pendingCount > 0 ? ` (${pendingCount})` : ''}
            </Link>
          )}
          <Link to="/login" className="btn-login" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;