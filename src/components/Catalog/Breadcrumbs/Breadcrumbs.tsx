import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumbs.css';

interface BreadcrumbsProps {
  breadcrumbs: { id: string; name: string }[];
  onCategorySelect: (categoryId: string, isParent: boolean) => void;
  onFetchCategories: () => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  onCategorySelect,
  onFetchCategories,
}) => {
  const handleCategoryClick = (categoryId: string, isParent: boolean) => {
    onCategorySelect(categoryId, isParent);
  };

  const handleAllProductsSelect = () => {
    onFetchCategories();
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <Link to="/" className="breadcrumb-item">
          Home
        </Link>
        {' / '}
        <Link className="breadcrumb-item" to="/catalog">
          Catalog
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
              onClick={() => handleCategoryClick(breadcrumb.id, index === 0)}
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
