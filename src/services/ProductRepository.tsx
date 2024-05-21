import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { CustomerRepository } from './CustomerRepository';

class ProductRepository {
  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = CustomerRepository.apiRoot;
  }

  async getProducts() {
    try {
      const products = await this.apiRoot.products().get().execute();

      return products;
    } catch (error) {
      return error;
    }
  }
}

export default ProductRepository;
