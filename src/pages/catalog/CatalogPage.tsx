import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import Breadcrumbs from '../../components/Catalog/Breadcrumbs/Breadcrumbs';
import CategorySidebar from '../../components/Catalog/CategorySidebar/CategorySidebar';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import Search from '../../components/Catalog/Search/Search';
import SortingSelect from '../../components/Catalog/SortingSelect/SortingSelect';
import Header from '../../components/Header/Header';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductProjection[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<string>('price asc');
  const [searhcQuery, setSearchQuery] = useState<string>('');

  async function fetchProducts() {
    try {
      const productRepository = new ProductRepository();
      const productsResponse = await productRepository.getProducts(
        sortMethod,
        searhcQuery,
        currentCategory,
      );

      setProducts(productsResponse);
      setSortedProducts(productsResponse);
      setSearchError(null);
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  useEffect(() => {
    void fetchProducts();
  }, [sortMethod, currentCategory, searhcQuery]);

  const updateBreadcrumbs = async (category: Category) => {
    const newBreadcrumb = { id: category.id, name: category.name['en-US'] };

    try {
      if (category.parent) {
        const productRepository = new ProductRepository();
        const productsResponse = await productRepository.getCategoryById(
          category.parent.id,
        );

        setBreadcrumbs(() => {
          return [
            { id: productsResponse.id, name: productsResponse.name['en-US'] },
            newBreadcrumb,
          ];
        });
      } else {
        setBreadcrumbs(() => {
          return [newBreadcrumb];
        });
      }
    } catch (error) {
      throw new Error('Error updating breadcrumbs');
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const productRepository = new ProductRepository();

      setCurrentCategory(categoryId);
      setSearchQuery('');
      setSearchError(null);

      const category = await productRepository.getCategoryById(categoryId);

      await updateBreadcrumbs(category);
    } catch (error) {
      throw new Error('Error fetching products for category');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (method: string) => {
    setSortMethod(method);
  };

  return (
    <>
      <Header />
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onCategorySelect={handleCategorySelect}
        onFetchCategories={fetchProducts}
      />
      <div className="catalog-page">
        <CategorySidebar
          onCategorySelect={handleCategorySelect}
          onFetchCategories={fetchProducts}
        />
        <div className="main-content">
          <div className="settings-container">
            <SortingSelect
              sortMethod={sortMethod}
              onSortChange={handleSortChange}
            />
            <Search onSearch={handleSearch} currentCategory={currentCategory} />
          </div>
          {searchError ? (
            <div className="search-error">{searchError}</div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
