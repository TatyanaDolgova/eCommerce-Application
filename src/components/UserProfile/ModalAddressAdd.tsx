import { Address } from '@commercetools/platform-sdk';

import BaseButton from '../Button/Button';
import Label from '../Label/Label';

function ModalAddressAdd(modalAddressesProps: ModalAddressesProps) {
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
        <div className="modal-input-wrapper">
          <Label classes="label" text="Street" for="street"></Label>
          <input
            className="input"
            type="text"
            id="street"
            name="street"
            defaultValue={modalAddressesProps.address?.streetName ?? ''}
          ></input>
        </div>
        <div className="modal-input-wrapper">
          <Label classes="label" text="City" for="city"></Label>
          <input
            className="input"
            type="text"
            id="city"
            name="city"
            defaultValue={modalAddressesProps.address?.city ?? ''}
          ></input>
        </div>
        <div className="modal-input-wrapper">
          <Label classes="label" text="Postal Code" for="postcode"></Label>
          <input
            className="input"
            type="text"
            id="postcode"
            name="postcode"
            defaultValue={modalAddressesProps.address?.postalCode ?? ''}
          ></input>
        </div>
        <div className="modal-input-wrapper">
          <Label classes="label" text="Country" for="country"></Label>
          <select
            // {...register('country')}
            id="country"
            name="country"
            className="select"
            // onChange={(e) => {
            //   if (getValues('useSameAddress')) {
            //     setBillingCountry(e.target.value);
            //     setValue('country2', e.target.value, {
            //       shouldValidate: true,
            //     });
            //   }
            // }}
            defaultValue={modalAddressesProps.address?.country ?? 'US'}
          >
            <option value="US">USA</option>
            <option value="RU">Russia</option>
            <option value="HR">Croatia</option>
          </select>
        </div>
        {!modalAddressesProps.edit && (
          <div className="modal-input-wrapper">
            <Label
              classes="label"
              text="Address type"
              for="addressType"
            ></Label>
            <select id="addressType" name="addressType" className="select">
              <option value="shipping">Shipping</option>
              <option value="billing">Billing</option>
            </select>
          </div>
        )}
        <div className="button-wrapper">
          <BaseButton
            classes="button"
            text="Cancel"
            type="button"
            callback={modalAddressesProps.callback}
          />
          <BaseButton classes="button" text="Add" type="submit" />
        </div>
      </div>
    </div>
  );
}

interface ModalAddressesProps {
  address?: Address;
  callback: () => void;
  edit: boolean;
}

export default ModalAddressAdd;
