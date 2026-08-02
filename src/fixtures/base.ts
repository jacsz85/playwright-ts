import { test as base, expect, Page } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { validUser } from '../testdata/testdata';
import { BasePage } from '../pages/base.page';
import { PaymentsPage } from '../pages/payments.page';
export { expect } from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    basePage: BasePage;
    dashboardPage: DashboardPage;
    paymentsPage: PaymentsPage;
    login: Page;
}

export const test = base.extend<MyFixtures>({
    login: async ({ page, loginPage, basePage }, use) => {
        await loginPage.goto();
        await expect(loginPage.loginForm).toBeVisible();
        await loginPage.enterLogin(validUser.loginId);
        await loginPage.enterPassword(validUser.password);
        await expect(loginPage.loginButton).toBeEnabled();
        await loginPage.clickLoginButton();
        await basePage.isReady();
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));    
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));    
    },
    paymentsPage: async ({ page }, use) => {
        await use(new PaymentsPage(page));    
    }
});

