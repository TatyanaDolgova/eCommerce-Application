import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';

import BaseButton from '../Button/Button';

import ModalAddressAdd from './ModalAddressAdd';

const AddressField: React.FC<Address> = (customerAddress: Address) => {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div data-AddressId={customerAddress.id} className="address-field">
      <div className="field-wrapper">
        <div className="label">Street</div>
        <div className="info">{customerAddress.streetName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">City</div>
        <div className="info">{customerAddress.city}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Postal Code</div>
        <div className="info">{customerAddress.postalCode}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Country</div>
        <div className="info">{customerAddress.country}</div>
      </div>
      <div className="button-wrapper">
        <BaseButton
          classes="button edit-address-button"
          text="Edit"
          type="button"
          callback={openModal}
        />
        <BaseButton
          classes="button edit-address-button"
          text="Delete"
          type="button"
        />
      </div>
      {modalOpen && (
        <ModalAddressAdd
          callback={closeModal}
          edit={true}
          address={customerAddress}
        />
      )}
    </div>
  );
};

export default AddressField;
