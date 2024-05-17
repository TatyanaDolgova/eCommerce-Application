import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { userTokenStorage } from '../services/LocalStorage';

class MyTokenCache implements TokenCache {
  private defaultTokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  private tokenStore: TokenStore;

  constructor() {
    const tokens = userTokenStorage.getTokens();

    if (tokens) {
      this.tokenStore = tokens;
    } else {
      this.tokenStore = this.defaultTokenStore;
    }
  }

  clear(): void {
    this.tokenStore = this.defaultTokenStore;
  }

  get(): TokenStore {
    return this.tokenStore;
  }

  set(cache: TokenStore): void {
    Object.assign(this.tokenStore, cache);
    this.tokenStore = cache;
    userTokenStorage.setTokens(cache);
  }
}

// export default new MyTokenCache();
export const anonTokenCache = new MyTokenCache();
export const authTokenCache = new MyTokenCache();
