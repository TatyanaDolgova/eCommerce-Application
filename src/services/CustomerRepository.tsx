import {
  ApiRoot,
  ByProjectKeyRequestBuilder,
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';

export class CustomerRepository {
  static apiRoot: ByProjectKeyRequestBuilder;

  static projectKey = 'ecommerce2024rss';

  public static createAnonimusCustomer(): ByProjectKeyRequestBuilder {
    const ctpClient = new CtpClient();
    const anonimousClient = ctpClient.createAnonimusClient();
    const apiRoot = createApiBuilderFromCtpClient(
      anonimousClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;

    return apiRoot;
  }

  public static async createCustomer(customerData: CustomerDraft) {
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

  public static async createLoggedInCustomer(customerData: CustomerSignin) {
    try {
      // const client = new CtpClient();
      // const anonimousClient = client.createLoggedInClient();
      // const apiRoot = createApiBuilderFromCtpClient(
      //   anonimousClient,
      // ).withProjectKey({ projectKey: this.projectKey });

      const customer = await CustomerRepository.apiRoot
        .login()
        .post({ body: customerData })
        .execute()
        .then(({ body }) => {
          console.log(body);
        });

      return customer;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
