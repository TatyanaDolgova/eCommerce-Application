import { Category } from '@commercetools/platform-sdk';
import { Squash as Hamburger } from 'hamburger-react';
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
  const [isOpen, setOpen] = useState(false);

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
        console.error('Error fetching categories');
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

  const closeMenu = () => {
    setOpen(false);
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
        {filteredCategories.reverse().map((category) => (
          <li key={category.id}>
            <div
              className={`category-item ${
                !category.parent ? 'main-category' : 'subcategory'
              } ${selectedCategoryId === category.id ? 'selected' : ''}`}
              onClick={() => {
                handleCategorySelect(category.id);
                closeMenu();
              }}
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
      <div className="sidebar-title-wrapper">
        <h3 className="sidebar-title">Categories</h3>
        <div className="burger-wrapper">
          <Hamburger toggled={isOpen} size={30} toggle={setOpen} color="#fff" />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={`categories-container ${isOpen ? 'open' : ''}`}>
          <li
            className={`category-item main-category ${allProductsSelected ? 'selected' : ''}`}
            onClick={() => {
              handleAllProductsSelect();
              closeMenu();
            }}
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
