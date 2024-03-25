import { test, expect } from '@playwright/test';
import LoginPage from "../../pages/loginPage";
const baseUrl = 'https://www.preprod.kyg.ai';

test('Verify User is able to create Product', async ({ page }) => {
    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let sequentialNumber = getRandomNumber(1, 1000000000000);
        sequentialNumber++;
  await page.goto(`${baseUrl}/login`);
  await page.goto(`${baseUrl}/login?lang=en`);
  const loginPage = new LoginPage(page)
  
  await loginPage.loginToApplication()
  await page.getByText('New Item').click();
  await page.getByRole('menuitem', { name: 'TCPN' }).click();
  await page.locator('._contentSectionWrapper_dk6t9_14').first().click();
  await page.locator('.css-yodvpj').first().click();
  await page.getByRole('option', { name: 'TCPN' }).click();
  await page.getByLabel('Item Name').click();
  await page.getByLabel('Item Name').fill('Laptop');
  await page.getByLabel('Item Description').click();
  await page.getByLabel('Item Description').fill('Laptop Description');
  await page.locator('ul').filter({ hasText: 'Item TypeSelect from Project' }).click();
  await page.locator('div').filter({ hasText: /^Item NumberThe unique item identifier for this ItemRequired$/ }).locator('div').nth(3).click();
  await page.getByLabel('Item Number').fill(`1235-11A1B12653AB${sequentialNumber}`);
  await page.locator('div').filter({ hasText: /^Revision$/ }).first().click();
  await page.getByLabel('Revision').click();
  await page.getByLabel('Revision').fill('A');
  await page.locator('div').filter({ hasText: /^Business$/ }).first().click();
  await page.locator('#BUSINESSUNIT > .css-6x78p8-control > .css-hlgwow > .css-yodvpj').click();
  await page.getByRole('option', { name: 'CRP - Corporate' }).click();
  await page.getByText('Create').click();
  await expect(page.getByLabel('Laptop')).toContainText('Laptop');
  await expect(page.getByRole('main')).toContainText('Product Attributes');
  await expect(page.getByRole('main')).toContainText('Laptop');
  await expect(page.getByRole('main')).toContainText('Laptop Description');
  await expect(page.getByRole('main')).toContainText('TCPN');
  await expect(page.getByRole('main')).toContainText('A');
  await expect(page.getByRole('main')).toContainText('CRP - Corporate');

});