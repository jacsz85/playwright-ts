import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";
import { PaymentsPage } from "./payments.page";

export class BasePage {
    homepageUrl = 'https://demo-bank.vercel.app/pulpit.html';
    homepageTitle = 'Demobank - Bankowość Internetowa - Pulpit';
    userName: Locator;
    logOutButton: Locator
    accountInfoBar: Locator;
    payments: Locator;
    successDialog: Locator;
    dialogOkButton: Locator;

    constructor(public page: Page) {
        this.userName = this.page.getByTestId('user-name');
        this.logOutButton = this.page.getByTestId('logout-button');
        this.accountInfoBar = this.page.locator('.account-info');
        this.payments = this.page.locator('#payments_btn');
        this.successDialog = this.page.getByRole('dialog');
        this.dialogOkButton = this.page.getByRole('button', { name: 'Ok' });
    }

    public async isReady() {
        await this.page.waitForURL(this.homepageUrl);
        await expect(this.accountInfoBar).toBeVisible();
    }

    public async clickLogOutButton(): Promise<void> {
        await this.logOutButton.click();
    }

    public async clickOkButtonOnSuccessDialog(): Promise<void> {
        await this.dialogOkButton.click();
        await expect(this.successDialog).not.toBeVisible();
    }

    public async goGoToPayments({paymentsPage}: {paymentsPage: PaymentsPage}): Promise<void> {
        await this.payments.click();
        await expect(paymentsPage.pageHeader).toBeVisible();
        await expect(paymentsPage.paymentForm).toBeVisible();
    }

}