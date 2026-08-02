import { validUser } from '../src/testdata/testdata';
import { generateRandomNumber, generateRandomString } from '../src/utils/randomizer';
import { expect, test } from '../src/fixtures/base';

test.describe('Authentication flow tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Successful login with correct credentials', async ({ loginPage, basePage }) => {
        await loginPage.enterLogin(validUser.loginId);
        await loginPage.enterPassword(validUser.password);
        await expect(loginPage.loginButton).toBeEnabled();

        await loginPage.clickLoginButton();
        await basePage.isReady();
        await expect(basePage.userName).toHaveText(validUser.username);
        
        await basePage.clickLogOutButton();
        await expect(loginPage.page).toHaveURL(loginPage.loginUrl + "index.html");
        await expect(loginPage.loginForm).toBeVisible();
    });

    test('Unsuccessful login with too short password', async ({ loginPage}) => {
        const shortPassword = generateRandomNumber(7);
        console.log(`Generated short password: ${shortPassword}`);

        await loginPage.enterLogin(validUser.loginId);
        await loginPage.enterPassword(shortPassword);
        await loginPage.passwordInput.blur();

        await expect(loginPage.errorPassword).toContainText(loginPage.tooShortPasswordErrorMessage);
        await expect(loginPage.loginButton).toBeDisabled();
    });

    test('Unsuccessful login with too short login', async ({ loginPage }) => {
        const shortLogin = generateRandomString(7);
        console.log(`Generated short login: ${shortLogin}`);
        
        await loginPage.enterLogin(shortLogin);
        await loginPage.enterPassword(validUser.password);

        await expect(loginPage.erorrLogin).toContainText(loginPage.tooShortLoginErrorMessage);
        await expect(loginPage.loginButton).toBeDisabled();
    });

});