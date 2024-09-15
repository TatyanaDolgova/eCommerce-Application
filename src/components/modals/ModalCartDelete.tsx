import BaseButton from '../Button/Button';

interface ModalProps {
  closeModal: () => void;
  deleteCart: () => void;
}
const ModalCartDelete = (modalProps: ModalProps) => {
  return (
    <div className="shadow">
      <div className="modal-container">
        <BaseButton
          classes="button buttonX"
          text="X"
          type="button"
          callback={modalProps.closeModal}
        />
        <h2 className="modal-h2 clear-cart-h2">
          Are you sure you want to remove all items from the cart?
        </h2>
        <div className="button-wrapper  modal_button-wrapper">
          <BaseButton
            classes="button"
            text="Cancel"
            type="button"
            callback={modalProps.closeModal}
          />
          <BaseButton
            classes="button"
            text="Clear Shopping Cart"
            type="button"
            callback={modalProps.deleteCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalCartDelete;
