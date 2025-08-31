import { test as base, expect, Page } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { user } from '../testdata/testdata';
export { expect } from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    login: Page;
}

export const test = base.extend<MyFixtures>({
    login: async ({ page, loginPage, dashboardPage }, use) => {
        await loginPage.goto();
        await loginPage.enterLogin(user.loginId);
        await loginPage.enterPassword(user.password);
        await expect(loginPage.loginButton).toBeEnabled();
        await loginPage.clickLoginButton();
        await dashboardPage.isReady();
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));    
    },
});

