import { test, expect } from '../src/fixtures/base';
import { user } from '../src/testdata/testdata';
import { generateRandomNumber, generateRandomString } from '../src/utils/randomizer';

test.describe('Authentication flow tests with page fixtures', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Successful login with correct credentials', async ({ loginPage, basePage }) => {
    await loginPage.enterLogin(user.loginId);
    await loginPage.enterPassword(user.password);
    await expect(loginPage.loginButton).toBeEnabled();

    await loginPage.clickLoginButton();
    await basePage.isReady();
    await expect(basePage.userName).toHaveText(user.username);
  });

  test('Unsuccessful login with too short password', async ({ loginPage }) => {
    await loginPage.enterLogin(user.loginId);

    const shortPassword = generateRandomNumber(7);
    console.log(`Generated short password: ${shortPassword}`);
    await loginPage.enterPassword(shortPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.errorPassword).toContainText(loginPage.tooShortPasswordErrorMessage);
    await expect(loginPage.loginButton).toBeDisabled();
  });

  test('Unsuccessful login with too short login', async ({ loginPage }) => {
    const shortLogin = generateRandomString(7);
    console.log(`Generated short login: ${shortLogin}`);
    await loginPage.enterLogin(shortLogin);
    await loginPage.enterPassword(user.password);

    await expect(loginPage.erorrLogin).toContainText(loginPage.tooShortLoginErrorMessage);
    await expect(loginPage.loginButton).toBeDisabled();
  });

});

test.describe('Authentication flow tests with login fixture', () => {

  test('Successful login', async ({ login, basePage }) => {
    await expect(basePage.userName).toHaveText(user.username);
  });

  test('Successful login and log out', async ({ login, loginPage, basePage }) => {
    await expect(basePage.userName).toHaveText(user.username);
    await basePage.clickLogOutButton();
    await expect(loginPage.page).toHaveURL(loginPage.loginUrl + "index.html");
    await expect(loginPage.loginForm).toBeVisible();
  });
  
});