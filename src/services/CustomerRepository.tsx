import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';
import { userTokenStorage } from './LocalStorage';

export class CustomerRepository {
  static apiRoot: ByProjectKeyRequestBuilder;

  static isAuthApiRoot: boolean;

  static projectKey = 'ecommerce2024rss';

  public static createAnonimusCustomer(): ByProjectKeyRequestBuilder {
    const ctpClient = new CtpClient();
    const anonimousClient = ctpClient.createAnonimusClient();
    const apiRoot = createApiBuilderFromCtpClient(
      anonimousClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;

    CustomerRepository.isAuthApiRoot = false;

    return CustomerRepository.apiRoot;
  }

  public static async createCustomer(customerData: MyCustomerDraft) {
    try {
      const customer = await CustomerRepository.apiRoot
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
      CustomerRepository.setLoggedApiRoot(customerData);

      const customer: ClientResponse<CustomerSignInResult> =
        await CustomerRepository.apiRoot
          .me()
          .login()
          .post({ body: customerData })
          .execute();

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  public static logOutCusromer() {
    const apiRoot = CustomerRepository.createAnonimusCustomer();

    userTokenStorage.clearTokens();

    CustomerRepository.apiRoot = apiRoot;
  }

  public static refreshCustomer(refrechToken: string) {
    const ctpClient = new CtpClient();

    const loggedInClient = ctpClient.refreshClient(refrechToken);

    const apiRoot = createApiBuilderFromCtpClient(
      loggedInClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;
  }

  public static async sendTestRequest() {
    await CustomerRepository.apiRoot.me().get().execute();
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
