import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = 'ecommerce2024rss';
const scopes = [
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

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-east-2.aws.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'vX67v610XQ7USWd_QeyZYf5j',
    clientSecret: 'Ttj-BiXTcQ095yXCXvZxiR8Xij5tCX7n',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-east-2.aws.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
