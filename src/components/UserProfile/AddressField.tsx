import { Address } from '@commercetools/platform-sdk';

import BaseButton from '../Button/Button';

const AddressField: React.FC<Address> = (customerAddress: Address) => {
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
        />
        <BaseButton
          classes="button edit-address-button"
          text="Delete"
          type="button"
        />
      </div>
    </div>
  );
};

export default AddressField;
