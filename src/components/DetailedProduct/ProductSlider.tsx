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

interface InnerSliderProps extends SliderProps {
  className?: string;
  openCallback?: () => void;
}

const InnerSlider = (props: InnerSliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, type: 'fraction' }}
      scrollbar={{ draggable: true }}
    >
      {props.slides.map((slide) => (
        <SwiperSlide key={slide.url}>
          <div className="swiper-zoom-container">
            <img
              src={slide.url}
              alt="product_picture"
              onClick={props.openCallback}
              className={props.className}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const ProductSlider = ({ slides }: SliderProps) => {
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
          <InnerSlider slides={slides} />
        </div>
      </div>
    );
  } else {
    return (
      <InnerSlider
        slides={slides}
        openCallback={showModal}
        className="zoomed_in"
      />
    );
  }
};
