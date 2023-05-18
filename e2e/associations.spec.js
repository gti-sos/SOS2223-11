import { test, expect } from '@playwright/test';

test('Has correct title', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');
  await expect(page).toHaveTitle('Asociaciones');
});

test('Verifies the presence of buttons', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  await page.waitForSelector('#createAssociation');
  await page.waitForSelector('button:has-text("Cargar asociaciones")');
  await page.waitForSelector('button:has-text("Recargar asociaciones")');
  await page.waitForSelector('a:has-text("Filtrar asociaciones")');
  await page.waitForSelector('button:has-text("Borrar asociaciones")');
});

test('Verifies access of integrations route', async ({page}) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  (await page.waitForSelector('integrations')).click();
  await expect(page).toHaveTitle("Integraciones");
});

// test('Creates a new association', async ({ page }) => {
//   await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

//   const createButton = await page.waitForSelector('#createAssociation');
//   await createButton.click();

//   const form = await page.waitForSelector('form');
//   const formVisible = await form.isVisible();
//   expect(formVisible).toBeTruthy();

//   await form.fill('#name', 'Test Association');
//   await form.fill('#goal', 'Test Goal');
//   await form.fill('#province', 'Test Province');
//   await form.fill('#registration-date', '2023');
//   await form.fill('#creation-date', '2020');
//   await form.fill('#zip-code', '12345');
//   await form.fill('#township-code', '999');

//   await form.submit();

//   const successAlert = await page.waitForSelector('.alert-success');
//   const successMessage = await successAlert.innerText();
//   expect(successMessage).toContain('La asociación de Test Province del año 2023 ha sido creada con éxito');

//   await page.waitForSelector('tr:has-text("Test Association")');
// });

// test('Deletes the association', async ({ page }) => {
//   await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

//   const deleteButton = await page.waitForSelector('button:has-text("Borrar asociaciones")');
//   await deleteButton.click();

//   const confirmDeleteButton = await page.waitForSelector('button:has-text("Proceder")');
//   await confirmDeleteButton.click();

//   await page.waitForSelector('tbody:has-text("No existen asociaciones que eliminar")');
// });

test('Verifies the URL after filtering', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  const filterButton = await page.waitForSelector('a:has-text("Filtrar asociaciones")');
  await filterButton.click();

  await page.waitForURL(/.*search/);
});
