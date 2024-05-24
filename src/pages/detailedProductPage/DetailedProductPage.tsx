import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './DetailedProductPage.css';

import Header from '../../components/Header/Header';
import ProductRepository from '../../services/ProductRepository';

const DetailedProductPage = () => {
  const data = useLocation();
  const productID = data.state as string;

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productRepository = new ProductRepository();
        const resp: Product | undefined =
          await productRepository.getProduct(productID);

        console.log('респонс продукта');
        console.log(resp);

        setProduct(resp);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    void fetchProducts();
  });

  return (
    <>
      <Header />
      <main className="detail_product_page">
        <div className="detail_image_wrapper" />
        <div className="detail_product_info">
          <h1 className="detail_product_header">
            {product?.masterData.current.name[en - US]}
          </h1>
          <div className="detail_product_description" />
        </div>
      </main>
    </>
  );
};

export default DetailedProductPage;
