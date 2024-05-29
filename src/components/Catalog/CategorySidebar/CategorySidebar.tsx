import { Category } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import './CategorySidebar.css';
import ProductRepository from '../../../services/ProductRepository';

interface CategorySidebarProps {
  currentCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategorySelect,
  currentCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    currentCategory || null,
  );
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(!currentCategory);

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

  useEffect(() => {
    setSelectedCategoryId(currentCategory);
    setAllProductsSelected(!currentCategory);
  }, [currentCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setAllProductsSelected(false);
    onCategorySelect(categoryId);
  };

  const handleAllProductsSelect = () => {
    setSelectedCategoryId(null);
    setAllProductsSelected(true);
    onCategorySelect('');
  };

  const renderCategories = (
    categoriesForRender: Category[],
    parentId: string | null = null,
  ) => {
    const filteredCategories = categoriesForRender.filter((category) =>
      parentId ? category.parent?.id === parentId : !category.parent,
    );

    if (filteredCategories.length === 0) return null;

    return (
      <ul className="category-container">
        {filteredCategories.map((category) => (
          <li key={category.id}>
            <div
              className={`category-item ${
                !category.parent ? 'main-category' : 'subcategory'
              } ${selectedCategoryId === category.id ? 'selected' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name['en-US']}
            </div>
            {renderCategories(categoriesForRender, category.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="category-sidebar">
      <h3 className="sidebar-title">Categories</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="categories-container">
          <li
            className={`category-item main-category ${allProductsSelected ? 'selected' : ''}`}
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
