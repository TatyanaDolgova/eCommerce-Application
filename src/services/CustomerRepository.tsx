import {
  ApiRoot,
  ByProjectKeyRequestBuilder,
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';

export default class CustomerRepository {
  // anonCustomerApiRoot: ByProjectKeyRequestBuilder;

  projectKey: string;

  constructor() {
    this.projectKey = 'ecommerce2024rss';
  }

  // private createAnonimusCustomer() {
  //   const ctpClient = new CtpClient();
  //   const anonimousClient = ctpClient.createAnonimusClient();
  //   const apiRoot = createApiBuilderFromCtpClient(
  //     anonimousClient,
  //   ).withProjectKey({ projectKey: 'ecommerce2024rss' });

  //   this.anonCustomerApiRoot = apiRoot;
  // }

  public async createLoggedInCustomer(customerData: CustomerSignin) {
    try {
      const client = new CtpClient();
      const anonimousClient = client.createLoggedInClient();
      const apiRoot = createApiBuilderFromCtpClient(
        anonimousClient,
      ).withProjectKey({ projectKey: 'ecommerce2024rss' });

      const customer = await apiRoot
        .login()
        .post({ body: customerData })
        .execute()
        .then(({ body }) => {
          console.log(body);
          console.log(this);
        });

      return customer;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  static async createCustomer(customerData: CustomerDraft) {
    try {
      const client = new CtpClient();
      const anonimousClient = client.createAnonimusClient();
      const apiRoot = createApiBuilderFromCtpClient(
        anonimousClient,
      ).withProjectKey({ projectKey: 'ecommerce2024rss' });

      const customer = await apiRoot
        .customers()
        .post({
          body: customerData,
        })
        .execute();

      return customer;
    } catch (error) {
      return error;
    }
  }
}

export const customerRepository = new CustomerRepository();
