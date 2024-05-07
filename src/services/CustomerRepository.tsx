import { ApiRoot, CustomerDraft } from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';

export default class CustomerRepository {
  apiRoot: ApiRoot;

  projectKey: string;

  constructor() {
    const newClient = new CtpClient();

    this.apiRoot = CtpClient.getApiRoot(newClient.getClient());
    this.projectKey = 'ecommerce2024rss';
  }

  async createCustomer(customerData: CustomerDraft) {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
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
