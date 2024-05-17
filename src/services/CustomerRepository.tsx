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
      const customer = await CustomerRepository.apiRoot
        .me()
        .signup()
        .post({ body: customerData })
        .execute();

      const passwordFlowData: CustomerSignin = {
        email: customerData.email,
        password: customerData.password,
      };

      CustomerRepository.setLoggedApiRoot(passwordFlowData);

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

      CustomerRepository.setLoggedApiRoot(customerData);

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  public static logOutCusromer() {
    const apiRoot = CustomerRepository.createAnonimusCustomer();

    CustomerRepository.apiRoot = apiRoot;
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
