import React from 'react';
import AboutUsSection from './sections/AboutUsSection';
import './AdminConsole.css';

// Shell for all admin-managed content. Each editable area of the site
// lives in its own file under ./sections and gets added here as a section.
export default function AdminConsole() {
  return (
    <div className="admin-console-page">
      <h2 className="admin-console-title">Admin Console</h2>

      <AboutUsSection />
    </div>
  );
}
