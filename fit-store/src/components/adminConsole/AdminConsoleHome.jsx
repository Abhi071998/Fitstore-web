import { Link } from 'react-router-dom';

const sections = [
  {
    to: 'about-us',
    title: 'About Us',
    description: 'Manage the About Us content shown to customers.',
  },
  {
    to: 'category-types',
    title: 'Category Types',
    description: 'Create and manage the types used when organizing categories.',
  },
];

export default function AdminConsoleHome() {
  return (
    <div className="admin-console-card-grid">
      {sections.map((section) => (
        <Link key={section.to} to={section.to} className="admin-console-card">
          <h3>{section.title}</h3>
          <p>{section.description}</p>
        </Link>
      ))}
    </div>
  );
}
