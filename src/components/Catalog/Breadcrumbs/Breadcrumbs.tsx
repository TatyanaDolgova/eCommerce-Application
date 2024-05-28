import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumbs.css';

interface BreadcrumbsProps {
  breadcrumbs: { id: string; name: string }[];
  onCategorySelect: (categoryId: string) => void;
  onFetchCategories: () => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  onCategorySelect,
  onFetchCategories,
}) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  const handleAllProductsSelect = () => {
    onCategorySelect('');
    onFetchCategories();
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <Link to="/" className="breadcrumb-item">
          Home
        </Link>
        {' / '}
        <li
          key={1}
          className="breadcrumb-item"
          onClick={handleAllProductsSelect}
        >
          All products
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.id}>
            {' / '}
            <li
              className="breadcrumb-item"
              onClick={() => handleCategoryClick(breadcrumb.id)}
            >
              {breadcrumb.name}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
