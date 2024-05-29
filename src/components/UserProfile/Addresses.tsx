import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { CustomerRepository } from '../../services/CustomerRepository';
import showToast from '../../utils/notifications';
import BaseButton from '../Button/Button';
import Label from '../Label/Label';

import AddressField from './AddressField';
import ModalAddress from './modals/ModalAddress';

function Addresses() {
  const [addressArray, setAddressArray] = useState<Address[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState<string[]>([]);
  const [defaultShipping, setDefaultShipping] = useState('');
  const [billingAddresses, setBillingAddresses] = useState<string[]>([]);
  const [defaultBilling, setDefaultBilling] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [customerID, setCustomerId] = useState('');
  const [customerVersion, setCustomerVersion] = useState(1);

  function openModal() {
    setModalOpen(true);
  }

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
      setCustomerId(customer.body.id);
      setCustomerVersion(customer.body.version);
    } catch (error) {
      throw new Error('error fetching customer');
    }
  }

  async function closeModal() {
    setModalOpen(false);
    await getCustomer();
  }

  async function setDefault(address: Address, type: 'billing' | 'shipping') {
    const action: CustomerUpdateAction[] = [
      {
        action:
          type === 'billing'
            ? 'setDefaultBillingAddress'
            : 'setDefaultShippingAddress',
        addressId: address.id,
      },
    ];

    const response = await CustomerRepository.updateCustomer(
      customerID,
      customerVersion,
      action,
    );

    if (response instanceof Error) {
      showToast(response.message, true);
    } else {
      showToast('Address is set as default', false);
      await getCustomer();
    }
  }

  useEffect(() => {
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
                <div key={currAddress.id} className="default-address">
                  <Label classes="default-address-label" text="Default" />
                  <AddressField
                    address={currAddress}
                    customerID={customerID}
                    customerVersion={customerVersion}
                    updateFunction={getCustomer}
                  />
                </div>
              );
            }

            return (
              <div key={currAddress.id}>
                <AddressField
                  address={currAddress}
                  customerID={customerID}
                  customerVersion={customerVersion}
                  updateFunction={getCustomer}
                />
                <BaseButton
                  classes="button edit-address-button set-default-button"
                  text="Set this as default"
                  type="button"
                  callback={async () => {
                    await setDefault(currAddress, 'shipping');
                  }}
                />
              </div>
            );
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
                <div key={currAddress.id} className="default-address">
                  <Label classes="default-address-label" text="Default" />
                  <AddressField
                    address={currAddress}
                    customerID={customerID}
                    customerVersion={customerVersion}
                    updateFunction={getCustomer}
                  />
                </div>
              );
            }

            return (
              <div key={currAddress.id}>
                <AddressField
                  address={currAddress}
                  customerID={customerID}
                  customerVersion={customerVersion}
                  updateFunction={getCustomer}
                />
                <BaseButton
                  classes="button edit-address-button set-default-button"
                  text="Set this as default"
                  type="button"
                  callback={async () => {
                    await setDefault(currAddress, 'billing');
                  }}
                />
              </div>
            );
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
      {modalOpen && (
        <ModalAddress
          callback={closeModal}
          edit={false}
          customerID={customerID}
          version={customerVersion}
        />
      )}
    </fieldset>
  );
}

export default Addresses;
