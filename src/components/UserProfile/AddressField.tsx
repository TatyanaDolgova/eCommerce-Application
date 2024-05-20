function AddressField(address: Address) {
  return (
    <div className="address-field">
      <div className="field-wrapper">
        <div className="label">Street</div>
        <div className="info">{address.address.streetName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">City</div>
        <div className="info">{address.address.city}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Postal Code</div>
        <div className="info">{address.address.postalCode}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Country</div>
        <div className="info">{address.address.country}</div>
      </div>
    </div>
  );
}

interface Address {
  address: {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
  };
}
export default AddressField;
