const { test, expect } = require('@playwright/test');

test('the frontend displays the catalogue from store-service', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'ShopLoc' })).toBeVisible();
    await expect(page.getByText('Baguette')).toBeVisible();
    await expect(page.getByText('Fromage de chèvre')).toBeVisible();
});

test('store-service returns the catalogue', async ({ request }) => {
    const response = await request.get('http://localhost:8080/api/products');
    expect(response.ok()).toBeTruthy();
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
});