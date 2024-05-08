import {
  CustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';

export default class CustomerRepository {
  projectKey: string;

  constructor() {
    this.projectKey = 'ecommerce2024rss';
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
