import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { userTokenStorage } from '../services/LocalStorage';

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
    if (!cache.refreshToken) {
      const storage = userTokenStorage.getTokens();

      if (storage) userTokenStorage.setTokens(storage);
    } else {
      userTokenStorage.setTokens(cache);
    }

    this.tokenStore = cache;
  }
}

export default MyTokenCache;
