import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private tokenStore: TokenStore;

  constructor() {
    this.tokenStore = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }

  get(): TokenStore {
    return this.tokenStore;
  }

  set(cache: TokenStore): void {
    this.tokenStore = cache;
  }
}

export default MyTokenCache;