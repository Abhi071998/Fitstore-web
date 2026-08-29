import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPendingOrdersQuery } from '../../store/api/ordersApi';
import { countPendingOrders } from '../orders/ordersUtils';
import './Home.css';

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { data: pendingData } = useGetPendingOrdersQuery(undefined, {
    skip: !isAuthenticated,
  });
  const pendingCount = countPendingOrders(pendingData);

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to FIT STORE</h1>
      <p className="home-subtitle">Explore our latest collection of gym tees and activewear.</p>

      {isAuthenticated && pendingCount > 0 && (
        <Link to="/orders/pending" className="home-reminder">
          You have {pendingCount} pending task{pendingCount > 1 ? 's' : ''}
        </Link>
      )}
    </div>
  );
}

export default Home;
