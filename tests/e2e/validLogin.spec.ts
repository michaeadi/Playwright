import { test, expect } from '@playwright/test';
import LoginPage from "../../pages/loginPage";
const baseUrl = 'https://www.preprod.kyg.ai';
test('Verify User is able to Login Successfully', async ({ page }) => {
  await page.goto(`${baseUrl}/login`);
  await page.goto(`${baseUrl}/login?lang=en`);

  const loginPage = new LoginPage(page)

  await loginPage.loginToApplication()

  await page.waitForURL(/products/);
  await expect(page.url()).toContain("/products");


})