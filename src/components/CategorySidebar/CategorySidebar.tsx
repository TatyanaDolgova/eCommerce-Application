import { Category } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import './CategorySidebar.css';
import ProductRepository from '../../services/ProductRepository';

interface CategorySidebarProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="category-sidebar">
      <h3 className="sidebar-title">Categories</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className={
                category.orderHint === '1' ? 'main-category' : 'subcategory'
              }
            >
              {category.name['en-US']}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySidebar;
