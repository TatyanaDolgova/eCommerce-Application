import {
  ByProjectKeyRequestBuilder,
  Product,
  ProductProjection,
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

  async getProducts(): Promise<ProductProjection[]> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get()
        .execute();

      const products: ProductProjection[] = response.body.results;

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);

      return [];
    }
  }

  async getProductsByCategory(
    categoryId: string,
  ): Promise<ProductProjection[]> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: `categories.id:"${categoryId}"`,
          },
        })
        .execute();

      const products = response.body.results;

      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);

      return [];
    }
  }
}

export default ProductRepository;
