import BaseButton from '../Button/Button';

import AddressField from './AddressField';

function Addresses() {
  const sampleCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '2000-02-02',
    email: 'someemaail@gmail.com',
    password: 'somepassword',
    addresses: [
      {
        country: 'US',
        city: 'Boston',
        postalCode: '12333',
        streetName: 'Some Street',
      },
      {
        country: 'US',
        city: 'Boston',
        postalCode: '12333',
        streetName: 'Some Street',
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 1,
  };

  return (
    <fieldset className="fieldset  user-profile_fieldset">
      <legend className="legend">Addresses</legend>
      <fieldset className="fieldset user-profile_fieldset address_fieldset">
        <legend className="legend">Shipping Addresses</legend>
        <AddressField address={sampleCustomer.addresses[0]} />
      </fieldset>
      <fieldset className="fieldset user-profile_fieldset address_fieldset">
        <legend className="legend">Billing Addresses</legend>
        <AddressField address={sampleCustomer.addresses[1]} />
      </fieldset>
      <BaseButton classes="button address_button" text="Edit" type="button" />
    </fieldset>
  );
}

export default Addresses;
