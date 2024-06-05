import './ListItem.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { cartRepository } from '../../services/CardRepository';
import showToast from '../../utils/notifications';
import BaseButton from '../Button/Button';

interface ListItemProps {
  callback: Dispatch<SetStateAction<number>>;
  item: LineItem;
  key: string | undefined;
}

const ListItem = (props: ListItemProps) => {
  const [listItem, setListItem] = useState(props.item);
  const [itemQuantity, setItemQuantity] = useState(listItem.quantity);
  const [cart, setCart] = useState<Cart>();
  const [disabledButton, setDisabledButton] = useState(
    'button cart_item-button disabled',
  );
  let itemImage = '';

  if (props.item.variant.images) {
    itemImage = props.item.variant.images[0].url;
  }

  const value = (listItem.price.value.centAmount / 100).toFixed(2);

  let discountValue = null;

  if (listItem.price.discounted) {
    discountValue = (listItem.price.discounted?.value.centAmount / 100).toFixed(
      2,
    );
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

  useEffect(() => {
    void getCart();
    void checkDisabledButtonState(itemQuantity);
  }, []);

  async function changeQuantity(increase: boolean) {
    let prodQuantity = listItem.quantity;

    if (increase) {
      prodQuantity++;
    } else {
      prodQuantity--;
    }
    if (cart) {
      const activeCart = await cartRepository.checkActiveCard();
      const updatedCart = await cartRepository.modifyQuantity(
        cart.id,
        props.item.id,
        prodQuantity,
        activeCart?.version,
      );

      if (updatedCart instanceof Error) {
        showToast('Error modifying quantity', true);
      } else {
        const findItem = updatedCart.lineItems.find(
          (el) => el.id === listItem.id,
        );

        if (findItem) {
          setListItem(findItem);
          setItemQuantity(findItem.quantity);
          checkDisabledButtonState(findItem.quantity);
        }
        props.callback(updatedCart.totalPrice.centAmount / 100);
      }
    }
  }

  return (
    <div className="cart-item">
      <img
        className="cart_item-image"
        src={itemImage}
        alt={props.item.name['en-US']}
      ></img>

      <span>{props.item.name['en-US']}</span>
      <div>
        Quantity:
        <BaseButton
          classes={disabledButton}
          text="-"
          type="button"
          callback={async () => {
            await changeQuantity(false);
          }}
        />
        {itemQuantity}
        <BaseButton
          classes="button cart_item-button"
          text="+"
          type="button"
          callback={async () => {
            await changeQuantity(true);
          }}
        />
      </div>
      <span className="strike-through">
        {value} {props.item.price.value.currencyCode}
      </span>
      <div>
        {discountValue && (
          <span>
            {discountValue} {props.item.price.value.currencyCode}
          </span>
        )}
      </div>
    </div>
  );
};

export default ListItem;
