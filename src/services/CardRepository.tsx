import {
  ByProjectKeyRequestBuilder,
  Cart,
  CartDraft,
  LineItem,
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
      .me()
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

  async checkActiveCard(): Promise<Cart> {
    try {
      const responce = await this.getRoot().me().activeCart().get().execute();

      this.cardId = responce.body.id;

      return responce.body;
    } catch (error) {
      throw new Error('No active cart exists.');
    }
  }

  async checkProduct(productID: string) {
    const cart = await this.getCartById(this.cardId);

    const products: LineItem[] = cart.lineItems;

    const item = products.find((product) => product.productId === productID);

    if (item) {
      return true;
    } else {
      return false;
    }
  }

  async createCart(): Promise<Cart> {
    const cartDraft: CartDraft = {
      currency: 'EUR',
    };

    const response = await this.getRoot()
      .me()
      .carts()
      .post({ body: cartDraft })
      .execute();

    this.cardId = response.body.id;

    return response.body;
  }

  async getCartById(cartId: string): Promise<Cart> {
    try {
      const response = await this.getRoot()
        .me()
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

  getCartID() {
    return this.cardId;
  }

  getRoot(): ByProjectKeyRequestBuilder {
    this.apiRoot = CustomerRepository.apiRoot;

    return this.apiRoot;
  }

  async modifyQuantity(
    cartID: string,
    productID: string,
    quantity: number,
    version: number,
  ): Promise<Cart> {
    const response = await this.getRoot()
      .me()
      .carts()
      .withId({ ID: cartID })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: productID,
              quantity: quantity,
            },
          ],
        },
      })
      .execute();

    return response.body;
  }
}

export const cartRepository = new CardRepository();

export default CardRepository;
