import { Image } from '@commercetools/platform-sdk';
import { useState } from 'react';

import BaseButton from '../Button/Button';

import '../modals/Modal.css';

interface SingleImageProps {
  imageData: Image;
}

export const SingleImage = (props: SingleImageProps) => {
  const [modalImageOpen, setModalImage] = useState(false);

  const showModal = () => {
    setModalImage(true);
  };

  const closeModal = () => {
    setModalImage(false);
  };

  if (modalImageOpen) {
    return (
      <div className="shadow">
        <div className="modal-container detailed">
          <BaseButton
            classes="button buttonX detailed"
            text="X"
            type="button"
            callback={closeModal}
          />
          <img
            className="detail_image zoomed_in"
            src={props.imageData.url}
            alt="prooduct"
            onClick={() => showModal()}
          />
        </div>
      </div>
    );
  } else {
    return (
      <img
        className="detail_image zoomed_in"
        src={props.imageData.url}
        alt="prooduct"
        onClick={() => showModal()}
      />
    );
  }
};
