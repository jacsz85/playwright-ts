import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";

export class BasePage {
    homepageUrl = 'https://demo-bank.vercel.app/pulpit.html';
    homepageTitle = 'Demobank - Bankowość Internetowa - Pulpit';
    userName: Locator;
    logOutButton: Locator
    accountInfoBar: Locator;
    privateAccountsButton: Locator;

    constructor(public page: Page) {
        this.userName = this.page.getByTestId('user-name');
        this.logOutButton = this.page.getByTestId('logout-button');
        this.accountInfoBar = this.page.locator('.account-info');
        this.privateAccountsButton = this.page.locator('#privaccounts_btn');
    }

    public async isReady() {
        await this.page.waitForURL(this.homepageUrl);
        await expect(this.accountInfoBar).toBeVisible();
    }

    public async clickLogOutButton(): Promise<void> {
        await this.logOutButton.click();
    }

    public async goGoToPrivateAccounts(): Promise<void> {
        await this.privateAccountsButton.click();
    }

}