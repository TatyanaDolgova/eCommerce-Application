import { useEffect, useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

function PersonalInfo() {
  const [customerName, setCustomerName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await CustomerRepository.getCustomerInformation();

        if (customer.body.firstName) {
          setCustomerName(customer.body.firstName);
        }
        if (customer.body.lastName) {
          setCustomerLastName(customer.body.lastName);
        }
        if (customer.body.dateOfBirth) {
          setBirthDate(customer.body.dateOfBirth);
        }
      } catch (error) {
        throw new Error('error fetching customer');
      }
    }
    void getCustomer();
  });

  return (
    <fieldset className="fieldset user-profile_fieldset">
      <legend className="legend">Personal Info</legend>
      <div className="field-wrapper">
        <div className="label">First Name</div>
        <div className="info">{customerName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Last Name</div>
        <div className="info">{customerLastName}</div>
      </div>
      <div className="field-wrapper">
        <div className="label">Date of Birth</div>
        <div className="info">{birthDate}</div>

      </div>
      <BaseButton classes="button address_button" text="Edit" type="button" />
    </fieldset>
  );
}

export default PersonalInfo;
