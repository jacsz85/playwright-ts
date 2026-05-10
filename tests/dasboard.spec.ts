import { expect, test } from "../src/fixtures/base";
import { generateRandomNumber, generateRandomString, generateValueInRange } from "../src/utils/randomizer";

test.describe.serial('Quick transfer widget tests', () => {

    test('Quick transfer widget is displayed on dashboard', async ({ login, dashboardPage }) => {
        await expect(dashboardPage.quickTransferWidgetHeader).toBeVisible();
        await expect(dashboardPage.quickTransferReceiverDropdown).toBeVisible();
        await expect(dashboardPage.quickTransferAmountInput).toBeVisible();
        await expect(dashboardPage.quickTransferTitleInput).toBeVisible();
        await expect(dashboardPage.quickTransferExecuteButton).toBeVisible();
    });

    test('Send quick transfer with no data entered', async ({ login, dashboardPage }) => {
        await dashboardPage.quickTransferExecuteButton.click();
        await expect(dashboardPage.quickTransferReceiverErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.quickTransferAmountErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.quickTransferTitleErrorMessage).toContainText('pole wymagane');
    });

        test ('Send quick transfer with only receiver selected', async ({ login, dashboardPage }) => {
        var transferAmount = generateRandomNumber(2);
        var transferTitle = generateRandomString(10);

        await dashboardPage.selectQuickTransferReceiver(generateValueInRange(1, 3));
        await dashboardPage.enterQuickTransferAmount(transferAmount);
        await dashboardPage.enterQuickTransferTitle(transferTitle);
        await dashboardPage.quickTransferExecuteButton.click();

        await expect(dashboardPage.quickTransferSuccessDialog).toBeVisible();
        await expect(dashboardPage.quickTransferSuccessDialog).toContainText(transferAmount);
        await expect(dashboardPage.quickTransferSuccessDialog).toContainText(transferTitle);
    });

});