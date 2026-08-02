import { expect, test } from "../src/fixtures/base";
import { generateRandomNumber, generateRandomString, generateValueInRange } from "../src/utils/randomizer";

test.describe.serial('Quick transfer widget tests', () => {

    test('Send quick transfer with no data entered', async ({ login, dashboardPage }) => {
        await expect(dashboardPage.quickTransferWidgetHeader).toBeVisible();
        await dashboardPage.quickTransferExecuteButton.click();
        await expect(dashboardPage.quickTransferReceiverErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.quickTransferAmountErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.quickTransferTitleErrorMessage).toContainText('pole wymagane');
    });

    test('Send quick transfer with all data entered', async ({ login, dashboardPage }) => {
        var randomReceiverIndex = generateValueInRange(1, 3);
        var transferAmount = generateRandomNumber(2);
        var transferTitle = generateRandomString(10);

        await dashboardPage.sendQuickTransfer(randomReceiverIndex, transferAmount, transferTitle);

        await expect(dashboardPage.successDialog).toBeVisible();
        await expect(dashboardPage.successDialog).toContainText(transferAmount);
        await expect(dashboardPage.successDialog).toContainText(transferTitle);

        await dashboardPage.clickOkButtonOnSuccessDialog();
    });

});

test.describe.serial('Top up widget tests', () => {

    test('Top up with no data entered', async ({ login, dashboardPage }) => {
        await expect(dashboardPage.topUpWidgetHeader).toBeVisible();
        await dashboardPage.topUpWidgetExecuteButton.click();
        await expect(dashboardPage.topUpWidgetReceiverErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.topUpWidgetAmountErrorMessage).toContainText('pole wymagane');
        await expect(dashboardPage.topUpWidgetAgreementErrorMessage).toContainText('pole wymagane');
    });

    test('Top up with all data entered', async ({ login, dashboardPage }) => {
        var randomReceiverIndex = generateValueInRange(1, 3);
        var topUpAmount = generateRandomNumber(2);

        await dashboardPage.sendTopUp(randomReceiverIndex, topUpAmount);

        await expect(dashboardPage.successDialog).toBeVisible();   
        await expect(dashboardPage.successDialog).toContainText('Doładowanie wykonane');
        await expect(dashboardPage.successDialog).toContainText(topUpAmount);

        await dashboardPage.clickOkButtonOnSuccessDialog();
    });

});