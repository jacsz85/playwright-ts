import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    dashboardUrl = 'https://demo-bank.vercel.app/pulpit.html';
    dashboardTitle = 'Demobank - Bankowość Internetowa - Pulpit';
    accountInfoBar: Locator;
    userName: Locator;
    logOutButton: Locator;

    constructor(public page: Page) {
        this.userName = this.page.getByTestId('user-name');
        this.accountInfoBar = this.page.locator('.account-info');
        this.logOutButton = this.page.getByTestId('logout-button');
    }

    public async isReady() {
        await this.page.waitForURL(this.dashboardUrl);
        return expect(this.accountInfoBar).toBeVisible();
    }

    public async clickLogOutButton(): Promise<void> {
        await this.logOutButton.click();
    }

}