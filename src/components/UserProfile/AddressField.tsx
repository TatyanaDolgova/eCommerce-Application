import { Address } from '@commercetools/platform-sdk';

const AddressField: React.FC<Address> = (customerAddress: Address) => {
  return (
    <div className="address-field">
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
    </div>
  );
};

export default AddressField;
