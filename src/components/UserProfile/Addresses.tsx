import { Address } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';

import BaseButton from '../Button/Button';

import AddressField from './AddressField';

function Addresses() {
  const [addressArray, setAddressArray] = useState<Address[]>([]);

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await CustomerRepository.getCustomerInformation();

        if (customer.body.addresses) {
          setAddressArray(customer.body.addresses);
        }
      } catch (error) {
        throw new Error('error fetching customer');
      }
    }
    void getCustomer();
  }, []);

  return (
    <fieldset className="fieldset  user-profile_fieldset">
      <legend className="legend">Addresses</legend>
      <fieldset className="fieldset user-profile_fieldset address_fieldset">
        <legend className="legend">Shipping Addresses</legend>
        <AddressField {...addressArray[0]} />
      </fieldset>
      <fieldset className="fieldset user-profile_fieldset address_fieldset">
        <legend className="legend">Billing Addresses</legend>
        <AddressField {...addressArray[1]} />
      </fieldset>
      <BaseButton classes="button address_button" text="Edit" type="button" />
    </fieldset>
  );
}

export default Addresses;
