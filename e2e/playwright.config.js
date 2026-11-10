const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: process.env.BASE_URL || 'http://lille.shoploc.local:3000',
        screenshot: 'only-on-failure',
    },
    projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});