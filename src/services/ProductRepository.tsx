import {
  ByProjectKeyRequestBuilder,
  Category,
  Product,
  ProductProjection,
  QueryParam,
} from '@commercetools/platform-sdk';
import { key } from 'localforage';

import { CustomerRepository } from './CustomerRepository';

class ProductRepository {
  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiRoot = CustomerRepository.apiRoot;
  }

  async getAllSubcategories(parentCategoryId: string) {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [`categories.id:subtree("${parentCategoryId}")`],
          },
        })
        .execute();

      return response.body.results;
    } catch (error) {
      throw new Error('Error fetching products by category');
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

  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      const response = await this.apiRoot
        .categories()
        .withId({ ID: categoryId })
        .get()
        .execute();

      return response.body;
    } catch (error) {
      throw new Error('Error fetching category with ID');
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

  async getProducts(
    sortBy: string,
    query: string,
    categoryId?: string,
  ): Promise<ProductProjection[]> {
    try {
      const queryArgs: Record<string, string | string[] | boolean | number> = {
        'text.en-US': query,
        fuzzy: true,
        sort: sortBy,
        limit: 50,
      };

      if (categoryId) {
        queryArgs.filter = [`categories.id:subtree("${categoryId}")`];
      }

      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({ queryArgs })
        .execute();

      const products: ProductProjection[] = response.body.results;

      return products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }
}

export default ProductRepository;
