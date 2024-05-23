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
        <div className="input-wrapper">
          <Label classes="label" text="Street" for="street"></Label>
          <input
            className="input"
            type="text"
            id="street"
            name="street"
          ></input>
        </div>
        <div className="input-wrapper">
          <Label classes="label" text="City" for="city"></Label>
          <input className="input" type="text" id="city" name="city"></input>
        </div>
        <div className="input-wrapper">
          <Label classes="label" text="Postal Code" for="postcode"></Label>
          <input
            className="input"
            type="text"
            id="postcode"
            name="postcode"
          ></input>
        </div>
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
  callback: () => void;
}

export default ModalAddressAdd;
