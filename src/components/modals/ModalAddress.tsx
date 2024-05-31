import { Address, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomerRepository } from '../../services/CustomerRepository';
import showToast from '../../utils/notifications';
import { nameProps, postCodeProps } from '../../utils/validation';
import BaseButton from '../Button/Button';
import Label from '../Label/Label';

type FormFields = {
  addressType?: string;
  city: string;
  country: string;
  postcode: string;
  street: string;
};

function ModalAddress(modalAddressesProps: ModalAddressesProps) {
  const [postcode] = useState(modalAddressesProps.address?.postalCode);
  const [country, setCountry] = useState(
    modalAddressesProps.address?.country ?? 'US',
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    defaultValues: {
      city: modalAddressesProps.address?.city,
      country: country,
      postcode: postcode,
      street: modalAddressesProps.address?.streetName,
    },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (modalAddressesProps.edit === true) {
      const actions: CustomerUpdateAction[] = [
        {
          action: 'changeAddress',
          addressId: modalAddressesProps.address?.id,
          address: {
            streetName: data.street,
            city: data.city,
            postalCode: data.postcode,
            country: data.country,
          },
        },
      ];

      const response: unknown = await CustomerRepository.updateCustomer(
        modalAddressesProps.customerID,
        modalAddressesProps.version,
        actions,
      );

      if (response instanceof Error) {
        showToast(response.message, true);
      } else {
        showToast('Address is successfully updated', false);
        modalAddressesProps.callback();
      }
    } else {
      const actions: CustomerUpdateAction[] = [
        {
          action: 'addAddress',
          address: {
            streetName: data.street,
            city: data.city,
            postalCode: data.postcode,
            country: data.country,
          },
        },
      ];

      const response = await CustomerRepository.updateCustomer(
        modalAddressesProps.customerID,
        modalAddressesProps.version,
        actions,
      );

      if (response instanceof Error) {
        showToast(response.message, true);
      } else {
        const newAddressId = response.body.addresses.find(
          (address) => address.streetName === data.street,
        )?.id;
        const updateAction: CustomerUpdateAction[] = [
          {
            action:
              data.addressType === 'shipping'
                ? 'addShippingAddressId'
                : 'addBillingAddressId',
            addressId: newAddressId,
          },
        ];

        const updateAddressType = await CustomerRepository.updateCustomer(
          modalAddressesProps.customerID,
          response.body.version,
          updateAction,
        );

        if (updateAddressType instanceof Error) {
          showToast(updateAddressType.message, true);
        } else {
          showToast('Address is successfully updated', false);
          modalAddressesProps.callback();
        }
      }
    }
  };

  return (
    <div className="shadow">
      <div className="modal-container">
        <BaseButton
          classes="button buttonX"
          text="X"
          type="button"
          callback={modalAddressesProps.callback}
        />
        {modalAddressesProps.edit && <h2 className="modal-h2">Edit address</h2>}
        {!modalAddressesProps.edit && (
          <h2 className="modal-h2">Add a new address</h2>
        )}
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Street" for="street"></Label>
            <input
              {...register('street', {
                required: 'Street is required',
              })}
              className="input"
              type="text"
              id="street"
              name="street"
            ></input>
            <div className="error_message modal_error">
              {errors.street?.message}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="City" for="city"></Label>
            <input
              {...register('city', nameProps('City'))}
              className="input"
              type="text"
              id="city"
              name="city"
            ></input>
            <div className="error_message modal_error">
              {errors.city?.message}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Postal Code" for="postcode"></Label>
            <input
              {...register('postcode', postCodeProps(country))}
              className="input"
              type="text"
              id="postcode"
              name="postcode"
            ></input>
            <div className="error_message modal_error">
              {errors.postcode?.message}
            </div>
          </div>
          <div className="modal-input-wrapper">
            <Label classes="label" text="Country" for="country"></Label>
            <select
              {...register('country')}
              id="country"
              name="country"
              className="select"
              onChange={(e) => {
                setValue('country', e.target.value, {
                  shouldValidate: true,
                });
                setCountry(e.target.value);
              }}
            >
              <option value="US">USA</option>
              <option value="RU">Russia</option>
              <option value="HR">Croatia</option>
            </select>
            <div className="error_message modal_error">
              {errors.country?.message}
            </div>
          </div>
          {!modalAddressesProps.edit && (
            <div className="modal-input-wrapper">
              <Label
                classes="label"
                text="Address type"
                for="addressType"
              ></Label>
              <select
                {...register('addressType')}
                id="addressType"
                name="addressType"
                className="select"
              >
                <option value="shipping">Shipping</option>
                <option value="billing">Billing</option>
              </select>
              <div className="error_message modal_error">
                {errors.addressType?.message}
              </div>
            </div>
          )}
          <div className="button-wrapper">
            <BaseButton
              classes="button"
              text="Cancel"
              type="button"
              callback={modalAddressesProps.callback}
            />
            <BaseButton
              classes="button"
              text={modalAddressesProps.edit ? 'Save' : 'Add'}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

interface ModalAddressesProps {
  address?: Address;
  callback: () => void;

  customerID: string;
  edit: boolean;
  version: number;
}

export default ModalAddress;
