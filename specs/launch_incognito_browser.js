const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto('https://google.com');
    // do stuff
    await browser.close();
});