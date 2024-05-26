import { TokenStore } from '@commercetools/sdk-client-v2';

class UserTokenStorage {
  private loginKey = 'User_JSFE2023Q4_isLoggedin';

  private tokenKey = 'User_JSFE2023Q4_token';

  public checkLoginState(): boolean {
    if (!localStorage.getItem(this.loginKey)) {
      return false;
    }

    return true;
  }

  public checkTokens(): boolean {
    if (!localStorage.getItem(this.tokenKey)) {
      return false;
    }

    return true;
  }

  public clearLoginState(): void {
    localStorage.removeItem(this.loginKey);
  }

  public clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public getLoginState(): string | undefined {
    const data = localStorage.getItem(this.loginKey);

    if (!data) {
      return undefined;
    } else {
      return data;
    }
  }

  public getTokens(): TokenStore | undefined {
    const data = localStorage.getItem(this.tokenKey);

    if (!data) {
      return undefined;
    } else {
      const tokens = JSON.parse(data) as TokenStore;

      return tokens;
    }
  }

  public setLoginState(loginState: string): void {
    localStorage.setItem(this.loginKey, loginState);
  }

  public setTokens(currentTokens: TokenStore): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(currentTokens));
  }
}

export const userTokenStorage = new UserTokenStorage();
