import { Image } from '@commercetools/platform-sdk';
import { useState } from 'react';

import BaseButton from '../Button/Button';

import '../modals/Modal.css';

interface SingleImageProps {
  imageData: Image;
}

interface SingleInnerImageProps extends SingleImageProps {
  className: string;
  openCallback?: () => void;
}

const SingleInnerImage = (props: SingleInnerImageProps) => {
  return (
    <img
      className={props.className}
      src={props.imageData.url}
      alt="prooduct"
      onClick={props.openCallback}
    />
  );
};

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
          <SingleInnerImage
            imageData={props.imageData}
            className="detail_image"
          />
        </div>
      </div>
    );
  } else {
    return (
      <SingleInnerImage
        imageData={props.imageData}
        openCallback={showModal}
        className="detail_image zoomed_in"
      />
    );
  }
};
