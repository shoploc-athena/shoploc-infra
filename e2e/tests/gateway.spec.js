const { test, expect } = require('@playwright/test');

test('the gateway routes each API prefix to its service', async ({ request }) => {
    // A JSON answer means a Java service replied (the gateway's own errors are HTML).
    for (const path of ['/api/products', '/api/stores', '/api/users', '/api/orders']) {
        const response = await request.get(path);
        expect(response.headers()['content-type'], path).toContain('application/json');
    }
});

test('an unknown host gets a 404 from the gateway', async ({ request, baseURL }) => {
    const url = new URL('/api/products', baseURL);
    url.hostname = 'paris.shoploc.local';
    const response = await request.get(url.toString());
    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('text/html');
});
