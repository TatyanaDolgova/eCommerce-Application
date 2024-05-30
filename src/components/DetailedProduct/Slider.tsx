import { Image } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import BaseButton from '../Button/Button';

import '../modals/Modal.css';
import 'swiper/css/bundle';

interface SliderProps {
  slides: Image[];
}

export const MySlider = ({ slides }: SliderProps) => {
  const [modalSliderOpen, setModalSlider] = useState(false);

  const showModal = () => {
    setModalSlider(true);
  };

  const closeModal = () => {
    setModalSlider(false);
  };

  if (modalSliderOpen) {
    return (
      <div className="shadow">
        <div className="modal-container detailed">
          <BaseButton
            classes="button buttonX detailed"
            text="X"
            type="button"
            callback={closeModal}
          />
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
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
        </div>
      </div>
    );
  } else {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, type: 'fraction' }}
        scrollbar={{ draggable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.url}>
            <div className="swiper-zoom-container">
              <img
                src={slide.url}
                alt="product_picture"
                onClick={() => showModal()}
                className="zoomed_in"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};
