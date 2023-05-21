/*
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/phone-line-stats');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Lineas telefonicas');
  });

test("Load Data",async ({ page }) => {
  await page.goto('http://localhost:5173/phone-line-stats');
  await page.waitForTimeout(2000);
  await page.locator("#carga").click();
  await page.waitForTimeout(2000);
  await expect((await page.locator(".phoneRow").all()).length).toBeGreaterThanOrEqual(10);
});


test("Delete All",async ({ page }) => {
  await page.goto('http://localhost:5173/phone-line-stats');
  await page.waitForTimeout(2000);
  await page.locator("#acciones").click();
  await page.waitForTimeout(1000);
  page.locator('#Borrar').click();
  await page.waitForTimeout(2000);
  await expect((await page.locator(".phoneRow").all()).length).toEqual(0);
});

*/