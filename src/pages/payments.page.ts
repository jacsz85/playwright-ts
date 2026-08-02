import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PaymentsPage extends BasePage {
    pageHeader: Locator;
    paymentForm: Locator;
    sourceAccountSelect: Locator;
    receiverInput: Locator;
    accountInput: Locator;
    amountInput: Locator;
    sendPaymentButton: Locator;

    constructor(public page: Page) {
        super(page);
        this.pageHeader = this.page.getByRole('heading', { name: 'przelew dowolny' });
        this.paymentForm = this.page.locator('#transfer_new_out');
        this.sourceAccountSelect = this.page.locator('#form_account_from');
        this.receiverInput = this.page.locator('#widget_4_transfer_receiver');
        this.accountInput = this.page.locator('#widget_2_transfer_account');
        this.amountInput = this.page.locator('#widget_1_topup_amount');
        this.sendPaymentButton = this.page.locator('#execute_btn');
    }

    public async goToPayments(): Promise<void> {
        await this.payments.click();
        await this.page.waitForURL(/przelew_nowy_zew\.html/);
        await expect(this.pageHeader).toBeVisible();
        await expect(this.paymentForm).toBeVisible();

    }

    public async fillTransferForm(receiver: string, account: string, amount: string): Promise<void> {
        await this.receiverInput.fill(receiver);
        await this.accountInput.fill(account);
        await this.amountInput.fill(amount);
    }
}