import {
  ByProjectKeyRequestBuilder,
  Category,
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

  async getAllSubcategories(parentCategoryId: string): Promise<Category[]> {
    try {
      const response = await this.apiRoot
        .categories()
        .get({
          queryArgs: {
            where: `ancestors(id="${parentCategoryId}")`,
          },
        })
        .execute();

      const subcategories = response.body.results;

      return subcategories;
    } catch (error) {
      throw new Error('Error fetching subcategories');
    }
  }

  async getCategories() {
    try {
      const response = await this.apiRoot.categories().get().execute();
      const categories = response.body.results;

      return categories;
    } catch (error) {
      throw new Error('Error fetching categories');
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
      throw new Error('Error fetching products');
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
      throw new Error('Error fetching products by category');

      return [];
    }
  }
}

export default ProductRepository;
