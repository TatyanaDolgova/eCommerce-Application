import { Category } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import './CategorySidebar.css';
import ProductRepository from '../../services/ProductRepository';

interface CategorySidebarProps {
  onCategorySelect: (categoryId: string, isParent: boolean) => void;
  onFetchCategories: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategorySelect,
  onFetchCategories,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [allProductsSelected, setAllProductsSelected] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const productRepository = new ProductRepository();
        const categoriesResponse = await productRepository.getCategories();

        if (categoriesResponse) {
          setCategories(categoriesResponse);
        } else {
          throw new Error('Categories response is undefined');
        }
      } catch (error) {
        throw new Error('Error fetching categories');
      } finally {
        setLoading(false);
      }
    }

    void fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId: string, isParent: boolean) => {
    setSelectedCategoryId(categoryId);
    setAllProductsSelected(false);
    onCategorySelect(categoryId, isParent);
  };

  const handleAllProductsSelect = () => {
    setSelectedCategoryId(null);
    setAllProductsSelected(true);
    onFetchCategories();
  };

  const renderCategories = (
    categoriesForRender: Category[],
    parentId: string | null = null,
  ) => {
    return (
      <>
        {categoriesForRender
          .filter((category) =>
            parentId ? category.parent?.id === parentId : !category.parent,
          )
          .map((category) =>
            category.parent ? (
              <li
                key={category.id}
                className={`subcategory ${
                  selectedCategoryId === category.id ? 'selected' : ''
                }`}
                onClick={() => handleCategorySelect(category.id, false)}
              >
                {category.name['en-US']}
                {renderCategories(categories, category.id)}
              </li>
            ) : (
              <li className="category-items">
                <li
                  key={category.id}
                  className={`main-category ${
                    selectedCategoryId === category.id ? 'selected' : ''
                  }`}
                  onClick={() => handleCategorySelect(category.id, true)}
                >
                  {category.name['en-US']}
                </li>{' '}
                {renderCategories(categories, category.id)}
              </li>
            ),
          )}
      </>
    );
  };

  return (
    <div className="category-sidebar">
      <h3 className="sidebar-title">Categories</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="category-container">
          <li
            className={`main-category ${allProductsSelected ? 'selected' : ''}`}
            onClick={handleAllProductsSelect}
          >
            All products
          </li>
          {renderCategories(categories)}
        </ul>
      )}
    </div>
  );
};

export default CategorySidebar;
