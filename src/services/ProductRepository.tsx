import {
  ByProjectKeyRequestBuilder,
  Product,
} from '@commercetools/platform-sdk';
import { key } from 'localforage';

import { CustomerRepository } from './CustomerRepository';

class ProductRepository {
  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = CustomerRepository.apiRoot;
  }

  async getProduct(productID: string) {
    try {
      const resp = await this.apiRoot
        .products()
        .withId({ ID: productID })
        .get()
        .execute();

      return resp.body;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.apiRoot.products().get().execute();

      return response.body.results;
    } catch (error) {
      return [];
    }
  }
}

export default ProductRepository;
