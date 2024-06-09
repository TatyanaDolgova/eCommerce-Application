import './ListItem.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { cartRepository } from '../../services/CardRepository';
import showToast from '../../utils/notifications';
import BaseButton from '../Button/Button';

interface ListItemProps {
  callback: Dispatch<SetStateAction<LineItem[]>>;
  item: LineItem;
  key: string | undefined;
  setPrice: Dispatch<SetStateAction<number>>;
  setPriceBeforeDiscount: Dispatch<SetStateAction<number | null>>;
}

const ListItem = (props: ListItemProps) => {
  const [listItem, setListItem] = useState(props.item);
  const [cart, setCart] = useState<Cart>();
  const [disabledButton, setDisabledButton] = useState(
    'button cart_item-button disabled',
  );
  const [disabled, setDisabled] = useState(false);
  let itemImage = '';

  if (props.item.variant.images) {
    itemImage = props.item.variant.images[0].url;
  }

  async function getCart() {
    const activeCart = await cartRepository.checkActiveCard();

    setCart(activeCart);
  }

  function checkDisabledButtonState(quantity: number) {
    if (quantity === 1) {
      setDisabledButton('button cart_item-button disabled');
    } else {
      setDisabledButton('button cart_item-button');
    }
  }

  async function deleteItem() {
    setDisabled(true);
    const updCart: Cart = await cartRepository.removeFromCart(props.item.id);

    if (updCart instanceof Error) {
      console.error('Error removing item');
    } else {
      props.callback(updCart.lineItems);
      props.setPrice(updCart.totalPrice.centAmount / 100);
      if (updCart.discountOnTotalPrice) {
        props.setPriceBeforeDiscount(
          (updCart.totalPrice.centAmount +
            updCart.discountOnTotalPrice.discountedAmount.centAmount) /
            100,
        );
      } else {
        props.setPriceBeforeDiscount(null);
      }
      setDisabled(false);
    }
  }

  useEffect(() => {
    void getCart();
    void checkDisabledButtonState(props.item.quantity);
  }, []);

  async function changeQuantity(increase: boolean) {
    setDisabled(true);

    if (cart) {
      const activeCart = await cartRepository.checkActiveCard();
      const updatedCart = await cartRepository.modifyQuantity(
        cart.id,
        props.item.id,
        increase ? props.item.quantity + 1 : props.item.quantity - 1,
        activeCart?.version,
      );

      if (updatedCart instanceof Error) {
        showToast('Error modifying quantity', true);
      } else {
        props.callback(updatedCart.lineItems);
        props.setPrice(updatedCart.totalPrice.centAmount / 100);
        const findItem = updatedCart.lineItems.find(
          (el) => el.id === listItem.id,
        );

        if (updatedCart.discountOnTotalPrice) {
          props.setPriceBeforeDiscount(
            (updatedCart.totalPrice.centAmount +
              updatedCart.discountOnTotalPrice.discountedAmount.centAmount) /
              100,
          );
        } else {
          props.setPriceBeforeDiscount(null);
        }

        if (findItem) {
          setListItem(findItem);
          checkDisabledButtonState(findItem.quantity);
        }
        setDisabled(false);
      }
    }
  }

  return (
    <div key={props.item.id} className="cart-item">
      <img
        className="cart_item-image"
        src={itemImage}
        alt={props.item.name['en-US']}
      ></img>

      <span>{props.item.name['en-US']}</span>
      <div className="quantity-container">
        Quantity:
        <BaseButton
          classes={disabledButton}
          text="-"
          type="button"
          callback={async () => {
            await changeQuantity(false);
          }}
          disabled={disabled}
        />
        {props.item.quantity}
        <BaseButton
          classes="button cart_item-button"
          text="+"
          type="button"
          callback={async () => {
            await changeQuantity(true);
          }}
          disabled={disabled}
        />
        <BaseButton
          classes="button cart_item-button cart_delete-button"
          text=" "
          type="button"
          callback={async () => {
            await deleteItem();
          }}
          disabled={disabled}
        />
      </div>
      <span className="strike-through">
        {props.item.price.discounted && (
          <span>
            {props.item.price.value.centAmount / 100}{' '}
            {props.item.price.value.currencyCode}
          </span>
        )}
      </span>
      <div>
        {props.item.price.discounted
          ? props.item.price.discounted.value.centAmount / 100
          : props.item.price.value.centAmount / 100}{' '}
        {props.item.price.value.currencyCode}
      </div>
    </div>
  );
};

export default ListItem;
