import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  Client,
  ClientBuilder,
  Credentials,
} from '@commercetools/sdk-client-v2';

const userClientBuilder = new ClientBuilder();

export default class CtpClient {
  baseUri: string;

  credentials: Credentials;

  oauthUri: string;

  projectKey: string;

  constructor() {
    this.projectKey = 'ecommerce2024rss';
    this.oauthUri = 'https://auth.us-east-2.aws.commercetools.com';
    this.baseUri = 'https://api.us-east-2.aws.commercetools.com';
    this.credentials = {
      clientId: 'vX67v610XQ7USWd_QeyZYf5j',
      clientSecret: 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n',
    };
  }

  getClient(): Client {
    return userClientBuilder
      .defaultClient(
        this.baseUri,
        this.credentials,
        this.oauthUri,
        this.projectKey,
      )
      .build();
  }

  static getApiRoot(client: Client): ApiRoot {
    return createApiBuilderFromCtpClient(client);
  }
}
