import { LineItem } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserContext, UserData } from '../../app-context/UserContext';
import { cartRepository } from '../../services/CardRepository';
import showToast from '../../utils/notifications';
import BaseButton from '../Button/Button';
import ModalCartDelete from '../modals/ModalCartDelete';
import Spinner from '../Spinners/Spinner-category';

import EmptyCart from './EmptyCart';
import ListItem from './ListItem';

type FormFields = {
  promo: string;
};

const Cart = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const [listItems, setListItems] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [modalOpen, setModalOpen] = useState(false);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState<number | null>(
    null,
  );
  const [isLoading, setLoading] = useState(true);
  const userContextState = useContext(UserContext);
  const { updateState } = useContext(UserContext);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function deleteCart() {
    try {
      await cartRepository.deleteCart();
      closeModal();
      showToast('Cart successfully cleared', false);
      setListItems([]);

      const userData: UserData = {
        loginStatus: userContextState.user.loginStatus,
        productCounter: 0,
      };

      updateState({ user: userData });
    } catch {
      showToast('Something went wrong. Try again', true);
    }
  }

  const fetchCart = async () => {
    try {
      const cartRepo = cartRepository;
      const cart = await cartRepo.checkActiveCard();

      setListItems(cart.lineItems);

      setTotalPrice(cart.totalPrice.centAmount / 100);
      setCurrency(cart.totalPrice.currencyCode);
      if (cart.discountOnTotalPrice) {
        setPriceBeforeDiscount(
          (cart.totalPrice.centAmount +
            cart.discountOnTotalPrice.discountedAmount.centAmount) /
            100,
        );
      }
    } catch {
      showToast('Your cart is empty. Go to catalog', false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const discount = await cartRepository.applyDiscountCode(data.promo);

      setTotalPrice(discount.totalPrice.centAmount / 100);
      if (discount.discountOnTotalPrice) {
        setPriceBeforeDiscount(
          (discount.totalPrice.centAmount +
            discount.discountOnTotalPrice.discountedAmount.centAmount) /
            100,
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, true);
      }
    }
  };

  useEffect(() => {
    void fetchCart();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {listItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div>
              <div className="list-container">
                {listItems.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      item={item}
                      callback={setListItems}
                      setPrice={setTotalPrice}
                      setPriceBeforeDiscount={setPriceBeforeDiscount}
                    />
                  );
                })}
              </div>
              <div className="cart-buttons-container">
                <BaseButton
                  classes="button clear-cart-button"
                  text="Clear Shopping Cart"
                  type="button"
                  callback={openModal}
                />
                {modalOpen && (
                  <ModalCartDelete
                    closeModal={closeModal}
                    deleteCart={deleteCart}
                  />
                )}
                <form
                  className="promo-container"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    {...register('promo', { required: true })}
                    className="input promo-input"
                    type="text"
                    placeholder="Enter a discount code"
                  />
                  <BaseButton
                    text="Apply"
                    classes="button promo-button"
                    type="submit"
                  />
                </form>
              </div>
              <div className="total">
                Total:{' '}
                {priceBeforeDiscount && (
                  <span className="strike-through">
                    {priceBeforeDiscount} {currency}
                  </span>
                )}{' '}
                {totalPrice} {currency}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
