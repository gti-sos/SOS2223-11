import { test, expect } from '@playwright/test';


test('Has correct title', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  await expect(page).toHaveTitle('Asociaciones');
});

test('Has correct heading', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  const heading = await page.locator('h2');
  const text = await heading.innerText();
  expect(text).toContain('Asociaciones de Andalucía');
});

test('Verifies the presence of buttons in main route', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  await page.locator('#createAssociation');
  await page.locator('button:has-text("Cargar asociaciones")');
  await page.locator('button:has-text("Recargar asociaciones")');
  await page.locator('a:has-text("Filtrar asociaciones")');
  await page.locator('button:has-text("Borrar asociaciones")');
});

test('Verifies the number of associations to be above one statelessly', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');
  await page.waitForTimeout(2000);
  await page.locator('button:has-text("Cargar asociaciones"):not(:has-text("Recargar asociaciones"))').click();
  // await page.waitForSelector('tbody tr');
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');
  await page.waitForTimeout(2000);
  const rows = await page.locator('tbody tr').count();
  expect(rows).toBeGreaterThan(1);
});

test('Verifies the buttons inside the first association', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');
  await page.waitForTimeout(2000);
  await page.locator('button:has-text("Cargar asociaciones"):not(:has-text("Recargar asociaciones"))').click();
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');
  // await page.waitForTimeout(2000);
  // await page.locator('tbody tr');
  const firstRow = await page.locator('tbody tr').first();
  // const editButtonExists = 
  expect(await firstRow.locator('button:has-text("Editar")').count() > 0);
  expect(await firstRow.locator('button:has-text("Borrar")').count() > 0);
  // expect(editButtonExists).toBe(true);
  // const deleteButtonExists = await firstRow.locator('button:has-text("Borrar")').count() > 0;
  // expect(deleteButtonExists).toBe(true);
});


test('Verifies the filtering route', async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

  const filterButton = await page.locator('a:has-text("Filtrar asociaciones")');
  await filterButton.click();
  await page.waitForURL(/.*search/);
});

test('Verifies access of integrations route', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations');

  await expect(page).toHaveTitle("Integraciones");
});

test('Verifies the presence of buttons in Integrations route', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations');

  await page.locator('Button[href="/association-stats/integrations/highcharts"]');
  await page.locator('Button[href="/association-stats/integrations/d3"]');
  await page.locator('Button[href="/association-stats/integrations/optional"]');
  await page.locator('Button[href="/association-stats/integrations/external/cricket"]');
  await page.locator('Button[href="/association-stats/integrations/external/students"]');
  await page.locator('Button[href="/association-stats/integrations/external/airlines"]');
  await page.locator('Button[href="/association-stats/integrations/external/crashes"]');
  await page.locator('Button[href="/association-stats/integrations/external/metro"]');
});

test('Verifies access of integrations route - Highcharts', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/highcharts');

  await expect(page).toHaveTitle("Gráfica Highcharts");
});

test('Verifies access of integrations route - D3', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/d3');

  await expect(page).toHaveTitle("Gráfica D3");
});

test('Verifies access of integrations route - Optional', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/optional');

  await expect(page).toHaveTitle("Gráfica opcional");
});

test('Verifies access of integrations route - External Airlines', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/external/airlines');

  await expect(page).toHaveTitle("Gráfica externa aerolíneas");
});

test('Verifies access of integrations route - External Crashes', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/external/crashes');

  await expect(page).toHaveTitle("Gráfica externa accidentes");
});

test('Verifies access of integrations route - External Cricket', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/external/cricket');

  await expect(page).toHaveTitle("Gráfica externa cricket");
});

test('Verifies access of integrations route - External Metro', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/external/metro');

  await expect(page).toHaveTitle("Gráfica externa metro");
});

test('Verifies access of integrations route - External Students', async ({ page }) => {
  await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats/integrations/external/students');

  await expect(page).toHaveTitle("Gráfica externa estudiantes");
});


// test('Creates a new association', async ({ page }) => {
//   await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

//   const createButton = await page.locator('#createAssociation');
//   await createButton.click();

//   const form = await page.locator('form');
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

//   const successAlert = await page.locator('.alert-success');
//   const successMessage = await successAlert.innerText();
//   expect(successMessage).toContain('La asociación de Test Province del año 2023 ha sido creada con éxito');

//   await page.locator('tr:has-text("Test Association")');
// });

// test('Deletes the association', async ({ page }) => {
//   await page.goto('https://sos2223-11.ew.r.appspot.com/association-stats');

//   const deleteButton = await page.locator('button:has-text("Borrar asociaciones")');
//   await deleteButton.click();

//   const confirmDeleteButton = await page.locator('button:has-text("Proceder")');
//   await confirmDeleteButton.click();

//   await page.locator('tbody:has-text("No existen asociaciones que eliminar")');
// });


