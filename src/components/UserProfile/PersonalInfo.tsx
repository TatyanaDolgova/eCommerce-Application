import BaseButton from '../Button/Button';

function PersonalInfo() {
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
    <fieldset className="fieldset user-profile_fieldset">
      <legend className="legend">Personal Info</legend>
      <div className="field-wrapper">
        <div className="label">First Name</div>
        <div className="info">{sampleCustomer.firstName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Last Name</div>
        <div className="info">{sampleCustomer.lastName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Date of Birth</div>
        <div className="info">{sampleCustomer.birthDate}</div>
      </div>
      <BaseButton classes="button address_button" text="Edit" type="button" />
    </fieldset>
  );
}

export default PersonalInfo;
