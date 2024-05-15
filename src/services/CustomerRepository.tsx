import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
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

  public static async createCustomer(customerData: MyCustomerDraft) {
    try {
      const client = new CtpClient();
      const anonymousClient = client.createNewClient();
      const apiRoot = createApiBuilderFromCtpClient(
        anonymousClient,
      ).withProjectKey({ projectKey: 'ecommerce2024rss' });

      // const customer = await apiRoot;
      // .me()
      // .signup()
      // .post({ body: customerData })
      // .execute();

      const customer = await apiRoot
        .me()
        .signup()
        .post({ body: customerData })
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
          .me()
          .login()
          .post({ body: customerData })
          .execute();

      await CustomerRepository.setLoggedApiRoot(customerData);

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  public static async logOutCusromer() {
    const apiRoot = CustomerRepository.createAnonimusCustomer();

    CustomerRepository.apiRoot = apiRoot;

    await apiRoot.get().execute();
  }

  static async setLoggedApiRoot(customerData: CustomerSignin) {
    const ctpClient = new CtpClient();
    const loggedInClient = ctpClient.createLoggedInClient(customerData);
    const apiRoot = createApiBuilderFromCtpClient(
      loggedInClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    await apiRoot.me().get().execute();

    CustomerRepository.apiRoot = apiRoot;
  }
}
