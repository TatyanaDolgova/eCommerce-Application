import './ListItem.css';
import { LineItem } from '@commercetools/platform-sdk';

import BaseButton from '../Button/Button';

const ListItem = (item: LineItem) => {
  let itemImage = '';

  if (item.variant.images) {
    itemImage = item.variant.images[0].url;
  }

  const value = (item.price.value.centAmount / 100).toFixed(2);

  let discountValue = null;

  if (item.price.discounted) {
    discountValue = (item.price.discounted?.value.centAmount / 100).toFixed(2);
  }

  return (
    <div key={item.id} className="cart-item">
      <img
        className="cart_item-image"
        src={itemImage}
        alt={item.name['en-US']}
      ></img>

      <span>{item.name['en-US']}</span>
      <div>
        Quantity:
        <BaseButton classes="button cart_item-button" text="-" type="button" />
        {item.quantity}
        <BaseButton classes="button cart_item-button" text="+" type="button" />
      </div>
      <span className="strike-through">
        {value} {item.price.value.currencyCode}
      </span>
      <div>
        {discountValue && (
          <span>
            {discountValue} {item.price.value.currencyCode}
          </span>
        )}
      </div>
    </div>
  );
};

export default ListItem;
