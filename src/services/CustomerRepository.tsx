import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  CustomerUpdateAction,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import CtpClient from './CtpClient';
import { userTokenStorage } from './LocalStorage';

export class CustomerRepository {
  static apiRoot: ByProjectKeyRequestBuilder;

  static isAuthApiRoot: boolean;

  static projectKey = 'ecommerce2024rss';

  static async changeCustomerPassword(
    customerId: string,
    version: number,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      await CustomerRepository.apiRoot
        .customers()
        .password()
        .post({
          body: {
            id: customerId,
            version: version,
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        })
        .execute();
    } catch (err) {
      return err;
    }
  }

  public static createAnonymousCustomer(): ByProjectKeyRequestBuilder {
    const ctpClient = new CtpClient();
    const anonymousClient = ctpClient.createAnonymousClient();
    const apiRoot = createApiBuilderFromCtpClient(
      anonymousClient,
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

      CustomerRepository.setLoggedApiRoot(customerData);

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

  public static async getCustomerInformation() {
    const customer = await CustomerRepository.apiRoot.me().get().execute();

    return customer;
  }

  public static logOutCusromer() {
    const apiRoot = CustomerRepository.createAnonymousCustomer();

    userTokenStorage.clearTokens();

    CustomerRepository.apiRoot = apiRoot;
  }

  public static refreshCustomer(refreshToken: string) {
    const ctpClient = new CtpClient();

    const loggedInClient = ctpClient.refreshClient(refreshToken);

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

  static async updateCustomer(
    customerID: string,
    version: number,
    actions: CustomerUpdateAction[],
  ) {
    const customer = await CustomerRepository.apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        // The CustomerUpdate is the object within the body
        body: {
          // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
          version: version,
          actions: actions,
        },
      })
      .execute();

    return customer;
  }
}
