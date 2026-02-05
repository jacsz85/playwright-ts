import { expect, test} from "@playwright/test";


test('Login test', async ({ page }) => {
    let loginId = "student"
    let password = "Password123";
    let expectedText = "Logged In Successfully";
    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('#username').fill(loginId);
    await page.locator('#password').fill(password);
    await page.locator('#submit').click();

    await expect(page.locator('.post-title')).toBeVisible();
    await expect(page.locator('.post-title')).toContainText(expectedText);

    await page.getByText("Log out").click();
    await expect(page.getByRole('heading', { name: 'Test login' })).toBeVisible();

});

test("Test 2", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('#submit').click();
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText("Your username is invalid!");
});

test("should display an error for empty password", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('#username').fill("student");
    await page.locator('#submit').click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText("Your password is invalid!");
});

