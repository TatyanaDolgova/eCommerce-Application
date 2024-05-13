import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
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

    return CustomerRepository.apiRoot;
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
      const customer: ClientResponse<CustomerSignInResult> =
        await CustomerRepository.apiRoot
          .login()
          .post({ body: customerData })
          .execute();

      CustomerRepository.setLoggedApiRoot(customerData);

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  static setLoggedApiRoot(customerData: CustomerSignin) {
    const ctpClient = new CtpClient();
    const loggedInClient = ctpClient.createLoggedInClient(customerData);
    const apiRoot = createApiBuilderFromCtpClient(
      loggedInClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;
  }
}
