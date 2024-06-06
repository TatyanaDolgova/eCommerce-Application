import { LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { cartRepository } from '../../services/CardRepository';

import EmptyCart from './EmptyCart';
import ListItem from './ListItem';

const Cart = () => {
  const [listItems, setListItems] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('EUR');

  const fetchCart = async () => {
    try {
      const cartRepo = cartRepository;
      const cart = await cartRepo.checkActiveCard();

      setListItems(cart.lineItems);

      setTotalPrice(cart.totalPrice.centAmount / 100);
      setCurrency(cart.totalPrice.currencyCode);
    } catch {
      console.log('error fetching cart');
    }
  };

  useEffect(() => {
    void fetchCart();
  }, []);

  if (listItems.length !== 0) {
    return (
      <div>
        <div className="list-container">
          {listItems.map((item) => {
            return (
              <ListItem
                key={item.key}
                item={item}
                callback={setListItems}
                setPrice={setTotalPrice}
              />
            );
          })}
        </div>
        <div className="total">
          Total: {totalPrice} {currency}
        </div>
      </div>
    );
  } else {
    return <EmptyCart />;
  }
};

export default Cart;
