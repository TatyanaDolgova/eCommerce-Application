import {
  ByProjectKeyRequestBuilder,
  Cart,
  CartDraft,
  LineItemDraft,
} from '@commercetools/platform-sdk';

import { CustomerRepository } from './CustomerRepository';

class CardRepository {
  apiRoot: ByProjectKeyRequestBuilder | undefined;

  cardId: string;

  constructor() {
    this.apiRoot = undefined;
    this.cardId = '';
  }

  async addToCart(cartId: string, productId: string): Promise<Cart> {
    const lineItemDraft: LineItemDraft = {
      productId: productId,
      quantity: 1,
    };
    const cart = await this.getCartById(cartId);
    const version = cart.version;

    const response = await this.getRoot()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [{ action: 'addLineItem', ...lineItemDraft }],
        },
      })
      .execute();

    return response.body;
  }

  async createCart(): Promise<Cart> {
    const cartDraft: CartDraft = {
      currency: 'EUR',
    };

    const response = await this.getRoot()
      .carts()
      .post({ body: cartDraft })
      .execute();

    this.cardId = response.body.id;

    return response.body;
  }

  async getCartById(cartId: string): Promise<Cart> {
    try {
      const response = await this.getRoot()
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute();

      const cart: Cart = response.body;

      return cart;
    } catch (error) {
      throw new Error('Error fetching cart');
    }
  }

  getRoot(): ByProjectKeyRequestBuilder {
    this.apiRoot = CustomerRepository.apiRoot;

    return this.apiRoot;
  }
}

export default CardRepository;
