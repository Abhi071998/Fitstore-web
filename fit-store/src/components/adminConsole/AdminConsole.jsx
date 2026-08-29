import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminConsole.css';

// Layout shell for all admin-managed content. The index route shows a card
// per section (see AdminConsoleHome); each card links to its own nested
// route rendering that section's component under ./sections.
export default function AdminConsole() {
  const location = useLocation();
  const isIndex = location.pathname.replace(/\/$/, '') === '/admin-console';

  return (
    <div className="admin-console-page">
      {!isIndex && (
        <Link to="/admin-console" className="admin-console-back-link">
          &larr; Back to Admin Console
        </Link>
      )}
      <h2 className="admin-console-title">Admin Console</h2>
      <Outlet />
    </div>
  );
}
