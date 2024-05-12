class UserStatusStorage {
  private key = 'LoginUserID_JSFE2023Q4';

  public checkLoginStatus(): boolean {
    if (!localStorage.getItem(this.key)) {
      return false;
    }

    return true;
  }

  public clearLoginStatus(): void {
    localStorage.removeItem(this.key);
  }

  public getLoggedCustomerID(): string | undefined {
    const name = localStorage.getItem(this.key);

    if (!name) {
      return undefined;
    }

    return name;
  }

  public setLoginStatus(customerID: string): void {
    localStorage.setItem(this.key, customerID);
  }
}

export const logInIDStorage = new UserStatusStorage();
