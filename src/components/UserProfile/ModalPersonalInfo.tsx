import './Modal.css';

import BaseButton from '../Button/Button';
import Label from '../Label/Label';

function ModalPersonalInfo(modalProps: ModalProps) {
  return (
    <div className="shadow">
      <div className="modal-container">
        <BaseButton
          classes="button buttonX"
          text="X"
          type="button"
          callback={modalProps.closeModal}
        />
        <div className="modal-input-wrapper">
          <Label classes="label" text="First Name" />
          <input
            className="input"
            type="text"
            defaultValue={modalProps.customerName}
          />
        </div>
        <div className="modal-input-wrapper">
          <Label classes="label" text="Last Name" />
          <input
            className="input"
            type="text"
            defaultValue={modalProps.customerLastName}
          />
        </div>
        <div className="modal-input-wrapper">
          <Label classes="label" text="Date" />
          <input
            className="input"
            type="date"
            defaultValue={modalProps.customerBirthDate}
          />
        </div>
        <div className="button-wrapper">
          <BaseButton
            classes="button"
            text="Cancel"
            type="button"
            callback={modalProps.closeModal}
          />
          <BaseButton classes="button" text="Save" type="submit" />
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  closeModal: () => void;
  customerBirthDate: string;
  customerLastName: string;
  customerName: string;
}

export default ModalPersonalInfo;
