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
    quickTransferSuccessDialog: Locator;



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
        this.quickTransferSuccessDialog = this.page.getByRole('dialog').filter({ hasText: 'Przelew wykonany' });
    }

    public async selectQuickTransferReceiver(option: string): Promise<void> {
        await this.quickTransferReceiverDropdown.selectOption({ value: option });
    }

    public async enterQuickTransferAmount(amount: string): Promise<void> {
        await this.quickTransferAmountInput.fill(amount);
    }

    public async enterQuickTransferTitle(title: string): Promise<void> {
        await this.quickTransferTitleInput.fill(title);
    }
    
}