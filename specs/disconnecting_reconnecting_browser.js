const puppeteer = require('puppeteer');

puppeteer.launch({headless: false, slowMo: 2000}).then( async browser => {
    // Store the endpoint to be able to reconnect to Chromium
    const browserWSEndpoint = browser.wsEndpoint();
    // Disconnect puppeteer from Chromium
    browser.disconnect();

    // Use the endpoint to reestablish a connection
    const reconnectBrowser = await puppeteer.connect({browserWSEndpoint});

    const page = await reconnectBrowser.newPage();
    await page.goto('https://www.google.com');

    // Close Chromium
    await reconnectBrowser.close();
});