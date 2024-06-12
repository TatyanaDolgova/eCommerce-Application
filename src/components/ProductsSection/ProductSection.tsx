import { ProductProjection } from '@commercetools/platform-sdk';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../modals/Modal.css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';

import './ProductSection.css';
import { productRepository } from '../../services/ProductRepository';
import Spinner from '../Spinners/Spinner-category';

import ProductExampleCard from './ProductExample';

const fetchParams = {
  sortBy: 'name.en-US asc',
  query: '',
  minPrice: 0,
  maxPrice: 100,
  size: '',
  productsPerPage: 5,
};

const ProductSection = () => {
  const [products, setProducts] = useState<ProductProjection[]>();

  const fetchExampleProducts = useCallback(async () => {
    try {
      const currentProducts = await productRepository.getProducts(
        fetchParams.sortBy,
        fetchParams.query,
        fetchParams.minPrice,
        fetchParams.maxPrice,
        fetchParams.size,
        fetchParams.productsPerPage,
      );

      setProducts(currentProducts.results);
    } catch {
      console.error('Error fetching products');
    }
  }, []);

  useEffect(() => {
    void fetchExampleProducts();
  }, [fetchExampleProducts]);

  return (
    <section className="product_section">
      <h2 className="product_section_title">Check out our products!</h2>
      {!products ? (
        <Spinner />
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          className="main_slider"
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {products.map((slide) => (
            <SwiperSlide key={slide.name['en-US']}>
              <ProductExampleCard
                imageURL={slide.masterVariant.images?.[0].url || ''}
                productDescription={slide.metaDescription?.['en-US'] || ''}
                productName={slide.name['en-US']}
                productID={slide.id}
                productSlug={slide.slug['en-US']}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <h2 className="product_section_text">
        Interested? See more on
        <Link to="/catalog" className="product_section_link">
          the catalog page!
        </Link>
      </h2>
    </section>
  );
};

export default ProductSection;
