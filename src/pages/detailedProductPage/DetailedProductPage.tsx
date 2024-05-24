import { Product, ProductData } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './DetailedProductPage.css';

import BaseButton from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ProductRepository from '../../services/ProductRepository';

const DetailedProductPage = () => {
  const data = useLocation();
  const productID = data.state as string;

  const [productData, setProduct] = useState<ProductData>();

  const fetchProducts = async () => {
    try {
      const productRepository = new ProductRepository();
      const resp: Product | undefined =
        await productRepository.getProduct(productID);

      console.log('респонс продукта');
      console.log(resp);

      if (resp && resp.masterData.current) {
        setProduct(resp.masterData.current);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="detail_product_page">
        <div className="detail_product_wrapper">
          <img
            className="detail_image"
            src={productData?.masterVariant.images?.[0].url}
            alt="prooduct"
          />
          <div className="detail_product_info">
            <h1 className="detail_product_header">
              {productData?.name['en-US']}
            </h1>
            <div className="detail_product_description">
              {productData?.metaDescription?.['en-US']}
            </div>
            <div className="detail_price_wrapper">
              <div className="full_price_wrapper">
                <p className="full_price">Full price:</p>
                <p className="full_price">
                  {Math.floor(
                    (productData?.masterVariant.prices?.[0]?.value
                      ?.centAmount ?? 0) / 100,
                  )}
                </p>
                <p className="currency">
                  {productData?.masterVariant.prices?.[0]?.value?.currencyCode}
                </p>
              </div>
              <div className="disc_price_wrapper">
                <p className="disc_price">Sale price:</p>
                <p className="disc_price">
                  {Math.floor(
                    (productData?.masterVariant.prices?.[0]?.discounted?.value
                      .centAmount ?? 0) / 100,
                  )}
                </p>
                <p className="currency">
                  {productData?.masterVariant.prices?.[0]?.value?.currencyCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailedProductPage;
