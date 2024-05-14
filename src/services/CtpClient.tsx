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
} from '@commercetools/sdk-client-v2';

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
    this.projectKey = 'ecommerce2024rss';
    this.oauthUri = 'https://auth.us-east-2.aws.commercetools.com';
    this.baseUri = 'https://api.us-east-2.aws.commercetools.com';
    this.clientId = 'vX67v610XQ7USWd_QeyZYf5j';
    this.clientSecret = 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n';
    this.scopes = [
      'manage_extensions:ecommerce2024rss',
      'manage_my_orders:ecommerce2024rss',
      'manage_stores:ecommerce2024rss',
      'manage_products:ecommerce2024rss',
      'create_anonymous_token:ecommerce2024rss',
      'manage_attribute_groups:ecommerce2024rss',
      'manage_states:ecommerce2024rss',
      'manage_categories:ecommerce2024rss',
      'manage_customers:ecommerce2024rss',
      'manage_cart_discounts:ecommerce2024rss',
      'manage_order_edits:ecommerce2024rss',
      'manage_types:ecommerce2024rss',
      'manage_discount_codes:ecommerce2024rss',
      'manage_orders:ecommerce2024rss',
      'manage_my_profile:ecommerce2024rss',
      'manage_standalone_prices:ecommerce2024rss',
      'view_messages:ecommerce2024rss',
    ];

    this.anonCustomerScopes = [
      'create_anonymous_token:ecommerce2024rss',
      'manage_my_profile:ecommerce2024rss',
      'manage_my_orders:ecommerce2024rss',
    ];

    this.customerScopes = [
      // 'create_anonymous_token:ecommerce2024rss',
      'manage_my_profile:ecommerce2024rss',
      'manage_my_orders:ecommerce2024rss',
      // 'manage_customers:ecommerce2024rss',
    ];
  }

  createAnonimusClient() {
    const options: AnonymousAuthMiddlewareOptions = {
      host: this.oauthUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n',
      },
      scopes: this.anonCustomerScopes,
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
        clientSecret: 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n',
        user: {
          username: data.email,
          password: data.password,
        },
      },
      scopes: this.customerScopes,
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

  createNewClient() {
    const options: AnonymousAuthMiddlewareOptions = {
      host: this.oauthUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n',
      },
      scopes: this.customerScopes,
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

  static getApiRoot(client: Client): ApiRoot {
    return createApiBuilderFromCtpClient(client);
  }
}
