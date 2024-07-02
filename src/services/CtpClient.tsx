import {
  ApiRoot,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import MyTokenCache from '../utils/MyTokenCache';

export default class CtpClient {
  anonCustomerScopes: string[];

  baseUri: string;

  clientId: string;

  clientSecret: string;

  customerScopes: string[];

  oauthUri: string;

  projectKey: string;

  scopes: string[];

  constructor() {
    this.projectKey = 'ecomm2024rss';
    this.oauthUri = 'https://auth.us-east-2.aws.commercetools.com';
    this.baseUri = 'https://api.us-east-2.aws.commercetools.com';
    this.clientId = 'GcybV_WuoGnZOlghHmTeDGeY';
    this.clientSecret = 'AAv6YWOoYjT0Ab9Dqdwozvj1At0lDFpn';
    this.scopes = [
      'manage_extensions:ecomm2024rss',
      'manage_my_orders:ecomm2024rss',
      'manage_stores:ecomm2024rss',
      'manage_products:ecomm2024rss',
      'create_anonymous_token:ecomm2024rss',
      'manage_attribute_groups:ecomm2024rss',
      'manage_states:ecomm2024rss',
      'introspect_oauth_tokens:ecomm2024rss',
      'manage_categories:ecomm2024rss',
      'manage_customers:ecomm2024rss',
      'manage_cart_discounts:ecomm2024rss',
      'manage_order_edits:ecomm2024rss',
      'manage_types:ecomm2024rss',
      'view_project_settings:ecomm2024rss',
      'manage_discount_codes:ecomm2024rss',
      'manage_orders:ecomm2024rss',
      'manage_my_profile:ecomm2024rss',
      'manage_standalone_prices:ecomm2024rss',
      'view_messages:ecomm2024rss',
      'manage_customers:ecomm2024rss',
    ];

    this.anonCustomerScopes = [
      'manage_orders:ecomm2024rss',
      'manage_my_profile:ecomm2024rss',
      'manage_my_orders:ecomm2024rss',
      'manage_products:ecomm2024rss',
    ];

    this.customerScopes = [
      'manage_orders:ecomm2024rss',
      'manage_my_profile:ecomm2024rss',
      'manage_my_orders:ecomm2024rss',
      'manage_customers:ecomm2024rss',
      'manage_products:ecomm2024rss',
    ];
  }

  createAnonymousClient() {
    const options: AnonymousAuthMiddlewareOptions = {
      host: this.oauthUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      scopes: this.anonCustomerScopes,
      tokenCache: new MyTokenCache(),

      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: this.baseUri,
      fetch,
    };

    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withAnonymousSessionFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  createLoggedInClient(data: CustomerSignin) {
    const options: PasswordAuthMiddlewareOptions = {
      host: this.oauthUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        user: {
          username: data.email,
          password: data.password,
        },
      },
      scopes: this.customerScopes,
      tokenCache: new MyTokenCache(),
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: this.baseUri,
      fetch,
    };

    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  refreshClient(refreshToken: string) {
    const options: RefreshAuthMiddlewareOptions = {
      host: this.oauthUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      tokenCache: new MyTokenCache(),
      refreshToken: refreshToken,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: this.baseUri,
      fetch,
    };

    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  static getApiRoot(client: Client): ApiRoot {
    return createApiBuilderFromCtpClient(client);
  }
}
