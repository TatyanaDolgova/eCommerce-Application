import { Image } from '@commercetools/platform-sdk';
import { A11y, Navigation, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';

interface SliderProps {
  slides: Image[];
}

export const MySlider = ({ slides }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Zoom]}
      spaceBetween={50}
      slidesPerView={1}
      zoom={true}
      navigation
      pagination={{ clickable: true, type: 'fraction' }}
      scrollbar={{ draggable: true }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.url}>
          <div className="swiper-zoom-container">
            <img src={slide.url} alt="product_picture" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
