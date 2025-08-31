import { Locator, Page } from "@playwright/test";

export class LoginPage {
    loginUrl = 'https://demo-bank.vercel.app/';
    loginInput: Locator;
    passwordInput: Locator;
    erorrLogin: Locator;
    errorPassword: Locator;
    loginButton: Locator;
    tooShortLoginErrorMessage: string = 'identyfikator ma min. 8 znaków';
    tooShortPasswordErrorMessage: string = 'hasło ma min. 8 znaków';

    constructor(public page: Page) {
        this.loginInput = this.page.getByTestId('login-input');
        this.passwordInput = this.page.getByTestId('password-input');
        this.erorrLogin = this.page.getByTestId('error-login-id');
        this.errorPassword = this.page.getByTestId('error-login-password');
        this.loginButton = this.page.getByTestId('login-button');
    }

    public async goto() {
        await this.page.goto(this.loginUrl);
    }

    public async enterLogin(username: string): Promise<void> {
        await this.loginInput.fill(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

}