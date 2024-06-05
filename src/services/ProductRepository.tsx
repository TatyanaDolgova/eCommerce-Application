import {
  ByProjectKeyRequestBuilder,
  Category,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

import { CustomerRepository } from './CustomerRepository';

class ProductRepository {
  apiRoot: ByProjectKeyRequestBuilder | undefined;

  constructor() {
    this.apiRoot = undefined;
  }

  async getAllSubcategories(parentCategoryId: string) {
    try {
      const response = await this.getRoot()
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
      const response = await this.getRoot().categories().get().execute();
      const categories = response.body.results;

      return categories;
    } catch (error) {
      throw new Error('Error fetching categories');
    }
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      const response = await this.getRoot()
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
      const resp = await this.getRoot()
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
    minPrice: number,
    maxPrice: number,
    size: string,
    productsPerPage: number,
    categoryId?: string,
    page = 1,
  ): Promise<{ results: ProductProjection[]; totalPages: number }> {
    try {
      const offset = (page - 1) * productsPerPage;

      const queryArgs: Record<string, string | string[] | boolean | number> = {
        'text.en-US': query,
        fuzzy: true,
        sort: sortBy,
        limit: productsPerPage,
        offset: offset,
        filter: [],
        'filter.query': `variants.price.centAmount:range (${minPrice * 100} to ${maxPrice * 100})`,
      };

      const filters: string[] = [];

      if (size) {
        filters.push(`variants.attributes.size:"${size}"`);
      }

      if (categoryId) {
        filters.push(`categories.id:subtree("${categoryId}")`);
      }

      queryArgs.filter = filters;

      const response = await this.getRoot()
        .productProjections()
        .search()
        .get({ queryArgs })
        .execute();
      const products: ProductProjectionPagedSearchResponse = response.body;

      return {
        results: response.body.results,
        totalPages: products.total
          ? Math.ceil(products.total / productsPerPage)
          : 0,
      };
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  getRoot(): ByProjectKeyRequestBuilder {
    this.apiRoot = CustomerRepository.apiRoot;

    return this.apiRoot;
  }
}

export const productRepository = new ProductRepository();

export default ProductRepository;
