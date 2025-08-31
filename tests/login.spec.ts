import { user } from '../src/testdata/testdata';
import { generateRandomNumber, generateRandomString } from '../utils/randomizer';
import { LoginPage } from '../src/pages/login.page';
import { DashboardPage } from '../src/pages/dashboard.page';
import { expect, test } from '@playwright/test';

test.describe('Login tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage

    test.beforeAll(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
    });

    test.beforeEach(async ({ }) => {
        await loginPage.goto();
    });

    test('Successful login with correct credentials', async ({ }) => {
        await loginPage.enterLogin(user.loginId);
        await loginPage.enterPassword(user.password);
        await expect(loginPage.loginButton).toBeEnabled();

        await loginPage.clickLoginButton();
        await dashboardPage.isReady();
        await expect(dashboardPage.userName).toHaveText(user.username);
    });

    test('Unsuccessful login with too short password', async ({ }) => {
        await loginPage.enterLogin(user.loginId);

        const shortPassword = generateRandomNumber(7);
        console.log(`Generated short password: ${shortPassword}`);
        await loginPage.enterPassword(shortPassword);
        await loginPage.passwordInput.blur();

        await expect(loginPage.errorPassword).toContainText(loginPage.tooShortPasswordErrorMessage);
        await expect(loginPage.loginButton).toBeDisabled();
    });

    test('Unsuccessful login with too short login', async ({ }) => {
        const shortLogin = generateRandomString(7);
        console.log(`Generated short login: ${shortLogin}`);
        await loginPage.enterLogin(shortLogin);
        await loginPage.enterPassword(user.password);

        await expect(loginPage.erorrLogin).toContainText(loginPage.tooShortLoginErrorMessage);
        await expect(loginPage.loginButton).toBeDisabled();
    });

});