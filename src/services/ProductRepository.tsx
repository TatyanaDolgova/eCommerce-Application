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

  async getCategories() {
    try {
      const response = await this.apiRoot.categories().get().execute();
      const categories = response.body.results;

      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async getProduct(productID: string): Promise<Product | undefined> {
    try {
      const resp = await this.apiRoot
        .products()
        .withId({ ID: productID })
        .get()
        .execute();

      return resp.body;
    } catch (error) {
      console.error('Error fetching product:', error);

      return undefined;
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
