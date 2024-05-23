import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import CategorySidebar from '../../components/CategorySidebar/CategorySidebar';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productRepository = new ProductRepository();
        const productsResponse = await productRepository.getProducts();

        setProducts(productsResponse);
        setSortedProducts(productsResponse);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    void fetchProducts();
  }, []);

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const productRepository = new ProductRepository();
      const productsResponse =
        await productRepository.getProductsByCategory(categoryId);

      setProducts(productsResponse);
      setSortedProducts(productsResponse);
    } catch (error) {
      console.error('Error fetching products for category:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="catalog-page">
        <CategorySidebar onCategorySelect={handleCategorySelect} />
        <div className="main-content">
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
