import { TokenStore } from '@commercetools/sdk-client-v2';

class UserTokenStorage {
  private key = 'User_JSFE2023Q4';

  public checkTokens(): boolean {
    if (!localStorage.getItem(this.key)) {
      return false;
    }

    return true;
  }

  public clearTokens(): void {
    localStorage.removeItem(this.key);
  }

  public getTokens(): TokenStore | undefined {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return undefined;
    } else {
      const tokens = JSON.parse(data) as TokenStore;

      return tokens;
    }
  }

  public setTokens(currentTokens: TokenStore): void {
    localStorage.setItem(this.key, JSON.stringify(currentTokens));
  }
}

export const userTokenStorage = new UserTokenStorage();
