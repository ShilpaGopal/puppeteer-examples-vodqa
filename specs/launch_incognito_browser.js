const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto('http://automationpractice.com/');
    await browser.close();
});