import { Image } from '@commercetools/platform-sdk';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

import 'swiper/css/bundle';

interface SliderProps {
  slides: Image[];
}

export const MySlider = ({ slides }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.url}>
          <img src={slide.url} alt="product_picture" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
