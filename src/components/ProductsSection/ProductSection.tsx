import React, { useCallback } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../modals/Modal.css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';

import './ProductSection.css';
import ProductExampleCard from './ProductExample';

const ProductSection = () => {
  const fetchExampleProducts = useCallback(async () => {}, []);

  return (
    <section className="product_section">
      <h2>Check out our products!</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        className="main_slider"
      >
        <SwiperSlide key={1}>
          <ProductExampleCard
            imageURL="https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Plants/Aglaonemas_Spotted_Star.jpg"
            productDescription="test"
            productName="test"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default ProductSection;
