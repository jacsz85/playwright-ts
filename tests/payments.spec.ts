import { expect, test } from '../src/fixtures/base';

test('Send payment', async ({ login, paymentsPage }) => {
    await paymentsPage.goGoToPayments();
    await expect(paymentsPage.pageHeader).toBeVisible();
    await expect(paymentsPage.paymentForm).toBeVisible();
    
    await paymentsPage.fillTransferForm('John Doe', '12345678901234567890123456', '100.00');
    await paymentsPage.sendPaymentButton.click();

    await expect(paymentsPage.successDialog).toBeVisible();
    await paymentsPage.clickOkButtonOnSuccessDialog();
});
