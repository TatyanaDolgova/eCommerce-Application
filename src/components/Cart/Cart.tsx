import { LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import CardRepository from '../../services/CardRepository';

import EmptyCart from './EmptyCart';
import ListItem from './ListItem';

const Cart = () => {
  const [listItems, setListItems] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const CartId = '5f46553e-085c-4085-ba95-8c74a3ae223e';

  const fetchCart = async () => {
    try {
      const cartRepo = new CardRepository();
      const cart = await cartRepo.getCartById(CartId);

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

  if (listItems.length === 0) return <EmptyCart />;

  return (
    <div>
      <div className="list-container">
        {listItems.map((item) => {
          return <ListItem {...item} />;
        })}
      </div>
      <div className="total">
        Total: {totalPrice} {currency}
      </div>
    </div>
  );
};

export default Cart;
