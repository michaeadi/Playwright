import { test, expect } from '@playwright/test';
const baseUrl = 'https://www.preprod.kyg.ai';


test("Verfiy Application Title", async ({ page }) => {
    await page.goto(`${baseUrl}/home`)

    const url = await page.url()

    console.log ("Title is "+url)

    await expect(page).toHaveTitle('KYG Trade™')
})