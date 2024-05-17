import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { anonTokenCache, authTokenCache } from '../utils/MyTokenCache';

import CtpClient from './CtpClient';

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

      const passwordFlowData: CustomerSignin = {
        email: customerData.email,
        password: customerData.password,
      };

      await CustomerRepository.setLoggedApiRoot(passwordFlowData);
      CustomerRepository.isAuthApiRoot = true;

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

      console.log('Анонимный');

      console.log(anonTokenCache.get());

      if (!CustomerRepository.isAuthApiRoot) {
        await CustomerRepository.setLoggedApiRoot(customerData);
      }
      console.log('Кастомера');

      console.log(authTokenCache.get());

      return customer;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  public static logOutCusromer() {
    anonTokenCache.clear();
    authTokenCache.clear();

    const apiRoot = CustomerRepository.createAnonimusCustomer();

    CustomerRepository.apiRoot = apiRoot;
  }

  public static refreshCustomer(refrechToken: string) {
    const ctpClient = new CtpClient();
    const loggedInClient = ctpClient.refreshClient(refrechToken);
    const apiRoot = createApiBuilderFromCtpClient(
      loggedInClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;

    console.log('Зарефрешила');

    console.log(refrechToken);
  }

  public static async sendTestRequest() {
    await CustomerRepository.apiRoot.me().get().execute();
  }

  static async setLoggedApiRoot(customerData: CustomerSignin) {
    const ctpClient = new CtpClient();
    const loggedInClient = ctpClient.createLoggedInClient(customerData);
    const apiRoot = createApiBuilderFromCtpClient(
      loggedInClient,
    ).withProjectKey({ projectKey: CustomerRepository.projectKey });

    CustomerRepository.apiRoot = apiRoot;

    await CustomerRepository.apiRoot.me().get().execute();
  }
}
