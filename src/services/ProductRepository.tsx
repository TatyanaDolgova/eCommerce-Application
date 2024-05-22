import {
  ByProjectKeyRequestBuilder,
  Product,
} from '@commercetools/platform-sdk';

import { CustomerRepository } from './CustomerRepository';

class ProductRepository {
  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = CustomerRepository.apiRoot;
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
