import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import CategorySidebar from '../../components/CategorySidebar/CategorySidebar';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productRepository = new ProductRepository();
        const productsResponse = await productRepository.getProducts();

        setProducts(productsResponse);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    void fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="catalog-page">
        <CategorySidebar />
        <div className="main-content">
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
