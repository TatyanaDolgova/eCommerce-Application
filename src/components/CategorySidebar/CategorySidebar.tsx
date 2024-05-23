import { Category } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import './CategorySidebar.css';
import ProductRepository from '../../services/ProductRepository';

interface CategorySidebarProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const productRepository = new ProductRepository();
        const categoriesResponse = await productRepository.getCategories();

        if (categoriesResponse) {
          setCategories(categoriesResponse);
        } else {
          console.error('Categories response is undefined');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    void fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId);
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
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name['en-US']}
                {renderCategories(categories, category.id)}
              </li>
            ) : (
              <ul key={category.id} className={'main-category'}>
                {category.name['en-US']}
                {renderCategories(categories, category.id)}
              </ul>
            ),
          )}
      </>
    );
  };

  return (
    <div className="category-sidebar">
      <h3 className="sidebar-title">Categories</h3>
      {loading ? <p>Loading...</p> : <ul>{renderCategories(categories)}</ul>}
    </div>
  );
};

export default CategorySidebar;
