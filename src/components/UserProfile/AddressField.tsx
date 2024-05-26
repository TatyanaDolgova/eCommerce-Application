import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';
import showToast from '../../utils/notifications';
import BaseButton from '../Button/Button';

import ModalAddress from './ModalAddress';

const AddressField: React.FC<AddressFieldProps> = (
  props: AddressFieldProps,
) => {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const deleteAddress = async () => {
    const action: CustomerUpdateAction[] = [
      {
        action: 'removeAddress',
        addressId: props.address.id,
      },
    ];

    const response = await CustomerRepository.updateCustomer(
      props.customerID,
      props.customerVersion,
      action,
    );

    if (response instanceof Error) {
      showToast(response.message, true);
    } else {
      showToast('Address is successfully deleted', false);
    }
  };

  return (
    <div data-addressid={props.address.id} className="address-field">
      <div className="field-wrapper">
        <div className="label">Street</div>
        <div className="info">{props.address.streetName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">City</div>
        <div className="info">{props.address.city}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Postal Code</div>
        <div className="info">{props.address.postalCode}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Country</div>
        <div className="info">{props.address.country}</div>
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
          callback={deleteAddress}
        />
      </div>
      {modalOpen && (
        <ModalAddress
          callback={closeModal}
          edit={true}
          address={props.address}
          customerID={props.customerID}
          version={props.customerVersion}
        />
      )}
    </div>
  );
};

interface AddressFieldProps {
  address: Address;
  customerID: string;
  customerVersion: number;
}
export default AddressField;
