import { test, expect } from '@playwright/test';
const baseUrl = 'https://www.preprod.kyg.ai';



test("Verify Invalid Login", async ({ page }) => {
    await page.goto(`${baseUrl}/login`, { timeout: 100000 })
    await page.goto(`${baseUrl}/login?lang=en`);
    await page.locator('input[name="email"]').click();
    await page.locator ('input[name="email"]').type("ExtAdmin1@te.com")
    await page.locator('input[name="password"]').click();
    await page.locator ('input[name="password"]').type("1234567890")
    await page.locator('button[name="Log In"][type="submit"]').click()
    await page.getByText('Wrong credentials or user').click();
    await page.getByLabel('Log In').click();
    await expect(page.getByRole('alert')).toContainText('Wrong credentials or user doesn\'t exist');

})