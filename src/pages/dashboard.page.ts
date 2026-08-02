import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
    quickTransferWidgetHeader: Locator;
    quickTransferReceiverDropdown: Locator;
    quickTransferAmountInput: Locator;
    quickTransferTitleInput: Locator;
    quickTransferExecuteButton: Locator;
    quickTransferReceiverErrorMessage: Locator;
    quickTransferAmountErrorMessage: Locator;
    quickTransferTitleErrorMessage: Locator;

    topUpWidgetHeader: Locator;
    topUpWidgetReceiverDropdown: Locator;
    topUpWidgetAmountInput: Locator;
    topUpWidgedAgreementCheckbox: Locator;
    topUpWidgetExecuteButton: Locator;
    topUpWidgetReceiverErrorMessage: Locator;
    topUpWidgetAmountErrorMessage: Locator;
    topUpWidgetAgreementErrorMessage: Locator;

    constructor(public page: Page) {
        super(page);
        this.quickTransferWidgetHeader = this.page.getByRole('heading', { name: 'szybki przelew' });
        this.quickTransferReceiverDropdown = this.page.locator('#widget_1_transfer_receiver');
        this.quickTransferAmountInput = this.page.locator('#widget_1_transfer_amount');
        this.quickTransferTitleInput = this.page.locator('#widget_1_transfer_title');
        this.quickTransferExecuteButton = this.page.locator('#execute_btn');
        this.quickTransferReceiverErrorMessage = this.page.locator('#error_widget_1_transfer_receiver');
        this.quickTransferAmountErrorMessage = this.page.locator('#error_widget_1_transfer_amount');
        this.quickTransferTitleErrorMessage = this.page.locator('#error_widget_1_transfer_title');

        this.topUpWidgetHeader = this.page.getByRole('heading', { name: 'doładowanie telefonu' });
        this.topUpWidgetReceiverDropdown = this.page.locator('#widget_1_topup_receiver');
        this.topUpWidgetAmountInput = this.page.locator('#widget_1_topup_amount');
        this.topUpWidgedAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement');
        this.topUpWidgetExecuteButton = this.page.locator('#execute_phone_btn');
        this.topUpWidgetReceiverErrorMessage = this.page.locator('#error_widget_1_topup_receiver');
        this.topUpWidgetAmountErrorMessage = this.page.locator('#error_widget_1_topup_amount');
        this.topUpWidgetAgreementErrorMessage = this.page.locator('#error_widget_1_topup_agreement');
    }

    public async sendQuickTransfer(receiverIndex: number, amount: string, title: string): Promise<void> {
        await this.quickTransferReceiverDropdown.selectOption({ index: receiverIndex });
        await this.quickTransferAmountInput.fill(amount);
        await this.quickTransferTitleInput.fill(title);
        await this.quickTransferExecuteButton.click();
    }

    public async sendTopUp(receiverIndex: number, amount: string): Promise<void> {
        await this.topUpWidgetReceiverDropdown.selectOption({ index: receiverIndex });
        await this.topUpWidgetAmountInput.fill(amount);
        await this.topUpWidgedAgreementCheckbox.check();
        await this.topUpWidgetExecuteButton.click();
    }
    
}