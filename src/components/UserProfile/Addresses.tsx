import { Address } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';
import Label from '../Label/Label';

import AddressField from './AddressField';
import ModalAddressAdd from './ModalAddressAdd';

function Addresses() {
  const [addressArray, setAddressArray] = useState<Address[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState<string[]>([]);
  const [defaultShipping, setDefaultShipping] = useState('');
  const [billingAddresses, setBillingAddresses] = useState<string[]>([]);
  const [defaultBilling, setDefaultBilling] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await CustomerRepository.getCustomerInformation();

        if (customer.body.addresses) {
          setAddressArray(customer.body.addresses);
        }
        if (customer.body.shippingAddressIds) {
          setShippingAddresses(customer.body.shippingAddressIds);
        }
        if (customer.body.defaultShippingAddressId) {
          setDefaultShipping(customer.body.defaultShippingAddressId);
        }
        if (customer.body.billingAddressIds) {
          setBillingAddresses(customer.body.billingAddressIds);
        }
        if (customer.body.defaultBillingAddressId) {
          setDefaultBilling(customer.body.defaultBillingAddressId);
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
        {shippingAddresses.map((item) => {
          const currAddress = addressArray.find((el) => el.id === item);

          if (currAddress) {
            if (currAddress.id === defaultShipping) {
              return (
                <div className="default-address">
                  <Label classes="default-address-label" text="Default" />
                  <AddressField {...currAddress} />
                </div>
              );
            }

            return <AddressField {...currAddress} />;
          }

          return undefined;
        })}
      </fieldset>
      <fieldset className="fieldset user-profile_fieldset address_fieldset">
        <legend className="legend">Billing Addresses</legend>
        {billingAddresses.map((item) => {
          const currAddress = addressArray.find((el) => el.id === item);

          if (currAddress) {
            if (currAddress.id === defaultBilling) {
              return (
                <div className="default-address">
                  <Label classes="default-address-label" text="Default" />
                  <AddressField {...currAddress} />
                </div>
              );
            }

            return <AddressField {...currAddress} />;
          }

          return undefined;
        })}
      </fieldset>
      <BaseButton
        classes="button address_button"
        text="Add"
        type="button"
        callback={openModal}
      />
      {modalOpen && <ModalAddressAdd callback={closeModal} />}
    </fieldset>
  );
}

export default Addresses;
